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
        • custom WebRTC development
        • high-availability telecom systems

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
        """
        }
    ]
    context = LLMContext(messages)
    
    async def send_callback_email(params: FunctionCallParams):
        """Sends an email with the user's callback details.
        
        Args:
            name (str): The user's full name.
            email_address (str): The user's email address.
            phone_number (str, optional): The user's contact phone number.
            company_name (str, optional): The user's company name.
            reason (str, optional): The reason for the callback or project interest.
        """
        args_dict = params.arguments
        name = args_dict.get("name", "Unknown")
        email_addr = args_dict.get("email_address", "Unknown")
        phone = args_dict.get("phone_number", "Not provided")
        company = args_dict.get("company_name", "Not provided")
        reason = args_dict.get("reason", "Not provided")

        msg = EmailMessage()
        msg['Subject'] = f"Callback Request from {name}"
        msg['From'] = os.getenv("SMTP_USER", "bot@cryptovoip.in")
        msg['To'] = "contact@cryptovoip.in"

        content = f"New callback request received from the voice bot:\n\n"
        content += f"Name: {name}\n"
        content += f"Email: {email_addr}\n"
        content += f"Phone: {phone}\n"
        content += f"Company: {company}\n"
        content += f"Reason: {reason}\n"

        msg.set_content(content)

        smtp_server = os.getenv("SMTP_SERVER", "cryptovoip.in")
        smtp_port = int(os.getenv("SMTP_PORT", "465"))
        smtp_user = os.getenv("SMTP_USER", "bot@cryptovoip.in")
        smtp_pass = os.getenv("SMTP_PASS")

        if smtp_user and smtp_pass:
            try:
                if smtp_port == 465:
                    with smtplib.SMTP_SSL(smtp_server, smtp_port) as server:
                        server.login(smtp_user, smtp_pass)
                        server.send_message(msg)
                else:
                    with smtplib.SMTP(smtp_server, smtp_port) as server:
                        server.starttls()
                        server.login(smtp_user, smtp_pass)
                        server.send_message(msg)
                print(f"Callback email sent to contact@cryptovoip.in for {name}")
            except Exception as e:
                print(f"Failed to send email: {e}")

        await params.result_callback("Callback request successfully recorded. Now ask the user: 'Do you need any more information?'. If they say no, thank them, mention the team will connect soon, say goodbye, and then call 'end_call'.")

    async def end_call(params: FunctionCallParams):
        """Ends the active voice session when the user is finished the conversation. Call this only when the user explicitly has no more questions and wants to hang up."""
        await params.result_callback("Disconnecting now.")
        
        async def delayed_exit():
            await asyncio.sleep(6) 
            await transport.cleanup()
            sys.exit(0)
            
        asyncio.create_task(delayed_exit())

    tools = ToolsSchema(standard_tools=[send_callback_email, end_call])
    context = LLMContext(messages, tools)
    context_aggregator = LLMContextAggregatorPair(context)

    llm.register_function("send_callback_email", send_callback_email)
    llm.register_function("end_call", end_call)

    async def handle_idle(processor: UserIdleProcessor):
        print("User idle for 60 seconds. Disconnecting.")
        await task.queue_frames([LLMMessagesFrame([{"role": "system", "content": "The user has been completely silent for 1 minute. Say exactly: 'I haven't heard anything from you, so I will disconnect now. Goodbye!'"}])])
        async def delayed_exit():
            await asyncio.sleep(8) 
            await transport.cleanup()
            sys.exit(0)
        asyncio.create_task(delayed_exit())

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
    
    @transport.event_handler("on_first_participant_joined")
    async def on_first_participant_joined(transport, participant):
        await transport.capture_participant_transcription(participant["id"])
        await task.queue_frames([LLMMessagesFrame([{"role": "system", "content": "Please introduce yourself exactly as instructed in the CALL GREETING. Start with 'Welcome to CryptoVoIP Technologies.'"}])])

    runner = PipelineRunner()
    await runner.run(task)

if __name__ == "__main__":
    asyncio.run(main())
