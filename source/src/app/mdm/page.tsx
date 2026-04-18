"use client";

import { motion } from "framer-motion";
import {
    ShieldAlert, WifiOff, LayoutDashboard, SlidersHorizontal, ArrowRight, ShieldCheck,
    Lock, CheckCircle2, QrCode, Smartphone, Zap, Webhook, Box, Shield,
    FileLock2, Fingerprint, Database, LockKeyhole, Cable, PhoneOff,
    Server, Building2, Radio, Cpu, Users, CloudOff, Cloud,
    BadgeCheck, MapPin, KeyRound, X, Wifi, HardDrive,
    PackageCheck, Monitor, Globe, Network, Award, Star
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const brochureFeatures = [
    {
        icon: WifiOff,
        title: "True Air-Gapped & Offline Operability",
        desc: "Operate in completely isolated, dark-site networks. Run the entire MDM server on an internal LAN with zero external internet dependency. Offline QR provisioning, local package hosting, and resilient policy enforcement even when the server is unreachable."
    },
    {
        icon: Fingerprint,
        title: "Cryptographically Secured Infrastructure",
        desc: "Every device is cryptographically bound to its hardware ID. Every sync payload carries an HMAC-SHA256 signature, and every APK is verified with SHA-256 before installation — eliminating spoofing, tampering, and supply-chain attacks."
    },
    {
        icon: QrCode,
        title: "True Zero-Touch QR Enrollment",
        desc: "Generate one QR code on your internal server. Tap a fresh screen six times and scan. The device auto-connects to your secure Wi-Fi, registers itself, downloads all group policies, and is operational in under two minutes — no internet, no cloud."
    },
    {
        icon: LockKeyhole,
        title: "Total Kiosk Mode & UI Lockdown",
        desc: "Disable Home, Recents, and Notifications. Conceal the Android status bar. Bind hardware buttons to specific actions. Lock the device to a single approved app or a fully branded corporate launcher — users cannot exit without your admin password."
    },
    {
        icon: ShieldAlert,
        title: "Deep Samsung Knox & 55+ Policies",
        desc: "Deep Android Enterprise and Samsung Knox integration delivers 55+ enforceable policies: disable cameras, mute microphones, block USB transfers, restrict telephony to data-only, and control Knox lock-screen elements for zero information leakage."
    },
    {
        icon: Box,
        title: "Unrivaled Application Management",
        desc: "Silent OTA APK deployment with SHA-256 integrity checks. Per-app permission control, whitelist/blacklist enforcement, run-at-boot and run-after-install policies. Push urgent zero-day fixes that bypass normal sync schedules instantly."
    },
    {
        icon: Cable,
        title: "Full Network & Certificate Control",
        desc: "Push APN configurations (MCC, MNC, PAP/CHAP), pre-configure Wi-Fi credentials during provisioning, and deploy trusted private CA certificates directly into device credential stores — stripping any unauthorized CA certificates simultaneously."
    },
    {
        icon: Webhook,
        title: "Dynamic Configuration Engine",
        desc: "Push a single configuration template to 10,000 devices. CV MDM injects each device's unique IMEI, serial number, or custom admin properties dynamically — no manual per-device configuration required."
    },
    {
        icon: LayoutDashboard,
        title: "Multi-Tenant, Global-Scale Dashboard",
        desc: "Full RBAC with four access tiers, isolated multi-tenant customer environments, white-label rebranding, and 15+ language localizations. A modular plugin architecture adds GPS tracking, audit trails, forensic logging, and bulk imports."
    }
];

const securityFeatures = [
    {
        title: "Device Integrity & Data Protection",
        icon: Database,
        details: [
            { name: "Forced Storage Encryption", text: "Remotely mandate full-device storage encryption ensuring data at rest is protected even if a device is physically seized." },
            { name: "Remote Wipe & Factory Reset", text: "Issue an immediate wipe command to securely erase all corporate data from a lost or compromised device." },
            { name: "Factory Reset Protection", text: "Prevent unauthorized users from manually wiping a device through Android Settings and re-enrolling it elsewhere." },
            { name: "SIM Swap & Hardware Tamper Detection", text: "Track IMEI and flag device anomalies indicating a SIM swap or hardware tampering event in real time." }
        ]
    },
    {
        title: "Kiosk Mode & UI Lockdown",
        icon: Smartphone,
        details: [
            { name: "Strict UI Lockdown", text: "Disable Home, Recent Apps, Notifications, and all hardware keys simultaneously." },
            { name: "Status Bar Concealment", text: "Hide the system status bar to eliminate pull-down menus and information leakage." },
            { name: "Cryptographic Kiosk Exit", text: "Users cannot exit kiosk mode without the securely-held admin password — no workarounds." },
            { name: "App Whitelisting", text: "Lock devices to a single content app or a curated MDM launcher. All other apps are invisible." }
        ]
    },
    {
        title: "Hardware & System Restrictions",
        icon: SlidersHorizontal,
        details: [
            { name: "Peripheral Blocking", text: "Completely disable cameras and mute microphones in secure facilities at the policy level." },
            { name: "Data Exfiltration Prevention", text: "Block USB transfers, Bluetooth, NFC, and UWB radios to prevent unauthorized data extraction." },
            { name: "System Settings Lockdown", text: "Block access to GPS, Date & Time, Credentials, Language, or Wallpaper settings." },
            { name: "User & Account Isolation", text: "Prevent secondary user accounts or Google accounts from being added to managed devices." }
        ]
    },
    {
        title: "Application & Network Security",
        icon: Zap,
        details: [
            { name: "Block Unknown Sources", text: "Prevent sideloading of unapproved APKs, eliminating malware and shadow IT installation vectors." },
            { name: "Network Tampering Prevention", text: "Prevent users from toggling Wi-Fi, Airplane Mode, or Mobile Hotspots to bypass your network security perimeter." },
            { name: "Private SSL CA Deployment", text: "Push internal CA certificates to make devices trust your HTTPS proxies — preventing man-in-the-middle attacks." },
            { name: "Unauthorized Cert Removal", text: "Automatically strip all unauthorized CA certificates from the device credential store." }
        ]
    },
    {
        title: "Samsung Knox Integration",
        icon: PhoneOff,
        details: [
            { name: "Call Restriction", text: "Restrict outgoing and incoming calls, creating a secured data-only communication terminal." },
            { name: "Knox Lock Screen Control", text: "Hide clock, battery, carrier info, and notifications to prevent information leakage from the lock screen." },
            { name: "Knox Certificate Provisioning", text: "Deploy enterprise certificates directly via Knox for device authentication and VPN/proxy access." },
            { name: "Emergency Override", text: "Hardcode emergency phone numbers on the Knox lock screen regardless of other restrictions." }
        ]
    },
    {
        title: "Admin Console Security",
        icon: Shield,
        details: [
            { name: "Role-Based Access Control (RBAC)", text: "Four tiers: Super-Admin, Admin, User, Observer. Helpdesk staff can view devices without permission to push apps or trigger wipes." },
            { name: "Multi-Tenant Isolation", text: "Devices, users, and data are strictly segregated per customer — one breach cannot cascade across tenants." },
            { name: "Comprehensive Audit Logging", text: "Every administrative action is logged via the Audit Plugin for SOC2 / ISO 27001 forensic trails." },
            { name: "2FA & Session Management", text: "Web console supports two-factor authentication and configurable idle-timeout session expiry." }
        ]
    },
    {
        title: "Backend Infrastructure Security",
        icon: FileLock2,
        details: [
            { name: "HMAC-SHA256 Signed Payloads", text: "Every configuration sync payload is cryptographically signed using a shared hash secret — unsigned responses are rejected." },
            { name: "RSA-Encrypted Credentials", text: "Admin passwords are RSA-encrypted before transmission — plaintext credentials never traverse the network." },
            { name: "Anti-Cloning Protection", text: "Device IDs are cryptographically bound to hardware — ghost enrollments and cloned registrations are impossible." },
            { name: "Authenticated MQTT Channels", text: "Strict broker authentication ensures only authorized devices and servers exchange push telemetry." }
        ]
    }
];

const cloudVsOffline = [
    { feature: "Server location", cloud: "Vendor's cloud infrastructure", offline: "Your own servers, your premises" },
    { feature: "Enrollment requires internet", cloud: "Always", offline: "Never — fully offline QR enrollment" },
    { feature: "Works on air-gapped networks", cloud: "No", offline: "Yes — by design" },
    { feature: "Works on captive/isolated networks", cloud: "No", offline: "Yes — no external DNS needed" },
    { feature: "Data leaves your perimeter", cloud: "Yes — to vendor servers", offline: "Never — all data stays internal" },
    { feature: "Suitable for classified environments", cloud: "No", offline: "Yes — defense & government ready" },
    { feature: "Vendor dependency after deployment", cloud: "Permanent", offline: "Zero — you own the platform" },
    { feature: "Works during internet outages", cloud: "No", offline: "Yes — fully operational" },
    { feature: "QR payload includes Wi-Fi credentials", cloud: "Partial", offline: "Yes — fully self-contained" },
    { feature: "APK integrity verified before install", cloud: "Rarely", offline: "Yes — SHA-256 on every install" },
];

const industriesServed = [
    {
        icon: Shield,
        title: "Defense & Military",
        desc: "Manage smartphones and tablets deployed in operational theaters, on-base facilities, and secure command networks where zero external connectivity is the rule, not the exception."
    },
    {
        icon: Building2,
        title: "Government & Intelligence",
        desc: "Deploy managed devices inside SCIFs, classified networks, and government data centers. Full audit trails and RBAC support compliance with NIST, FedRAMP, and ISO 27001 frameworks."
    },
    {
        icon: Radio,
        title: "Critical Infrastructure",
        desc: "Secure Android devices in power generation, water treatment, oil & gas, and transportation networks — environments where any unmanaged device is an attack surface."
    },
    {
        icon: Network,
        title: "Industrial & SCADA Networks",
        desc: "Manage handheld terminals and operator tablets on OT networks physically isolated from the public internet. No cloud dependency means ICS/SCADA environments are fully supported."
    },
    {
        icon: HardDrive,
        title: "Banking & Finance",
        desc: "Enforce encryption, restrict data exfiltration paths, and manage POS terminals, ATM maintenance devices, and field agent phones under strict financial compliance policies."
    },
    {
        icon: Globe,
        title: "Global Enterprise",
        desc: "Multi-tenant, white-label architecture supports enterprises with international operations. 15+ language localizations, secondary failover server, and MQTT guaranteed delivery across continents."
    }
];

const deploymentSteps = [
    {
        step: "01",
        icon: Server,
        title: "Install on Your Server",
        desc: "Run the automated installer on Ubuntu 20.04 or 22.04 LTS. PostgreSQL, Tomcat, and all dependencies are configured automatically. Your data never leaves your infrastructure."
    },
    {
        step: "02",
        icon: QrCode,
        title: "Generate Enrollment QR",
        desc: "From the web dashboard, create a configuration profile and generate a QR code. The QR embeds your server address, Wi-Fi credentials, APK checksum, group policy, and device ID — all in one scan."
    },
    {
        step: "03",
        icon: Smartphone,
        title: "Scan & Deploy",
        desc: "Tap the fresh device screen six times, scan the QR code. The device connects to your secure network, verifies the APK, registers itself, and applies all policies — in under two minutes."
    },
    {
        step: "04",
        icon: Monitor,
        title: "Manage Your Fleet",
        desc: "All devices appear in your dashboard immediately. Push policies, deploy apps, lock, wipe, track location, view logs, and enforce compliance — from your secured internal web console."
    }
];

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */

export default function MDMProduct() {
    const [activeSecurityTab, setActiveSecurityTab] = useState(0);

    return (
        <div className="flex flex-col items-center">

            {/* ── Hero ── */}
            <section className="w-full pt-20 pb-16 bg-gradient-to-b from-dark-bg to-dark-nav relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary border border-primary/30 text-xs font-bold mb-6 tracking-widest uppercase">
                            Trusted by Defense · Government · Critical Infrastructure
                        </span>
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
                            CV MDM —{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-400">
                                Offline-First
                            </span>
                            <br />Mobile Device Management
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-light leading-relaxed mb-4">
                            The only enterprise MDM platform built to operate in completely air-gapped, classified, and internet-isolated networks — where conventional cloud MDM tools simply cannot work.
                        </p>
                        <p className="text-base text-gray-500 max-w-3xl mx-auto mb-10">
                            On-premise deployment · Zero cloud dependency · QR enrollment without internet · Full data sovereignty
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a
                                href="https://cvmdm.cryptovoip.in/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-4 rounded-full bg-primary text-black font-bold text-lg hover:bg-primary/90 transition transform hover:scale-105 shadow-[0_0_20px_rgba(220,231,53,0.3)] flex items-center"
                            >
                                Sign Up — Free Trial
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

            {/* ── Trust Bar ── */}
            <section className="w-full bg-dark-nav border-b border-white/10 py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <p className="text-gray-500 text-xs uppercase tracking-widest font-semibold">Trusted by defense & government organizations</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Flagship client */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="col-span-1 md:col-span-1 bg-primary/5 border border-primary/25 rounded-3xl p-6 flex items-start gap-5"
                        >
                            <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
                                <Award className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-primary text-2xl font-black">500+</span>
                                    <span className="text-white font-bold text-sm">Licenses Deployed</span>
                                </div>
                                <p className="text-gray-300 text-sm font-semibold">Indian Army — Signals 21</p>
                                <p className="text-gray-500 text-xs mt-1">Offline-enrolled, air-gapped fleet management in active operational use</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 flex items-start gap-5"
                        >
                            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                <Building2 className="w-6 h-6 text-gray-300" />
                            </div>
                            <div>
                                <p className="text-white font-bold text-sm mb-1">Government Offices</p>
                                <p className="text-gray-400 text-sm leading-relaxed">Multiple central and state government departments managing secured device fleets on isolated networks.</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 flex items-start gap-5"
                        >
                            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                <Star className="w-6 h-6 text-gray-300" />
                            </div>
                            <div>
                                <p className="text-white font-bold text-sm mb-1">Critical Infrastructure</p>
                                <p className="text-gray-400 text-sm leading-relaxed">Industrial, telecom, and public-sector organizations operating on captive and air-gapped networks across India.</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── What is MDM? ── */}
            <section className="w-full bg-dark-nav border-b border-white/10 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-bold mb-4 tracking-widest uppercase">
                                MDM Explained Simply
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                                What is Mobile Device Management (MDM)?
                            </h2>
                            <p className="text-gray-300 text-lg leading-relaxed mb-6">
                                Think of MDM as a <span className="text-primary font-semibold">remote control panel for every smartphone and tablet</span> in your organization. Instead of physically touching each device to install software, set rules, or respond to a security threat, your IT team controls everything from one central dashboard.
                            </p>
                            <p className="text-gray-400 leading-relaxed mb-6">
                                With an MDM platform, your organization can enroll devices, push approved applications, enforce security policies (like mandatory encryption or screen lock), restrict unauthorized functions, and remotely wipe a lost or stolen device — all without ever touching the hardware again.
                            </p>
                            <p className="text-gray-400 leading-relaxed">
                                For organizations managing dozens, hundreds, or thousands of Android devices across distributed teams, facilities, or operational sites, MDM is not optional — it is the foundational layer of mobile security and operational control.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="grid grid-cols-2 gap-4"
                        >
                            {[
                                { icon: PackageCheck, title: "App Deployment", desc: "Push, update, or remove approved applications across your entire fleet silently." },
                                { icon: Lock, title: "Policy Enforcement", desc: "Mandate encryption, password complexity, and device restrictions from the dashboard." },
                                { icon: ShieldCheck, title: "Remote Wipe", desc: "Instantly erase sensitive data from any lost or compromised device." },
                                { icon: MapPin, title: "Asset Tracking", desc: "Know where every device is, its battery level, and last-contact time in real time." },
                                { icon: Cpu, title: "Hardware Inventory", desc: "Automatically collect IMEI, serial number, OS version, and network details." },
                                { icon: Users, title: "Team Access Control", desc: "Define who can do what — view, manage, wipe — with role-based permissions." }
                            ].map((item, i) => (
                                <div key={i} className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 hover:border-primary/30 transition-all">
                                    <item.icon className="w-6 h-6 text-primary mb-3" />
                                    <h3 className="text-white font-semibold text-sm mb-1">{item.title}</h3>
                                    <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── The Problem with Cloud MDM ── */}
            <section className="w-full bg-dark-bg py-20 border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <span className="inline-block py-1 px-3 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-bold mb-4 tracking-widest uppercase">
                            The Critical Gap
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold mb-5">
                            Why Cloud MDM Fails Critical Infrastructure
                        </h2>
                        <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
                            Every major commercial MDM vendor — from Microsoft Intune to VMware Workspace ONE — was designed for corporate offices with reliable internet connectivity. That assumption is a critical failure point for defense, government, and industrial environments.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Cloud,
                                color: "text-red-400",
                                bg: "bg-red-500/10",
                                border: "border-red-500/20",
                                title: "Internet-Dependent Enrollment",
                                desc: "Cloud MDM solutions require your device to reach the vendor's external servers to enroll. If there is no public internet — as in defense facilities, submarines, or isolated industrial networks — enrollment simply fails."
                            },
                            {
                                icon: Globe,
                                color: "text-red-400",
                                bg: "bg-red-500/10",
                                border: "border-red-500/20",
                                title: "Your Data on Vendor Servers",
                                desc: "Device telemetry, policy configurations, application inventories, and user data are stored on infrastructure you do not own or control. For classified or sensitive environments, this is a fundamental data sovereignty violation."
                            },
                            {
                                icon: ShieldAlert,
                                color: "text-red-400",
                                bg: "bg-red-500/10",
                                border: "border-red-500/20",
                                title: "Unusable in Captive Networks",
                                desc: "Air-gapped military networks, SCADA/ICS environments, and high-security government facilities do not permit outbound connections to commercial cloud services. Cloud MDM is architecturally incompatible with these environments."
                            },
                            {
                                icon: Lock,
                                color: "text-red-400",
                                bg: "bg-red-500/10",
                                border: "border-red-500/20",
                                title: "Permanent Vendor Dependency",
                                desc: "If the vendor experiences an outage, changes pricing, discontinues a product, or is acquired, your device management capability can be disrupted or lost entirely. You have no control."
                            },
                            {
                                icon: Wifi,
                                color: "text-red-400",
                                bg: "bg-red-500/10",
                                border: "border-red-500/20",
                                title: "Fails During Outages",
                                desc: "Cloud MDM stops functioning during internet outages, degraded connectivity, or network incidents. In operational environments where connectivity is intermittent, devices go unmanaged at the worst possible time."
                            },
                            {
                                icon: Cpu,
                                color: "text-red-400",
                                bg: "bg-red-500/10",
                                border: "border-red-500/20",
                                title: "No Compliance Audit Control",
                                desc: "When audit logs and device records live on a vendor's cloud, your security team cannot independently verify or maintain them. This fails audits under ISO 27001, NIST 800-53, and similar frameworks."
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="bg-white/[0.03] border border-white/10 rounded-3xl p-7"
                            >
                                <div className={`w-12 h-12 rounded-xl ${item.bg} border ${item.border} flex items-center justify-center mb-5`}>
                                    <item.icon className={`w-6 h-6 ${item.color}`} />
                                </div>
                                <h3 className="text-white font-bold text-lg mb-3">{item.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Offline MDM vs Cloud MDM Comparison ── */}
            <section className="w-full bg-dark-nav border-b border-white/10 py-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary border border-primary/30 text-xs font-bold mb-4 tracking-widest uppercase">
                            Direct Comparison
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold mb-5">
                            Offline MDM vs. Cloud MDM
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                            For organizations in defense, government, and critical infrastructure, this comparison is not academic — it determines whether your devices can be managed at all.
                        </p>
                    </div>

                    <div className="bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden">
                        {/* Header */}
                        <div className="grid grid-cols-3 bg-white/[0.03] border-b border-white/10">
                            <div className="p-5 text-gray-500 text-sm font-semibold uppercase tracking-wider">Capability</div>
                            <div className="p-5 border-x border-white/10">
                                <div className="flex items-center gap-2">
                                    <Cloud className="w-5 h-5 text-red-400" />
                                    <span className="text-red-400 font-bold">Cloud MDM</span>
                                </div>
                                <p className="text-gray-500 text-xs mt-1">Intune, Workspace ONE, etc.</p>
                            </div>
                            <div className="p-5">
                                <div className="flex items-center gap-2">
                                    <CloudOff className="w-5 h-5 text-primary" />
                                    <span className="text-primary font-bold">CV MDM (Offline)</span>
                                </div>
                                <p className="text-gray-500 text-xs mt-1">By CryptoVoIP Technologies</p>
                            </div>
                        </div>
                        {/* Rows */}
                        {cloudVsOffline.map((row, i) => (
                            <div
                                key={i}
                                className={`grid grid-cols-3 border-b border-white/5 ${i % 2 === 0 ? "bg-transparent" : "bg-white/[0.015]"}`}
                            >
                                <div className="p-4 text-gray-300 text-sm font-medium flex items-center">{row.feature}</div>
                                <div className="p-4 border-x border-white/5 flex items-center gap-2">
                                    <X className="w-4 h-4 text-red-400 shrink-0" />
                                    <span className="text-gray-400 text-sm">{row.cloud}</span>
                                </div>
                                <div className="p-4 flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                                    <span className="text-gray-200 text-sm font-medium">{row.offline}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── How It Works: 4-Step Deployment ── */}
            <section className="w-full bg-dark-bg border-b border-white/10 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary border border-primary/30 text-xs font-bold mb-4 tracking-widest uppercase">
                            How It Works
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold mb-5">
                            From Installation to Managed Fleet in Minutes
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                            CV MDM is designed for rapid deployment with no external dependencies. Your entire fleet can be enrolled and managed without a single outbound internet connection.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {deploymentSteps.map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white/[0.03] border border-white/10 rounded-3xl p-7 hover:border-primary/40 transition-all group relative"
                            >
                                <span className="absolute top-6 right-6 text-4xl font-black text-white/5 group-hover:text-primary/10 transition-colors select-none">
                                    {s.step}
                                </span>
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                                    <s.icon className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-white font-bold text-lg mb-3 leading-tight">{s.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Offline enrollment callout */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-10 bg-primary/5 border border-primary/20 rounded-3xl p-8 flex flex-col md:flex-row items-start md:items-center gap-6"
                    >
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                            <WifiOff className="w-7 h-7 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-xl mb-2">The Offline Enrollment Difference</h3>
                            <p className="text-gray-300 leading-relaxed">
                                During QR code generation, CV MDM embeds <span className="text-primary font-semibold">your Wi-Fi SSID and password, server address, APK download URL with SHA-256 checksum, device group assignment, and policy configuration</span> into a single self-contained QR payload. When a device scans it, every step executes against your internal infrastructure only — no DNS resolution to external servers, no cloud relay, no vendor intermediary. This is why CV MDM works inside defense networks, submarines, nuclear facilities, and any environment with a physical or logical network boundary.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Feature Grid ── */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
                <div className="text-center mb-14">
                    <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary border border-primary/30 text-xs font-bold mb-4 tracking-widest uppercase">
                        Platform Capabilities
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold mb-5">
                        Everything Your Fleet Needs.<br />Nothing Your Network Doesn&apos;t Allow.
                    </h2>
                    <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
                        CV MDM delivers the full enterprise MDM feature set — built from the ground up to function in the most restrictive network environments on Earth.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {brochureFeatures.map((feat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
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

            {/* ── Free Trial CTA Strip ── */}
            <section className="w-full bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-y border-primary/20 py-14">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
                                Try CV MDM Free — No Credit Card. No Cloud.
                            </h2>
                            <p className="text-gray-400 text-base leading-relaxed max-w-xl">
                                Sign up on our hosted trial portal, enroll your first devices, and explore the full platform. When you&apos;re ready, we deploy the same system on your own infrastructure — fully offline.
                            </p>
                            <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">
                                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-primary" /> Free account — no card required</span>
                                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-primary" /> Enroll real devices immediately</span>
                                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-primary" /> Full feature access during trial</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-3 shrink-0">
                            <a
                                href="https://cvmdm.cryptovoip.in/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-4 rounded-full bg-primary text-black font-black text-lg hover:bg-primary/90 transition transform hover:scale-105 shadow-[0_0_25px_rgba(220,231,53,0.35)] flex items-center gap-2 whitespace-nowrap"
                            >
                                Create Free Account
                                <ArrowRight className="w-5 h-5" />
                            </a>
                            <span className="text-gray-600 text-xs">cvmdm.cryptovoip.in</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Security Deep Dive (Interactive Tabs) ── */}
            <section className="w-full bg-dark-bg border-y border-white/10 py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-bold mb-6 tracking-widest uppercase">
                            <ShieldAlert className="w-4 h-4" /> Security Architecture
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            Seven Layers of Security,<br />One Platform
                        </h2>
                        <p className="text-gray-400 max-w-3xl mx-auto text-lg">
                            CV MDM secures both the managed devices in the field and the administrative infrastructure used to control them — with cryptographic integrity at every layer.
                        </p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
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
                                            return <Icon className="w-8 h-8 text-primary" />;
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

            {/* ── Industries Served ── */}
            <section className="w-full bg-dark-nav border-b border-white/10 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary border border-primary/30 text-xs font-bold mb-4 tracking-widest uppercase">
                            Industries We Serve
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold mb-5">
                            Built for Environments Where Failure Is Not an Option
                        </h2>
                        <p className="text-gray-400 max-w-3xl mx-auto text-lg">
                            CV MDM is deployed across sectors where device compromise, data leakage, or management downtime carries consequences far beyond a support ticket.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {industriesServed.map((ind, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="bg-white/[0.03] border border-white/10 rounded-3xl p-7 hover:border-primary/40 transition-all group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                                    <ind.icon className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-white font-bold text-xl mb-3">{ind.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{ind.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Deployment Specs ── */}
            <section className="w-full bg-dark-bg border-b border-white/10 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary border border-primary/30 text-xs font-bold mb-4 tracking-widest uppercase">
                            Technical Specifications
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Deployment & Compatibility
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Standard server infrastructure. No proprietary hardware. No cloud subscriptions. Deploy on your own equipment, in your own facility, under your own security policy.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                icon: Server,
                                title: "Server Requirements",
                                items: ["Ubuntu 20.04 / 22.04 LTS", "Java 8+ runtime", "PostgreSQL database", "Apache Tomcat", "Automated install script"]
                            },
                            {
                                icon: Smartphone,
                                title: "Android Support",
                                items: ["Android 7.0 through 14", "Device Owner mode", "Profile Owner mode", "Samsung Knox deep API", "Huawei · Lenovo · Xiaomi · HTC · Mediatek"]
                            },
                            {
                                icon: BadgeCheck,
                                title: "Enrollment Methods",
                                items: ["QR code (fully offline)", "IMEI-based identification", "Serial number binding", "Custom admin device ID", "Bulk import via plugin"]
                            },
                            {
                                icon: KeyRound,
                                title: "Plugin Ecosystem",
                                items: ["GPS location & history", "Forensic audit trail", "Device log collection", "Bulk device import", "Push notification scheduling"]
                            }
                        ].map((spec, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="bg-white/[0.03] border border-white/10 rounded-3xl p-7"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5">
                                    <spec.icon className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-white font-bold text-lg mb-4">{spec.title}</h3>
                                <ul className="space-y-2">
                                    {spec.items.map((item, j) => (
                                        <li key={j} className="flex items-start gap-2 text-gray-400 text-sm">
                                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Why CryptoVoIP ── */}
            <section className="w-full bg-dark-nav border-b border-white/10 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary border border-primary/30 text-xs font-bold mb-4 tracking-widest uppercase">
                                Why CryptoVoIP Technologies
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                                Security Is Our Foundation,<br />Not a Feature
                            </h2>
                            <p className="text-gray-300 text-lg leading-relaxed mb-6">
                                CryptoVoIP Technologies builds security infrastructure for environments where a single breach has national or operational consequences. We are the founders of <span className="text-primary font-semibold">OpenNVR</span> — open-source network video recording for critical surveillance infrastructure — and engineers of enterprise-grade secure communications platforms.
                            </p>
                            <p className="text-gray-400 leading-relaxed mb-8">
                                CV MDM was not adapted from a consumer product. It was architected from the ground up for classified and critical environments — with cryptographic integrity in every layer, on-premise sovereignty as the default, and zero compromise on security posture.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-black font-bold hover:bg-primary/90 transition"
                                >
                                    Request a Demo
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link
                                    href="/about-us"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 text-white font-semibold hover:bg-white/20 transition border border-white/20"
                                >
                                    About Us
                                </Link>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-4"
                        >
                            {[
                                { icon: ShieldCheck, label: "Cryptographic integrity on every device-server communication" },
                                { icon: WifiOff, label: "Designed first for offline and air-gapped network environments" },
                                { icon: BadgeCheck, label: "Full data sovereignty — your server, your infrastructure, your control" },
                                { icon: Users, label: "Multi-tenant architecture with complete customer isolation" },
                                { icon: Lock, label: "Zero vendor dependency post-deployment" },
                                { icon: Globe, label: "15+ language localizations for global operational deployments" },
                                { icon: Server, label: "Automated on-premise installer with no proprietary hardware required" },
                                { icon: Radio, label: "MQTT QoS 2 guaranteed delivery with secondary server failover" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 hover:border-primary/30 transition-all">
                                    <item.icon className="w-5 h-5 text-primary shrink-0" />
                                    <span className="text-gray-300 text-sm">{item.label}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="w-full bg-primary py-24">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-5xl font-black text-black mb-6 leading-tight">
                        Ready to Manage Your Fleet<br />Without Leaving Your Perimeter?
                    </h2>
                    <p className="text-black/70 text-lg mb-4 font-medium max-w-2xl mx-auto">
                        Contact our team for an on-premise deployment consultation, a live demonstration in your environment, or access to our trial portal.
                    </p>
                    <p className="text-black/50 text-sm mb-10">
                        No cloud subscription required · No data leaves your network · Deploy on your own infrastructure
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-900 transition transform hover:scale-105"
                        >
                            Request a Deployment Consultation
                            <ArrowRight className="w-5 h-5 text-primary" />
                        </Link>
                        <a
                            href="https://cvmdm.cryptovoip.in/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-white/20 text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-white/30 transition backdrop-blur-md border border-black/10"
                        >
                            Sign Up Free at cvmdm.cryptovoip.in
                        </a>
                    </div>
                </div>
            </section>

        </div>
    );
}
