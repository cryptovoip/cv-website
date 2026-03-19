import asyncio
import os
import sys
import argparse
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

async def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("-u", type=str)
    parser.add_argument("-t", type=str)
    args, _ = parser.parse_known_args()

    print(f"Bot starting with Room URL: {args.u}", flush=True)

    transport = DailyTransport(
        room_url=args.u,
        token=args.t,
        bot_name="CryptoVoIP Bot",
        params=DailyParams(audio_in_enabled=True, audio_out_enabled=True)
    )
    
    vad_processor = VADProcessor(vad_analyzer=SileroVADAnalyzer())
    
    # Minimal config for Deepgram to avoid 400
    stt = DeepgramSTTService(
        api_key=os.getenv("DEEPGRAM_API_KEY")
    )
    
    llm = OpenAILLMService(
        api_key=os.getenv("OPENAI_API_KEY"), 
        model="gpt-4o-mini"
    )
    
    tts = CartesiaTTSService(
        api_key=os.getenv("CARTESIA_API_KEY"), 
        voice_id="79a125e8-cd45-4c13-8a67-188112f4dd22"
    )

    messages = [{"role": "system", "content": "You are a helpful assistant for CryptoVoIP Technologies. Keep responses very short."}]
    context = LLMContext(messages)
    context_aggregator = LLMContextAggregatorPair(context)

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

    @transport.event_handler("on_first_participant_joined")
    async def on_first_participant_joined(transport, participant):
        print(f"Participant joined: {participant['id']}", flush=True)
        await transport.capture_participant_transcription(participant["id"])
        await task.queue_frames([LLMMessagesFrame([{"role": "user", "content": "Say hello and welcome to CryptoVoIP."}])])

    runner = PipelineRunner()
    await runner.run(task)

if __name__ == "__main__":
    asyncio.run(main())
