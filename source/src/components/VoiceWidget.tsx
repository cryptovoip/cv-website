"use client";

import { useState, useCallback, useEffect } from "react";
import { RTVIClient, RTVIEvent } from "realtime-ai";
import { DailyTransport } from "realtime-ai-daily";
import { RTVIClientProvider, RTVIClientAudio, useRTVIClient, useRTVIClientEvent } from "realtime-ai-react";
import { Mic, MicOff, PhoneOff, Loader2, Bot, Play } from "lucide-react";

// We fallback to localhost if the env var isn't set, exactly as per the implementation plan
const BOT_BACKEND_URL = process.env.NEXT_PUBLIC_BOT_BACKEND_URL || "http://localhost:8000";

// 1. Initialize the RTVI Client globally outside the component
const transport = new DailyTransport();
export const voiceClient = new RTVIClient({
    transport,
    params: {
        baseUrl: BOT_BACKEND_URL,
        endpoints: {
            connect: "/connect"
        }
    },
    enableMic: true,
    enableCam: false,
});

export function VoiceWidget({ onClose }: { onClose?: () => void }) {
    return (
        <RTVIClientProvider client={voiceClient}>
            <VoiceInterface onClose={onClose} />
            <RTVIClientAudio />
        </RTVIClientProvider>
    );
}

function VoiceInterface({ onClose }: { onClose?: () => void }) {
    const client = useRTVIClient();
    const [status, setStatus] = useState<"idle" | "connecting" | "connected" | "speaking" | "error">("idle");
    const [isMuted, setIsMuted] = useState(false);
    const [email, setEmail] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    // Hook into RTVI Events
    useRTVIClientEvent(RTVIEvent.Connected, () => setStatus("connected"));
    useRTVIClientEvent(RTVIEvent.Disconnected, () => setStatus("idle"));
    useRTVIClientEvent(RTVIEvent.BotConnected, () => setStatus("speaking"));
    useRTVIClientEvent(RTVIEvent.BotDisconnected, () => setStatus("connected"));
    useRTVIClientEvent(RTVIEvent.Error, (msg: any) => {
        console.error("RTVI Error:", msg);
        setStatus("error");
        setErrorMsg("Failed to connect. The bot server might be offline or rate-limiting your IP.");
    });

    const handleConnect = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            setErrorMsg("Please enter an email to connect.");
            return;
        }

        setErrorMsg("");
        setStatus("connecting");

        try {
            // We pass the email to the backend as part of our anti-spam architecture
            if (client) {
                client.params = { ...client.params, requestData: { email: email } };
                await client.connect();
            }
        } catch (err) {
            console.error(err);
            setStatus("error");
            setErrorMsg("Failed to establish WebRTC connection.");
        }
    };

    const handleDisconnect = useCallback(() => {
        client?.disconnect();
        setStatus("idle");
        if (onClose) onClose();
    }, [client, onClose]);

    useEffect(() => {
        return () => {
            if (client?.state !== "disconnected") {
                client?.disconnect();
            }
        };
    }, [client]);

    const toggleMic = useCallback(() => {
        if (isMuted) {
            client?.enableMic(true);
            setIsMuted(false);
        } else {
            client?.enableMic(false);
            setIsMuted(true);
        }
    }, [client, isMuted]);

    // UI States
    if (status === "idle" || status === "error") {
        return (
            <div className="bg-dark-bg p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl w-full max-w-sm max-h-[85vh] overflow-y-auto scrollbar-hide relative">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                        <Bot className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">Talk to an Expert</h3>
                        <p className="text-xs text-gray-400">Live AI Voice Assistant</p>
                    </div>
                </div>

                {status === "error" && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-500 text-sm p-3 rounded-lg mb-4">
                        {errorMsg}
                    </div>
                )}

                <form onSubmit={handleConnect} className="space-y-4">
                    <div>
                        <label className="block text-xs text-gray-400 mb-1">Email (Required for spam protection)</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary text-sm"
                            placeholder="your@email.com"
                        />
                    </div>
                    <div className="flex gap-3">
                        {onClose && (
                            <button type="button" onClick={onClose} className="w-full bg-white/10 text-white font-bold py-3 rounded-xl hover:bg-white/20 transition">
                                Cancel
                            </button>
                        )}
                        <button type="submit" className="w-full bg-primary text-black font-bold py-3 rounded-xl hover:bg-primary/90 transition flex items-center justify-center gap-2">
                            <Play className="w-4 h-4" /> Start Call
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-xs text-gray-400 text-center space-y-2">
                    <p><span className="text-primary font-bold">💡 Pro Tip:</span> Say "Transfer to human" at any time to connect with a live agent.</p>
                    <p>🔒 Your email is never recorded or shared without your permission.</p>
                    <p>📅 You can also ask the bot to book an appointment with our team.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-dark-bg p-6 sm:p-8 rounded-3xl border border-primary/50 shadow-[0_0_30px_rgba(220,231,53,0.15)] w-full max-w-sm max-h-[85vh] overflow-y-auto scrollbar-hide relative">
            <div className="flex flex-col items-center mb-8">
                <div className="relative mb-4">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center ${status === "speaking" ? "bg-primary animate-pulse" : "bg-white/10"}`}>
                        <Bot className={`w-10 h-10 ${status === "speaking" ? "text-black" : "text-white"}`} />
                    </div>
                    {status === "connecting" && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="w-8 h-8 text-primary animate-spin" />
                        </div>
                    )}
                </div>

                <h3 className="font-bold text-lg text-center">
                    {status === "connecting" && "Please wait while we connect to Agent..."}
                    {status === "connected" && "Please wait while we connect to Agent..."}
                    {status === "speaking" && "Agent is listening & speaking"}
                </h3>

                <p className="text-sm text-gray-400 mt-2 text-center">
                    This call is secured via Pipecat and restricted to a 3-minute hard timer.
                </p>
            </div>

            <div className="flex justify-center gap-6">
                <button
                    onClick={toggleMic}
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition ${isMuted ? "bg-red-500/20 text-red-500 hover:bg-red-500/30" : "bg-white/10 hover:bg-white/20 text-white"}`}
                >
                    {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                </button>

                <button
                    onClick={handleDisconnect}
                    className="w-14 h-14 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                >
                    <PhoneOff className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
}
