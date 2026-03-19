import os
import sys
import time
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
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DAILY_API_KEY = os.getenv("DAILY_API_KEY")

@app.post("/connect")
async def connect(request: Request):
    try:
        data = await request.json()
        user_email = data.get("email")
        if not user_email:
            raise HTTPException(status_code=400, detail="Email required")
        
        headers = {
            "Authorization": f"Bearer {DAILY_API_KEY}",
            "Content-Type": "application/json"
        }
        
        # Create Daily room
        res = requests.post(
            "https://api.daily.co/v1/rooms",
            headers=headers,
            json={
                "properties": {
                    "exp": int(time.time()) + 3600,
                    "enable_chat": True
                }
            }
        )
        res.raise_for_status()
        room_data = res.json()
        room_url = room_data.get("url")
        room_name = room_data.get("name")

        # Create token for bot
        token_res = requests.post(
            "https://api.daily.co/v1/meeting-tokens",
            headers=headers,
            json={"properties": {"room_name": room_name, "is_owner": True}}
        )
        token_res.raise_for_status()
        bot_token = token_res.json().get("token")

        # Create token for user
        user_token_res = requests.post(
            "https://api.daily.co/v1/meeting-tokens",
            headers=headers,
            json={"properties": {"room_name": room_name}}
        )
        user_token_res.raise_for_status()
        user_token = user_token_res.json().get("token")

        # Spawn bot
        subprocess.Popen(
            [sys.executable, "bot.py", "-u", room_url, "-t", bot_token],
            env=os.environ,
            stdout=open("bot_output.log", "a"),
            stderr=subprocess.STDOUT
        )

        return {"room_url": room_url, "token": user_token}
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
