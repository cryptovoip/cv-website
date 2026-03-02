"use client";

import { motion } from "framer-motion";
import { Server, Settings, ShieldCheck, PenTool, LayoutTemplate, Briefcase, Smartphone, BrainCircuit, Activity } from "lucide-react";
import Link from "next/link";

export default function VoipWebRTC() {
    const technologies = [
        { icon: Server, title: "FreeSwitch, OpenSIPS & RTPEngine", desc: "Enterprise-grade scalable switching and robust SIP routing capable of handling thousands of concurrent sessions with absolute fault-tolerance and high-performance media proxying." },
        { icon: Smartphone, title: "Flexisip & Linphone Customization", desc: "Expert development and customization of Android and iOS mobile applications. Seamlessly supporting push notifications for highly optimized battery usage." },
        { icon: BrainCircuit, title: "AI Integration over SIP/WebRTC", desc: "Writing next-generation AI applications directly over your SIP and WebRTC infrastructure to automate workflows, reduce manual agent costs, and transcribe streams in real-time." },
        { icon: Activity, title: "Infra Monitoring & Cost Reduction", desc: "Complete infrastructure monitoring, automation, and measurable metrics. We consult and collaborate to dramatically reduce infrastructure costs and improve service reliability." }
    ];

    return (
        <div className="flex flex-col items-center">
            <section className="w-full pt-20 pb-16 bg-gradient-to-b from-dark-bg to-dark-nav relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary border border-primary/30 text-xs font-bold mb-6 tracking-widest uppercase">
                            20+ Years Industry Experts
                        </span>
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
                            Expert <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-400">VoIP & WebRTC</span> Development
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-light leading-relaxed mb-6">
                            Win with the deep expertise we carry in this domain. We design, build, and deploy next-generation AI-enabled communication platforms.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {technologies.map((tech, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 rounded-3xl bg-dark-bg border border-white/10 hover:border-primary/50 transition-colors group"
                        >
                            <tech.icon className="w-12 h-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-2xl font-bold mb-3">{tech.title}</h3>
                            <p className="text-gray-400 leading-relaxed text-lg">{tech.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="w-full bg-primary py-20 mt-12">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-black mb-6">Speak around our portfolio</h2>
                    <p className="text-black/70 text-lg mb-10">Demos can be quickly deployed to prove our concepts. Let's collaborate to reduce your costs, integrate modern AI over your SIP trunks, and skyrocket performance telemetry.</p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-900 transition transform hover:scale-105 shadow-[0_0_20px_rgba(0,0,0,0.2)]"
                    >
                        Book a Call
                        <Briefcase className="w-5 h-5 text-primary" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
