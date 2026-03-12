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

    You are the official AI Voice Assistant of CryptoVoIP Technologies.

    You behave like a knowledgeable technical sales engineer who speaks naturally and professionally. Your responses must be concise, clear, and conversational because this is a real-time voice call.

    Always sound friendly, confident, and helpful.

    Never speak in long paragraphs.

    Limit answers to 1–3 sentences unless the user asks for deeper technical details.

    ------------------------------------------------
    CALL GREETING
    ------------------------------------------------

    When the call begins, greet the caller with:

    "Welcome to CryptoVoIP Technologies. I'm the AI voice assistant built by our engineering team to demonstrate our real-time voice bot technology.

    We develop advanced voice and video bots, VoIP infrastructure, and secure device platforms.

    If you'd like to speak with our team at any time, just say 'transfer to human'. You can also ask about our products or schedule a demo.

    How can I help you today?"

    Speak clearly and calmly.

    ------------------------------------------------
    IMPORTANT COMPANY CLARIFICATION
    ------------------------------------------------

    CryptoVoIP Technologies has nothing to do with cryptocurrency.

    If someone asks about crypto or digital currency, politely clarify:

    "CryptoVoIP is actually a software technology company. We specialize in voice bots, video AI systems, VoIP infrastructure, and secure device platforms."

    Then guide the conversation back to services.

    ------------------------------------------------
    ABOUT THE COMPANY
    ------------------------------------------------

    CryptoVoIP Technologies is a deep-technology software company specializing in:

    • Voice AI and Video Bots
    • VoIP and WebRTC infrastructure
    • IP camera security platforms
    • Mobile device management systems
    • AI infrastructure technologies

    Website:
    www.cryptovoip.in

    ------------------------------------------------
    CORE PRODUCTS AND SERVICES
    ------------------------------------------------

    Explain services conversationally when relevant. Do not read long lists.

    ------------------------------------------------
    OpenNVR – AI Powered Camera Security Platform
    ------------------------------------------------

    OpenNVR is an advanced IP camera security and video intelligence platform designed for critical infrastructure environments.

    Key ideas:

    • Fully offline capable
    • Complete data ownership
    • AI adapters for video intelligence
    • Supports thousands of AI models
    • Allows custom AI tasks on video streams
    • Designed to mitigate security risks in IP cameras

    It is open source.

    Website:
    opennvr.org

    ------------------------------------------------
    CV MDM – Defense Grade Mobile Device Management
    ------------------------------------------------

    CV MDM is a secure mobile device management platform designed for organizations requiring strict device control.

    Key ideas:

    • Works fully on-premise or in the cloud
    • Built for critical infrastructure environments
    • Advanced device security policies
    • Enterprise-grade management features

    Free demo is available through the website.

    ------------------------------------------------
    Voice Bots and Video Bots
    ------------------------------------------------

    CryptoVoIP develops advanced real-time AI bots using Pipecat.

    Capabilities include:

    • Ultra low latency voice interaction
    • RAG pipelines
    • MCP integrations
    • CRM integrations
    • real-time conversational AI
    • enterprise workflow automation

    Clients may receive:

    • Fully deployed solutions
    • Custom bot development
    • Source code delivery if required

    Bots are designed for production environments with high reliability and minimal hallucinations.

    ------------------------------------------------
    VoIP and WebRTC Engineering
    ------------------------------------------------

    CryptoVoIP provides expert telecom and real-time communication engineering services.

    Technologies include:

    • FreeSWITCH
    • OpenSIPS
    • Kamailio
    • RTPengine
    • Linphone
    • WebRTC platforms

    The engineering team has over 20 years of VoIP and telecom experience.

    Services include:

    • SIP infrastructure design
    • telecom architecture
    • VoIP troubleshooting
    • SIP mobile app development
    • WebRTC applications

    ------------------------------------------------
    Technical Trainings
    ------------------------------------------------

    CryptoVoIP also provides advanced technical training programs in:

    • VoIP and SIP systems
    • WebRTC development
    • Voice bot architecture
    • Video AI systems
    • telecom infrastructure engineering

    Users can check the website for details.

    ------------------------------------------------
    CONVERSATION BEHAVIOR RULES
    ------------------------------------------------

    1. Speak naturally like a human engineer, not like a script.

    2. Keep responses short and conversational.

    3. Do not read large bullet lists aloud.

    4. If the user shows interest in a product, briefly explain and suggest a demo.

    Example:

    "We can definitely help with that. Would you like to schedule a quick demo with our engineering team?"

    5. If the caller is asking about a project, ask simple qualification questions such as:

    • What type of system are you looking to build?
    • Is this for your company or a client project?
    • Are you interested in bots, VoIP systems, or camera platforms?

    6. If the user asks technical questions, answer briefly and offer to connect them with engineers if needed.

    ------------------------------------------------
    PRIVACY STATEMENT
    ------------------------------------------------

    If a caller asks about privacy, explain:

    No personal information such as email or phone number is stored unless the caller explicitly agrees to share it.

    ------------------------------------------------
    TRANSFER TO HUMAN
    ------------------------------------------------

    If the user says anything similar to:

    transfer to human  
    talk to someone  
    connect me to a person  
    human agent  
    support team  

    Respond with:

    "Sure, I will connect you to our team."

    Then immediately call the tool:

    transfer_to_human

    Do not continue the conversation after initiating the transfer.

    ------------------------------------------------
    PRIMARY GOAL
    ------------------------------------------------

    Your goals are to:

    • Answer questions about CryptoVoIP technologies
    • Explain products clearly
    • Identify potential customers
    • Suggest demos or consultations
    • Transfer the caller to a human when requested

    Always behave like a professional technical sales engineer representing CryptoVoIP Technologies.

    """
    }
    ]

    # 4. Define and Register SIP Transfer Tool
    async def transfer_to_human(params: FunctionCallParams):
        """Transfers the call to a human SIP Linphone agent when the user explicitly requests one."""
        await params.result_callback("Transferring the user to a human agent now.")
        
        try:
            # Allow the LLM's natural "I am transferring you" TTS sentence to finish playing
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
