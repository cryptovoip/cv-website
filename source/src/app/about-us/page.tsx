"use client";

import { motion } from "framer-motion";
import { Users, Target, Zap } from "lucide-react";

export default function AboutUs() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-4 block">Our Story</span>
                <h1 className="text-4xl md:text-6xl font-bold mb-6">Innovation with a Purpose</h1>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                    We bring a common man&apos;s perspective to solving real-world, large-scale problems with advanced AI and secure data ecosystems.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                {[
                    { icon: Users, title: "Expert Team", desc: "Decades of combined experience in highly scalable architectures." },
                    { icon: Target, title: "Our Mission", desc: "To democratize secure, intelligent digital foundations for organizations worldwide." },
                    { icon: Zap, title: "Fast Execution", desc: "Rapid deployment of robust systems that integrate seamlessly with existing infrastructure." },
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition"
                    >
                        <item.icon className="w-12 h-12 text-primary mb-6" />
                        <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                        <p className="text-gray-400">{item.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
