import asyncio
import os
import sys
import smtplib
import requests
from email.message import EmailMessage
from dotenv import load_dotenv
import argparse

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
from pipecat.frames.frames import LLMMessagesUpdateFrame
from pipecat.services.llm_service import FunctionCallParams
from pipecat.processors.user_idle_processor import UserIdleProcessor

# ── Explicit OpenAI-format tool schemas ──────────────────────────────────────
# Using explicit dicts (not ToolsSchema standard_tools) so the LLM receives
# proper parameter definitions and actually passes arguments correctly.
TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "transfer_to_human",
            "description": (
                "Transfer the caller to a live CryptoVoIP human representative via SIP. "
                "Use this when the user explicitly asks to speak to a human or a person."
            ),
            "parameters": {
                "type": "object",
                "properties": {},
                "required": []
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "send_callback_email",
            "description": (
                "Record the caller's details and send a callback request to the CryptoVoIP team. "
                "ONLY call this when you have the caller's name AND at least one of: "
                "email_address OR phone_number. Never call it with name alone. "
                "Purpose/reason and company are optional but collect them if the caller has shared them."
            ),
            "parameters": {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string",
                        "description": "Full name of the caller — required"
                    },
                    "email_address": {
                        "type": "string",
                        "description": "Email address of the caller — required if phone_number not provided"
                    },
                    "phone_number": {
                        "type": "string",
                        "description": "Phone or WhatsApp number with country code — required if email_address not provided"
                    },
                    "company_name": {
                        "type": "string",
                        "description": "Company or organisation name — optional"
                    },
                    "reason": {
                        "type": "string",
                        "description": "Purpose of the call or what the caller needs help with — optional"
                    }
                },
                "required": ["name"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "end_call",
            "description": (
                "End the voice session and disconnect. Only call this after you have said a "
                "proper goodbye and the user has confirmed they have no more questions."
            ),
            "parameters": {
                "type": "object",
                "properties": {},
                "required": []
            }
        }
    }
]

