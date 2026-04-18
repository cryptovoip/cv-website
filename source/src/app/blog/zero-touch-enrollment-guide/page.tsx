"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Clock,
  User,
  ChevronRight,
  QrCode,
  Server,
  Zap,
  Shield,
  CheckCircle2,
  Smartphone,
  RefreshCw,
  Layers,
  Lock,
  Wifi,
  Package,
  MapPin,
  FileCode,
} from "lucide-react";

const qrPayloadFields = [
  {
    field: "Device Admin Component",
    detail: "The package identifier for the MDM agent that receives Device Owner privileges on the managed device",
  },
  {
    field: "APK Download URL",
    detail: "The internal server URL where the MDM agent APK is hosted — points to your LAN server, never external",
  },
  {
    field: "APK SHA-256 Checksum",
    detail: "Cryptographic hash verified before installation — a modified or tampered APK will be rejected at this step",
  },
  {
    field: "Wi-Fi SSID & Security Type",
    detail: "The device joins your network automatically with no manual Wi-Fi configuration required",
  },
  {
    field: "Wi-Fi Password",
    detail: "Embedded securely in the QR payload — the operator never manually types credentials",
  },
  {
    field: "Server URL",
    detail: "Your internal MDM server address — internal hostname or IP, no external DNS resolution required",
  },
  {
    field: "Configuration ID",
    detail: "The policy profile to apply immediately on enrollment — the device is assigned its correct config at first contact",
  },
  {
    field: "Group Assignment",
    detail: "The device group the enrolling device belongs to, enabling fleet segmentation from provisioning time",
  },
  {
    field: "Custom Device ID Mode",
    detail: "Whether to identify devices by IMEI, serial number, or a custom administrator-assigned identifier",
  },
];

const enrollmentSteps = [
  {
    step: "01",
    icon: RefreshCw,
    title: "Factory Reset",
    detail: "Device is reset to factory state, or is brand new out of the box. No prior configuration. No previous enrollment.",
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
  },
  {
    step: "02",
    icon: Smartphone,
    title: "Tap Six Times",
    detail: "On the Android setup wizard's Welcome screen, tap the screen six times in rapid succession. This activates Android's Device Owner provisioning mode and opens the camera for QR scanning.",
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
  },
  {
    step: "03",
    icon: QrCode,
    title: "Scan QR Code",
    detail: "The camera opens automatically. The operator scans the QR code from the administrator's screen or a printed sheet. No typing. No account credentials. One scan.",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
  },
  {
    step: "04",
    icon: Wifi,
    title: "Auto Wi-Fi Join",
    detail: "The device reads Wi-Fi credentials from the QR payload and joins your internal network automatically. No manual password entry. The device is now on your LAN.",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
  },
  {
    step: "05",
    icon: Package,
    title: "APK Download & Verify",
    detail: "Device downloads the MDM agent APK from your internal server over LAN. SHA-256 checksum is verified against the value embedded in the QR payload. If the checksum does not match, installation halts.",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
  },
  {
    step: "06",
    icon: Lock,
    title: "Device Owner Granted",
    detail: "The MDM agent installs with Device Owner privileges — the highest management authority on the Android platform. All policy APIs become available. The device is under full administrative control.",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
  },
  {
    step: "07",
    icon: FileCode,
    title: "Policy Sync",
    detail: "Device contacts your MDM server on the same LAN, downloads its assigned configuration profile, and applies all policies: app restrictions, network policies, device settings, compliance rules.",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
  },
  {
    step: "08",
    icon: Layers,
    title: "App Deployment",
    detail: "All applications assigned to this device's group are silently downloaded from your server and installed without any user interaction. The operator does not touch the device during this phase.",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
  },
  {
    step: "09",
    icon: CheckCircle2,
    title: "Operational",
    detail: "Device is fully managed, all policies active, all assigned applications installed, registered in your MDM console with its IMEI, serial number, and assigned group. Ready for field use.",
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
  },
];

