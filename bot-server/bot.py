import asyncio
import os
import sys
import aiohttp
import requests
import smtplib
from email.message import EmailMessage
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
from pipecat.frames.frames import LLMMessagesFrame, EndFrame
from pipecat.adapters.schemas.tools_schema import ToolsSchema
from pipecat.services.llm_service import FunctionCallParams
from pipecat.processors.user_idle_processor import UserIdleProcessor

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
    stt = DeepgramSTTService(api_key=os.getenv("DEEPGRAM_API_KEY"))
    
    llm = OpenAILLMService(api_key=os.getenv("OPENAI_API_KEY"), model="gpt-4o")
    
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

        "Welcome to CryptoVoIP Technologies. We specialize in developing custom tailored bots and AI agents specific to your business, as well as SIP and VoIP Development, and Mobile Device Management. We developed this bot as well. How can I help you today?"

        Speak clearly and calmly.

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

        ------------------------------------------------
        Voice Bots and Video Bots
        ------------------------------------------------

        CryptoVoIP develops advanced real-time AI bots using Pipecat.

        Capabilities include:
        • Ultra low latency voice interaction
        • RAG (Retrieval-Augmented Generation) pipelines
        • MCP (Model Context Protocol) integrations
        • Direct CRM integrations (Salesforce, HubSpot, etc.)
        • Real-time conversational AI for sales and support
        • Enterprise workflow automation

        Bots are designed for production environments with high reliability and minimal hallucinations.

        ------------------------------------------------
        VoIP and WebRTC Engineering
        ------------------------------------------------

        CryptoVoIP provides expert telecom and real-time communication engineering services. We have over 20 years of experience.

        Core technologies:
        • FreeSWITCH (Development and HA clustering)
        • OpenSIPS and Kamailio (SIP Routing and Load Balancing)
        • RTPengine (Media handling and NAT traversal)
        • Custom WebRTC implementation for web and mobile

        ------------------------------------------------
        Linphone & Flexisip Specialization
        ------------------------------------------------

        We specialize in deep customization of Linphone for Android and iOS.
        • Custom UI/UX development for Linphone
        • Integration of Flexisip push notification server
        • Secure, enterprise-grade SIP communication apps
        • White-label mobile VoIP solutions
        • Flexisip push notifications server setup and configuration

        ------------------------------------------------
        CV MDM – Defense Grade Mobile Device Management
        ------------------------------------------------

        CV MDM is a secure mobile device management platform designed for organizations requiring strict device control.
        • Works fully on-premise or in the cloud
        • Built for critical infrastructure and captive networks
        • Advanced device security policies and offline management
        • Enterprise-grade control

        ------------------------------------------------
        OpenNVR – AI Powered Camera Security Platform
        ------------------------------------------------

        OpenNVR is an advanced IP camera security and video intelligence platform.
        • Fully offline capable / On-premise
        • Complete data and AI sovereignty
        • AI adapters for video intelligence (Supports 1000+ models)
        • Designed to mitigate security risks in IP cameras

        ------------------------------------------------
        CALLBACK REQUEST
        ------------------------------------------------

        If a caller asks for a callback OR if you inform them that agents are busy, you MUST ask for their details.
        
        Collect organically:
        • Name (Required)
        • Email Address (Required)
        • Phone number (Optional)
        • Company Name (Optional)
        • Reason (Optional)

        Once you have collected the required details (Name and Email), immediately call the tool:
        
        send_callback_email(name="User Name", email_address="user@email.com", ...)

        After the tool returns, you MUST ask the user: "Do you need any more information?"
        
        If the user says NO or indicates they are finished:
        1. Say: "Thank you for contacting CryptoVoIP. Our team will connect with you soon. Goodbye!"
        2. Immediately call the `end_call` tool.

        ------------------------------------------------
        TRANSFER TO HUMAN
        ------------------------------------------------

        If the user requests to talk to a human or person, use the `transfer_to_human` tool.
        """
        }
    ]

    call_state = {
        "sip_agent_joined": False,
        "transfer_in_progress": False
    }

    async def sip_transfer_watcher():
        # Small delay to allow the LLM to finish speaking "Connecting you..."
        await asyncio.sleep(4)
        
        room_name = transport.room_name if hasattr(transport, "room_name") else args.u.split("/")[-1]
        headers = {"Authorization": f"Bearer {os.getenv('DAILY_API_KEY')}", "Content-Type": "application/json"}
        payload = {
            "sipUri": "sip:varunps20033@sip.linphone.org",
            "video": False
        }
        
        print(f"Starting SIP Dial-Out to {payload['sipUri']} in room {room_name}...")
        res = requests.post(f"https://api.daily.co/v1/rooms/{room_name}/dialOut/start", headers=headers, json=payload)
        print(f"SIP Dial-Out Status: {res.status_code} - {res.text}")

        # Wait up to 30 seconds for the human agent to join
        for i in range(30):
            if call_state.get("sip_agent_joined"):
                print("SIP agent detected in room. Bot handoff complete. Exiting.")
                # We give a tiny buffer for the transport to sync then clear
                await asyncio.sleep(1)
                await transport.cleanup()
                sys.exit(0)
            await asyncio.sleep(1)
            if i % 5 == 0:
                print(f"Waiting for agent... ({i}s passed)")

        # If we reach here, no agent joined
        print("Transfer timeout: No agent picked up.")
        call_state["transfer_in_progress"] = False
        await task.queue_frames([LLMMessagesFrame([{"role": "system", "content": "The human agent seems to be busy or unavailable at the moment. Offer to collect the user's details to arrange an immediate callback. Do NOT disconnect yet; wait for the user's response."}])])

    async def transfer_to_human(params: FunctionCallParams):
        """Transfers the call to a human agent."""
        if call_state["transfer_in_progress"]:
            return await params.result_callback("I am already trying to connect you.")
            
        call_state["transfer_in_progress"] = True
        await params.result_callback("Connecting you to a human agent now. Please stay on the line.")
        asyncio.create_task(sip_transfer_watcher())

    async def send_callback_email(params: FunctionCallParams):
        """Sends an email with the user's callback details."""
        args_dict = params.arguments
        name = args_dict.get("name", "Unknown")
        email_addr = args_dict.get("email_address", "Unknown")
        
        msg = EmailMessage()
        msg['Subject'] = f"Callback Request from {name}"
        msg['From'] = os.getenv("SMTP_USER", "bot@cryptovoip.in")
        msg['To'] = "contact@cryptovoip.in"

        content = f"New callback request received from the voice bot:\n\n"
        content += f"Name: {name}\n"
        content += f"Email: {email_addr}\n"
        content += f"Phone: {args_dict.get('phone_number', 'Not provided')}\n"
        content += f"Company: {args_dict.get('company_name', 'Not provided')}\n"
        content += f"Reason: {args_dict.get('reason', 'Not provided')}\n"

        msg.set_content(content)

        smtp_server = os.getenv("SMTP_SERVER", "cryptovoip.in")
        smtp_port = int(os.getenv("SMTP_PORT", "465"))
        smtp_user = os.getenv("SMTP_USER", "bot@cryptovoip.in")
        smtp_pass = os.getenv("SMTP_PASS")

        if smtp_user and smtp_pass:
            try:
                with smtplib.SMTP_SSL(smtp_server, smtp_port) as server:
                    server.login(smtp_user, smtp_pass)
                    server.send_message(msg)
                print(f"Callback email sent to contact@cryptovoip.in for {name}")
            except Exception as e:
                print(f"Failed to send email: {e}")

        await params.result_callback("Callback request successfully recorded. Now ask the user: 'Do you need any more information?'. If they say no, thank them, mention the team will connect soon, say goodbye, and then call 'end_call'.")

    async def end_call(params: FunctionCallParams):
        """Ends the active voice session."""
        await params.result_callback("Disconnecting now.")
        async def delayed_exit():
            await asyncio.sleep(6) 
            await transport.cleanup()
            sys.exit(0)
        asyncio.create_task(delayed_exit())

    tools = ToolsSchema(standard_tools=[transfer_to_human, send_callback_email, end_call])
    context = LLMContext(messages, tools)
    context_aggregator = LLMContextAggregatorPair(context)

    llm.register_function("transfer_to_human", transfer_to_human)
    llm.register_function("send_callback_email", send_callback_email)
    llm.register_function("end_call", end_call)

    async def handle_idle(processor: UserIdleProcessor):
        await task.queue_frames([LLMMessagesFrame([{"role": "system", "content": "The user has been silent for 1 minute. Say goodbye and disconnect."}])])
        await asyncio.sleep(8) 
        await transport.cleanup()
        sys.exit(0)

    user_idle = UserIdleProcessor(callback=handle_idle, timeout=60.0)

    pipeline = Pipeline([
        transport.input(),
        vad_processor,
        stt,
        context_aggregator.user(),
        user_idle,
        llm,
        tts,
        transport.output(),
        context_aggregator.assistant(),
    ])

    task = PipelineTask(pipeline, params=PipelineParams(allow_interruptions=True))
    
    @transport.event_handler("on_participant_joined")
    async def on_participant_joined(transport, participant):
        info = participant.get("info", {})
        # Daily marks SIP dial-out participants with participantType: sip
        # Or sometimes they appear as remote participants with a specific name
        if info.get("participantType") == "sip" or (info.get("isRemote") and "sip" in participant.get("user_id", "").lower()):
            print(f"DEBUG: Potential SIP Agent Joined: {participant.get('user_id')} / {info.get('participantType')}")
            call_state["sip_agent_joined"] = True
        elif info.get("isRemote"):
            # This is likely the WEB user
            print(f"DEBUG: Web User Joined: {participant.get('user_id')}")

    @transport.event_handler("on_first_participant_joined")
    async def on_first_participant_joined(transport, participant):
        await transport.capture_participant_transcription(participant["id"])
        await task.queue_frames([LLMMessagesFrame([{"role": "system", "content": "Please introduce yourself as instructed in the CALL GREETING. Start with 'Welcome to CryptoVoIP Technologies.'"}])])

    runner = PipelineRunner()
    await runner.run(task)

if __name__ == "__main__":
    asyncio.run(main())
