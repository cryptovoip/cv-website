"use client";

import { useState, useCallback, useEffect, useRef, type FormEvent } from "react";
import { RTVIClient, RTVIEvent } from "realtime-ai";
import { DailyTransport } from "realtime-ai-daily";
import {
    RTVIClientProvider,
    RTVIClientAudio,
    useRTVIClient,
    useRTVIClientEvent,
} from "realtime-ai-react";
import { Mic, MicOff, PhoneOff, Loader2, Bot, Play, Radio } from "lucide-react";

const BOT_BACKEND_URL =
    process.env.NEXT_PUBLIC_BOT_BACKEND_URL || "http://localhost:8000";

// Singleton RTVI client — one per page session.
const transport = new DailyTransport();
export const voiceClient = new RTVIClient({
    transport,
    params: {
        baseUrl: BOT_BACKEND_URL,
        endpoints: { connect: "/connect" },
    },
    enableMic: true,
    enableCam: false,
});

// ── Public wrapper ────────────────────────────────────────────────────────────
export function VoiceWidget({ onClose }: { onClose?: () => void }) {
    return (
        <RTVIClientProvider client={voiceClient}>
            <VoiceInterface onClose={onClose} />
            <RTVIClientAudio />
        </RTVIClientProvider>
    );
}

// ── Inner interface ───────────────────────────────────────────────────────────
type CallStatus = "idle" | "connecting" | "connected" | "active" | "error";

