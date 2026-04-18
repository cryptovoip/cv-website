"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  User,
  ChevronRight,
  PackageCheck,
  Lock,
  ShieldCheck,
  Smartphone,
  Layers,
  KeyRound,
  AlertTriangle,
  CheckCircle2,
  Shield,
} from "lucide-react";

const mdmCapabilities = [
  {
    icon: PackageCheck,
    title: "App Deployment",
    desc: "Push, update, and remove approved applications silently across thousands of devices — no user action required.",
  },
  {
    icon: Lock,
    title: "Policy Enforcement",
    desc: "Mandate full-device encryption, password strength requirements, and disable cameras in designated secure zones.",
  },
  {
    icon: ShieldCheck,
    title: "Remote Wipe",
    desc: "Instantly erase all sensitive data from any lost or stolen device, rendering it useless to an adversary.",
  },
  {
    icon: Smartphone,
    title: "Device Inventory",
    desc: "Automatic collection of IMEI, serial number, OS version, battery status, and network information for every managed device.",
  },
  {
    icon: Layers,
    title: "Kiosk Mode",
    desc: "Lock a device to a single approved application for dedicated-purpose terminals — the user cannot exit without admin credentials.",
  },
  {
    icon: KeyRound,
    title: "Certificate Management",
    desc: "Push trusted CA certificates into device credential stores and automatically strip any unauthorized certificates.",
  },
];

const riskCards = [
  {
    title: "Unrestricted App Installation",
    desc: "Any employee can install any application from any source — including data-exfiltration tools, compromised utilities, or adversary-distributed malware.",
  },
  {
    title: "No Recovery from Device Loss",
    desc: "A lost or stolen device without MDM is a permanent intelligence compromise. There is no remote wipe, no way to confirm what was on it, and no way to lock it out of your systems.",
  },
  {
    title: "Complete Operational Blindness",
    desc: "Without MDM, you have no visibility into what applications are running, which networks devices are connecting to, or whether security policies are being followed.",
  },
  {
    title: "No Compliance Evidence",
    desc: "You cannot demonstrate to an auditor — or to a court — that devices handling sensitive data were encrypted, policy-compliant, or under administrative control at any point in time.",
  },
];

const checklist = [
  "On-premise installation option (self-hosted, no cloud dependency)",
  "Enrollment that functions without any internet connectivity",
  "Role-based access control (RBAC) with granular permission tiers",
  "Cryptographically signed communications between device and server",
  "Remote wipe, lock, and factory reset capabilities",
  "Application integrity verification (SHA-256) before installation",
  "Comprehensive audit trail for compliance and forensic reporting",
  "Support for Samsung Knox deep API and standard Android Enterprise",
];

