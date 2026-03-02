"use client";

import { motion } from "framer-motion";
import { ShieldAlert, WifiOff, LayoutDashboard, SlidersHorizontal, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function MDMProduct() {
    const sections = [
        {
            icon: ShieldAlert,
            title: "Built for Critical Infrastructure",
            desc: "Designed exclusively for defense and high-security zones. Absolute control over your endpoints ensuring uncompromising data and AI sovereignty."
        },
        {
            icon: WifiOff,
            title: "Completely Offline Capable",
            desc: "Operate securely without relying on online services. Our MDM functions flawlessly in completely offline or air-gapped on-premises environments."
        },
        {
            icon: SlidersHorizontal,
            title: "Unparalleled Policy Control",
            desc: "Enforce rigorous restriction engines. Manage GPS, Bluetooth, Wi-Fi, USB storage, and detailed application behavioral policies down to the app version."
        },
        {
            icon: LayoutDashboard,
            title: "Advanced Device Configuration",
            desc: "From UI branding and Samsung Knox controls to APN profile management and kiosk modes. Complete governance from a single configuration editor."
        }
    ];

    return (
        <div className="flex flex-col items-center">
            <section className="w-full pt-20 pb-16 bg-gradient-to-b from-dark-bg to-dark-nav relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary border border-primary/30 text-xs font-bold mb-6 tracking-widest uppercase">
                            Defense Grade Security
                        </span>
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
                            CV MDM <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-400">Platform</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-light leading-relaxed mb-10">
                            Not just another cloud MDM. A complete, offline-capable platform designed for critical infrastructure organizations demanding total control over their data and devices.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a
                                href="https://cvmdm.cryptovoip.in/#/login"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-4 rounded-full bg-primary text-black font-bold text-lg hover:bg-primary/90 transition transform hover:scale-105 shadow-[0_0_20px_rgba(220,231,53,0.3)] flex items-center"
                            >
                                Start Trial Portal
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </a>
                            <Link
                                href="/contact"
                                className="px-8 py-4 rounded-full bg-white/10 text-white font-bold text-lg hover:bg-white/20 transition backdrop-blur-md border border-white/20"
                            >
                                Contact Sales
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {sections.map((sect, i) => (
                        <div key={i} className="flex gap-6 p-8 rounded-3xl bg-dark-bg border border-white/10 hover:border-primary/50 transition-colors group">
                            <div className="flex-shrink-0">
                                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                    <sect.icon className="w-8 h-8 text-primary" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-3">{sect.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{sect.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full border-t border-white/10">
                <h2 className="text-3xl font-bold mb-10 text-center">Comprehensive Technical Capabilities</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-400">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <h4 className="text-white font-bold mb-4 flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-primary" /> Hardened Restrictions</h4>
                        <ul className="space-y-2 text-sm">
                            <li>• Disable USB Storage & Bluetooth</li>
                            <li>• Force Wi-Fi/Mobile Data Policies</li>
                            <li>• Prevent App Installations</li>
                            <li>• Custom APN Profile Enforcement</li>
                            <li>• Camera & Mic Hardening</li>
                        </ul>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <h4 className="text-white font-bold mb-4 flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-primary" /> Application Governance</h4>
                        <ul className="space-y-2 text-sm">
                            <li>• Push Core/Content Apps Silently</li>
                            <li>• Strict App Version Control</li>
                            <li>• App Parameter & Settings Injection</li>
                            <li>• Advanced Kiosk Mode Locking</li>
                            <li>• Hide Specific System Apps</li>
                        </ul>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                        <h4 className="text-white font-bold mb-4 flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-primary" /> UI & System Control</h4>
                        <ul className="space-y-2 text-sm">
                            <li>• Custom Branding Backgrounds</li>
                            <li>• Samsung Knox Enhancements</li>
                            <li>• Enforced Password Complexity</li>
                            <li>• Locked Volume & Brightness</li>
                            <li>• Granular Time/Zone Governance</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="w-full bg-primary py-20 mt-12">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-black mb-6">Deploy High-Security MDM Today</h2>
                    <p className="text-black/70 text-lg mb-10">Sign up on our portal to test devices in a sandbox profile or contact our engineering team to plan an offline, on-premises deployment.</p>
                    <a
                        href="https://cvmdm.cryptovoip.in/#/login"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-900 transition transform hover:scale-105"
                    >
                        Access Trial Portal
                        <ArrowRight className="w-5 h-5 text-primary" />
                    </a>
                </div>
            </section>
        </div>
    );
}