SYSTEM_PROMPT = """
You are the official AI Voice Assistant for CryptoVoIP Technologies — a deep-tech software company.

You speak naturally, clearly, and concisely — this is a real-time voice call, not a text chat.
Keep every response to 1–3 short sentences unless the user asks for more detail.
Never read out lists or bullet points aloud. Speak in natural flowing sentences.
Never use markdown formatting, asterisks, or symbols in your speech.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CRITICAL: WHAT CRYPTOVOIP IS NOT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CryptoVoIP Technologies has NOTHING to do with cryptocurrency, Bitcoin, blockchain,
crypto trading, NFTs, DeFi, tokens, or any financial instruments.
The "Crypto" in our name is short for "Cryptography" — meaning secure, encrypted communications.

If anyone asks about cryptocurrency, Bitcoin, trading, or blockchain:
Say clearly: "We are a software company focused on secure communications and AI. We have no connection to cryptocurrency or blockchain. Is there something related to our products I can help you with?"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TOPIC BOUNDARY — STRICT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

You ONLY discuss topics related to CryptoVoIP Technologies' products, services, and expertise.
If someone asks about anything unrelated — politics, general AI questions, competitor products,
personal advice, or anything not in this prompt — say:
"I can only help with questions about CryptoVoIP's products and services. Would you like to know about any of those?"

Do NOT speculate, invent features, or make up information not listed here.
If you don't know something, say: "I don't have that detail on hand — let me get our team to follow up with you directly."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CALL GREETING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

When the call starts, say exactly:
"Welcome to CryptoVoIP Technologies. I'm your AI voice assistant — built using the same Pipecat technology we offer our clients.
Here's what I can do: answer questions about our products and services, transfer you to a live human agent right now,
or take your name and contact details so our team can call you back.
Which of those would be most helpful?"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ABOUT CRYPTOVOIP TECHNOLOGIES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CryptoVoIP Technologies is a deep-technology software company with 18 years of experience.
We specialise in AI agents, secure communications infrastructure, IP camera security,
mobile device management, and professional training.

Website: www.cryptovoip.in
Email: contact@cryptovoip.in

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRODUCT 1 — CV MDM (Mobile Device Management)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CV MDM is an on-premise, offline-first mobile device management platform.
It works with zero internet — designed for air-gapped and captive networks.
It is trusted by the Indian Army Signals Regiment with over 500 devices deployed.
It also serves government offices and critical infrastructure organisations.

Key features: QR zero-touch enrollment, remote lock and wipe, Samsung Knox support,
app blacklisting and whitelisting, HMAC-signed syncs, multi-tenant admin dashboard.

Free trial: cvmdm.cryptovoip.in

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRODUCT 2 — OpenNVR (AI Camera Security Platform)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

OpenNVR is an open-source, AI-first network video recorder for critical infrastructure.
It is licensed under AGPL version 3 — fully open and auditable.
It works completely offline with zero cloud dependency.

The key innovation is Bring Your Own Model — you can plug in any AI model like
YOLO, InsightFace, or a custom model using our AI Adapter interface,
without changing cameras or hardware.

It has zero-trust security, Suricata intrusion detection, AES-256 encrypted storage,
and supports any ONVIF-compatible IP camera.

Website: opennvr.org

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SERVICE 1 — Voice and Video AI Agents
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

We build custom AI voice and video agents using the Pipecat framework — just like this bot.
Agents can work with cloud providers or run fully offline on your own servers.
They integrate with CRMs like Salesforce and HubSpot, MCP servers, and internal systems.
Customers own the complete source code — no platform lock-in.

We handle inbound support, outbound campaigns, appointment booking, and full business automation.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SERVICE 2 — VoIP and WebRTC Development
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

We have 18 years of expert-level experience in real-time communications.
Technologies include FreeSWITCH, OpenSIPS, Kamailio, RTPEngine, Asterisk,
Janus WebRTC, mediasoup, Linphone, Flexisip, and Coturn.

We customise existing platforms, build from scratch, deploy complete infra,
or integrate AI directly into your SIP stack. On-premise or cloud.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SERVICE 3 — Professional Training
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

We provide hands-on professional training delivered by practitioners with 18 years of experience.

Courses: Agentic AI, Pipecat voice bots, SIP and VoIP, FreeSWITCH, OpenSIPS,
Kamailio, WebRTC, RTPEngine, and Linphone.

We train individuals, university students, corporate teams, enterprises, and research institutions.
Delivery is available both online and on-site anywhere in the world.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
COLLECTING CALLER DETAILS — RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MINIMUM required before calling send_callback_email:
  • Name  (always required)
  • At least ONE of: email address OR phone number

Purpose/reason and company name are OPTIONAL — include them if the caller has mentioned them,
but do NOT delay sending the callback just to collect these extras.

NEVER call send_callback_email if you only have the name and nothing else.
If you have name but no email and no phone, ask:
"Could you share an email address or phone number so our team can reach you?"

Collect conversationally — one question at a time, not a rapid-fire list:
1. "Could I get your name please?"
2. "And what's the best way to reach you — email address or phone number?"
   (Accept whichever they give. If they give email, great. If phone, great. Either is enough.)
3. "What are you mainly looking to discuss?" (optional — ask only if not already clear)

Once you have name + (email OR phone), immediately call send_callback_email.
Do NOT wait until the end of the call.

If the caller explicitly refuses to share any contact info, respect that, continue helping,
and let them know they can always reach us at contact@cryptovoip.in.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TRANSFER TO HUMAN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

If the user says "transfer me", "speak to a human", "talk to a person", "talk to someone real",
or similar — call the transfer_to_human tool immediately.

Before transferring, if you don't already have their name and email, quickly collect those first.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ENDING THE CALL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Only call end_call after:
1. You have confirmed the user has no more questions.
2. You have said goodbye clearly.
3. You have confirmed their details are recorded if they shared them.

End with: "Thank you for calling CryptoVoIP Technologies. Our team will be in touch. Goodbye!"
Then immediately call the end_call tool.
"""


