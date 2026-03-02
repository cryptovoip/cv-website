"use client";

import { motion } from "framer-motion";
import {
    ShieldAlert, Network, BrainCircuit, ExternalLink, Code,
    Terminal, Lock, Video, Database, CheckCircle2, Server, Globe
} from "lucide-react";
import Link from "next/link";

export default function Solutions() {
    return (
        <div className="flex flex-col items-center bg-dark-bg min-h-screen text-gray-300">
            {/* Hero Section */}
            <section className="w-full pt-28 pb-20 bg-gradient-to-b from-[#050C17] to-dark-bg relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 blur-[150px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"></div>

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <ShieldAlert className="w-8 h-8 text-primary" />
                            <h1 className="text-5xl md:text-7xl font-extrabold text-white">OpenNVR</h1>
                        </div>
                        <h2 className="text-xl md:text-2xl font-light text-primary mb-6 max-w-2xl mx-auto">AI-Powered, Security-First Video Surveillance Platform</h2>

                        <div className="flex flex-wrap justify-center gap-3 mb-8 text-sm font-mono text-gray-400">
                            <span className="px-3 py-1 bg-white/5 rounded-md border border-white/10">License: MIT</span>
                            <span className="px-3 py-1 bg-white/5 rounded-md border border-white/10">Python 3.11</span>
                            <span className="px-3 py-1 bg-white/5 rounded-md border border-white/10">FastAPI</span>
                            <span className="px-3 py-1 bg-white/5 rounded-md border border-white/10">React</span>
                        </div>

                        <p className="text-xl max-w-3xl mx-auto font-light leading-relaxed mb-10 text-white">
                            Bring AI to the Edge. Own Your Security. Deploy Anywhere.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <a href="https://opennvr.org/" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-full bg-primary text-black font-bold hover:bg-primary/90 transition shadow-lg flex items-center gap-2">
                                <Globe className="w-4 h-4" /> Visit opennvr.org
                            </a>
                            <a href="https://zenodo.org/records/17261761" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-full bg-white/10 text-white font-bold hover:bg-white/20 transition border border-white/20 flex items-center gap-2">
                                <ExternalLink className="w-4 h-4 text-gray-400" /> Read Research
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* What Makes OpenNVR Different? */}
            <section className="max-w-6xl mx-auto px-4 py-16 w-full">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">What Makes OpenNVR Different?</h2>
                    <p className="text-lg text-gray-400 max-w-4xl mx-auto">
                        OpenNVR is not just another NVR system. It's a research-backed, AI-first surveillance platform designed from the ground up to neutralize vulnerabilities found in traditional IP camera systems while enabling cutting-edge AI capabilities at the edge, on-premises, and in the cloud.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/30 transition-colors">
                        <BrainCircuit className="w-10 h-10 text-primary mb-6" />
                        <h3 className="text-2xl font-bold text-white mb-4">AI Adapters: Plug & Play Any Model</h3>
                        <ul className="space-y-3 text-gray-400">
                            <li><strong className="text-gray-200">Bring Your Own Model (BYOM):</strong> Deploy YOLOv11, TensorFlow, PyTorch, or custom models.</li>
                            <li><strong className="text-gray-200">HuggingFace Integration:</strong> Access thousands of models with a single API token.</li>
                            <li><strong className="text-gray-200">Multi-Tier Inference:</strong> Run AI on edge devices, local servers, or offload to cloud.</li>
                            <li><strong className="text-gray-200">Zero Vendor Lock-in:</strong> Switch models without changing a single line of code.</li>
                        </ul>
                    </div>

                    <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/30 transition-colors">
                        <Lock className="w-10 h-10 text-primary mb-6" />
                        <h3 className="text-2xl font-bold text-white mb-4">Offline-First Security Architecture</h3>
                        <ul className="space-y-3 text-gray-400">
                            <li><strong className="text-gray-200">Air-Gapped Cameras:</strong> Isolate cameras on non-routable VLANs.</li>
                            <li><strong className="text-gray-200">Zero-Trust Auth:</strong> MFA, JWT-based access control, granular RBAC.</li>
                            <li><strong className="text-gray-200">Encrypted Vault:</strong> AES-256 encryption for API keys and passwords.</li>
                            <li><strong className="text-gray-200">Autonomous Operation:</strong> Works completely offline—no internet dependency.</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Research Backed Security */}
            <section className="w-full bg-black/40 py-16 border-y border-white/5">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-white mb-8">Research-Backed IP Camera Security</h2>
                    <p className="mb-8 text-lg">
                        OpenNVR was developed as an open-source response to critical security vulnerabilities identified in commercial IP camera systems. Our architecture directly mitigates:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {["Direct Internet Exposure: Cameras never touch public internet", "Weak Authentication: Enterprise-grade MFA", "Unencrypted Credentials: AES-256 Vault", "Firmware Exploits: Isolated network segments", "Man-in-the-Middle: TLS validation"].map((item, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bring Your Own AI Module */}
            <section className="max-w-6xl mx-auto px-4 py-20 w-full">
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-white mb-4">🤝 Bring Your Own AI Model</h2>
                    <p className="text-lg text-gray-400 max-w-4xl">
                        OpenNVR's AI Adapter architecture makes it trivial to integrate any AI model—whether from HuggingFace, your research, or a commercial vendor. Here is how simple it is to write an AI adapter.
                    </p>
                </div>

                <div className="space-y-12">
                    <div className="bg-[#0D1117] rounded-xl border border-white/10 overflow-hidden">
                        <div className="bg-white/5 px-6 py-3 border-b border-white/10 font-mono text-sm text-gray-300 flex items-center gap-2">
                            <Code className="w-4 h-4" /> Step 1: Create Model Handler (your_model_handler.py)
                        </div>
                        <pre className="p-6 text-sm text-green-400 overflow-x-auto">
                            {`from .base_handler import BaseModelHandler
import onnxruntime as ort

class YourModelHandler(BaseModelHandler):
    def __init__(self, model_path: str):
        super().__init__(model_path)
        self.session = ort.InferenceSession(model_path)
        
    def get_supported_tasks(self):
        return ["your_custom_task"]
    
    def infer(self, task, input_data):
        frame = load_image_from_uri(input_data["frame"]["uri"])
        result = self._run_model(frame)
        return {"detections": result}`}
                        </pre>
                    </div>

                    <div className="bg-[#0D1117] rounded-xl border border-white/10 overflow-hidden">
                        <div className="bg-white/5 px-6 py-3 border-b border-white/10 font-mono text-sm text-gray-300 flex items-center gap-2">
                            <Code className="w-4 h-4" /> Step 2: Register Handler (config.py)
                        </div>
                        <pre className="p-6 text-sm text-blue-400 overflow-x-auto">
                            {`MODEL_CONFIGS = {
    "your_model": {
        "path": "model_weights/your_model.onnx",
        "handler_class": "YourModelHandler"
    }
}

ENABLED_TASKS = {
    "your_custom_task": True
}`}
                        </pre>
                    </div>

                    <div className="bg-[#0D1117] rounded-xl border border-white/10 overflow-hidden">
                        <div className="bg-white/5 px-6 py-3 border-b border-white/10 font-mono text-sm text-gray-300 flex items-center gap-2">
                            <Terminal className="w-4 h-4" /> Step 3: Test & Deploy
                        </div>
                        <pre className="p-6 text-sm text-yellow-300 overflow-x-auto">
                            {`cd AI-adapters/AIAdapters
uvicorn adapter.main:app --reload --port 9100

# Test inference locally
curl -X POST http://localhost:9100/infer \\
  -H "Content-Type: application/json" \\
  -d '{
    "task": "your_custom_task",
    "input": {"frame": {"uri": "kavach://frames/camera_0/latest.jpg"}}
  }'`}
                        </pre>
                    </div>
                </div>
            </section>

            {/* Quick Start & Deployment */}
            <section className="w-full bg-primary/5 py-20 border-t border-white/10">
                <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">🚀 2-Minute Docker Quick Start</h2>
                        <p className="mb-6 text-gray-400">The fastest way to get OpenNVR running in production or development.</p>
                        <div className="bg-[#0D1117] rounded-xl p-6 font-mono text-sm text-gray-300 border border-white/10 leading-relaxed shadow-lg">
                            <span className="text-gray-500"># 1. Copy default environment file</span><br />
                            <span className="text-white">cp .env.docker .env</span><br /><br />
                            <span className="text-gray-500"># 2. Start all services</span><br />
                            <span className="text-white">docker compose up -d</span><br /><br />
                            <span className="text-gray-500"># 3. Access at http://localhost:8000</span><br />
                            <span className="text-primary"># Login: admin / SecurePass123!</span>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">💻 Architecture Stack</h2>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-4 bg-dark-bg p-4 rounded-xl border border-white/5 shadow-md"><Server className="text-primary w-6 h-6 shrink-0" /> <div><strong className="text-white">Core API:</strong> FastAPI + SQLAlchemy</div></li>
                            <li className="flex items-center gap-4 bg-dark-bg p-4 rounded-xl border border-white/5 shadow-md"><Video className="text-primary w-6 h-6 shrink-0" /> <div><strong className="text-white">Media Engine:</strong> MediaMTX (WebRTC/HLS)</div></li>
                            <li className="flex items-center gap-4 bg-dark-bg p-4 rounded-xl border border-white/5 shadow-md"><BrainCircuit className="text-primary w-6 h-6 shrink-0" /> <div><strong className="text-white">AI Orchestrator:</strong> Custom KAI-C Registry</div></li>
                            <li className="flex items-center gap-4 bg-dark-bg p-4 rounded-xl border border-white/5 shadow-md"><Database className="text-primary w-6 h-6 shrink-0" /> <div><strong className="text-white">Database:</strong> PostgreSQL</div></li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="w-full py-20 text-center">
                <h2 className="text-3xl font-bold text-white mb-6">Join the OpenNVR Community</h2>
                <div className="flex justify-center gap-4">
                    <a href="https://opennvr.org/" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-full bg-primary text-black font-bold text-lg hover:bg-primary/90 transition shadow-[0_0_20px_rgba(220,231,53,0.3)]">
                        Explore Full Documentation
                    </a>
                </div>
            </section>
        </div>
    );
}
