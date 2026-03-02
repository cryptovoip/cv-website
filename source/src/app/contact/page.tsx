"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-4 block">Get in Touch</span>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Let&apos;s build something secure together.</h1>
                    <p className="text-lg text-gray-400 mb-10">
                        Reach out to our experts to discuss how CryptoVoip can transform and secure your organization&apos;s technological foundation.
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                                <Mail className="text-primary w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Email Us</p>
                                <p className="font-semibold">contact@cryptovoip.in</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                                <Phone className="text-primary w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Call Us</p>
                                <p className="font-semibold">+1 (555) 123-4567</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                                <MapPin className="text-primary w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Headquarters</p>
                                <p className="font-semibold">Cyber Hub, Tech District</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-dark-bg p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">First Name</label>
                                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition" placeholder="John" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Last Name</label>
                                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition" placeholder="Doe" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                            <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition" placeholder="john@company.com" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                            <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition resize-none" placeholder="How can we help you?"></textarea>
                        </div>
                        <button className="w-full bg-primary text-black font-bold text-lg py-4 rounded-xl hover:bg-primary/90 transition transform hover:scale-[1.02] flex items-center justify-center gap-2">
                            Send Message
                            <Send className="w-5 h-5" />
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
