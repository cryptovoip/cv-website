import os
import sys
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import requests
import subprocess
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DAILY_API_KEY = os.getenv("DAILY_API_KEY")
if not DAILY_API_KEY:
    print("WARNING: DAILY_API_KEY is missing from .env")

# Basic in-memory rate limiting (IP -> count)
rate_limit_cache = {}
MAX_CALLS_PER_DAY = 100

@app.post("/connect")
async def connect(request: Request):
    client_ip = request.client.host
    
    # 1. IP Rate Limiting
    calls = rate_limit_cache.get(client_ip, 0)
    if calls >= MAX_CALLS_PER_DAY:
        raise HTTPException(status_code=429, detail="Rate limit exceeded. Try again tomorrow.")
    rate_limit_cache[client_ip] = calls + 1

    try:
        # 2. Extract user info from frontend friction
        data = await request.json()
        user_email = data.get("email")
        if not user_email:
            raise HTTPException(status_code=400, detail="Email is required to connect to a bot.")

        # 3. Create Daily Room via REST API
        headers = {
            "Authorization": f"Bearer {DAILY_API_KEY}",
            "Content-Type": "application/json"
        }
        
        # Rooms expire automatically after 5 minutes for security & cost control
        room_payload = {
            "properties": {
                "exp": int(os.popen('date +%s').read().strip()) + (5 * 60),
                "enable_dialout": True
            }
        }
        
        res = requests.post("https://api.daily.co/v1/rooms", headers=headers, json=room_payload)
        if res.status_code != 200:
            print(f"Daily Room API Error: {res.status_code} - {res.text}", flush=True)
            res.raise_for_status()
            
        room_data = res.json()
        room_url = room_data["url"]

        # 4. Generate a token for the user to join
        token_payload = {
            "properties": {
                "room_name": room_data["name"]
            }
        }
        token_res = requests.post("https://api.daily.co/v1/meeting-tokens", headers=headers, json=token_payload)
        token_res.raise_for_status()
        user_token = token_res.json()["token"]

        # 5. Generate a separate token for the Bot to join
        bot_token_payload = {
            "properties": {
                "room_name": room_data["name"],
                "is_owner": True
            }
        }
        bot_token_res = requests.post("https://api.daily.co/v1/meeting-tokens", headers=headers, json=bot_token_payload)
        bot_token_res.raise_for_status()
        bot_token = bot_token_res.json()["token"]

        # 6. Spin up the Pipecat Bot process in the background
        # Pass the room_url and bot_token to the bot so it knows where to connect
        subprocess.Popen([sys.executable, "bot.py", "-u", room_url, "-t", bot_token])

        # 7. Return WebRTC handshake to the RTVI React SDK
        return JSONResponse({
            "room_url": room_url,
            "token": user_token
        })

    except Exception as e:
        print(f"Connection Error: {e}")
        raise HTTPException(status_code=500, detail="Failed to initialize voice session.")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
