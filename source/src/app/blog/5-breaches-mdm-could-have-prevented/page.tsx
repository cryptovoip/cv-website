"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Clock,
  User,
  ChevronRight,
  AlertTriangle,
  MapPin,
  Smartphone,
  Radio,
  Package,
  FileWarning,
  Shield,
  CheckCircle2,
  ShieldAlert,
} from "lucide-react";

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
    slug: "offline-mdm-air-gapped-networks",
    title: "The Offline MDM Imperative: Managing Devices in Air-Gapped Networks",
    category: "Technical",
    categoryColor: "text-primary",
    categoryBg: "bg-primary/10",
    categoryBorder: "border-primary/20",
    readTime: "7 min",
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

export default function FiveBreachesMDM() {
  return (
    <div className="flex flex-col items-center">

      {/* ── Article Hero ── */}
      <section className="w-full pt-16 pb-12 bg-gradient-to-b from-dark-bg to-dark-nav border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-orange-500/5 blur-[120px] rounded-full top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-gray-500 mb-8"
          >
            <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-400 truncate">5 Breaches MDM Could Have Prevented</span>
          </motion.nav>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="mb-5">
              <span className="inline-block py-1 px-3 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 text-xs font-bold tracking-widest uppercase">
                Incidents
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-6">
              5 Real-World Incidents Where MDM Could Have Prevented a Breach
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-3xl">
              Documented security failures across military, government, and defense environments — each caused by unmanaged mobile devices doing exactly what unmanaged devices do.
            </p>
            <div className="flex flex-wrap items-center gap-5 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                CryptoVoIP Security Team
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                April 3, 2026
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                10 min read
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
              Mobile devices have been implicated in some of the most consequential security failures of the past decade. In almost every case, the breach was not the result of a sophisticated zero-day exploit or a nation-state offensive cyber operation. It was the result of an unmanaged, unrestricted device doing exactly what unmanaged, unrestricted devices do — running any app installed on them, sharing any data those apps requested, and providing no mechanism for the organization to detect, contain, or reverse the damage.
            </p>
            <p className="text-gray-400 leading-relaxed">
              The following five incidents are documented, publicly reported, and share a common thread: a basic mobile device management policy, technically enforced at the OS level, would have materially reduced or eliminated the damage. These are not theoretical scenarios. They happened.
            </p>
          </motion.div>

          {/* Incident 1 — Strava */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl overflow-hidden">
              {/* Header bar */}
              <div className="bg-orange-500/15 border-b border-orange-500/25 px-7 py-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-0.5">
                    <span className="text-orange-400/50 font-black text-sm select-none">INCIDENT 01</span>
                    <span className="inline-block py-0.5 px-2.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 text-xs font-bold tracking-widest uppercase">2018</span>
                  </div>
                  <h2 className="text-white font-bold text-xl">The Strava Heatmap</h2>
                </div>
              </div>

              <div className="p-7 space-y-6">
                <div>
                  <h3 className="text-white font-bold text-sm tracking-wide uppercase mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-orange-400" />
                    What Happened
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    In January 2018, fitness app company Strava published a global heatmap of user workout data — aggregated GPS tracks from millions of Strava users worldwide. Security researcher Nathan Ruser noticed something anomalous: in remote regions where no civilian population existed, the heatmap lit up brightly with activity patterns. Those patterns — grid sweeps, perimeter routes, repetitive early-morning tracks — outlined classified US and allied military installations in Syria, Afghanistan, Niger, and Somalia.
                  </p>
                  <p className="text-gray-400 leading-relaxed text-sm mt-3">
                    Soldiers had been using fitness trackers synced to the Strava app during their duty routines. Their workout data — GPS position, route, timing, and cadence — was being uploaded to Strava&apos;s servers by default. No one had told the application it was not allowed. No system had blocked it. The application performed its designed function, and in doing so, published the operational patterns of personnel at some of the most sensitive military installations on the planet.
                  </p>
                </div>

                <div className="border-t border-white/10 pt-6">
                  <h3 className="text-white font-bold text-sm tracking-wide uppercase mb-3 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" />
                    How MDM Prevents It
                  </h3>
                  <div className="space-y-2">
                    {[
                      "App whitelisting enforced at OS level blocks Strava — and every other non-approved fitness, social, or tracking application — from ever being installed on a managed device",
                      "GPS access policy for non-approved applications prevents location sharing regardless of what applications are installed",
                      "Network egress policy blocks application data transmission to external servers on managed networks",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-gray-300 text-sm leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Incident 2 — Pegasus / WhatsApp */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl overflow-hidden">
              <div className="bg-red-500/15 border-b border-red-500/25 px-7 py-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center shrink-0">
                  <Radio className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-0.5">
                    <span className="text-red-400/50 font-black text-sm select-none">INCIDENT 02</span>
                    <span className="inline-block py-0.5 px-2.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-bold tracking-widest uppercase">2019</span>
                  </div>
                  <h2 className="text-white font-bold text-xl">NSO Group Pegasus via WhatsApp — CVE-2019-3568</h2>
                </div>
              </div>

              <div className="p-7 space-y-6">
                <div>
                  <h3 className="text-white font-bold text-sm tracking-wide uppercase mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                    What Happened
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    In May 2019, WhatsApp disclosed a critical vulnerability (CVE-2019-3568) in its VoIP stack that allowed attackers to install spyware on a target device by calling it via WhatsApp — without the call needing to be answered, and without leaving a trace in the call log. NSO Group&apos;s Pegasus spyware was delivered through this vector to the devices of journalists, human rights attorneys, political dissidents, and — critically — government officials, intelligence personnel, and military advisors across multiple countries.
                  </p>
                  <p className="text-gray-400 leading-relaxed text-sm mt-3">
                    Once installed, Pegasus provided the attacker with complete access: end-to-end encrypted messages read before encryption, microphone activated for ambient audio recording, camera silently capturing images, real-time GPS location, and full access to contacts and communications history. The attack required no user interaction. The only prerequisite was that WhatsApp was installed on the device.
                  </p>
                  <div className="bg-red-500/5 border border-red-500/20 rounded-2xl px-5 py-4 mt-4">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      <span className="text-red-400 font-semibold">Note on attack surface:</span> This attack specifically targeted government officials and defense-adjacent individuals. The entry point was a personal, unmanaged device carrying WhatsApp. The attack cannot execute against a device on which WhatsApp is blocked by MDM app policy — because the delivery vector does not exist.
                    </p>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-6">
                  <h3 className="text-white font-bold text-sm tracking-wide uppercase mb-3 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" />
                    How MDM Prevents It
                  </h3>
                  <div className="space-y-2">
                    {[
                      "App whitelisting blocks WhatsApp installation on managed government and defense devices — the delivery vector does not exist on a managed device",
                      "Only approved, organizationally audited communication applications are permitted — personal messaging apps are not on the whitelist",
                      "Microphone and camera disable policies prevent audio and visual capture at the OS level even if a device is compromised at the application layer",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-gray-300 text-sm leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Incident 3 — Russian Communications in Ukraine */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            {/* Case Study callout block */}
            <div className="bg-white/[0.03] border border-orange-500/25 rounded-3xl overflow-hidden">
              <div className="bg-orange-500/10 border-b border-orange-500/20 px-7 py-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-500/15 border border-orange-500/25 flex items-center justify-center shrink-0">
                  <Smartphone className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-0.5">
                    <span className="text-orange-400/50 font-black text-sm select-none">INCIDENT 03</span>
                    <span className="inline-block py-0.5 px-2.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 text-xs font-bold tracking-widest uppercase">2022–Present</span>
                    <span className="text-gray-500 text-xs">BBC · Financial Times · Ukrainian Military Intelligence</span>
                  </div>
                  <h2 className="text-white font-bold text-xl">Russian Military Communications Interception in Ukraine</h2>
                </div>
              </div>

              <div className="p-7 space-y-6">
                <div>
                  <h3 className="text-white font-bold text-sm tracking-wide uppercase mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-orange-400" />
                    What Happened
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    Multiple credible sources — including BBC investigations, Financial Times reporting, and statements from Ukrainian military intelligence — have documented that Russian forces extensively used personal, unmanaged mobile phones for operational communications. Soldiers used personal handsets to report unit positions, coordinate movements, transmit orders, and communicate with family. None of these devices were enrolled in any MDM system. None were encrypted to military standards. None were subject to any app restriction policy that could have been technically enforced.
                  </p>
                  <p className="text-gray-400 leading-relaxed text-sm mt-3">
                    Ukrainian signals intelligence exploited this systematically. Intercepts of operational communications were broadcast publicly as psychological operations. Command positions identified through mobile signals were targeted. In at least one documented case analyzed by defense analysts, a senior Russian officer&apos;s location was identified through mobile communications, with lethal consequences.
                  </p>
                  <p className="text-gray-400 leading-relaxed text-sm mt-3">
                    The significance of this case is not that it represents extraordinary intelligence tradecraft. It represents the baseline cost of failing to implement mobile device governance. No zero-day exploits were required. No classified systems were penetrated. The intelligence was generated by the normal operational behavior of consumer smartphones in the hands of personnel with no device management policy governing their use.
                  </p>
                </div>

                <div className="border-t border-white/10 pt-6">
                  <h3 className="text-white font-bold text-sm tracking-wide uppercase mb-3 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" />
                    How MDM Prevents It
                  </h3>
                  <div className="space-y-2">
                    {[
                      "Mandatory use of approved encrypted communication applications only — personal messaging eliminated from the managed device",
                      "Personal app blocking prevents use of consumer communication tools that create SIGINT exposure",
                      "Network restriction policies prevent personal devices from connecting to operational networks while maintaining any public internet connection",
                      "MDM enforcement creates a technical barrier — not merely an administrative policy memo — between personal device use and operational communications",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-gray-300 text-sm leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Incident 4 — Trojanized App */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl overflow-hidden">
              <div className="bg-red-500/15 border-b border-red-500/25 px-7 py-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center shrink-0">
                  <Package className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-0.5">
                    <span className="text-red-400/50 font-black text-sm select-none">INCIDENT 04</span>
                    <span className="inline-block py-0.5 px-2.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-bold tracking-widest uppercase">Documented — Lookout / Check Point</span>
                  </div>
                  <h2 className="text-white font-bold text-xl">Trojanized App Campaign Targeting Military Personnel</h2>
                </div>
              </div>

              <div className="p-7 space-y-6">
                <div>
                  <h3 className="text-white font-bold text-sm tracking-wide uppercase mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                    What Happened
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    Security researchers at Lookout and Check Point have documented multiple campaigns in which threat actors — including state-sponsored groups — distributed trojanized versions of legitimate applications specifically crafted to target military and defense personnel. A notable documented campaign distributed a fake version of a legitimate tactical mapping application used by Israeli Defense Forces. The malicious application was visually identical to the original and distributed through informal channels — links in messaging groups, direct shares between soldiers.
                  </p>
                  <p className="text-gray-400 leading-relaxed text-sm mt-3">
                    The trojanized application contained a remote-access trojan (RAT) that silently exfiltrated contacts, messages, location history, and photographs to command-and-control infrastructure. The attack required only that the target install the application — which they did, because it appeared to be the same tool they were already using, delivered through a channel they trusted. The entire attack surface was the absence of a technical control preventing installation of unverified applications.
                  </p>
                </div>

                <div className="border-t border-white/10 pt-6">
                  <h3 className="text-white font-bold text-sm tracking-wide uppercase mb-3 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" />
                    How MDM Prevents It
                  </h3>
                  <div className="space-y-2">
                    {[
                      "Unknown source installation blocked at OS level — APKs from unofficial distribution channels cannot be installed regardless of user intent or social engineering",
                      "App whitelist enforced at Device Owner level — only digitally-signed, administrator-approved applications can install on managed devices",
                      "No informal app distribution is possible on a managed device — the attack vector is technically eliminated, not just prohibited by policy",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-gray-300 text-sm leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Incident 5 — India WhatsApp Leaks */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl overflow-hidden">
              <div className="bg-orange-500/15 border-b border-orange-500/25 px-7 py-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center shrink-0">
                  <FileWarning className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-0.5">
                    <span className="text-orange-400/50 font-black text-sm select-none">INCIDENT 05</span>
                    <span className="inline-block py-0.5 px-2.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 text-xs font-bold tracking-widest uppercase">India</span>
                  </div>
                  <h2 className="text-white font-bold text-xl">Sensitive Government Documents on Unmanaged WhatsApp Groups</h2>
                </div>
              </div>

              <div className="p-7 space-y-6">
                <div>
                  <h3 className="text-white font-bold text-sm tracking-wide uppercase mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-orange-400" />
                    What Happened
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    Multiple Indian media investigations and government security audits have documented a persistent pattern: government officials at both central and state levels routinely sharing sensitive — and in some cases classified — documents through personal WhatsApp groups on unmanaged personal devices. The documents shared through these channels have included draft budget materials, law enforcement operational plans, inter-ministry communications, and documents bearing security classification markings.
                  </p>
                  <p className="text-gray-400 leading-relaxed text-sm mt-3">
                    The underlying mechanism is simple: officials use WhatsApp because it is convenient and familiar. Their devices are personal, unmanaged, and not subject to any technically enforced data handling policy. When a device is lost, when an official transfers departments, or when an official leaves government service, there is no mechanism to recover documents that have been shared to that device or forwarded from it. The documents exist on potentially dozens of personal devices with no inventory, no recovery capability, and no audit trail.
                  </p>
                </div>

                <div className="border-t border-white/10 pt-6">
                  <h3 className="text-white font-bold text-sm tracking-wide uppercase mb-3 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" />
                    How MDM Prevents It
                  </h3>
                  <div className="space-y-2">
                    {[
                      "DLP (Data Loss Prevention) policy blocks copy-paste operations from managed applications to unmanaged personal apps — documents cannot be extracted from managed channels",
                      "Remote wipe on device loss or personnel departure erases all managed data from the device — including documents in managed app sandboxes",
                      "App policy forces official communications through audited, administrator-managed applications only — WhatsApp and personal messaging apps are blocked",
                      "All data in transit and at rest within managed apps is encrypted — even if a device is compromised, managed content is cryptographically protected",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-gray-300 text-sm leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Closing Section — The Pattern Is Clear */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-4 h-4 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">The Pattern Is Clear</h2>
            </div>
            <div className="space-y-5 text-gray-400 leading-relaxed text-base">
              <p>
                These five incidents span different countries, different threat actors, different attack vectors, and different target sectors. But the underlying enabling condition is identical in every case: devices operating without management policy, outside of organizational visibility, with unrestricted application installation and unrestricted data sharing. None of these required a sophisticated attack. Each required only that a device was present, and unmanaged.
              </p>
              <p>
                The gap between &ldquo;we have a mobile device policy document&rdquo; and &ldquo;we have enforced mobile device management&rdquo; is precisely where these incidents live. A policy document that an employee can choose to ignore — because their personal device is their own property and there is no technical enforcement — is not a security control. It is an aspiration. Technical enforcement at the OS level, the kind that MDM running in Device Owner mode provides, is the difference between an audit finding and a prevented incident.
              </p>
              <p>
                Every one of the countermeasures described above is a standard MDM policy. Not a specialist capability requiring dedicated security personnel. Not an expensive add-on requiring a secondary platform. Standard policy configuration, applied from a single admin console, taking effect across the entire fleet on next sync. The question is not whether the capability exists. The question is whether the organizational decision to deploy it has been made.
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
                  CV MDM — Technical Enforcement
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3 leading-tight">
                  Stop the Next Incident Before It Starts
                </h2>
                <p className="text-gray-400 leading-relaxed text-base">
                  Every countermeasure described in this article is a standard CV MDM policy. App whitelisting, GPS restriction, DLP, remote wipe, sideload blocking — deployed to your entire fleet from one console, enforced at the OS level, operational without internet connectivity.
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
