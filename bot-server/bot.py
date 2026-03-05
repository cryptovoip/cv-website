import asyncio
import os
import sys
import aiohttp
from dotenv import load_dotenv

load_dotenv()

from pipecat.pipeline.pipeline import Pipeline
from pipecat.pipeline.runner import PipelineRunner
from pipecat.pipeline.task import PipelineTask, PipelineParams
from pipecat.services.openai import OpenAILLMService
from pipecat.services.cartesia import CartesiaTTSService
from pipecat.services.deepgram import DeepgramSTTService
from pipecat.transports.services.daily import DailyParams, DailyTransport
from pipecat.audio.vad.silero import SileroVADAnalyzer

import argparse

async def main():
    parser = argparse.ArgumentParser(description="CryptoVoIP RTVI Pipecat Bot")
    parser.add_argument("-u", type=str, help="Room URL")
    args = parser.parse_parser_args()
    
    if not args.u:
        print("Missing Daily room URL argument.")
        sys.exit(1)

    # 1. Transport Layer (WebRTC via Daily)
    transport = DailyTransport(
        room_url=args.u,
        token=os.getenv("DAILY_API_KEY"),
        bot_name="CryptoVoIP Rep",
        params=DailyParams(
            audio_out_enabled=True,
            vad_enabled=True,
            vad_analyzer=SileroVADAnalyzer(),
        )
    )

    # 2. Services Initialization
    # IMPORTANT: The user wants this to be LLM agnostic.
    # We are using OpenAI for the boilerplate, but this can literally be imported
    # as `AnthropicLLMService` or `TogetherLLMService` simply by replacing the import and class.
    
    # STT -> Deepgram is the fastest for real-time WebRTC
    stt = DeepgramSTTService(api_key=os.getenv("DEEPGRAM_API_KEY"))
    
    # LLM -> OpenAI (can be swapped)
    llm = OpenAILLMService(api_key=os.getenv("OPENAI_API_KEY"), model="gpt-4o")
    
    # TTS -> Cartesia is incredible for sub-100ms conversational audio
    tts = CartesiaTTSService(
        api_key=os.getenv("CARTESIA_API_KEY"),
        voice_id="a0e99841-438c-4a64-b6a9-ae0f17769133" # Friendly British/American male
    )

    # 3. Knowledge Base Context (System Prompt)
    messages = [
        {
            "role": "system",
            "content": """
            You are a highly technical sales engineer and Voice Bot for CryptoVoIP Technologies.
            You help callers understand four core products:
            1. OpenNVR: An open-source IP camera recording platform that supports bringing your own AI models via AI adapters.
            2. CV MDM: A completely offline, on-premise Mobile Device Management platform perfect for Captive Networks.
            3. Voice & Video Bots: We build custom Pipecat and RAG/MCP server pipelines designed for enterprise automation.
            4. VoIP & SIP Consultancy: We are 20+ year experts in FreeSwitch, OpenSIPS, and Linphone customization.

            Your instructions:
            - Be concise, professional, and slightly enthusiastic.
            - Answer questions briefly. Do not read out bullet points. Keep it conversational.
            - If a user asks to contact human support or requires deep technical quotes, instruct them to email `contact@cryptovoip.in` or offer to connect them via Linphone SIP URI.
            - If they specifically ask for RAG/MCP pipelines, inform them CryptoVoIP builds the backend servers and edge architectures natively.
            """
        }
    ]

    # 4. Construct the Pipeline
    # Listen -> Transcribe -> LLM Processing -> Speak -> Send to Transport
    pipeline = Pipeline([
        transport.input(),
        stt,
        llm,
        tts,
        transport.output(),
    ])

    task = PipelineTask(pipeline, params=PipelineParams(allow_interruptions=True))
    
    # Register events
    @transport.event_handler("on_first_participant_joined")
    async def on_first_participant_joined(transport, participant):
        # Fire the initial greeting so the bot speaks first
        transport.capture_participant_transcription(participant["id"])
        messages.append({"role": "system", "content": "Please introduce yourself as the CryptoVoIP voice assistant and ask how you can help."})
        await llm.process_messages(messages)

    # 5. Execute Runner (Hard Timeout inside Runner or Server layer)
    runner = PipelineRunner()
    await runner.run(task)

if __name__ == "__main__":
    # We use asyncio to run the async Pipecat framework
    asyncio.run(main())