const postEnrollmentFeatures = [
  {
    icon: Zap,
    title: "Policy Updates",
    detail: "Pushed from your server to devices over LAN via MQTT on port 31000. Policy changes reach devices within seconds of being applied from the console.",
  },
  {
    icon: Package,
    title: "App Updates",
    detail: "New APK version uploaded to your server. Devices notified via MQTT. Download and install silently on next connection — no user action required.",
  },
  {
    icon: Shield,
    title: "Remote Commands",
    detail: "Wipe, lock, and reboot commands sent from your server, received via MQTT even if a device has been offline and just reconnected. Commands are queued and delivered on reconnection.",
  },
  {
    icon: MapPin,
    title: "Location Tracking",
    detail: "Periodic GPS reports sent from devices to your server on your internal network. No external location service involved.",
  },
  {
    icon: CheckCircle2,
    title: "Compliance Monitoring",
    detail: "Devices report policy compliance status on every sync. Non-compliant devices are flagged in your console and can trigger automated response policies.",
  },
  {
    icon: Server,
    title: "Audit Logging",
    detail: "All device events, policy applications, and admin actions are logged to your PostgreSQL database. Full audit trail stored on your hardware under your control.",
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
    slug: "smartphone-military-security-risk",
    title: "Your Soldiers' Smartphones Are Your Biggest Security Vulnerability",
    category: "Defense",
    categoryColor: "text-red-400",
    categoryBg: "bg-red-500/10",
    categoryBorder: "border-red-500/20",
    readTime: "8 min",
  },
];

