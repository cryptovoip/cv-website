"use client";

import { motion } from "framer-motion";
import {
    ShieldAlert, BrainCircuit, ExternalLink, Code, Terminal, Lock,
    Video, Database, CheckCircle2, Server, Globe, Shield,
    Camera, Eye, Cpu, Cloud, Zap, HardDrive, Users, ArrowRight,
    Fingerprint, Activity, Webhook, Bell, FileText, Layers,
    ScanFace, Radio, RefreshCw, CloudOff, WifiOff, Package
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const corePillars = [
    {
        icon: BrainCircuit,
        title: "AI-First Architecture",
        desc: "YOLOv11, InsightFace, BLIP, OWL-ViT built in. Access 100,000+ Hugging Face models. Plug any PyTorch or ONNX model in 30 minutes."
    },
    {
        icon: Shield,
        title: "Zero-Trust Security",
        desc: "Cameras on non-routable VLANs, integrated Suricata IDS, JWT-authenticated streams, AES-256 encrypted credential vault."
    },
    {
        icon: CloudOff,
        title: "Offline-First Edge",
        desc: "Full operation without cloud connectivity. All AI inference, recording, and access control runs locally on your hardware."
    },
    {
        icon: Package,
        title: "100% Open Source",
        desc: "AGPL v3 licensed. Full source transparency, no hidden telemetry, no vendor lock-in. Deploy on your infrastructure forever."
    }
];

const coreFeatures = [
    {
        icon: Camera,
        title: "Universal Camera Support",
        desc: "Full ONVIF discovery, RTSP ingestion, automatic credential encryption, and PTZ control. Tested with 100+ simultaneous streams including Hikvision and all ONVIF-compliant devices."
    },
    {
        icon: BrainCircuit,
        title: "Edge AI Inference Engine",
        desc: "Dedicated KAI-C orchestration layer runs YOLOv8 person detection, YOLOv11 person counting, InsightFace biometrics, BLIP scene description, and OWL-ViT zero-shot detection — entirely on-device."
    },
    {
        icon: Shield,
        title: "Integrated Suricata IDS",
        desc: "Built-in network intrusion detection scans all internal traffic. Detects malware lateral movement, unauthorized scanning, and camera exploit attempts in real time."
    },
    {
        icon: Video,
        title: "Hardware-Accelerated Streaming",
        desc: "MediaMTX powers WebRTC (sub-100ms LAN latency) and HLS output with automatic multi-relay scaling for poor-network conditions. NVIDIA GPU acceleration supported."
    },
    {
        icon: HardDrive,
        title: "Flexible Recording & Storage",
        desc: "Continuous, scheduled, and AI-triggered recording. S3-compatible cloud storage, configurable retention policies, segment-based indexing, and multi-day timeline playback."
    },
    {
        icon: Lock,
        title: "Zero-Trust Network Architecture",
        desc: "Cameras isolated on non-routable VLANs — hardware feeds are mathematically unreachable from the public internet. JWT JWKS endpoint validates every stream token at the media layer."
    },
    {
        icon: Users,
        title: "Granular RBAC & Audit",
        desc: "Admin, Operator, and Viewer roles with per-camera permission matrices. Mandatory MFA, automated JWT rotation, and complete audit logs exportable to CSV for compliance."
    },
    {
        icon: Layers,
        title: "Modular Plugin Architecture",
        desc: "AI engine and video server are fully decoupled — a crashing AI model never drops a camera stream. Disable 100 models: zero memory overhead. Lazy-load only what you use."
    },
    {
        icon: Cloud,
        title: "Cloud AI Overflow",
        desc: "One-parameter switch sends inference to Hugging Face Inference API when local compute is saturated. Per-user call quotas and circuit breakers prevent runaway costs."
    }
];

const aiModels = [
    {
        name: "YOLOv8",
        task: "Person Detection",
        backend: "ONNX Runtime",
        speed: "~50ms CPU / <30ms GPU",
        color: "blue"
    },
    {
        name: "YOLOv11",
        task: "Person Counting",
        backend: "PyTorch",
        speed: "Higher accuracy",
        color: "purple"
    },
    {
        name: "InsightFace",
        task: "Face Recognition & Biometrics",
        backend: "Buffalo-L model",
        speed: "~100ms CPU / <50ms GPU",
        color: "primary"
    },
    {
        name: "BLIP",
        task: "Scene Description",
        backend: "Salesforce BLIP",
        speed: "~1.5s CPU / ~500ms GPU",
        color: "green"
    },
    {
        name: "OWL-ViT",
        task: "Zero-Shot Object Detection",
        backend: "Hugging Face",
        speed: "Custom labels, no training",
        color: "orange"
    },
    {
        name: "Hugging Face API",
        task: "100,000+ Cloud Models",
        backend: "Inference API",
        speed: "On-demand cloud burst",
        color: "red"
    }
];

const securityFeatures = [
    { icon: WifiOff, title: "Non-Routable Camera VLANs", desc: "Camera networks have no routable path to the public internet. Hardware feeds are physically isolated from external access by design." },
    { icon: Shield, title: "Integrated Suricata IDS", desc: "Real-time intrusion detection scans internal network traffic for lateral movement, port scanning, and known exploit signatures." },
    { icon: Lock, title: "AES-256 Credential Vault", desc: "All camera passwords, API keys, and secrets encrypted at rest. Separate CREDENTIAL_ENCRYPTION_KEY never stored alongside data." },
    { icon: Fingerprint, title: "JWT Stream Authentication", desc: "Every RTSP/WebRTC/HLS stream requires a signed JWT. MediaMTX validates tokens via the backend JWKS endpoint — no token, no stream." },
    { icon: Users, title: "Per-Camera RBAC", desc: "Permissions are granted at the camera level per user action: view, record, configure, delete. Viewer accounts cannot affect recordings." },
    { icon: Activity, title: "MFA & Audit Logging", desc: "Mandatory TOTP-based MFA for all admin accounts. Every action — login, config change, recording access — is logged with IP and user-agent." },
    { icon: FileText, title: "Compliance Reports", desc: "Recording coverage by camera and date, system uptime statistics, user access history — all exportable to CSV for ISO 27001 / GDPR audits." },
    { icon: RefreshCw, title: "Automated JWT Rotation", desc: "Stream authentication tokens rotate automatically. Stale tokens from captured traffic cannot be replayed to access live streams." }
];

const integrations = [
    { icon: Bell, name: "Slack", desc: "Detection event alerts to channels" },
    { icon: Bell, name: "Microsoft Teams", desc: "Incident notifications to Teams" },
    { icon: Webhook, name: "Webhooks", desc: "Generic HTTP POST for any event" },
    { icon: Radio, name: "MQTT", desc: "Publish detection events to broker" },
    { icon: Cloud, name: "S3 / MinIO", desc: "Cloud recording storage upload" },
    { icon: Activity, name: "Prometheus", desc: "Metrics export for monitoring" },
    { icon: Server, name: "Syslog", desc: "System event forwarding" },
    { icon: FileText, name: "Email / SMTP", desc: "Alerting and compliance reports" }
];

const deploymentSpecs = [
    {
        icon: Server,
        title: "Minimum (1–5 cameras)",
        items: ["4-core CPU", "8 GB RAM", "1 TB storage", "Docker Compose", "No GPU required"]
    },
    {
        icon: Cpu,
        title: "Recommended (10–20 cameras + AI)",
        items: ["6+ core CPU", "16 GB RAM", "1 TB+ SSD", "NVIDIA RTX 4060+", "Docker Compose / K8s"]
    },
    {
        icon: Globe,
        title: "Enterprise (100+ cameras)",
        items: ["16+ core / dual-socket", "32–64 GB RAM", "NAS or S3 (10 TB+)", "Multi NVIDIA A100/H100", "Kubernetes cluster"]
    },
    {
        icon: Cloud,
        title: "Tech Stack",
        items: ["Backend: Python 3.11 + FastAPI", "Frontend: React + Vite + Tailwind", "Media: MediaMTX (WebRTC/HLS)", "AI: KAI-C + Adapter microservice", "DB: PostgreSQL 15 + Alembic"]
    }
];

const colorMap: Record<string, string> = {
    blue: "bg-blue-500/10 border-blue-500/20 text-blue-400",
    purple: "bg-purple-500/10 border-purple-500/20 text-purple-400",
    primary: "bg-primary/10 border-primary/20 text-primary",
    green: "bg-green-500/10 border-green-500/20 text-green-400",
    orange: "bg-orange-500/10 border-orange-500/20 text-orange-400",
    red: "bg-red-500/10 border-red-500/20 text-red-400"
};

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */

export default function Solutions() {
    const [activeAiTab, setActiveAiTab] = useState(0);

    return (
        <div className="flex flex-col items-center bg-dark-bg min-h-screen text-gray-300">

            {/* ── Hero ── */}
            <section className="w-full pt-24 pb-16 bg-gradient-to-b from-[#050C17] to-dark-bg relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 blur-[150px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none" />
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary border border-primary/30 text-xs font-bold mb-6 tracking-widest uppercase">
                            Open Source · AGPL v3 · CryptoVoIP Technologies
                        </span>
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <Eye className="w-8 h-8 text-primary" />
                            <h1 className="text-5xl md:text-7xl font-extrabold text-white">OpenNVR</h1>
                        </div>
                        <p className="text-xl md:text-2xl font-light text-primary mb-6">
                            Bring AI to the Edge. Own Your Security. Deploy Anywhere.
                        </p>
                        <p className="text-lg max-w-3xl mx-auto font-light leading-relaxed mb-8 text-gray-300">
                            An AI-powered, zero-trust network video recorder with integrated intrusion detection, edge inference, and hardware-accelerated streaming — built for critical infrastructure, research, and enterprise surveillance.
                        </p>

                        <div className="flex flex-wrap justify-center gap-3 mb-10 text-xs font-mono text-gray-400">
                            {["Python 3.11", "FastAPI", "React + Vite", "MediaMTX", "PostgreSQL", "YOLOv11", "InsightFace", "AGPL v3"].map(tag => (
                                <span key={tag} className="px-3 py-1 bg-white/5 rounded-md border border-white/10">{tag}</span>
                            ))}
                        </div>

                        <div className="flex flex-wrap justify-center gap-4">
                            <a href="https://opennvr.org/" target="_blank" rel="noopener noreferrer"
                                className="px-7 py-3.5 rounded-full bg-primary text-black font-bold hover:bg-primary/90 transition shadow-[0_0_20px_rgba(220,231,53,0.3)] flex items-center gap-2">
                                <Globe className="w-4 h-4" /> Visit opennvr.org
                            </a>
                            <a href="https://zenodo.org/records/17261761" target="_blank" rel="noopener noreferrer"
                                className="px-7 py-3.5 rounded-full bg-white/10 text-white font-bold hover:bg-white/20 transition border border-white/20 flex items-center gap-2">
                                <ExternalLink className="w-4 h-4 text-gray-400" /> Read the Research
                            </a>
                            <Link href="/contact"
                                className="px-7 py-3.5 rounded-full bg-white/5 text-white font-bold hover:bg-white/10 transition border border-white/10 flex items-center gap-2">
                                Contact Sales
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Four Pillars ── */}
            <section className="w-full bg-dark-nav border-b border-white/10 py-14">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {corePillars.map((p, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                                className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 hover:border-primary/40 transition-all group">
                                <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <p.icon className="w-5 h-5 text-primary" />
                                </div>
                                <h3 className="text-white font-bold text-base mb-2">{p.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Core Capabilities ── */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
                <div className="text-center mb-14">
                    <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary border border-primary/30 text-xs font-bold mb-4 tracking-widest uppercase">
                        Platform Capabilities
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-5">
                        Not Just an NVR.<br />A Security Intelligence Platform.
                    </h2>
                    <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
                        OpenNVR combines professional network video recording, real-time AI inference, zero-trust networking, and compliance tooling into a single self-hosted platform.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                    {coreFeatures.map((feat, i) => (
                        <motion.div key={i}
                            initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                            className="bg-white/[0.03] border border-white/10 rounded-3xl p-7 hover:border-primary/40 hover:bg-white/[0.05] transition-all group">
                            <div className="w-13 h-13 w-12 h-12 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                                <feat.icon className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-white font-bold text-lg mb-3 leading-tight">{feat.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{feat.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── AI Capabilities ── */}
            <section className="w-full bg-dark-nav border-y border-white/10 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <span className="inline-block py-1 px-3 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-bold mb-4 tracking-widest uppercase">
                            AI Inference Engine
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-5">
                            100,000+ Models.<br />Zero Vendor Lock-In.
                        </h2>
                        <p className="text-gray-400 max-w-3xl mx-auto text-lg">
                            OpenNVR ships with a built-in suite of production-ready AI models and connects to the entire Hugging Face ecosystem. Run everything locally, burst to cloud, or both.
                        </p>
                    </div>

                    {/* Edge vs Cloud toggle */}
                    <div className="flex justify-center gap-4 mb-10">
                        {["Edge AI Models", "Cloud & Extensibility"].map((label, i) => (
                            <button key={i} onClick={() => setActiveAiTab(i)}
                                className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all ${activeAiTab === i
                                    ? "bg-primary text-black"
                                    : "bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10"}`}>
                                {label}
                            </button>
                        ))}
                    </div>

                    {activeAiTab === 0 ? (
                        <motion.div key="edge" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {aiModels.slice(0, 5).map((m, i) => (
                                <div key={i} className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 hover:border-primary/30 transition-all">
                                    <div className={`inline-flex px-3 py-1 rounded-full text-xs font-bold mb-4 border ${colorMap[m.color]}`}>
                                        {m.name}
                                    </div>
                                    <h3 className="text-white font-bold text-base mb-2">{m.task}</h3>
                                    <div className="space-y-1 text-xs text-gray-500">
                                        <p><span className="text-gray-400">Backend:</span> {m.backend}</p>
                                        <p><span className="text-gray-400">Speed:</span> {m.speed}</p>
                                    </div>
                                </div>
                            ))}
                            <div className="bg-primary/5 border border-primary/20 rounded-3xl p-6 flex flex-col justify-between">
                                <div>
                                    <div className="inline-flex px-3 py-1 rounded-full text-xs font-bold mb-4 border bg-primary/10 border-primary/20 text-primary">
                                        BYOM
                                    </div>
                                    <h3 className="text-white font-bold text-base mb-2">Bring Your Own Model</h3>
                                    <p className="text-gray-400 text-xs leading-relaxed">Plug any PyTorch, ONNX, or REST-based model in under 30 minutes using the BaseAdapter interface.</p>
                                </div>
                                <a href="https://opennvr.org/" target="_blank" rel="noopener noreferrer"
                                    className="mt-4 text-primary text-xs font-bold flex items-center gap-1 hover:gap-2 transition-all">
                                    See adapter guide <ArrowRight className="w-3 h-3" />
                                </a>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div key="cloud" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-7">
                                    <Cloud className="w-7 h-7 text-blue-400 mb-4" />
                                    <h3 className="text-white font-bold text-xl mb-3">Hugging Face Inference API</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed mb-4">Connect your Hugging Face API token and immediately access 100,000+ models — image classification, vision-language models, object detection, segmentation, and more.</p>
                                    <ul className="space-y-2">
                                        {["One-parameter switch: edge → cloud", "Per-user quota limits & circuit breakers", "Async inference jobs for batch processing", "Results stored and indexed in your database"].map((item, i) => (
                                            <li key={i} className="flex items-start gap-2 text-gray-400 text-xs">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />{item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-7">
                                    <BrainCircuit className="w-7 h-7 text-purple-400 mb-4" />
                                    <h3 className="text-white font-bold text-xl mb-3">KAI-C Orchestration Layer</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed mb-4">KAI-C (Kavach AI Connector) is the middleware that routes requests, normalises responses, and ensures the backend never directly exposes adapter endpoints.</p>
                                    <ul className="space-y-2">
                                        {["Task-based routing to correct adapter", "Response schema standardisation", "Error handling & automatic fallback", "Health monitoring of all adapters"].map((item, i) => (
                                            <li key={i} className="flex items-start gap-2 text-gray-400 text-xs">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />{item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="bg-primary/5 border border-primary/20 rounded-3xl p-7 flex flex-col md:flex-row items-start md:items-center gap-6">
                                <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
                                    <Zap className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg mb-1">Crash-Proof AI Design</h3>
                                    <p className="text-gray-300 text-sm leading-relaxed">The AI adapter microservice runs as a separate process from the video server. If an experimental model crashes, throws an OOM error, or hangs — your cameras keep streaming. Zero coupling between inference and recording.</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* ── Security Architecture ── */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
                <div className="text-center mb-14">
                    <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-bold mb-4 tracking-widest uppercase">
                        <ShieldAlert className="w-4 h-4" /> Security Architecture
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-5">
                        Research-Backed.<br />Built to Neutralise Real Threats.
                    </h2>
                    <p className="text-gray-400 max-w-3xl mx-auto text-lg">
                        OpenNVR was developed as a direct response to critical vulnerabilities documented in commercial IP camera systems — exposed streams, weak auth, unencrypted credentials, and no intrusion detection.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                    {securityFeatures.map((feat, i) => (
                        <motion.div key={i}
                            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                            className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 hover:border-red-500/20 transition-all group">
                            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <feat.icon className="w-5 h-5 text-red-400" />
                            </div>
                            <h3 className="text-white font-bold text-sm mb-2">{feat.title}</h3>
                            <p className="text-gray-500 text-xs leading-relaxed">{feat.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-7">
                    <h3 className="text-white font-bold text-lg mb-5">Threats Directly Mitigated</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                            "Direct internet exposure of camera feeds",
                            "Weak or default camera credentials",
                            "Unencrypted credential storage",
                            "Firmware exploit lateral movement",
                            "Man-in-the-middle on RTSP streams",
                            "Unauthorised stream access without token",
                            "Privilege escalation via missing RBAC",
                            "Undetected network reconnaissance",
                            "Compliance failure from missing audit trail"
                        ].map((threat, i) => (
                            <div key={i} className="flex items-start gap-3 bg-white/[0.02] rounded-2xl px-4 py-3 border border-white/5">
                                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                <span className="text-gray-400 text-sm">{threat}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Camera Management ── */}
            <section className="w-full bg-dark-nav border-y border-white/10 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary border border-primary/30 text-xs font-bold mb-4 tracking-widest uppercase">
                                Camera Management
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                                Any Camera. Any Protocol.<br />Full Control.
                            </h2>
                            <p className="text-gray-400 leading-relaxed mb-6">
                                OpenNVR discovers and connects to cameras automatically via ONVIF UDP broadcast, resolves RTSP URIs from media profiles, and encrypts all credentials in the vault the moment they are saved.
                            </p>
                            <ul className="space-y-3">
                                {[
                                    "ONVIF device discovery with UDP broadcast cache",
                                    "Automatic RTSP stream URI resolution from profiles",
                                    "Hikvision HTTP Digest + WS-Security dual auth support",
                                    "Pan-Tilt-Zoom control with preset save / load / delete",
                                    "100+ simultaneous streams tested",
                                    "Main stream (high quality) + substream (low bandwidth) per camera",
                                    "Real-time online / offline / degraded status with streaming validation",
                                    "VLAN isolation — cameras on non-routable segments by design"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-400 text-sm">
                                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />{item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                            className="space-y-4">
                            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6">
                                <Video className="w-6 h-6 text-primary mb-3" />
                                <h3 className="text-white font-bold mb-2">Streaming Protocols</h3>
                                <div className="flex flex-wrap gap-2">
                                    {["RTSP Input", "RTMP Input", "WebRTC Output", "HLS (fMP4)", "STUN/TURN Support", "H.264", "H.265", "VP8", "VP9", "AV1"].map(tag => (
                                        <span key={tag} className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10 text-gray-400 text-xs font-mono">{tag}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6">
                                <HardDrive className="w-6 h-6 text-primary mb-3" />
                                <h3 className="text-white font-bold mb-2">Recording Modes</h3>
                                <div className="space-y-2">
                                    {[
                                        { mode: "Continuous", desc: "24/7 recording with segment-based storage" },
                                        { mode: "Scheduled", desc: "Hourly, daily, and weekly time-window policies" },
                                        { mode: "AI-Triggered", desc: "Record only on person detection or custom AI events" },
                                        { mode: "Cloud Sync", desc: "S3-compatible upload with configurable retention" }
                                    ].map((r, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                            <div>
                                                <span className="text-white text-sm font-semibold">{r.mode}: </span>
                                                <span className="text-gray-400 text-sm">{r.desc}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6">
                                <Activity className="w-6 h-6 text-primary mb-3" />
                                <h3 className="text-white font-bold mb-3">Performance</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { val: "100+", label: "Concurrent streams" },
                                        { val: "<100ms", label: "WebRTC LAN latency" },
                                        { val: "~30ms", label: "YOLOv8 GPU inference" },
                                        { val: "~1 GB", label: "Per camera per day" }
                                    ].map((s, i) => (
                                        <div key={i} className="bg-white/5 rounded-xl p-3 text-center">
                                            <p className="text-primary font-black text-xl">{s.val}</p>
                                            <p className="text-gray-500 text-xs">{s.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── BYOM Code Section ── */}
            <section className="max-w-6xl mx-auto px-4 py-20 w-full">
                <div className="mb-12">
                    <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary border border-primary/30 text-xs font-bold mb-4 tracking-widest uppercase">
                        Developer Experience
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Bring Your Own AI Model — In 30 Minutes
                    </h2>
                    <p className="text-lg text-gray-400 max-w-3xl">
                        The AI Adapter clean architecture makes it trivial to plug any model — HuggingFace, your own research, or a commercial vendor API — without touching core routing logic.
                    </p>
                </div>

                <div className="space-y-6">
                    <div className="bg-[#0D1117] rounded-2xl border border-white/10 overflow-hidden">
                        <div className="bg-white/5 px-6 py-3 border-b border-white/10 font-mono text-sm text-gray-300 flex items-center gap-2">
                            <Code className="w-4 h-4 text-primary" /> Step 1 — Create your adapter (your_model_adapter.py)
                        </div>
                        <pre className="p-6 text-sm text-green-400 overflow-x-auto leading-relaxed">{`from .base_adapter import BaseAdapter
import onnxruntime as ort

class YourModelAdapter(BaseAdapter):
    def __init__(self, model_path: str):
        super().__init__(model_path)
        self.session = ort.InferenceSession(model_path)

    def get_supported_tasks(self):
        return ["your_custom_task"]

    def infer_local(self, task, input_data):
        frame = self.load_image(input_data["frame"]["uri"])
        result = self._run_model(frame)
        return {"detections": result}`}</pre>
                    </div>

                    <div className="bg-[#0D1117] rounded-2xl border border-white/10 overflow-hidden">
                        <div className="bg-white/5 px-6 py-3 border-b border-white/10 font-mono text-sm text-gray-300 flex items-center gap-2">
                            <Code className="w-4 h-4 text-blue-400" /> Step 2 — Register in config.py (no FastAPI changes needed)
                        </div>
                        <pre className="p-6 text-sm text-blue-400 overflow-x-auto leading-relaxed">{`CONFIG = {
    "adapters": {
        "your_model_adapter": {
            "enabled": True,
            "weights_path": "weights/your_model.onnx"
        }
    },
    "routing": {
        "your_custom_task": "your_model_adapter"
    },
    "warmup": ["your_model_adapter"]   # pre-load on startup
}`}</pre>
                    </div>

                    <div className="bg-[#0D1117] rounded-2xl border border-white/10 overflow-hidden">
                        <div className="bg-white/5 px-6 py-3 border-b border-white/10 font-mono text-sm text-gray-300 flex items-center gap-2">
                            <Terminal className="w-4 h-4 text-yellow-400" /> Step 3 — Test & deploy
                        </div>
                        <pre className="p-6 text-sm text-yellow-300 overflow-x-auto leading-relaxed">{`# Start the AI adapter microservice
uvicorn adapter.main:app --reload --port 9100

# Test inference
curl -X POST http://localhost:9100/infer \\
  -H "Content-Type: application/json" \\
  -d '{
    "task": "your_custom_task",
    "input": {"frame": {"uri": "kavach://frames/camera_0/latest.jpg"}}
  }'`}</pre>
                    </div>
                </div>
            </section>

            {/* ── Integrations ── */}
            <section className="w-full bg-dark-nav border-y border-white/10 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary border border-primary/30 text-xs font-bold mb-4 tracking-widest uppercase">
                            Integrations
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Fits Into Your Existing Stack
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            OpenNVR ships with native integrations for alerting, cloud storage, metrics, and messaging — no middleware required.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {integrations.map((int, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                                className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 hover:border-primary/30 transition-all text-center group">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                    <int.icon className="w-5 h-5 text-primary" />
                                </div>
                                <p className="text-white font-bold text-sm mb-1">{int.name}</p>
                                <p className="text-gray-500 text-xs">{int.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Deployment & Stack ── */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
                <div className="text-center mb-14">
                    <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary border border-primary/30 text-xs font-bold mb-4 tracking-widest uppercase">
                        Deployment
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        From Home Lab to Enterprise Cluster
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Docker Compose for single-node deployments. Kubernetes-ready for horizontal scaling. S3-backed storage for unlimited retention.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {deploymentSpecs.map((spec, i) => (
                        <motion.div key={i}
                            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                            className="bg-white/[0.03] border border-white/10 rounded-3xl p-6">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                                <spec.icon className="w-5 h-5 text-primary" />
                            </div>
                            <h3 className="text-white font-bold text-sm mb-4">{spec.title}</h3>
                            <ul className="space-y-2">
                                {spec.items.map((item, j) => (
                                    <li key={j} className="flex items-start gap-2 text-gray-400 text-xs">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />{item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* Docker quickstart */}
                <div className="bg-primary/5 border border-primary/20 rounded-3xl p-8">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 className="text-white font-bold text-2xl mb-3">2-Minute Docker Quick Start</h3>
                            <p className="text-gray-400 mb-4">Everything runs in Docker. One command spins up the API, frontend, database, AI adapter, and media server.</p>
                            <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                                {["Docker Compose", "Kubernetes", "AWS / GCP / Azure", "Bare Metal"].map(t => (
                                    <span key={t} className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-primary" />{t}</span>
                                ))}
                            </div>
                        </div>
                        <div className="bg-[#0D1117] rounded-2xl border border-white/10 overflow-hidden">
                            <div className="bg-white/5 px-5 py-2.5 border-b border-white/10 font-mono text-xs text-gray-400">
                                terminal
                            </div>
                            <pre className="p-5 text-sm text-gray-300 font-mono leading-relaxed">
{`# 1. Copy environment defaults
cp .env.docker .env

# 2. Start all services
docker compose up -d

# 3. Open in browser
`}<span className="text-primary">http://localhost:8000</span>{`
# admin / SecurePass123!`}
                            </pre>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="w-full bg-primary py-24">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-5xl font-black text-black mb-6 leading-tight">
                        Own Your Surveillance Infrastructure.<br />No Subscriptions. No Vendor Cloud.
                    </h2>
                    <p className="text-black/70 text-lg mb-10 font-medium max-w-2xl mx-auto">
                        OpenNVR is fully open source, self-hosted, and built for environments where security and data sovereignty are non-negotiable.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a href="https://opennvr.org/" target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-900 transition transform hover:scale-105">
                            Explore Full Documentation
                            <ArrowRight className="w-5 h-5 text-primary" />
                        </a>
                        <a href="https://zenodo.org/records/17261761" target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-white/20 text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-white/30 transition border border-black/10">
                            <ExternalLink className="w-5 h-5" /> Read the Research Paper
                        </a>
                    </div>
                </div>
            </section>

        </div>
    );
}
