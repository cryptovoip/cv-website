"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Clock,
  User,
  ChevronRight,
  WifiOff,
  Server,
  ShieldAlert,
  KeyRound,
  AlertTriangle,
  Shield,
  CheckCircle2,
  Lock,
  Network,
  Zap,
} from "lucide-react";

const failureModes = [
  {
    number: "01",
    icon: ShieldAlert,
    title: "Enrollment Failure",
    desc: "Cloud MDM enrollment requires the device to reach external servers. Microsoft Intune requires connectivity to Azure AD; VMware requires access to Workspace ONE cloud infrastructure. On an air-gapped network, the enrollment handshake never completes — the device cannot be brought under management at all. The entire fleet remains unmanaged before it ever starts.",
  },
  {
    number: "02",
    icon: AlertTriangle,
    title: "Policy Push Failure",
    desc: "Even if a device was enrolled on a connected network and then moved to an isolated environment, policy updates, app deployments, and compliance checks require periodic cloud connectivity to refresh. Without it, devices fall out of compliance silently. Configuration drift accumulates. Policies that were current on enrollment day become stale, and the MDM console reports devices as unresponsive — because they are.",
  },
  {
    number: "03",
    icon: KeyRound,
    title: "Certificate and Token Expiry",
    desc: "Authentication tokens and certificates used by cloud MDM platforms expire on a schedule and must be renewed by calling out to vendor-operated certificate authority infrastructure. On an air-gapped network, those renewal calls never reach their destination. Expired credentials mean the management channel silently closes — the MDM loses the ability to communicate with the device entirely, with no visible warning to the administrator until a command fails.",
  },
];

const captiveNetworkSectors = [
  {
    title: "Nuclear Power Plants",
    desc: "NRC mandates network isolation for control systems under 10 CFR Part 73. Operator tablets and inspection handhelds on these networks need management.",
  },
  {
    title: "Railway Signaling Systems",
    desc: "Traffic management and signaling control networks are physically separated from public infrastructure. Maintenance handhelds operate exclusively on these isolated nets.",
  },
  {
    title: "Hospital PACS Networks",
    desc: "Medical imaging networks (CT, MRI, radiology) are routinely isolated to protect patient data and prevent interference with life-critical equipment.",
  },
  {
    title: "Court and Correctional Facilities",
    desc: "Court case management systems and correctional facility operations run on networks that cannot have any path to public internet by security design.",
  },
  {
    title: "Air Traffic Control Facilities",
    desc: "ATC operational systems are strictly isolated. Maintenance tablets and inspection devices on these networks cannot touch public infrastructure.",
  },
  {
    title: "Central Bank Clearing Systems",
    desc: "Interbank settlement and clearing infrastructure operates on dedicated isolated networks. Operator devices must be managed without any cloud dependency.",
  },
];

const relatedArticles = [
  {
    slug: "what-is-mdm",
    title: "What Is MDM? A Plain-Language Guide for Government & Defense Teams",
    category: "Education",
    categoryColor: "text-blue-400",
    categoryBg: "bg-blue-500/10",
    categoryBorder: "border-blue-500/20",
    readTime: "6 min",
  },
  {
    slug: "smartphone-military-security-risk",
    title: "Your Soldiers' Smartphones Are Your Biggest Security Vulnerability",
    category: "Defense",
    categoryColor: "text-red-400",
    categoryBg: "bg-red-500/10",
    categoryBorder: "border-red-500/20",
    readTime: "8 min",
  },
  {
    slug: "5-breaches-mdm-could-have-prevented",
    title: "5 Real-World Incidents Where MDM Could Have Prevented a Breach",
    category: "Incidents",
    categoryColor: "text-orange-400",
    categoryBg: "bg-orange-500/10",
    categoryBorder: "border-orange-500/20",
    readTime: "10 min",
  },
  {
    slug: "zero-touch-enrollment-guide",
    title: "Zero-Touch Enrollment: Deploy 500 Devices in a Day Without Touching Each One",
    category: "How-To",
    categoryColor: "text-green-400",
    categoryBg: "bg-green-500/10",
    categoryBorder: "border-green-500/20",
    readTime: "7 min",
  },
];

