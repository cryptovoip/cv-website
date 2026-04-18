import os
import sys
import time
import subprocess
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import requests
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# ── CORS ─────────────────────────────────────────────────────────────────────
# Read from env so the same server.py works in dev (localhost) and production.
_raw_origins = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:3000,http://127.0.0.1:3000"
)
ALLOWED_ORIGINS = [o.strip() for o in _raw_origins.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
)

DAILY_API_KEY = os.getenv("DAILY_API_KEY")
if not DAILY_API_KEY:
    print("WARNING: DAILY_API_KEY is missing from .env", flush=True)

# ── In-memory rate limiting ───────────────────────────────────────────────────
# Tracks (IP, email) → call count today. Resets on server restart.
# Replace with Redis for production multi-process deployments.
ip_rate_cache: dict[str, int]    = {}
email_rate_cache: dict[str, int] = {}
MAX_CALLS_PER_IP    = 10
MAX_CALLS_PER_EMAIL = 5


@app.post("/connect")
async def connect(request: Request):
    client_ip = request.client.host

    # ── IP rate limit ─────────────────────────────────────────────────────────
    if ip_rate_cache.get(client_ip, 0) >= MAX_CALLS_PER_IP:
        raise HTTPException(
            status_code=429,
            detail="Too many calls from this IP. Try again later."
        )

    # ── Parse body ────────────────────────────────────────────────────────────
    try:
        data = await request.json()
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid JSON body.")

    # RTVI client sends: { "requestData": { "email": "..." }, ... }
    # Fall back to top-level "email" for compatibility with direct API calls.
    request_data = data.get("requestData") or {}
    user_email   = request_data.get("email") or data.get("email", "")

    if not user_email or "@" not in user_email:
        raise HTTPException(
            status_code=400,
            detail="A valid email address is required to start a call."
        )

    # ── Email rate limit ──────────────────────────────────────────────────────
    norm_email = user_email.lower().strip()
    if email_rate_cache.get(norm_email, 0) >= MAX_CALLS_PER_EMAIL:
        raise HTTPException(
            status_code=429,
            detail="Too many calls from this email address. Try again later."
        )

    # Increment counters
    ip_rate_cache[client_ip]  = ip_rate_cache.get(client_ip, 0) + 1
    email_rate_cache[norm_email] = email_rate_cache.get(norm_email, 0) + 1

    # ── Daily API headers ─────────────────────────────────────────────────────
    headers = {
        "Authorization": f"Bearer {DAILY_API_KEY}",
        "Content-Type": "application/json"
    }

    try:
        # ── Create Daily room (10-min expiry with dialout enabled) ────────────
        room_res = requests.post(
            "https://api.daily.co/v1/rooms",
            headers=headers,
            json={
                "properties": {
                    "exp": int(time.time()) + (10 * 60),  # 10 minutes
                    "enable_dialout": True,
                    "start_audio_off": False,
                    "start_video_off": True,
                }
            },
            timeout=10
        )
        if room_res.status_code != 200:
            print(f"Daily room creation failed: {room_res.status_code} — {room_res.text}", flush=True)
            room_res.raise_for_status()

        room_data = room_res.json()
        room_url  = room_data["url"]
        room_name = room_data["name"]

        # ── User token (join, no owner rights) ────────────────────────────────
        user_token_res = requests.post(
            "https://api.daily.co/v1/meeting-tokens",
            headers=headers,
            json={"properties": {"room_name": room_name}},
            timeout=10
        )
        user_token_res.raise_for_status()
        user_token = user_token_res.json()["token"]

        # ── Bot token (owner, can kick participants) ───────────────────────────
        bot_token_res = requests.post(
            "https://api.daily.co/v1/meeting-tokens",
            headers=headers,
            json={"properties": {"room_name": room_name, "is_owner": True}},
            timeout=10
        )
        bot_token_res.raise_for_status()
        bot_token = bot_token_res.json()["token"]

        # ── Spawn bot process ─────────────────────────────────────────────────
        bot_script = os.path.join(os.path.dirname(__file__), "bot.py")
        subprocess.Popen(
            [sys.executable, bot_script, "-u", room_url, "-t", bot_token],
            env=os.environ.copy(),
            stdout=open("bot_output.log", "a"),
            stderr=subprocess.STDOUT
        )
        print(f"Bot spawned for room {room_name} — user: {norm_email}", flush=True)

        # ── Return WebRTC handshake to RTVI React SDK ─────────────────────────
        return JSONResponse({"room_url": room_url, "token": user_token})

    except HTTPException:
        raise
    except requests.exceptions.Timeout:
        raise HTTPException(status_code=504, detail="Daily API timed out. Please try again.")
    except Exception as e:
        print(f"Connection error: {e}", flush=True)
        raise HTTPException(status_code=500, detail="Failed to initialise voice session.")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