export default function ZeroTouchEnrollmentGuide() {
  return (
    <div className="flex flex-col items-center">

      {/* ── Article Hero ── */}
      <section className="w-full pt-16 pb-12 bg-gradient-to-b from-dark-bg to-dark-nav border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-green-500/5 blur-[120px] rounded-full top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-gray-500 mb-8"
          >
            <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-400 truncate">Zero-Touch Enrollment Guide</span>
          </motion.nav>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="mb-5">
              <span className="inline-block py-1 px-3 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 text-xs font-bold tracking-widest uppercase">
                How-To
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-6">
              Zero-Touch Enrollment: Deploy 500 Devices in a Day Without Touching Each One
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-3xl">
              QR-based provisioning for air-gapped Android fleets — how a single scan takes a device from factory reset to fully managed, policy-compliant, and application-loaded in under three minutes.
            </p>
            <div className="flex flex-wrap items-center gap-5 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                CryptoVoIP Security Team
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                March 28, 2026
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
            <div className="bg-green-500/5 border border-green-500/20 rounded-3xl p-8 mb-8">
              <p className="text-gray-200 text-lg leading-relaxed">
                When a major defense organization deployed 500+ managed Android devices to field units operating on isolated internal networks, their IT team faced a constraint that eliminated every standard provisioning approach: no public internet on the enrollment network, no access to Google&apos;s Android Enterprise zero-touch infrastructure, and a deployment window that could not accommodate an IT technician spending 20 minutes with each device. The entire fleet was enrolled using CV MDM&apos;s QR-based zero-touch provisioning — on an air-gapped internal network — in a single operational day.
              </p>
            </div>
            <p className="text-gray-400 leading-relaxed">
              This article explains exactly how that works, what is inside the QR code, what happens on the device during enrollment, and how ongoing fleet management operates after the initial provisioning — all without a single outbound connection to the public internet.
            </p>
          </motion.div>

          {/* Section 1 — What Is Zero-Touch */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0">
                <QrCode className="w-4 h-4 text-green-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">What Is Zero-Touch Enrollment?</h2>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Zero-touch enrollment is a provisioning method where a device goes from factory-reset state to fully managed, policy-compliant, and application-loaded without any manual configuration steps by the person holding the device. The administrator generates a QR code from the MDM console once. A field operator scans it. Everything else — network join, APK download, verification, agent installation, Device Owner grant, policy sync, app deployment — is automated.
            </p>

            {/* Comparison table */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
              <div className="bg-red-500/5 border border-red-500/20 rounded-3xl p-6">
                <h3 className="text-white font-bold text-base mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center text-xs text-red-400 font-bold shrink-0">✕</span>
                  Traditional Manual Enrollment
                </h3>
                <ol className="space-y-2 text-gray-400 text-sm">
                  {[
                    "IT tech receives device",
                    "Powers on, works through 30-step setup wizard",
                    "Signs in with corporate account",
                    "Manually installs MDM app",
                    "Accepts device management prompt",
                    "Manually assigns device to group",
                    "Waits for policies to sync",
                    "Installs each application manually",
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-red-400/50 font-mono text-xs mt-0.5 shrink-0">{i + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
                <div className="mt-5 pt-4 border-t border-red-500/15">
                  <div className="text-red-400 font-bold text-sm">20–45 min per device</div>
                  <div className="text-gray-500 text-xs mt-1">500 devices = 100–375 hours of IT labor</div>
                </div>
              </div>

              <div className="bg-green-500/5 border border-green-500/20 rounded-3xl p-6">
                <h3 className="text-white font-bold text-base mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-xs text-green-400 font-bold shrink-0">✓</span>
                  CV MDM Zero-Touch Enrollment
                </h3>
                <ol className="space-y-2 text-gray-400 text-sm">
                  {[
                    "Field operator receives device",
                    "Taps screen 6 times on Welcome screen",
                    "Camera opens automatically",
                    "Scans QR code",
                    "Everything else is automated",
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-green-400/60 font-mono text-xs mt-0.5 shrink-0">{i + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
                <div className="mt-5 pt-4 border-t border-green-500/15">
                  <div className="text-green-400 font-bold text-sm">Under 3 min per device</div>
                  <div className="text-gray-500 text-xs mt-1">500 devices = under 25 hours, no specialist IT at device side</div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Section 2 — QR Code Payload */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <FileCode className="w-4 h-4 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">What Is Actually Inside the QR Code?</h2>
            </div>
            <p className="text-gray-400 leading-relaxed mb-8">
              The QR code is not a URL to a provisioning portal. It is a self-contained JSON payload encoding every piece of information the device needs to complete enrollment autonomously — network credentials, server address, application source, and cryptographic verification. There are no follow-up HTTP calls to external infrastructure required. Everything is either embedded in the payload or available on your internal server.
            </p>

            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-7">
              <div className="flex items-center gap-2 mb-6">
                <QrCode className="w-5 h-5 text-primary" />
                <h3 className="text-white font-bold text-base">CV MDM QR Enrollment Payload — All Nine Fields</h3>
              </div>
              <div className="space-y-4">
                {qrPayloadFields.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex gap-4 py-3 border-b border-white/5 last:border-0"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                    <div>
                      <div className="text-white font-bold text-sm font-mono mb-1">{item.field}</div>
                      <div className="text-gray-400 text-sm leading-relaxed">{item.detail}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 pt-5 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-gray-300 text-sm">All of this from a single scan of a QR code displayed on any screen or printed on a sheet of paper</span>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Section 3 — Enrollment Flow */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">The Enrollment Flow, Step by Step</h2>
            </div>
            <p className="text-gray-400 leading-relaxed mb-8">
              From factory reset to operational: here is exactly what happens during a CV MDM zero-touch enrollment, at each stage.
            </p>
            <div className="space-y-4">
              {enrollmentSteps.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 hover:border-primary/25 transition-all"
                >
                  <div className="flex items-start gap-5">
                    <div className={`w-11 h-11 rounded-xl ${item.bg} border ${item.border} flex items-center justify-center shrink-0`}>
                      <item.icon className={`w-5 h-5 ${item.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1.5">
                        <span className="text-white/20 font-black text-lg select-none leading-none">STEP {item.step}</span>
                        <h3 className="text-white font-bold text-base">{item.title}</h3>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed">{item.detail}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 bg-primary/5 border border-primary/25 rounded-3xl p-6">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-primary shrink-0" />
                <p className="text-gray-200 text-sm font-semibold">
                  Total time from tap-six to operational: <span className="text-primary">90 seconds to 3 minutes</span> depending on APK size and LAN speed. No IT technician required at the device side. No internet connectivity required at any step.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Section 4 — Why QR Works Without Internet */}
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
              <h2 className="text-2xl md:text-3xl font-bold text-white">Why QR-Based Enrollment Works Without Internet</h2>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              This is the architecturally critical distinction. Google&apos;s Android zero-touch enrollment and Samsung Knox Mobile Enrollment both require outbound connectivity to vendor-operated cloud infrastructure during the provisioning process. The device must reach Google&apos;s or Samsung&apos;s servers to complete enrollment. On an air-gapped network, those connections fail — and enrollment does not complete.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              CV MDM&apos;s QR approach eliminates this dependency entirely. The QR payload embeds everything the device needs to complete enrollment: the server address (your internal IP or hostname), the Wi-Fi credentials (for your internal network), the APK source URL (your internal server), and the cryptographic checksum. Every resource the device contacts during enrollment — the Wi-Fi access point, the APK host, the MDM server — lives on your LAN. There are no external lookups, no vendor cloud calls, no DNS resolution to public domains.
            </p>
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-7">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-red-400 font-bold text-sm mb-3 flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-red-500/20 flex items-center justify-center text-xs">✕</span>
                    Google / Knox Zero-Touch
                  </h3>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    {[
                      "Device contacts Google or Samsung servers during provisioning",
                      "Enrollment fails on air-gapped networks",
                      "Requires pre-registration of device IMEIs with vendor portal",
                      "Internet connectivity is a prerequisite, not an option",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-red-400/50 mt-1 shrink-0">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-green-400 font-bold text-sm mb-3 flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center text-xs">✓</span>
                    CV MDM QR Enrollment
                  </h3>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    {[
                      "Every resource needed for enrollment is on your internal server",
                      "Works on fully air-gapped networks with no outbound connectivity",
                      "No pre-registration with any vendor portal required",
                      "Internet connectivity is irrelevant to the enrollment process",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-green-400/60 mt-1 shrink-0">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Section 5 — Fleet Management After Enrollment */}
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
              <h2 className="text-2xl md:text-3xl font-bold text-white">Fleet Management After Enrollment</h2>
            </div>
            <p className="text-gray-400 leading-relaxed mb-8">
              Enrollment is the beginning. All ongoing management is equally network-isolated — every management channel runs between your devices and your server, over your LAN, with no external dependency at any point in the device lifecycle.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {postEnrollmentFeatures.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 hover:border-primary/30 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-white font-bold text-sm mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Section 6 — Practical Considerations */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0">
                <Layers className="w-4 h-4 text-green-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Practical Considerations for Large Deployments</h2>
            </div>
            <p className="text-gray-400 leading-relaxed mb-8">
              Deploying 500 devices in a day is operationally straightforward once the server is configured. Here are the logistics that make large-scale zero-touch rollouts work in practice.
            </p>
            <div className="space-y-4">
              {[
                {
                  title: "Print QR Codes",
                  detail: "Generate one QR code per configuration profile. Print, laminate, and distribute to deployment team leads. Printed QR codes are durable, require no screen, and can be used by any operator in any location on your network.",
                },
                {
                  title: "Staging Area Setup",
                  detail: "Set up a single Wi-Fi access point on your internal network in a designated enrollment area. Devices are scanned there and distributed to their assigned units. The only network requirement is line-of-sight to the internal LAN at this staging point.",
                },
                {
                  title: "Parallel Enrollment",
                  detail: "Ten people with ten printed QR codes can enroll ten devices simultaneously. Each scan initiates an independent enrollment sequence. There is no serialization bottleneck. Throughput scales linearly with the number of operators in the staging area.",
                },
                {
                  title: "Automatic Device Naming",
                  detail: "Configure IMEI-based or serial-number-based auto-naming in the QR payload so devices self-identify in your console at enrollment time. No manual naming step. The console inventory is populated correctly from the first contact.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-5 bg-white/[0.03] border border-white/10 rounded-3xl p-7 items-start">
                  <span className="text-3xl font-black text-white/10 select-none shrink-0 leading-none mt-1">0{i + 1}</span>
                  <div>
                    <h3 className="text-white font-bold text-base mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
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
                  CV MDM — Zero-Touch Provisioning
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3 leading-tight">
                  Ready to Deploy Your Fleet Without Touching Each Device?
                </h2>
                <p className="text-gray-400 leading-relaxed text-base">
                  CV MDM&apos;s QR-based zero-touch enrollment works on air-gapped networks, requires no internet connectivity, and scales to any fleet size. From factory reset to fully managed in under three minutes per device.
                </p>
              </div>
              <div className="flex flex-col gap-3 shrink-0">
                <a
                  href="https://cvmdm.cryptovoip.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-full bg-primary text-black font-bold hover:bg-primary/90 transition transform hover:scale-105 shadow-[0_0_20px_rgba(220,231,53,0.3)] flex items-center gap-2 whitespace-nowrap"
                >
                  Try CV MDM Free
                  <ArrowRight className="w-5 h-5" />
                </a>
                <Link
                  href="/contact"
                  className="px-8 py-4 rounded-full bg-white/10 text-white font-bold hover:bg-white/20 transition border border-white/20 text-center text-sm"
                >
                  Talk to Sales
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