export default function OfflineMDMAirGapped() {
  return (
    <div className="flex flex-col items-center">

      {/* ── Article Hero ── */}
      <section className="w-full pt-16 pb-12 bg-gradient-to-b from-dark-bg to-dark-nav border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-gray-500 mb-8"
          >
            <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-400 truncate">Offline MDM for Air-Gapped Networks</span>
          </motion.nav>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="mb-5">
              <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary border border-primary/30 text-xs font-bold tracking-widest uppercase">
                Technical
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-6">
              The Offline MDM Imperative: Managing Devices in Air-Gapped Networks
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-3xl">
              The tools designed to secure mobile devices on classified networks almost universally require the very internet connection those networks were designed to eliminate. Here is the architecture that actually works.
            </p>
            <div className="flex flex-wrap items-center gap-5 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                CryptoVoIP Security Team
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                April 7, 2026
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                7 min read
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Article Body ── */}
      <article className="w-full bg-dark-bg py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <p className="text-gray-300 text-lg leading-relaxed mb-5">
              Air-gapped networks — networks physically or logically isolated from the public internet — are the backbone of classified defense infrastructure, nuclear facilities, power generation control systems, and government intelligence networks. They exist because their designers understood a fundamental principle: connectivity is exposure. Any device that touches both a public network and an air-gapped network becomes a bridge for attack. The network&apos;s isolation is its primary security property, and anything that compromises that isolation compromises everything behind it.
            </p>
            <p className="text-gray-400 leading-relaxed">
              The irony is that the tools designed to secure mobile devices on these networks — MDM platforms — almost universally require the very internet connection these networks were designed to eliminate. Cloud MDM architecture assumes internet connectivity as a baseline condition of operation. On an air-gapped network, that assumption makes the entire platform nonfunctional. The devices remain unmanaged, unmonitored, and ungoverned — inside the most sensitive infrastructure on Earth.
            </p>
          </motion.div>

          {/* Section 1 — What Is an Air-Gapped Network? */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <WifiOff className="w-4 h-4 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">What Is an Air-Gapped Network?</h2>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              The definition is precise: an air-gapped network is one where no device has a routable path to the public internet. The isolation may be physical — separate cabling, separate radio infrastructure, separate physical locations — or logical, enforced by firewall rules and routing policies that permit no outbound traffic to public address space. In either case, the result is the same: devices on that network cannot reach the public internet, and the public internet cannot reach them.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              Air-gapped networks exist at every tier of sensitive infrastructure. Examples include:
            </p>
            <div className="space-y-3 mb-8">
              {[
                "A military command network in a forward operating base — the internal intranet carrying orders, maps, and personnel data",
                "A SCADA control system network in a nuclear power plant — the operational technology network governing reactor control systems",
                "A government intelligence intranet — NIC (National Intelligence Community network in India) or SIPRNET (Secret Internet Protocol Router Network in the US)",
                "An industrial OT network in a power generation facility — the operational layer controlling turbines, switchgear, and distribution",
                "A submarine&apos;s onboard communications network — inherently isolated from public infrastructure by physical separation",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <p className="text-gray-300 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: item }} />
                </div>
              ))}
            </div>
            <p className="text-gray-400 leading-relaxed">
              The devices on these networks still need managing. Apps need updating. Policies need enforcing. Compromised or lost devices need remote wiping. The operational requirement for device management does not disappear because the network is isolated — it becomes more critical, because the stakes of an unmanaged device in these environments are higher than anywhere else. The challenge is that the management platform must work without ever crossing the boundary those networks were designed to maintain.
            </p>
          </motion.section>

          {/* Section 2 — How Cloud MDM Breaks */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-4 h-4 text-red-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">How Cloud MDM Breaks in Isolation</h2>
            </div>
            <p className="text-gray-400 leading-relaxed mb-8">
              Cloud MDM platforms fail in air-gapped environments through three distinct and cumulative failure modes. Each is independently critical — but in practice, all three occur together, leaving the organization with devices that are simultaneously unenrollable, unmanageable, and eventually entirely disconnected from the MDM system.
            </p>
            <div className="space-y-5">
              {failureModes.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-red-500/5 border border-red-500/20 rounded-3xl p-7"
                >
                  <div className="flex items-start gap-5">
                    <div className="w-11 h-11 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-red-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-red-400/40 font-black text-xl select-none leading-none">{item.number}</span>
                        <h3 className="text-white font-bold text-base">{item.title}</h3>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Section 3 — Architecture of Offline-First MDM */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <Server className="w-4 h-4 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">The Architecture of Offline-First MDM</h2>
            </div>
            <p className="text-gray-400 leading-relaxed mb-8">
              An MDM that genuinely works offline is not a cloud MDM with an offline mode switched on. It is a platform designed from the ground up on the assumption that no internet connection exists or will ever exist. Every dependency — enrollment, policy distribution, app delivery, push notifications, certificate management — must be fulfilled from resources within the organization&apos;s own network. The architecture looks like this:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {[
                { icon: Server, title: "Self-Hosted Server", desc: "Server runs on your infrastructure — Ubuntu Linux, your hardware, your rack. No vendor-operated infrastructure anywhere in the chain." },
                { icon: Network, title: "Internal Enrollment QR", desc: "Enrollment QR code is generated by your server and contains your server's internal IP or hostname. Device connects to your LAN — never to external internet." },
                { icon: Lock, title: "Internal APK Delivery", desc: "APK downloads come from your server's file storage. No external CDN, no vendor-operated app repository, no external HTTP calls during provisioning." },
                { icon: Zap, title: "On-Premises MQTT Broker", desc: "Push notification broker runs on your server. Policy sync is device-to-your-server communication over your LAN — no external message queue." },
                { icon: KeyRound, title: "Internal Certificate Authority", desc: "All certificates are issued and managed by your own CA. Self-signed certificate support means no public CA is needed at any point." },
                { icon: Shield, title: "Local Data Storage", desc: "All device telemetry, logs, configurations, and audit records are stored in a PostgreSQL database running on your server. No data leaves your perimeter." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-white/[0.03] border border-white/10 rounded-3xl p-7 hover:border-primary/30 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-white font-bold text-sm mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Technical Diagram Block */}
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-7 mb-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-primary text-xs font-bold tracking-widest uppercase">Enrollment Flow — All Traffic Stays Inside Perimeter</span>
              </div>
              <div className="relative">
                {/* Perimeter boundary */}
                <div className="border border-dashed border-primary/30 rounded-2xl p-5">
                  <div className="text-primary/50 text-xs font-bold tracking-widest uppercase text-center mb-5">NETWORK PERIMETER</div>
                  <div className="flex flex-col gap-3">
                    {[
                      "Device scans QR code",
                      "Connects to internal Wi-Fi (credentials embedded in QR payload)",
                      "Downloads MDM APK from internal server over LAN",
                      "SHA-256 checksum verified — tampered APK rejected",
                      "Registers with internal MDM server (your IP / hostname)",
                      "Device Owner privileges granted to MDM agent",
                      "Policy configuration pulled from internal server",
                      "Ongoing sync to internal server only via MQTT",
                    ].map((step, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                          <span className="text-primary text-xs font-bold">{i + 1}</span>
                        </div>
                        <div className="flex-1 bg-dark-bg rounded-xl px-4 py-2.5">
                          <span className="text-gray-300 text-sm">{step}</span>
                        </div>
                        {i < 7 && (
                          <div className="absolute left-[1.85rem] mt-10 w-px h-3 bg-primary/20" style={{ top: `${(i * 52) + 96}px` }} />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 pt-4 border-t border-white/10 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-primary text-xs font-semibold">Zero outbound connections to public internet at any step</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Section 4 — CV MDM Offline Architecture */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <Shield className="w-4 h-4 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">CV MDM&apos;s Offline Architecture</h2>
            </div>
            <p className="text-gray-400 leading-relaxed mb-8">
              CV MDM was designed specifically for network-isolated deployments. Every component operates within your infrastructure. Here are the specific technical properties that make this work:
            </p>
            <div className="space-y-4 mb-10">
              {[
                {
                  label: "QR Code Payload",
                  detail: "The enrollment QR code embeds: server hostname or IP address, Wi-Fi SSID and password, APK download URL pointing to your internal server, SHA-256 APK checksum for tamper verification, group assignment, and device ID configuration mode. A single QR encodes the entire enrollment bootstrap.",
                },
                {
                  label: "MQTT Push Broker",
                  detail: "The MQTT broker runs on port 31000 on the same server as the MDM application. No external broker is needed. Push commands — policy updates, remote wipe, lock, reboot — are delivered over your LAN with sub-second latency.",
                },
                {
                  label: "PostgreSQL — Fully Local",
                  detail: "All device telemetry, policy logs, compliance records, and audit trails are stored in a PostgreSQL database running on your server. No data leaves your network boundary. Your audit records are on your hardware, under your physical control.",
                },
                {
                  label: "Failover Architecture",
                  detail: "A secondary server URL can be configured as a failover endpoint. Both primary and secondary servers remain within your network. There is no external service involved in the failover path.",
                },
                {
                  label: "Self-Signed Certificate Support",
                  detail: "CV MDM supports self-signed TLS certificates for the management channel. No public CA is required. Your internal CA issues certificates that your managed devices trust — the entire PKI chain operates within your network perimeter.",
                },
              ].map((item, i) => (
                <div key={i} className="bg-white/[0.03] border border-white/10 rounded-3xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                    <div>
                      <h3 className="text-white font-bold text-sm mb-1.5">{item.label}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{item.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Primary Callout */}
            <div className="bg-primary/5 border border-primary/30 rounded-3xl p-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
                  <Lock className="w-5 h-5 text-primary" />
                </div>
                <p className="text-gray-200 leading-relaxed text-base">
                  Every component of CV MDM — enrollment, policy sync, app delivery, push notifications, audit logging — operates entirely within your network boundary. There are no callbacks to CryptoVoIP servers, no license checks against external services, no telemetry to vendor infrastructure. Once deployed on your server, CV MDM operates as a fully self-contained system with no outbound dependencies whatsoever.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Section 5 — Captive Networks Beyond Military */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <Network className="w-4 h-4 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Captive Networks Are Not Just Military</h2>
            </div>
            <p className="text-gray-400 leading-relaxed mb-8">
              The air-gapped MDM requirement is often framed as a defense-sector problem. It is not. A significant portion of the world&apos;s critical infrastructure operates on isolated networks — and every one of those networks runs Android devices (handheld terminals, operator tablets, inspection devices, inventory scanners) that need managing. None of them can use a cloud MDM solution.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {captiveNetworkSectors.map((sector, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 hover:border-primary/30 transition-all"
                >
                  <h3 className="text-white font-bold text-sm mb-2">{sector.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{sector.desc}</p>
                </motion.div>
              ))}
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mt-6">
              In every one of these sectors, the operational requirement is identical to a military network: the MDM server must live inside the perimeter, enrollment must require no external connectivity, and every management function must execute without ever asking a device to reach the public internet. The attack consequences differ by sector; the architectural requirement is the same.
            </p>
          </motion.section>

          {/* Section 6 — Closing */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">The Architectural Requirement Is Non-Negotiable</h2>
            </div>
            <div className="space-y-5 text-gray-400 leading-relaxed text-base">
              <p>
                If your organization operates an air-gapped or network-isolated environment, the MDM evaluation process should begin with a single binary question: does this platform function with zero outbound internet connectivity? If the answer is anything other than an unambiguous yes — if the vendor qualifies it with &ldquo;limited functionality mode&rdquo; or &ldquo;offline grace periods&rdquo; — the platform is architecturally incompatible with your environment, regardless of its feature list.
              </p>
              <p>
                The cloud MDM vendors are not building the wrong product. They are building the right product for their primary market — enterprise offices with reliable internet connections. The problem is that those products are then evaluated for classified and isolated environments where their core assumption fails. The responsibility for recognizing that mismatch falls to the procurement team, not the vendor.
              </p>
              <p>
                CV MDM was built for the environments where the standard product fails. Its offline-first architecture is not a feature added to a cloud platform — it is the foundational design assumption on which the entire system was built.
              </p>
            </div>
          </motion.section>

        </div>
      </article>

      {/* ── CTA Box ── */}
      <section className="w-full bg-dark-nav border-t border-white/10 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-primary/5 border border-primary/25 rounded-3xl p-8 md:p-10"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
              <div className="flex-1">
                <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary border border-primary/30 text-xs font-bold tracking-widest uppercase mb-4">
                  CV MDM — Offline-First Architecture
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3 leading-tight">
                  MDM That Works Inside Your Perimeter
                </h2>
                <p className="text-gray-400 leading-relaxed text-base">
                  CV MDM deploys entirely on your own infrastructure. Enrollment, policy sync, app delivery, and remote commands all operate on your LAN — with no outbound internet dependency at any step. Built for the environments where cloud MDM fails.
                </p>
              </div>
              <div className="flex flex-col gap-3 shrink-0">
                <Link
                  href="/mdm"
                  className="px-8 py-4 rounded-full bg-primary text-black font-bold hover:bg-primary/90 transition transform hover:scale-105 shadow-[0_0_20px_rgba(220,231,53,0.3)] flex items-center gap-2 whitespace-nowrap"
                >
                  Explore CV MDM
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-4 rounded-full bg-white/10 text-white font-bold hover:bg-white/20 transition border border-white/20 text-center text-sm"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Related Articles ── */}
      <section className="w-full bg-dark-bg border-t border-white/10 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-white mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {relatedArticles.map((article, i) => (
                <Link key={article.slug} href={`/blog/${article.slug}`} className="block group">
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 hover:border-primary/40 hover:bg-white/[0.05] transition-all h-full"
                  >
                    <span className={`inline-block py-0.5 px-2.5 rounded-full ${article.categoryBg} ${article.categoryColor} border ${article.categoryBorder} text-xs font-bold tracking-widest uppercase mb-3`}>
                      {article.category}
                    </span>
                    <h3 className="text-white font-semibold text-sm leading-snug mb-3 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <span className="flex items-center gap-1.5 text-gray-500 text-xs">
                      <Clock className="w-3.5 h-3.5" />
                      {article.readTime} read
                    </span>
                  </motion.div>
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all text-sm"
              >
                View all articles <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