const relatedArticles = [
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
    slug: "offline-mdm-air-gapped-networks",
    title: "The Offline MDM Imperative: Managing Devices in Air-Gapped Networks",
    category: "Technical",
    categoryColor: "text-primary",
    categoryBg: "bg-primary/10",
    categoryBorder: "border-primary/20",
    readTime: "7 min",
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

export default function WhatIsMDM() {
  return (
    <div className="flex flex-col items-center">

      {/* ── Article Hero ── */}
      <section className="w-full pt-16 pb-12 bg-gradient-to-b from-dark-bg to-dark-nav border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-500/5 blur-[120px] rounded-full top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-gray-500 mb-8"
          >
            <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-400 truncate">What Is MDM?</span>
          </motion.nav>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="mb-5">
              <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-bold tracking-widest uppercase">
                Education
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-6">
              What Is MDM? A Plain-Language Guide for Government &amp; Defense Teams
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-3xl">
              Mobile Device Management explained from first principles — what it does, why every organization with field devices needs it, and what separates basic MDM from an enterprise-grade platform built for classified environments.
            </p>
            <div className="flex flex-wrap items-center gap-5 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                CryptoVoIP Security Team
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                April 14, 2026
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                6 min read
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Article Body ── */}
      <article className="w-full bg-dark-bg py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section 1 — The Simple Answer */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                <BookOpen className="w-4 h-4 text-blue-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">The Simple Answer</h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-5">
              MDM is software that lets your IT team manage every smartphone and tablet in your organization from one central dashboard — remotely, without physically touching each device. Think of it as a remote control panel for your entire mobile fleet.
            </p>
            <p className="text-gray-400 leading-relaxed mb-5">
              Instead of walking to each device to install software, set a configuration rule, or respond to a security incident, your administrator issues commands from a web console. Those commands propagate to every enrolled device within minutes — or seconds, depending on connectivity.
            </p>
            <p className="text-gray-400 leading-relaxed">
              At its core, MDM answers a straightforward organizational question: <em className="text-gray-300">who is in control of the devices that have access to your data?</em> Without MDM, the honest answer is no one. With MDM, it is you.
            </p>
          </motion.section>

          {/* Section 2 — What MDM Actually Does */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <Layers className="w-4 h-4 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">What MDM Actually Does</h2>
            </div>
            <p className="text-gray-400 leading-relaxed mb-8">
              The capabilities of a mature MDM platform span the full device lifecycle — from the moment a device is powered on for the first time through day-to-day management to secure decommissioning. The six core functions every enterprise MDM must deliver:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {mdmCapabilities.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-white/[0.03] border border-white/10 rounded-3xl p-7 hover:border-primary/30 transition-all group"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-white font-bold text-base mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Section 3 — Why Unmanaged Devices Are a Critical Risk */}
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
              <h2 className="text-2xl md:text-3xl font-bold text-white">Why Unmanaged Devices Are a Critical Risk</h2>
            </div>
            <p className="text-gray-400 leading-relaxed mb-8">
              The risk is not hypothetical. Every organization that manages mobile devices without an MDM platform is accepting a specific, measurable set of exposures. These are not theoretical attack scenarios — they are observable failure modes documented across government, military, and enterprise environments.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {riskCards.map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-red-500/5 border border-red-500/20 rounded-3xl p-7"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-7 h-7 rounded-lg bg-red-500/15 flex items-center justify-center shrink-0 mt-0.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                    </div>
                    <h3 className="text-white font-bold text-base leading-snug">{card.title}</h3>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed ml-10">{card.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Section 4 — Government & Defense Requirements */}
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
              <h2 className="text-2xl md:text-3xl font-bold text-white">MDM for Government and Defense: Different Requirements</h2>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Standard commercial MDM platforms — Microsoft Intune, VMware Workspace ONE, IBM MaaS360 — were architected for corporate offices with reliable internet connections. The device enrolls by reaching the vendor&apos;s cloud servers. Policy updates are pulled from vendor infrastructure. Audit logs are stored on external systems. That architecture is functional for a law firm or a retail chain. It is incompatible with classified, air-gapped, or network-isolated environments.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              Government and defense environments impose three requirements that commercial cloud MDM cannot satisfy:
            </p>
            <div className="space-y-4 mb-10">
              {[
                {
                  number: "01",
                  title: "No internet dependency",
                  desc: "Classified networks have no outbound connectivity to public infrastructure. Enrollment, policy sync, and remote commands must all function on an isolated LAN — or even without any network at all during the initial provisioning phase.",
                },
                {
                  number: "02",
                  title: "Data sovereignty",
                  desc: "No device telemetry, no configuration data, and no user information can leave the organization&apos;s own infrastructure. When device data lives on a vendor&apos;s cloud, that data is subject to the vendor&apos;s security posture, jurisdiction, and business decisions — none of which you control.",
                },
                {
                  number: "03",
                  title: "Air-gap compatibility",
                  desc: "Enrollment and ongoing management must function on a fully isolated network with no DNS resolution to external domains, no HTTPS connections to external servers, and no dependency on vendor-operated infrastructure of any kind.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-5 bg-white/[0.03] border border-white/10 rounded-3xl p-7 items-start">
                  <span className="text-3xl font-black text-white/10 select-none shrink-0 leading-none mt-1">{item.number}</span>
                  <div>
                    <h3 className="text-white font-bold text-base mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: item.desc }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Callout */}
            <div className="bg-primary/5 border border-primary/25 rounded-3xl p-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </div>
                <p className="text-gray-200 leading-relaxed text-base">
                  This is exactly the gap CV MDM was built to fill — an enterprise MDM that operates entirely on your own servers, enrolls devices without any internet connection, and <span className="text-primary font-semibold">never sends a byte of your data to an external server</span>.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Section 5 — What to Look For */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">What to Look for in an MDM Platform</h2>
            </div>
            <p className="text-gray-400 leading-relaxed mb-8">
              Not all MDM platforms are equivalent. If your organization operates in a classified, air-gapped, or network-restricted environment, the following capabilities are non-negotiable. Treat this as a minimum-viable checklist for any MDM evaluation:
            </p>
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-7">
              <ul className="space-y-4">
                {checklist.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-base leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.section>

          {/* Section 6 — The Bottom Line */}
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
              <h2 className="text-2xl md:text-3xl font-bold text-white">The Bottom Line</h2>
            </div>
            <div className="space-y-5 text-gray-400 leading-relaxed text-base">
              <p>
                If your organization manages more than ten mobile devices — and any of them ever enter a secure facility, handle sensitive data, or operate in a network-restricted environment — you need MDM. This is not a recommendation for organizations with large budgets or sophisticated IT teams. It is a basic operational requirement for any organization that takes the security of its mobile fleet seriously.
              </p>
              <p>
                The question is not whether to deploy MDM. The question is which MDM can actually work in your environment. For commercial enterprises in standard office environments, the major cloud platforms are adequate. For defense, government, critical infrastructure, and any organization operating across network boundaries — the architecture of the MDM matters as much as its feature list.
              </p>
              <p>
                An MDM that requires internet connectivity to enroll devices, stores your data on external servers, and fails entirely when your network goes offline is not a security tool for your environment. It is a liability. Evaluate your options accordingly.
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
                  CV MDM Platform
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3 leading-tight">
                  See the MDM Built for Air-Gapped Networks
                </h2>
                <p className="text-gray-400 leading-relaxed text-base mb-2">
                  CV MDM deploys entirely on your own infrastructure, enrolls devices without internet connectivity using a single QR code, and gives you full control over your mobile fleet — without any data leaving your network perimeter.
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
                <a
                  href="https://cvmdm.cryptovoip.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-full bg-white/10 text-white font-bold hover:bg-white/20 transition border border-white/20 text-center text-sm"
                >
                  Free Trial — cvmdm.cryptovoip.in
                </a>
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
