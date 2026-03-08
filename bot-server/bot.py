import asyncio
import os
import sys
import aiohttp
import requests
from dotenv import load_dotenv

load_dotenv()

from pipecat.pipeline.pipeline import Pipeline
from pipecat.pipeline.runner import PipelineRunner
from pipecat.pipeline.task import PipelineTask, PipelineParams
from pipecat.services.openai.llm import OpenAILLMService
from pipecat.services.cartesia.tts import CartesiaTTSService
from pipecat.services.deepgram.stt import DeepgramSTTService
from pipecat.transports.daily.transport import DailyParams, DailyTransport
from pipecat.audio.vad.silero import SileroVADAnalyzer
from pipecat.processors.audio.vad_processor import VADProcessor
from pipecat.processors.aggregators.llm_context import LLMContext
from pipecat.processors.aggregators.llm_response_universal import LLMContextAggregatorPair
from pipecat.frames.frames import LLMMessagesFrame
from pipecat.services.deepgram.stt import DeepgramSTTService
from pipecat.transports.daily.transport import DailyParams, DailyTransport
from pipecat.audio.vad.silero import SileroVADAnalyzer
from pipecat.processors.audio.vad_processor import VADProcessor
from pipecat.adapters.schemas.tools_schema import ToolsSchema
from pipecat.services.llm_service import FunctionCallParams

import argparse

async def main():
    parser = argparse.ArgumentParser(description="CryptoVoIP RTVI Pipecat Bot")
    parser.add_argument("-u", type=str, help="Room URL")
    parser.add_argument("-t", type=str, help="Room Token", default=None)
    args, _ = parser.parse_known_args()
    
    if not args.u:
        print("Missing Daily room URL argument.")
        sys.exit(1)

    # 1. Transport Layer (WebRTC via Daily)
    transport = DailyTransport(
        room_url=args.u,
        token=args.t,
        bot_name="CryptoVoIP Rep",
        params=DailyParams(
            audio_in_enabled=True,
            audio_out_enabled=True,
        )
    )
    
    vad_processor = VADProcessor(vad_analyzer=SileroVADAnalyzer())

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
        voice_id="79a125e8-cd45-4c13-8a67-188112f4dd22" # Friendly British male
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
            - If a user explicitly asks to speak to a real human, tell them you are transferring them, then call the `transfer_to_human` tool immediately. Do not hesitate.
            - If they specifically ask for RAG/MCP pipelines, inform them CryptoVoIP builds the backend servers and edge architectures natively.
            """
        }
    ]

    # 4. Define and Register SIP Transfer Tool
    async def transfer_to_human(params: FunctionCallParams):
        """Transfers the call to a human SIP Linphone agent when the user explicitly requests one."""
        await params.result_callback("Transferring the user to a human agent now.")
        
        try:
            # Tell the bot to say a transfer message
            await task.queue_frames([LLMMessagesFrame([{"role": "system", "content": "Acknowledge the transfer politely like 'Hold on securely while I connect you to a human expert.' and then say nothing else."}])])
            
            # Allow TTS to finish playing
            await asyncio.sleep(4)
            
            # The Daily room dials out to the Linphone SIP URI
            # This requires Daily SIP config, but creates a seamless WebRTC-to-SIP bridge!
            room_name = transport.room_name if hasattr(transport, "room_name") else args.u.split("/")[-1]
            headers = {"Authorization": f"Bearer {os.getenv('DAILY_API_KEY')}", "Content-Type": "application/json"}
            payload = {
                "sipUri": "sip:varunps20033@sip.linphone.org",
                "video": False
            }
            res = requests.post(f"https://api.daily.co/v1/rooms/{room_name}/dialOut/start", headers=headers, json=payload)
            print(f"SIP Dial-Out Response: {res.status_code} - {res.text}")
            
            # Gracefully disconnect the bot so it doesn't eavesdrop!
            await transport.cleanup()
            sys.exit(0)
            
        except Exception as e:
            print(f"SIP Transfer Error: {e}")

    tools = ToolsSchema(standard_tools=[transfer_to_human])
    context = LLMContext(messages, tools)
    context_aggregator = LLMContextAggregatorPair(context)

    llm.register_function(
        "transfer_to_human",
        transfer_to_human
    )

    # 5. Construct the Pipeline
    # Listen -> Transcribe -> LLM Processing -> Speak -> Send to Transport
    pipeline = Pipeline([
        transport.input(),
        vad_processor,
        stt,
        context_aggregator.user(),
        llm,
        tts,
        transport.output(),
        context_aggregator.assistant(),
    ])

    task = PipelineTask(pipeline, params=PipelineParams(allow_interruptions=True))
    
    # Register events
    @transport.event_handler("on_first_participant_joined")
    async def on_first_participant_joined(transport, participant):
        # Fire the initial greeting so the bot speaks first
        await transport.capture_participant_transcription(participant["id"])
        await task.queue_frames([LLMMessagesFrame([{"role": "system", "content": "Please introduce yourself as the CryptoVoIP voice assistant and ask how you can help."}])])

    # 5. Execute Runner (Hard Timeout inside Runner or Server layer)
    runner = PipelineRunner()
    await runner.run(task)

if __name__ == "__main__":
    # We use asyncio to run the async Pipecat framework
    asyncio.run(main())
