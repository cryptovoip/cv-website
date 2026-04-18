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
  Radio,
  Package,
  ShieldOff,
  Network,
  CheckCircle2,
  WifiOff,
  Shield,
} from "lucide-react";

const threatVectors = [
  {
    number: "01",
    icon: MapPin,
    title: "Location Metadata",
    desc: "GPS-tagged photographs, fitness application heatmaps, and background location permissions betray operational positions even when personnel believe they are simply using personal applications. A single photo taken near a classified facility, uploaded to any internet-connected service, carries precise coordinates embedded in its EXIF data.",
  },
  {
    number: "02",
    icon: Radio,
    title: "Communication Interception",
    desc: "Personal messaging applications used for operational coordination carry known vulnerabilities. In 2019, a zero-click exploit attributed to NSO Group's Pegasus spyware silently compromised devices belonging to government officials, military advisors, and journalists across multiple countries — requiring no user interaction and no visible indicators of compromise.",
  },
  {
    number: "03",
    icon: Package,
    title: "Malicious App Sideloading",
    desc: "Without MDM enforcement blocking unapproved application sources, any file can be installed on a device. In documented incidents, adversaries have distributed trojanized versions of legitimate applications — navigation tools, prayer timers, messaging clients — specifically crafted to target military and government personnel in theater.",
  },
  {
    number: "04",
    icon: ShieldOff,
    title: "Physical Device Loss",
    desc: "A device containing operational contacts, unit schedules, orders, route data, and communications history that is lost or captured without remote-wipe capability is an intelligence resource. Without MDM, there is no mechanism to erase that data remotely, and no way to know what the device last contained.",
  },
  {
    number: "05",
    icon: Network,
    title: "Network Bridging Attacks",
    desc: "Unmanaged devices that connect to both secure internal networks and external internet simultaneously create unintended pathways into classified infrastructure. A device that connects to the unit's internal Wi-Fi and simultaneously maintains a mobile data connection can act as an involuntary relay — a bridge between the secure network and the public internet.",
  },
];

