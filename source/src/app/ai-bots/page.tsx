"use client";

import { motion } from "framer-motion";
import { Mic, Video, Combine, Code, Activity, Bot } from "lucide-react";
import Link from "next/link";

export default function AIBots() {
    const benefits = [
        { icon: Combine, title: "Custom RAG & MCP Pipelines", desc: "We develop sophisticated Voice and Video Bots tightly integrated with Retrieval-Augmented Generation and Model Context Protocol servers to provide intelligent, contextual responses." },
        { icon: Code, title: "Powered by Pipecat", desc: "Leveraging the popular Pipecat framework, we deliver low-latency, real-time interactive bots. We can even architect the infrastructure to make you a primary provider of bot services." },
        { icon: Bot, title: "Bespoke CRM Integration", desc: "Directly connect conversational agents with your bespoke infrastructure or popular CRMs. Automate record updates, scheduling, and lead generation to dramatically increase efficiency." },
        { icon: Activity, title: "Benchmarking & Observability", desc: "Our AI and VoIP experts provide deep integration metrics. Observe performance, benchmark quality, and gain granular control to maximize business effectiveness." }
    ];

    return (
        <div className="flex flex-col items-center">
            <section className="w-full pt-20 pb-16 bg-gradient-to-b from-dark-bg to-dark-nav relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/10 blur-[150px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-primary/20 text-primary border border-primary/30 text-xs font-bold mb-6 tracking-widest uppercase">
                            <Mic className="w-4 h-4" /> Next-Gen Automation
                        </span>
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
                            AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-400">Voice & Video</span> Bots
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed mb-4">
                            We construct custom, scalable Voice and Video bots alongside developing bespoke RAG Pipelines and MCP servers from the ground up to power them.
                        </p>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Stop clicking buttons and start generating revenue. From low-latency providers to complete custom control, we build the infrastructure you need to win.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {benefits.map((feat, i) => (
                        <div key={i} className="flex gap-6 p-6 rounded-3xl bg-dark-bg border border-white/5 hover:border-primary/30 transition-colors">
                            <div className="flex-shrink-0">
                                <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                                    <feat.icon className="w-6 h-6 text-primary" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-3">{feat.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{feat.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="w-full bg-primary py-20 mt-12">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-black mb-6">Build Your AI Voice Fleet</h2>
                    <p className="text-black/70 text-lg mb-10">Whether you need internal automation or want to offer bots as a service to your clients, our experts are ready to build it.</p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-900 transition transform hover:scale-105"
                    >
                        Contact for details & development
                        <Video className="w-5 h-5 text-primary" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
