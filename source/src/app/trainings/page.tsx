"use client";

import { motion } from "framer-motion";
import { BookOpen, Mic, Server, GraduationCap, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function Trainings() {
    const courses = [
        {
            icon: Server,
            title: "Complete VoIP Infrastructure",
            topics: ["SIP Protocol Deep Dive", "Architecture Design", "Fault Tolerance", "Network Optimization"]
        },
        {
            icon: Server,
            title: "FreeSwitch & OpenSIPS Mastery",
            topics: ["Practical Installation", "Intelligent Routing", "Media Proxying", "Scalable Deployments"]
        },
        {
            icon: Mic,
            title: "AI Voice & Video Bots",
            topics: ["RAG Pipeline Integration", "MCP Servers", "CRM Automation", "Revenue Generation strategies"]
        }
    ];

    return (
        <div className="flex flex-col items-center">
            <section className="w-full pt-20 pb-16 bg-gradient-to-b from-dark-bg to-dark-nav relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <span className="inline-block flex items-center justify-center gap-2 py-1 px-4 rounded-full bg-primary/20 text-primary border border-primary/30 text-xs font-bold mb-6 tracking-widest uppercase w-max mx-auto">
                            <GraduationCap className="w-4 h-4" /> Learn from Industry Experts
                        </span>
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
                            Practical <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-400">Trainings</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
                            Complete, hands-on, practical training programs. Be ahead of the technology that defines your services.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {courses.map((course, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 rounded-3xl bg-dark-bg border border-white/10 hover:border-primary/50 transition-colors shadow-xl group"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:bg-primary/20 transition-colors">
                                <course.icon className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold mb-6">{course.title}</h3>
                            <ul className="space-y-4">
                                {course.topics.map((topic, j) => (
                                    <li key={j} className="flex items-center text-gray-400">
                                        <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                                        {topic}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="w-full bg-primary py-20 mt-12">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-black mb-6">Start Learning Today</h2>
                    <p className="text-black/70 text-lg mb-10">Whether you want to deploy a massive VoIP infrastructure or build cutting-edge AI bots, our experts will train your team.</p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-900 transition transform hover:scale-105"
                    >
                        Enroll Now
                        <BookOpen className="w-5 h-5 text-primary" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
