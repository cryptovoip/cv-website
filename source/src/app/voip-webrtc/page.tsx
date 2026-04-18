"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Server, Activity, Phone, Globe,
  Code, Layers, Zap, Building, ArrowRight,
  CheckCircle, ChevronRight, Network, Mic, Video, Database,
  Workflow, GitBranch, BarChart3, Wrench, Shield
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55 },
};

export default function VoipWebRTC() {
  const [activeService, setActiveService] = useState(0);

  const stats = [
    { value: "18+", label: "Years in VoIP & WebRTC", sub: "Since the early SIP days" },
    { value: "Millions", label: "Concurrent sessions architected", sub: "Fault-tolerant at scale" },
    { value: "Full Stack", label: "SIP · RTP · WebRTC · AI", sub: "Every layer of the stack" },
    { value: "Global", label: "Deployments across industries", sub: "Telecom · Defence · Finance" },
  ];

  const techStack = [
    {
      cat: "SIP & VoIP Platforms",
      color: "text-primary border-primary/30 bg-primary/6",
      items: ["FreeSWITCH", "OpenSIPS", "Kamailio", "Asterisk", "Yealink", "Cisco UCM"],
    },
    {
      cat: "WebRTC Infrastructure",
      color: "text-blue-400 border-blue-400/30 bg-blue-400/6",
      items: ["Janus Gateway", "mediasoup", "Pion (Go)", "LiveKit", "Coturn / STUN", "Daily.co"],
    },
    {
      cat: "Media & Routing",
      color: "text-green-400 border-green-400/30 bg-green-400/6",
      items: ["RTPEngine", "SRTP / DTLS", "ICE / TURN", "Opus / G.711 / G.729", "WebRTC-SIP GW", "SBC (Session Border)"],
    },
    {
      cat: "Mobile SDKs",
      color: "text-purple-400 border-purple-400/30 bg-purple-400/6",
      items: ["Linphone SDK (iOS/Android)", "Flexisip Server", "PJSIP", "WebRTC Native SDK", "React Native SIP", "Capacitor / Ionic SIP"],
    },
    {
      cat: "Monitoring & Observability",
      color: "text-orange-400 border-orange-400/30 bg-orange-400/6",
      items: ["Homer SIP Capture", "Grafana / Prometheus", "Kibana / ELK", "CDR Analytics", "Real-time Dashboards", "AlertManager"],
    },
    {
      cat: "AI & Automation",
      color: "text-yellow-400 border-yellow-400/30 bg-yellow-400/6",
      items: ["Pipecat over SIP/WebRTC", "Real-time Transcription", "AI IVR / Voice Bots", "SIP AI Bridges", "LLM on-call routing", "Whisper ASR Integration"],
    },
  ];

  const services = [
    {
      icon: Code,
      label: "Custom Development",
      color: "text-primary",
      activeBorder: "border-primary/50",
      headline: "We build bespoke VoIP & WebRTC applications from the ground up.",
      desc: "Whether you need a carrier-grade SIP platform, a white-label softphone, a WebRTC video conferencing suite, or a custom contact centre — we design and develop it to your exact specification.",
      items: [
        "Custom FreeSWITCH / OpenSIPS modules and ESL applications",
        "WebRTC browser and native apps (React, iOS, Android)",
        "SIP softphones with branding, push notifications, and E2E encryption",
        "Carrier-grade wholesale VoIP platforms (billing, routing, LCR)",
        "Click-to-call and embedded communication widgets",
        "Custom IVR trees, ACD queues, and call-flow logic",
      ],
    },
    {
      icon: Wrench,
      label: "Customise & Enhance",
      color: "text-blue-400",
      activeBorder: "border-blue-400/50",
      headline: "Already running FreeSWITCH, OpenSIPS, or Asterisk? We extend it.",
      desc: "Your existing platform has years of business logic baked in — we extend it without risk. Add features, fix performance bottlenecks, upgrade codec support, and bolt on AI without rebuilding from scratch.",
      items: [
        "FreeSWITCH ESL scripting and module customisation",
        "OpenSIPS routing logic and custom module development",
        "Linphone / Flexisip white-label customisation for iOS & Android",
        "Legacy Asterisk migration and feature porting",
        "SIP trunk upgrades and carrier interconnect optimisation",
        "Codec negotiation, transcoding, and quality improvements",
      ],
    },
    {
      icon: Server,
      label: "Deploy & Configure",
      color: "text-green-400",
      activeBorder: "border-green-400/50",
      headline: "We design and deploy production-ready VoIP infrastructure end-to-end.",
      desc: "From single-server setups to geographically distributed, auto-scaling clusters — we plan the architecture, provision the hardware, configure every service, and hand you a production system.",
      items: [
        "High-availability FreeSWITCH clusters with active-active failover",
        "OpenSIPS load-balanced SIP proxy farms",
        "RTPEngine media proxy fleet for high-concurrency deployments",
        "SIP TLS / SRTP end-to-end encryption configuration",
        "STUN/TURN (Coturn) servers for NAT traversal at scale",
        "Docker / Kubernetes containerised VoIP stack deployment",
      ],
    },
    {
      icon: Layers,
      label: "Complete Infra Build",
      color: "text-purple-400",
      activeBorder: "border-purple-400/50",
      headline: "Start to finish — we design and deliver your entire comms stack.",
      desc: "Need to launch a telecoms product, a UCaaS platform, or an enterprise communication system? We architect and build the complete infrastructure — from network topology to end-user application.",
      items: [
        "Full telecom platform design: SIP, media, billing, management UI",
        "Carrier interconnect, DID provisioning, and number routing",
        "WebRTC gateway bridging SIP to browser/mobile",
        "Multi-tenant PBX with per-tenant isolation and RBAC",
        "On-premise UCaaS for air-gapped / captive networks",
        "Geo-redundant infrastructure across data centres",
      ],
    },
    {
      icon: Zap,
      label: "AI Integration",
      color: "text-yellow-400",
      activeBorder: "border-yellow-400/50",
      headline: "Bring AI into every call, conference, and media stream.",
      desc: "Using our Pipecat expertise and deep SIP/RTP knowledge, we wire AI directly into your existing telephony. Real-time transcription, voice bots, sentiment analysis, and intelligent call routing — without replacing your platform.",
      items: [
        "Pipecat voice agents connected to FreeSWITCH / OpenSIPS via SIP",
        "Real-time Whisper / Deepgram transcription on call legs",
        "AI-powered IVR replacing DTMF with natural language",
        "Post-call summarisation and CRM auto-population",
        "Live sentiment analysis and agent assist dashboards",
        "LLM-driven intelligent call routing and queue prioritisation",
      ],
    },
    {
      icon: BarChart3,
      label: "Optimise & Cut Costs",
      color: "text-orange-400",
      activeBorder: "border-orange-400/50",
      headline: "We find where your infra leaks money and fix it.",
      desc: "Over-provisioned media servers, inefficient codec choices, broken LCR routing, runaway transcoding costs — we audit your stack, identify waste, and implement measurable cost reductions.",
      items: [
        "Full SIP infrastructure audit and cost analysis",
        "Least-Cost Routing (LCR) redesign and carrier renegotiation",
        "Codec optimisation: Opus, G.729 to reduce bandwidth bills",
        "RTPEngine tuning for maximum concurrent sessions per node",
        "Homer SIP capture + Grafana observability implementation",
        "Auto-scaling policies to match capacity to real demand",
      ],
    },
  ];

  const capabilities = [
    { icon: Phone,    title: "SIP Trunking & Routing",     desc: "Design and deploy SIP trunks, LCR, failover routing, and carrier interconnects for any scale." },
    { icon: Video,    title: "Video Conferencing",          desc: "WebRTC-based multi-party video with recording, screen share, and custom branding." },
    { icon: Mic,      title: "Contact Centre Platforms",   desc: "ACD, IVR, agent dashboards, call recording, and real-time wallboards built to spec." },
    { icon: Shield,   title: "Encrypted Communications",   desc: "SIP TLS, SRTP, DTLS-SRTP, and E2EE for defence, banking, and regulated industries." },
    { icon: Network,  title: "WebRTC Applications",        desc: "Browser and mobile WebRTC apps — click-to-call, live support, virtual classrooms." },
    { icon: Database, title: "CDR & Billing Systems",      desc: "Custom CDR processing, real-time billing engines, prepaid/postpaid management." },
    { icon: Workflow, title: "PBX & UCaaS Platforms",      desc: "Multi-tenant PBX, hunt groups, voicemail, fax-to-email, and full UC feature sets." },
    { icon: GitBranch,"title": "Legacy Migration",         desc: "Asterisk to FreeSWITCH, on-prem to cloud, or proprietary PBX to open-source — zero downtime." },
  ] as { icon: React.ElementType; title: string; desc: string }[];

  const industries = [
    { icon: "📡", name: "Telecommunications",  desc: "Wholesale VoIP platforms, carrier interconnects, Class 4/5 switches, and UCaaS products." },
    { icon: "🏢", name: "Enterprise",           desc: "On-premise or cloud PBX, UC platforms, contact centres, and CRM-integrated telephony." },
    { icon: "🪖", name: "Defence & Government", desc: "Air-gapped SIP networks, encrypted voice, captive-network comms, and tactical deployments." },
    { icon: "🏥", name: "Healthcare",           desc: "HIPAA-compliant teleconsultation, on-premise video, patient call routing, and clinical integration." },
    { icon: "🏦", name: "BFSI",                 desc: "Compliant call recording, fraud detection over voice, IVR for banking, and secure conferencing." },
    { icon: "🎓", name: "EdTech",               desc: "WebRTC classrooms, live tutoring platforms, multi-party video SDKs, and attendance tracking." },
  ];

  return (
    <div className="flex flex-col items-center">

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="w-full pt-24 pb-20 bg-gradient-to-b from-dark-bg via-dark-bg to-dark-nav relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/7 blur-[160px] rounded-full" />
          <div className="absolute top-1/4 right-1/3 w-[300px] h-[300px] bg-blue-500/5 blur-[100px] rounded-full" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-primary/15 text-primary border border-primary/30 text-xs font-bold mb-6 tracking-widest uppercase">
              <Phone className="w-3.5 h-3.5" /> 18+ Years · FreeSWITCH · OpenSIPS · WebRTC
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-[1.1]">
              The Deepest{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-green-400 to-blue-400">
                VoIP & WebRTC
              </span>{" "}
              <br className="hidden md:block" />
              Expertise You'll Find
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed mb-4">
              We've been building real-time communication infrastructure since the early SIP days.
              Customise, deploy, scale, or build from scratch —
              every layer of the stack, done right.
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
              FreeSWITCH · OpenSIPS · Kamailio · WebRTC · RTPEngine · Linphone · AI over SIP
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-primary text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-primary/90 transition transform hover:scale-105 shadow-[0_0_20px_rgba(220,231,53,0.25)]"
              >
                Discuss Your Project <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white/8 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/15 transition border border-white/15 backdrop-blur-md"
              >
                Book a Free Audit <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats Bar ───────────────────────────────────────────────────── */}
      <section className="w-full bg-dark-nav/70 border-y border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((s, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.08 }} className="text-center">
                <div className="text-3xl md:text-4xl font-extrabold text-primary mb-1">{s.value}</div>
                <div className="text-sm text-gray-300 font-medium">{s.label}</div>
                <div className="text-xs text-gray-500 mt-1">{s.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services Tabs ───────────────────────────────────────────────── */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div {...fadeUp} className="text-center mb-14">
          <span className="text-xs font-bold text-primary tracking-widest uppercase">What We Do</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
            Every VoIP & WebRTC Service{" "}
            <span className="text-primary">Under One Roof</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Whether you're starting from zero or optimising a platform that serves millions of calls —
            we've done it before and we'll do it for you.
          </p>
        </motion.div>

        {/* Service tab buttons */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {services.map((svc, i) => (
            <button
              key={i}
              onClick={() => setActiveService(i)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                activeService === i
                  ? `${svc.color} border-current bg-white/6`
                  : "text-gray-400 border-white/10 hover:text-white bg-white/3"
              }`}
            >
              <svc.icon className="w-4 h-4" />
              {svc.label}
            </button>
          ))}
        </div>

        {/* Active service panel */}
        <motion.div
          key={activeService}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className={`bg-dark-bg border rounded-3xl p-8 md:p-12 ${services[activeService].activeBorder}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-white/6 border border-white/10 flex items-center justify-center">
                  {(() => { const Icon = services[activeService].icon; return <Icon className={`w-6 h-6 ${services[activeService].color}`} />; })()}
                </div>
                <h3 className="text-2xl font-bold">{services[activeService].label}</h3>
              </div>
              <p className={`text-lg font-semibold mb-3 ${services[activeService].color}`}>
                {services[activeService].headline}
              </p>
              <p className="text-gray-400 leading-relaxed mb-6 text-sm">
                {services[activeService].desc}
              </p>
              <ul className="space-y-3">
                {services[activeService].items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-gray-300 text-sm">
                    <CheckCircle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${services[activeService].color}`} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-dark-nav/60 rounded-2xl p-6 border border-white/6 space-y-5">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Why Us for This</div>
              <ul className="space-y-3">
                {[
                  "18+ years of hands-on production deployments",
                  "We've debugged every SIP edge case imaginable",
                  "Open-source-first — no black-box vendor dependency",
                  "AI-ready architecture built in from day one",
                  "Full post-delivery support and documentation",
                ].map((pt, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-gray-400">
                    <span className={`font-bold mt-0.5 ${services[activeService].color}`}>✓</span>
                    {pt}
                  </li>
                ))}
              </ul>
              <div className="pt-4 border-t border-white/8">
                <Link
                  href="/contact"
                  className={`inline-flex items-center gap-2 font-semibold text-sm ${services[activeService].color} hover:opacity-80 transition`}
                >
                  Talk about this service <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Technology Stack ────────────────────────────────────────────── */}
      <section className="w-full bg-dark-nav/40 border-y border-white/6 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <span className="text-xs font-bold text-primary tracking-widest uppercase">Technology</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-3">
              The Full <span className="text-primary">Technology Stack</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              We work across every layer — from SIP proxies and media engines to mobile SDKs, monitoring, and AI integration.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {techStack.map((group, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ delay: i * 0.07 }}
                className="bg-dark-bg border border-white/8 rounded-2xl p-6"
              >
                <div className={`text-xs font-bold uppercase tracking-widest mb-4 ${group.color.split(" ")[0]}`}>
                  {group.cat}
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className={`px-2.5 py-1 rounded-lg border text-xs font-medium ${group.color}`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Capabilities Grid ────────────────────────────────────────────── */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div {...fadeUp} className="text-center mb-14">
          <span className="text-xs font-bold text-primary tracking-widest uppercase">Capabilities</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-3">
            We Build <span className="text-primary">All of It</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            From a single feature addition to a complete global telecom platform — no scope is too narrow or too large.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {capabilities.map((cap, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -6 }}
              className="bg-dark-bg border border-white/8 p-6 rounded-2xl hover:border-primary/40 transition-colors group"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/12 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <cap.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-bold mb-2">{cap.title}</h3>
              <p className="text-gray-400 text-xs leading-relaxed">{cap.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Industries ──────────────────────────────────────────────────── */}
      <section className="w-full bg-dark-nav/50 border-y border-white/6 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <span className="text-xs font-bold text-primary tracking-widest uppercase">Industries</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-3">
              Deployed Across <span className="text-primary">Every Vertical</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {industries.map((ind, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ delay: i * 0.07 }}
                className="bg-dark-bg border border-white/8 p-6 rounded-2xl hover:border-primary/30 transition-colors"
              >
                <div className="text-3xl mb-3">{ind.icon}</div>
                <h3 className="text-lg font-bold mb-2">{ind.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{ind.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why CryptoVoIP ──────────────────────────────────────────────── */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp}>
            <span className="text-xs font-bold text-primary tracking-widest uppercase">Why Us</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-5">
              Not a Reseller. Not a Generalist.<br />
              <span className="text-primary">Deep Domain Experts.</span>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8 text-base">
              We've been in the trenches of SIP and WebRTC since the protocols were young.
              We understand the failure modes, the scaling limits, the codec negotiation bugs,
              the NAT traversal nightmares, and the carrier interconnect quirks that take
              consultants years to accumulate. That knowledge ships with every project.
            </p>
            <ul className="space-y-4">
              {[
                { title: "Open-source first", body: "No proprietary black boxes. You own and understand every part of your stack." },
                { title: "AI-native thinking", body: "We design VoIP infrastructure with AI integration as a first-class concern — not an afterthought." },
                { title: "End-to-end ownership", body: "From network design to UI to monitoring — one team, one point of accountability." },
                { title: "On-premise capability", body: "We've built for air-gapped defence networks. No one knows offline deployment better." },
                { title: "20+ years, still shipping", body: "We're not retired consultants — we're actively building production systems today." },
              ].map((pt, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-white">{pt.title}</div>
                    <div className="text-gray-400 text-sm">{pt.body}</div>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div {...fadeUp} transition={{ delay: 0.15 }}>
            <div className="bg-dark-bg border border-white/8 rounded-2xl p-8 space-y-5">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Engagement Models</div>
              {[
                {
                  title: "Project-Based",
                  desc: "Fixed-scope delivery: design → build → test → deploy → handover with documentation.",
                  color: "text-primary border-primary/30 bg-primary/6",
                },
                {
                  title: "Consulting & Audit",
                  desc: "One-time or retainer-based: architecture review, cost reduction analysis, security audit.",
                  color: "text-blue-400 border-blue-400/30 bg-blue-400/6",
                },
                {
                  title: "Dedicated Team",
                  desc: "Embed our engineers into your team long-term for ongoing development and platform ownership.",
                  color: "text-green-400 border-green-400/30 bg-green-400/6",
                },
                {
                  title: "Proof of Concept",
                  desc: "Fast 2–4 week PoC to validate your idea before committing to full development budget.",
                  color: "text-purple-400 border-purple-400/30 bg-purple-400/6",
                },
              ].map((model, i) => (
                <div key={i} className={`p-4 rounded-xl border text-sm ${model.color}`}>
                  <div className="font-bold mb-1">{model.title}</div>
                  <div className="opacity-80 text-xs leading-relaxed">{model.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section className="w-full bg-primary py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-5">
              Let's Build Your Communication Infrastructure
            </h2>
            <p className="text-black/70 text-lg mb-10 max-w-2xl mx-auto">
              Share your requirements — existing platform, target scale, pain points —
              and we'll come back with a clear architecture plan and honest estimate.
              No sales fluff.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-900 transition transform hover:scale-105"
              >
                Start the Conversation <ArrowRight className="w-5 h-5 text-primary" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-black/15 text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-black/25 transition border border-black/20"
              >
                Book a Free Audit <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-black/60">
              <span>✓ FreeSWITCH · OpenSIPS · Kamailio</span>
              <span>✓ WebRTC · Janus · mediasoup</span>
              <span>✓ AI over SIP · Pipecat</span>
              <span>✓ On-premise & cloud</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
