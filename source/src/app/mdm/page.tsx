"use client";

import { motion } from "framer-motion";
import {
    ShieldAlert, WifiOff, LayoutDashboard, SlidersHorizontal, ArrowRight, ShieldCheck,
    Lock, CheckCircle2, QrCode, Smartphone, Zap, Webhook, Box, Shield,
    FileLock2, Fingerprint, Database, Fingerprint as FingerprintIcon, LockKeyhole,
    Cable, PhoneOff
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function MDMProduct() {
    const defaultTab = 0;
    const [activeSecurityTab, setActiveSecurityTab] = useState(defaultTab);

    // 9-Point Brochure Features
    const brochureFeatures = [
        {
            icon: WifiOff,
            title: "True Air-Gapped & Offline Operability",
            desc: "Designed to operate seamlessly in completely air-gapped, dark-site networks. Run the entire MDM server on an internal LAN without external internet. Offline provisioning via QR code, local package hosting, and resilient restriction enforcement even if contact is lost."
        },
        {
            icon: Fingerprint,
            title: "Cryptographically Secured Infrastructure",
            desc: "Devices are cryptographically bound to physical hardware IDs to prevent cloning. Every payload sent requires a secure Hash Secret signature to eliminate MitM spoofing, delivered over strictly authenticated MQTT tunnels."
        },
        {
            icon: Webhook,
            title: "Dynamic File Injection Engine",
            desc: "Push a single generic XML or JSON to 10,000 devices. CV MDM automatically injects each device's unique IMEI, Serial Number, or Custom Admin Properties dynamically during zero-touch deployment."
        },
        {
            icon: LockKeyhole,
            title: "Ultimate Kiosk Mode & UI Lockdown",
            desc: "Paralyze OS limitations. Explicitly disable Home, Recent Apps, and Notifications. Completely hide the Android status bar and bind physical hardware buttons to specific launch actions. Immersive corporate branding replaces the launcher."
        },
        {
            icon: QrCode,
            title: "True 'Scan and Go' Zero-Touch",
            desc: "Generate a single QR code. Tap a fresh screen 6 times to scan. The device auto-connects to Wi-Fi, creates a database record, auto-names itself, and downloads all group policies in seconds context-free."
        },
        {
            icon: ShieldAlert,
            title: "Deep Samsung Knox & 55+ Protections",
            desc: "Deep integration with Android Enterprise and Samsung Knox. 55+ policies allow disabling cameras, muting mics, blocking USB transfers, and military-grade telephony blocking to turn smartphones into data-only terminals."
        },
        {
            icon: Box,
            title: "Unrivaled Application Domination",
            desc: "Native Split-APK architecture automatically deploys correct arm64 or armeabi binaries. Push 'Urgent' flags to bypass schedules for zero-day fixes, and push Key-Value configurations directly into apps silently."
        },
        {
            icon: Cable,
            title: "Bulletproof Network Management",
            desc: "Full remote APN (Access Point Name) pushing (MCC, MNC, PAP/CHAP). Push trusted private SSL CA Certificates directly to device credential stores while stripping away unauthorized certificates."
        },
        {
            icon: LayoutDashboard,
            title: "Built for Global Distributed Teams",
            desc: "Modular plugin architecture for GPS, forensic logging, and remote wiping. Granular Role-Based Access Control (RBAC) and instant 12-language interface localization for worldwide IT operations."
        }
    ];

    // 7-Point Security Deep Dive
    const securityFeatures = [
        {
            title: "Device Integrity & Data Protection",
            icon: Database,
            details: [
                { name: "Forced Storage Encryption", text: "Remotely mandate full-device storage encryption ensuring data at rest remains protected if stolen." },
                { name: "Remote Wipe & Factory Reset", text: "Issue immediate Remote Wipe commands to securely delete corporate data." },
                { name: "Factory Reset Protection", text: "Prevent unauthorized users from manually wiping a device from Android Settings." },
                { name: "SIM Swap Detection", text: "Track the IMEI and flag devices indicating a potential SIM swap or hardware tampering." }
            ]
        },
        {
            title: "Advanced Kiosk Mode & UI Lockdown",
            icon: Smartphone,
            details: [
                { name: "Strict UI Lockdown", text: "Disable Home, Recent Apps, Notifications, and Hardware Keys." },
                { name: "Status Bar Concealment", text: "Hide system status bar preventing pull-down menus." },
                { name: "Kiosk Exit Prevention", text: "Cryptographically protect the MDM so users cannot exit without the securely held Admin Password." },
                { name: "App Whitelisting", text: "Lock the device to a single 'Content App' or a curated MDM Launcher." }
            ]
        },
        {
            title: "Hardware & System Restrictions",
            icon: SlidersHorizontal,
            details: [
                { name: "Peripheral Blocking", text: "Completely disable cameras and mute microphones in secure facilities." },
                { name: "Data Exfiltration Prevention", text: "Block USB Transfers, Bluetooth, NFC, and UWB radios." },
                { name: "System Settings Lockdown", text: "Block access to GPS, Date & Time, Credentials, Language, or Wallpaper." },
                { name: "User Isolation", text: "Block secondary user accounts or Google accounts from being added." }
            ]
        },
        {
            title: "Application & Network Security",
            icon: Zap,
            details: [
                { name: "Block Unknown Sources", text: "Prevent sideloading of unapproved APKs to stop malware and shadow IT." },
                { name: "Network Tampering Prevention", text: "Prevent users from toggling Wi-Fi, Airplane Mode, or Mobile Hotspots to bypass firewalls." },
                { name: "SSL CA Deployment", text: "Push private CA Certs making devices trust internal HTTPS proxies avoiding MitM attacks." },
                { name: "Restrict Cert Stores", text: "Strip the device of any unauthorized CA certificates explicitly." }
            ]
        },
        {
            title: "Samsung Knox Integration",
            icon: PhoneOff,
            details: [
                { name: "Call Blocking", text: "Restrict Outgoing or Incoming Calls, creating a secure data-only terminal." },
                { name: "Knox Lock Screen Control", text: "Hide Clock, Battery, Carrier, and notifications to prevent data leakage." },
                { name: "Emergency Override", text: "Define hardcoded Emergency Phone Numbers directly on the Knox lock screen." }
            ]
        },
        {
            title: "Admin Console Security",
            icon: Shield,
            details: [
                { name: "Role-Based Access (RBAC)", text: "Create granular roles. Helpdesk users can 'View' devices without ability to push apps or wipe." },
                { name: "Multi-Tenant Isolation", text: "Devices and users are strictly segregated into hierarchical Groups." },
                { name: "Comprehensive Audit Logging", text: "Every global action is logged via Audit Plugin for SOC2/ISO27001 forensics." },
                { name: "2FA & Session Management", text: "Web console supports 2FA and configurable idle-timeouts." }
            ]
        },
        {
            title: "Backend Infrastructure",
            icon: FileLock2,
            details: [
                { name: "Secure Enrollment Payloads", text: "Every configuration payload is cryptographically signed using a shared hash secret." },
                { name: "Anti-Cloning", text: "Cryptographically binds Device IDs to hardware preventing authorized ghost enrollments." },
                { name: "MQTT Authentication Enforcement", text: "Strict authentication ensures only authorized servers send/receive push telemetry." }
            ]
        }
    ];

    return (
        <div className="flex flex-col items-center">
            {/* Hero Section */}
            <section className="w-full pt-20 pb-16 bg-gradient-to-b from-dark-bg to-dark-nav relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary border border-primary/30 text-xs font-bold mb-6 tracking-widest uppercase">
                            Next-Generation Enterprise Mobility
                        </span>
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
                            CV MDM <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-400">Platform</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-light leading-relaxed mb-10">
                            Control. Secure. Scale. <br /> Transform standard smartphones and tablets into indestructible, purpose-built tools with absolute, cryptographically-secured control.
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

            {/* Why CV MDM Brochure Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full relative">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Why CV MDM Stands Above the Rest</h2>
                    <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
                        While traditional MDMs offer basic app locking, CV MDM provides infrastructure-level security, dynamic variable deployment, and true zero-touch provisioning. We secure the supply chain between your servers and your fleet.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {brochureFeatures.map((feat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 hover:bg-white/[0.05] hover:border-primary/40 transition-all group"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-black/50">
                                <feat.icon className="w-7 h-7 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4 leading-tight">{feat.title}</h3>
                            <p className="text-gray-400 leading-relaxed text-sm">{feat.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Deep Security Architecture (Interactive Tabs) */}
            <section className="w-full bg-dark-bg border-y border-white/10 py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-bold mb-6 tracking-widest uppercase">
                            <ShieldAlert className="w-4 h-4" /> Core Pillar
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Security Features Overview</h2>
                        <p className="text-gray-400 max-w-3xl mx-auto text-lg">
                            CV MDM provides a multi-layered security approach, securing both the managed Android devices in the field and the administrative web console used to control them.
                        </p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Tab Headers */}
                        <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible gap-2 lg:w-1/3 pb-4 lg:pb-0 scrollbar-hide">
                            {securityFeatures.map((tab, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveSecurityTab(idx)}
                                    className={`flex items-center gap-4 p-4 rounded-2xl text-left font-semibold transition-all min-w-[280px] lg:min-w-0 ${activeSecurityTab === idx
                                            ? "bg-primary/10 border-primary text-primary border"
                                            : "bg-white/5 border-transparent text-gray-400 hover:bg-white/10 border"
                                        }`}
                                >
                                    <tab.icon className={`w-6 h-6 ${activeSecurityTab === idx ? "text-primary" : "text-gray-500"}`} />
                                    <span>{tab.title}</span>
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="lg:w-2/3 bg-black/40 rounded-3xl border border-white/10 p-8 min-h-[400px]">
                            <motion.div
                                key={activeSecurityTab}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="p-3 bg-primary/20 rounded-xl">
                                        {(() => {
                                            const Icon = securityFeatures[activeSecurityTab].icon;
                                            return <Icon className="w-8 h-8 text-primary" />
                                        })()}
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-white">
                                        {securityFeatures[activeSecurityTab].title}
                                    </h3>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {securityFeatures[activeSecurityTab].details.map((detail, dIdx) => (
                                        <div key={dIdx} className="bg-white/5 p-5 rounded-2xl border border-white/5 hover:border-white/10 transition">
                                            <h4 className="text-white font-bold mb-2 flex items-start gap-2">
                                                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                                {detail.name}
                                            </h4>
                                            <p className="text-gray-400 text-sm leading-relaxed ml-7">
                                                {detail.text}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="w-full bg-primary py-20">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-black mb-6">Transform Your Fleet Today</h2>
                    <p className="text-black/70 text-lg mb-10 font-medium">CV MDM brings unparalleled security, scalable agility, and relentless control to your enterprise mobility strategy.</p>
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