function VoiceInterface({ onClose }: { onClose?: () => void }) {
    const client = useRTVIClient();

    const [status, setStatus]   = useState<CallStatus>("idle");
    const [isMuted, setIsMuted] = useState(false);
    const [name, setName]       = useState("");
    const [email, setEmail]     = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const connectSound    = useRef<HTMLAudioElement | null>(null);
    const disconnectSound = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        connectSound.current    = new Audio("/connect.wav");
        disconnectSound.current = new Audio("/disconnect.wav");
    }, []);

    // ── RTVI event bindings ───────────────────────────────────────────────────
    useRTVIClientEvent(RTVIEvent.Connected,    () => setStatus("connected"));
    useRTVIClientEvent(RTVIEvent.BotConnected, () => setStatus("active"));
    useRTVIClientEvent(RTVIEvent.BotDisconnected, () => setStatus("connected"));
    useRTVIClientEvent(RTVIEvent.Disconnected, () => {
        setStatus("idle");
        onClose?.();
    });

    // If a non-bot remote participant (the human SIP agent) leaves, close the widget.
    useRTVIClientEvent(RTVIEvent.ParticipantLeft, (participant: any) => {
        if (!participant?.local) {
            handleDisconnect();
        }
    });

    useRTVIClientEvent(RTVIEvent.Error, (msg: any) => {
        console.error("RTVI Error:", msg);
        setStatus("error");
        setErrorMsg(
            typeof msg === "string"
                ? msg
                : "Could not connect to the voice assistant. The server may be temporarily unavailable."
        );
    });

    // ── Disconnect on unmount ─────────────────────────────────────────────────
    useEffect(() => {
        return () => {
            if (client?.state !== "disconnected") client?.disconnect();
        };
    }, [client]);

    // ── Handlers ──────────────────────────────────────────────────────────────
    const handleConnect = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email) {
            setErrorMsg("Please enter your email to start the call.");
            return;
        }
        setErrorMsg("");
        setStatus("connecting");
        connectSound.current?.play().catch(() => null);

        try {
            if (client) {
                // Pass both name and email to the backend / bot context
                client.params = {
                    ...client.params,
                    requestData: { email, name: name || undefined },
                };
                await client.connect();
            }
        } catch (err) {
            console.error(err);
            setStatus("error");
            setErrorMsg("Failed to establish a WebRTC connection. Please try again.");
        }
    };

    const handleDisconnect = useCallback(() => {
        disconnectSound.current?.play().catch(() => null);
        client?.disconnect();
        setStatus("idle");
        onClose?.();
    }, [client, onClose]);

    const toggleMic = useCallback(() => {
        const next = !isMuted;
        client?.enableMic(!next);
        setIsMuted(next);
    }, [client, isMuted]);

    // ── Idle / error state — show start form ──────────────────────────────────
    if (status === "idle" || status === "error") {
        return (
            <div className="bg-dark-bg p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl w-full max-w-sm">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg leading-tight">Talk to an Expert</h3>
                        <p className="text-xs text-gray-400">AI Voice Assistant · CryptoVoIP Technologies</p>
                    </div>
                </div>

                {/* What the bot can do */}
                <div className="bg-white/4 border border-white/8 rounded-xl p-4 mb-5 space-y-1.5">
                    {[
                        "Answer questions about CV MDM, OpenNVR, Voice Agents, VoIP & Trainings",
                        "Transfer you instantly to a live human agent",
                        "Take your name + email or phone and book a callback from our team",
                    ].map((item) => (
                        <div key={item} className="flex items-start gap-2 text-xs text-gray-300">
                            <span className="text-primary mt-0.5">✓</span>
                            {item}
                        </div>
                    ))}
                </div>

                {/* Error banner */}
                {status === "error" && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-3 rounded-lg mb-4">
                        {errorMsg}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleConnect} className="space-y-3">
                    <div>
                        <label className="block text-xs text-gray-400 mb-1">Your name (optional)</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary text-sm placeholder-gray-600"
                            placeholder="e.g. Arjun Sharma"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-400 mb-1">
                            Email <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-primary text-sm placeholder-gray-600"
                            placeholder="you@company.com"
                        />
                        <p className="text-xs text-gray-600 mt-1">
                            Used to follow up if we get disconnected.
                        </p>
                    </div>

                    <div className="flex gap-3 pt-1">
                        {onClose && (
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 bg-white/8 text-white font-semibold py-3 rounded-xl hover:bg-white/15 transition text-sm"
                            >
                                Cancel
                            </button>
                        )}
                        <button
                            type="submit"
                            className="flex-1 bg-primary text-black font-bold py-3 rounded-xl hover:bg-primary/90 transition flex items-center justify-center gap-2 text-sm"
                        >
                            <Play className="w-4 h-4" /> Start Call
                        </button>
                    </div>
                </form>

                <p className="mt-4 text-xs text-gray-600 text-center">
                    🔒 Your details are never shared without your consent.
                </p>
            </div>
        );
    }

    // ── Active call states ────────────────────────────────────────────────────
    const statusLabel: Record<CallStatus, string> = {
        idle:       "",
        error:      "",
        connecting: "Connecting to your assistant…",
        connected:  "Connected — waiting for assistant…",
        active:     "Assistant is listening",
    };

    return (
        <div className="bg-dark-bg p-6 sm:p-8 rounded-3xl border border-primary/40 shadow-[0_0_30px_rgba(220,231,53,0.12)] w-full max-w-sm">
            {/* Avatar */}
            <div className="flex flex-col items-center mb-8">
                <div className="relative mb-5">
                    {/* Outer glow ring when active */}
                    {status === "active" && (
                        <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping" />
                    )}
                    <div
                        className={`w-20 h-20 rounded-full flex items-center justify-center transition-colors ${
                            status === "active"
                                ? "bg-primary shadow-[0_0_24px_rgba(220,231,53,0.4)]"
                                : "bg-white/8"
                        }`}
                    >
                        {status === "connecting" ? (
                            <Loader2 className="w-9 h-9 text-primary animate-spin" />
                        ) : status === "active" ? (
                            <Radio className="w-9 h-9 text-black" />
                        ) : (
                            <Bot className="w-9 h-9 text-white" />
                        )}
                    </div>
                </div>

                <h3 className="font-bold text-base text-center text-white">
                    {statusLabel[status]}
                </h3>

                {status === "active" && (
                    <p className="text-xs text-gray-500 mt-2 text-center">
                        Say "transfer me to a human" at any time to speak with our team.
                    </p>
                )}
                {status === "connecting" && (
                    <p className="text-xs text-gray-500 mt-2 text-center">
                        Setting up your secure WebRTC session…
                    </p>
                )}
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-6">
                <button
                    onClick={toggleMic}
                    disabled={status !== "active"}
                    title={isMuted ? "Unmute" : "Mute"}
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition disabled:opacity-40 ${
                        isMuted
                            ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                            : "bg-white/10 hover:bg-white/20 text-white"
                    }`}
                >
                    {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                </button>

                <button
                    onClick={handleDisconnect}
                    title="End call"
                    className="w-14 h-14 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                >
                    <PhoneOff className="w-6 h-6" />
                </button>
            </div>

            {/* Footer note */}
            <p className="text-xs text-gray-600 text-center mt-6">
                CryptoVoIP Technologies · contact@cryptovoip.in
            </p>
        </div>
    );
}