const mitigationPolicies = [
  "Disable all personal applications; allow only explicitly approved, organizationally managed apps — blocking Strava, social media, and all fitness tracking tools",
  "Block GPS access for all non-approved applications — preventing location metadata in photographs regardless of where the photo is taken",
  "Disable the camera sensor entirely within defined geographic zones or network perimeters — preventing inadvertent photography near sensitive infrastructure",
  "Enforce full-device storage encryption — ensuring that data on a captured or lost device cannot be accessed without the decryption key",
  "Enable remote wipe capability — a lost device becomes an empty, unreadable brick within seconds of the command being issued",
  "Block sideloading of unsigned or unapproved APKs — trojanized applications from unofficial sources cannot be installed regardless of user intent",
  "Enforce network isolation — managed devices cannot simultaneously maintain connections to both secure internal networks and public internet",
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

export default function SmartphoneMilitaryRisk() {
  return (
    <div className="flex flex-col items-center">

      {/* ── Article Hero ── */}
      <section className="w-full pt-16 pb-12 bg-gradient-to-b from-dark-bg to-dark-nav border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-red-500/5 blur-[120px] rounded-full top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-gray-500 mb-8"
          >
            <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-400 truncate">Smartphone Military Security Risk</span>
          </motion.nav>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="mb-5">
              <span className="inline-block py-1 px-3 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-bold tracking-widest uppercase">
                Defense
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-6">
              Your Soldiers&apos; Smartphones Are Your Biggest Security Vulnerability
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-3xl">
              Unmanaged Android devices in operational environments have revealed base locations, leaked orders, and handed adversaries real-time intelligence. This is the threat picture most commanders are not seeing.
            </p>
            <div className="flex flex-wrap items-center gap-5 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                CryptoVoIP Security Team
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                April 10, 2026
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                8 min read
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Article Body ── */}
      <article className="w-full bg-dark-bg py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Opening — Strava */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <div className="bg-red-500/5 border border-red-500/20 rounded-3xl p-8 mb-8">
              <p className="text-gray-200 text-lg leading-relaxed">
                In January 2018, a fitness application called Strava published a global heatmap of user activity. Within days, security researchers had identified the locations of classified military bases in Syria, Afghanistan, Somalia, and Niger — not from satellite imagery or signals intelligence, but from the running routes of soldiers using unmanaged personal fitness trackers. No cyberattack was executed. No classified systems were breached. The data was volunteered.
              </p>
            </div>
            <p className="text-gray-400 leading-relaxed mb-5">
              That incident was not a technical failure. It was a policy failure. No one had told the fitness application it was not allowed. No MDM system had blocked it from running. No device management platform had restricted its GPS access. The application did precisely what it was designed to do — and in doing so, mapped the operational patterns of personnel at some of the most sensitive military installations on Earth.
            </p>
            <p className="text-gray-400 leading-relaxed">
              The Strava incident became public because the data was visible on a consumer heatmap. Most compromises of this category are not visible at all.
            </p>
          </motion.div>

          {/* Section 1 — The Threat */}
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
              <h2 className="text-2xl md:text-3xl font-bold text-white">The Threat Is Not the Adversary&apos;s Sophistication — It Is Our Negligence</h2>
            </div>
            <p className="text-gray-400 leading-relaxed mb-5">
              Every smartphone is, by design, a signals intelligence platform. It tracks location continuously, records audio when applications request it, captures images and embeds GPS coordinates in the metadata, monitors movement patterns, stores a comprehensive contact network, and transmits all of this data to applications that may or may not be secure — often in the background, without the user&apos;s active knowledge.
            </p>
            <p className="text-gray-400 leading-relaxed mb-5">
              In the hands of a trained adversary with access to the data those applications generate, an unmanaged smartphone carried by a soldier, official, or government employee is not a communication tool. It is a sensor array with a cellular uplink and a cooperative human operator who does not know they are being observed.
            </p>
            <p className="text-gray-400 leading-relaxed">
              The threat does not require the adversary to conduct a cyberattack. It does not require breaking encryption or penetrating a classified network. In many documented cases, it requires nothing more than monitoring the data streams that unmanaged devices produce as a matter of their normal operation.
            </p>
          </motion.section>

          {/* Section 2 — Five Threat Vectors */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                <Radio className="w-4 h-4 text-red-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Five Documented Threat Vectors</h2>
            </div>
            <p className="text-gray-400 leading-relaxed mb-8">
              These are not theoretical attack paths derived from security research papers. Each of the following vectors has been exploited against real personnel in documented incidents.
            </p>
            <div className="space-y-5">
              {threatVectors.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-white/[0.03] border border-white/10 rounded-3xl p-7 hover:border-red-500/30 transition-all"
                >
                  <div className="flex items-start gap-5">
                    <div className="shrink-0">
                      <div className="w-11 h-11 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-red-400" />
                      </div>
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

          {/* Section 3 — Russia/Ukraine Case Study */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-4 h-4 text-orange-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">The Russian Signals Failure in Ukraine</h2>
            </div>

            {/* Case Study Block */}
            <div className="bg-white/[0.03] border border-orange-500/20 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-5">
                <span className="inline-block py-1 px-3 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 text-xs font-bold tracking-widest uppercase">
                  Case Study
                </span>
                <span className="text-gray-500 text-xs">Documented — BBC, New York Times, multiple defense analysts</span>
              </div>
              <p className="text-gray-300 leading-relaxed mb-5">
                Reporting from the BBC, the New York Times, and multiple independent defense analysts has documented that Russian forces&apos; widespread use of unmanaged personal mobile phones — which were not enrolled in any MDM system, were not encrypted to organizational standards, and were not subject to any application restrictions — contributed materially to Ukrainian forces&apos; ability to conduct effective signals intelligence operations.
              </p>
              <p className="text-gray-300 leading-relaxed mb-5">
                Unmanaged devices transmitted location data. Unencrypted personal communications were intercepted. Application data was used to track unit movements and identify command positions. Multiple confirmed strikes on Russian command posts have been attributed, at least in part, to intelligence gathered from mobile device signals — not from sophisticated cyber operations, but from the routine data exhaust of consumer smartphones carried by personnel who had no mobile device policy governing their use.
              </p>
              <p className="text-gray-400 leading-relaxed text-sm">
                The significance of this case is not that it represents an extraordinary intelligence operation. It represents the baseline cost of failing to implement mobile device governance. The intelligence collection did not require nation-state capabilities or advanced tooling — it required the absence of the most elementary device management controls.
              </p>
            </div>
          </motion.section>

          {/* Section 4 — MDM Enforcement */}
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
              <h2 className="text-2xl md:text-3xl font-bold text-white">What Proper MDM Enforcement Looks Like</h2>
            </div>
            <p className="text-gray-400 leading-relaxed mb-8">
              Each of the threat vectors described above has a direct, enforceable MDM countermeasure. These are not compensating controls or administrative workarounds — they are OS-level policy restrictions that devices in Device Owner mode enforce at the kernel level, regardless of user action or intent.
            </p>
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-7">
              <ul className="space-y-4">
                {mitigationPolicies.map((policy, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-base leading-snug">{policy}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mt-5">
              These policies can be deployed to an entire fleet simultaneously from a single admin console action. They take effect on next device sync — which, on an MDM with MQTT push, occurs within seconds. The organizational cost of implementing them is measured in minutes of configuration time. The operational cost of not implementing them is documented in the incidents described above.
            </p>
          </motion.section>

          {/* Section 5 — Offline Requirement */}
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
              <h2 className="text-2xl md:text-3xl font-bold text-white">The Offline Requirement</h2>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              The challenge for defense and operational environments is that the threats described above are most acute precisely in the environments where most MDM solutions fail to operate. Forward operating bases, command vehicles, classified facilities, and field operations do not have reliable internet connectivity — and in many cases, any external network connection is itself a security violation.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              A cloud-based MDM that cannot enroll devices, cannot push policies, and cannot execute remote wipe commands without an active internet connection is not a viable security control for these environments. The MDM must itself be deployable on an air-gapped network, capable of operating entirely within the organization&apos;s own network perimeter, with no dependency on external infrastructure for any core function.
            </p>

            {/* Callout */}
            <div className="bg-primary/5 border border-primary/25 rounded-3xl p-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
                  <WifiOff className="w-5 h-5 text-primary" />
                </div>
                <p className="text-gray-200 leading-relaxed text-base">
                  CV MDM deploys entirely on your internal infrastructure, requires no internet connectivity to enroll or manage devices, and enforces all policies at the OS level using Android Enterprise Device Owner APIs — <span className="text-primary font-semibold">the same mechanism used by Google&apos;s own enterprise customers, running entirely within your network perimeter</span>. Enrollment uses a self-contained QR payload that embeds your Wi-Fi credentials, server address, and policy configuration — no external DNS, no cloud relay, no vendor intermediary.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Section 6 — Closing */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <div className="space-y-5 text-gray-400 leading-relaxed text-base">
              <p>
                The smartphone problem in defense and government environments is not new. It is not obscure. It has been documented, analyzed, and reported in open-source intelligence for nearly a decade. What remains remarkable is how consistently organizations continue to treat it as a low-priority administrative concern rather than the active operational vulnerability that the documented evidence shows it to be.
              </p>
              <p>
                The technical controls exist. They are not expensive. They are not operationally disruptive when implemented correctly. They do not require replacing existing devices or rebuilding network infrastructure. They require an MDM platform, a deployment, and a policy decision. The only question is whether that decision is made before or after the next documented incident.
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
                  CV MDM — Defense-Grade Mobile Security
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3 leading-tight">
                  Eliminate the Mobile Device Attack Surface
                </h2>
                <p className="text-gray-400 leading-relaxed text-base">
                  CV MDM gives your organization OS-level enforcement of every policy described in this article — deployed entirely on your own infrastructure, operational without internet connectivity, and built for exactly the environments where these threats are most acute.
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