async def main():
    parser = argparse.ArgumentParser(description="CryptoVoIP RTVI Pipecat Bot")
    parser.add_argument("-u", type=str, help="Daily room URL")
    parser.add_argument("-t", type=str, help="Daily room token", default=None)
    args, _ = parser.parse_known_args()

    if not args.u:
        print("Missing Daily room URL argument.", flush=True)
        sys.exit(1)

    # ── Transport ─────────────────────────────────────────────────────────────
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

    # ── Services ──────────────────────────────────────────────────────────────
    stt = DeepgramSTTService(api_key=os.getenv("DEEPGRAM_API_KEY"))

    llm = OpenAILLMService(
        api_key=os.getenv("OPENAI_API_KEY"),
        model="gpt-4o"
    )

    tts = CartesiaTTSService(
        api_key=os.getenv("CARTESIA_API_KEY"),
        voice_id="79a125e8-cd45-4c13-8a67-188112f4dd22"  # Friendly British male
    )

    # ── Context with explicit tool schemas ────────────────────────────────────
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    context = LLMContext(messages, TOOLS)
    context_aggregator = LLMContextAggregatorPair(context)

    call_state = {
        "sip_agent_joined": False,
        "transfer_in_progress": False
    }

    # ── Tool Handlers ─────────────────────────────────────────────────────────

    async def transfer_to_human(params: FunctionCallParams):
        """Transfers the call to a live human agent via SIP dial-out."""
        if call_state["transfer_in_progress"]:
            await params.result_callback("I am already connecting you. Please stay on the line.")
            return

        call_state["transfer_in_progress"] = True
        await params.result_callback(
            "Connecting you to a live CryptoVoIP representative now. Please stay on the line."
        )
        asyncio.create_task(sip_transfer_watcher())

    async def send_callback_email(params: FunctionCallParams):
        """Records caller details and sends callback email to the CryptoVoIP team."""
        a = params.arguments
        name       = (a.get("name") or "").strip()
        email_addr = (a.get("email_address") or "").strip()
        phone      = (a.get("phone_number") or "").strip()
        company    = (a.get("company_name") or "").strip()
        reason     = (a.get("reason") or "").strip()

        # ── Guard: require name + at least one contact method ─────────────────
        if not name:
            await params.result_callback(
                "You still need the caller's name before recording their details. "
                "Ask: 'Could I get your name please?' and wait for their answer."
            )
            return

        if not email_addr and not phone:
            await params.result_callback(
                "You still need a way to contact this person. "
                "Ask: 'What is the best way to reach you — an email address or phone number?' "
                "and wait for their answer before calling this tool again."
            )
            return

        print(f"Callback request — Name: {name}, Email: {email_addr or '—'}, Phone: {phone or '—'}", flush=True)

        msg = EmailMessage()
        msg["Subject"] = f"[CryptoVoIP Bot] Callback Request from {name}"
        msg["From"]    = os.getenv("SMTP_USER", "bot@cryptovoip.in")
        msg["To"]      = "contact@cryptovoip.in"
        msg.set_content(
            f"New callback request received via the CryptoVoIP voice assistant.\n\n"
            f"Name:    {name}\n"
            f"Email:   {email_addr  or 'Not provided'}\n"
            f"Phone:   {phone       or 'Not provided'}\n"
            f"Company: {company     or 'Not provided'}\n"
            f"Purpose: {reason      or 'Not provided'}\n"
        )

        smtp_server = os.getenv("SMTP_SERVER", "cryptovoip.in")
        smtp_port   = int(os.getenv("SMTP_PORT", "465"))
        smtp_user   = os.getenv("SMTP_USER")
        smtp_pass   = os.getenv("SMTP_PASS")

        if smtp_user and smtp_pass:
            try:
                with smtplib.SMTP_SSL(smtp_server, smtp_port) as server:
                    server.login(smtp_user, smtp_pass)
                    server.send_message(msg)
                print(f"Callback email sent for {name} <{email_addr}>", flush=True)
            except Exception as e:
                print(f"Failed to send email: {e}", flush=True)
        else:
            print("SMTP credentials not configured — skipping email.", flush=True)

        await params.result_callback(
            f"Details recorded for {name}. Now ask: 'Is there anything else I can help you with?' "
            "If they say no, thank them warmly and call end_call."
        )

    async def end_call(params: FunctionCallParams):
        """Ends the voice session."""
        await params.result_callback("Ending the call now.")
        async def _exit():
            await asyncio.sleep(5)
            await transport.cleanup()
            sys.exit(0)
        asyncio.create_task(_exit())

    # ── SIP Transfer Watcher ──────────────────────────────────────────────────
    async def sip_transfer_watcher():
        await asyncio.sleep(3)  # let bot finish speaking first

        sip_uri  = os.getenv("TRANSFER_SIP_URI", "sip:agent@sip.cryptovoip.in")
        room_name = args.u.rstrip("/").split("/")[-1]
        headers  = {
            "Authorization": f"Bearer {os.getenv('DAILY_API_KEY')}",
            "Content-Type": "application/json"
        }
        payload = {"sipUri": sip_uri, "video": False}

        print(f"SIP dial-out → {sip_uri} in room {room_name}", flush=True)
        res = requests.post(
            f"https://api.daily.co/v1/rooms/{room_name}/dialOut/start",
            headers=headers,
            json=payload
        )
        print(f"Dial-out response: {res.status_code} — {res.text}", flush=True)

        # Wait up to 30 s for agent to answer
        for i in range(30):
            if call_state["sip_agent_joined"]:
                print("Human agent joined. Handing off and exiting bot.", flush=True)
                await asyncio.sleep(1)
                await transport.cleanup()
                sys.exit(0)
            await asyncio.sleep(1)

        # Nobody answered — roll back and offer callback
        print("Transfer timeout — no agent answered.", flush=True)
        call_state["transfer_in_progress"] = False
        await task.queue_frames([
            LLMMessagesUpdateFrame(
                messages=[{
                    "role": "system",
                    "content": (
                        "The human agent did not answer. Tell the user our team is currently unavailable "
                        "and offer to take their name, email, and phone number so we can call them back promptly. "
                        "Do NOT disconnect — wait for their response."
                    )
                }],
                run_llm=True
            )
        ])

    # ── Register function handlers ────────────────────────────────────────────
    llm.register_function("transfer_to_human",  transfer_to_human)
    llm.register_function("send_callback_email", send_callback_email)
    llm.register_function("end_call",            end_call)

    # ── Idle processor (60 s silence → graceful exit) ─────────────────────────
    async def handle_idle(processor: UserIdleProcessor):
        await task.queue_frames([
            LLMMessagesUpdateFrame(
                messages=[{
                    "role": "system",
                    "content": (
                        "The user has been silent for a while. "
                        "Say: 'It seems you may have stepped away. Feel free to call back or email us at "
                        "contact@cryptovoip.in. Goodbye!' Then call end_call."
                    )
                }],
                run_llm=True
            )
        ])
        await asyncio.sleep(10)
        await transport.cleanup()
        sys.exit(0)

    user_idle = UserIdleProcessor(callback=handle_idle, timeout=60.0)

    # ── Pipeline ──────────────────────────────────────────────────────────────
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

    # ── Event handlers ────────────────────────────────────────────────────────
    @transport.event_handler("on_participant_joined")
    async def on_participant_joined(transport, participant):
        info = participant.get("info", {})
        uid  = participant.get("user_id", "")
        p_type = info.get("participantType", "")
        is_remote = info.get("isRemote", False)

        if p_type == "sip" or (is_remote and "sip" in uid.lower()):
            print(f"SIP agent detected: {uid}", flush=True)
            call_state["sip_agent_joined"] = True
        elif is_remote:
            print(f"Web user joined: {uid}", flush=True)

    @transport.event_handler("on_first_participant_joined")
    async def on_first_participant_joined(transport, participant):
        await transport.capture_participant_transcription(participant["id"])
        await task.queue_frames([
            LLMMessagesUpdateFrame(
                messages=[{
                    "role": "system",
                    "content": "Deliver your CALL GREETING exactly as written in your instructions."
                }],
                run_llm=True
            )
        ])

    runner = PipelineRunner()
    await runner.run(task)


if __name__ == "__main__":
    asyncio.run(main())
