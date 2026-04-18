"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap, BookOpen, Mic, Server, Cpu, Globe,
  Smartphone, Code, Brain, Zap, Users, Building,
  CheckCircle, ArrowRight, ChevronRight, Monitor,
  MapPin, Layers, Network, Activity, Star, Briefcase,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55 },
};

export default function Trainings() {
  const [activeAudience, setActiveAudience] = useState(0);

  const tracks = [
    {
      icon: Brain,
      color: "text-primary border-primary/30 bg-primary/8",
      level: "Beginner → Advanced",
      levelColor: "bg-primary/15 text-primary",
      title: "Agentic AI & LLMs",
      tagline: "Build autonomous agents that work for you",
      topics: [
        "What are AI agents vs chatbots — real differences",
        "Prompt engineering and LLM fundamentals (Claude, GPT-4o, Llama)",
        "Building multi-step agentic workflows",
        "Tool use, function calling, and MCP (Model Context Protocol)",
        "RAG: grounding agents in your business knowledge",
        "Deploying agents: cloud, on-premise, and air-gapped",
        "Monetising agents — freelance, product, or SaaS",
      ],
    },
    {
      icon: Mic,
      color: "text-blue-400 border-blue-400/30 bg-blue-400/8",
      level: "Intermediate",
      levelColor: "bg-blue-400/15 text-blue-400",
      title: "Voice & Video Bots with Pipecat",
      tagline: "Ship production voice agents from scratch",
      topics: [
        "Pipecat architecture: STT → LLM → TTS pipeline",
        "Speech-to-Text: Deepgram, AssemblyAI, Whisper",
        "LLM integration: Claude, GPT-4o, Groq, Ollama (offline)",
        "Text-to-Speech: ElevenLabs, Cartesia, Kokoro (local)",
        "WebRTC real-time streaming with Daily.co",
        "RAG + MCP: connecting agents to CRMs and APIs",
        "On-premise offline stack — zero cloud dependency",
        "Deploying and monitoring production voice agents",
      ],
    },
    {
      icon: Server,
      color: "text-green-400 border-green-400/30 bg-green-400/8",
      level: "Beginner → Advanced",
      levelColor: "bg-green-400/15 text-green-400",
      title: "SIP, VoIP & RTP Fundamentals",
      tagline: "Master the protocol stack powering real-time comms",
      topics: [
        "SIP protocol deep dive: REGISTER, INVITE, BYE, OPTIONS",
        "SIP message structure, headers, and call flows",
        "RTP / RTCP — media transport and quality metrics",
        "Codecs: G.711, G.729, Opus — trade-offs and selection",
        "NAT traversal: STUN, TURN, ICE",
        "SIP security: TLS, SRTP, DTLS",
        "Troubleshooting with Wireshark and Homer SIP capture",
        "Designing fault-tolerant VoIP architectures",
      ],
    },
    {
      icon: Zap,
      color: "text-yellow-400 border-yellow-400/30 bg-yellow-400/8",
      level: "Intermediate → Advanced",
      levelColor: "bg-yellow-400/15 text-yellow-400",
      title: "FreeSWITCH Mastery",
      tagline: "From installation to enterprise-grade deployments",
      topics: [
        "FreeSWITCH architecture: core, modules, event system",
        "Installation and configuration on Linux",
        "Dialplan XML: conditions, extensions, applications",
        "ESL (Event Socket Library) scripting in Python/Node",
        "IVR design, call recording, and voicemail",
        "Conference bridges, call queues, and ACD",
        "High-availability clustering and failover",
        "AI integration: connecting Pipecat to FreeSWITCH via SIP",
      ],
    },
    {
      icon: Network,
      color: "text-purple-400 border-purple-400/30 bg-purple-400/8",
      level: "Intermediate → Advanced",
      levelColor: "bg-purple-400/15 text-purple-400",
      title: "OpenSIPS & Kamailio",
      tagline: "Build carrier-grade SIP proxy and routing platforms",
      topics: [
        "OpenSIPS vs Kamailio — when to use which",
        "Routing script fundamentals: request_route, reply_route",
        "Load balancing, failover, and dispatcher module",
        "Registration and location services at scale",
        "OpenSIPS dialplan for LCR (Least Cost Routing)",
        "CDR generation and billing integration",
        "Security: anti-flood, SIP scanner detection, ACL",
        "Kamailio htable, permissions, and custom modules",
      ],
    },
    {
      icon: Globe,
      color: "text-cyan-400 border-cyan-400/30 bg-cyan-400/8",
      level: "Beginner → Advanced",
      levelColor: "bg-cyan-400/15 text-cyan-400",
      title: "WebRTC Development",
      tagline: "Build real-time voice & video apps for the browser",
      topics: [
        "WebRTC API fundamentals: getUserMedia, RTCPeerConnection",
        "Signalling servers: WebSocket, SIP-over-WebSocket",
        "ICE, STUN, TURN — NAT traversal explained",
        "Coturn setup for production-grade TURN servers",
        "Janus WebRTC Gateway — VideoRoom, SIPre, AudioBridge",
        "mediasoup — building scalable SFU architectures",
        "Browser + mobile WebRTC app development",
        "WebRTC ↔ SIP gateway bridging",
      ],
    },
    {
      icon: Activity,
      color: "text-orange-400 border-orange-400/30 bg-orange-400/8",
      level: "Advanced",
      levelColor: "bg-orange-400/15 text-orange-400",
      title: "RTPEngine & Media Proxying",
      tagline: "Scale media handling to millions of concurrent sessions",
      topics: [
        "RTPEngine architecture and integration with OpenSIPS/Kamailio",
        "Media proxying: why, when, and how",
        "Transcoding: codec conversion at scale",
        "SRTP ↔ RTP bridging for encrypted media",
        "Redis-based clustering for high availability",
        "Performance tuning for high concurrent sessions",
        "DTMF handling and RFC 2833",
        "Monitoring RTPEngine with Prometheus + Grafana",
      ],
    },
    {
      icon: Smartphone,
      color: "text-pink-400 border-pink-400/30 bg-pink-400/8",
      level: "Intermediate",
      levelColor: "bg-pink-400/15 text-pink-400",
      title: "Linphone & Mobile VoIP",
      tagline: "Build white-label SIP apps for iOS and Android",
      topics: [
        "Linphone SDK architecture: core, Java, Swift wrappers",
        "Configuring SIP accounts, codecs, and STUN in SDK",
        "Push notifications: APNs (iOS) and FCM (Android)",
        "Flexisip server: push-compatible SIP proxy",
        "Battery-optimised background SIP in mobile apps",
        "White-label customisation: UI, branding, features",
        "Video calls, SRTP encryption, and conference in SDK",
        "End-to-end encrypted messaging over SIP/LIME",
      ],
    },
  ];

  const audiences = [
    {
      label: "Individual / Freelancer",
      icon: Star,
      color: "text-primary",
      activeBg: "bg-primary/10 border-primary/40",
      headline: "Upskill, Get Market-Ready, and Start Earning.",
      sub: "Whether you're a developer switching careers, a student building expertise, or a freelancer expanding your service offerings — our training turns skills into income.",
      bullets: [
        "Job-ready curriculum aligned with what companies actually hire for",
        "Practical, project-based — ship something real by the end",
        "Flexible scheduling: weekends, evenings, self-paced online",
        "1-on-1 mentor sessions with expert trainers",
        "Certificate of completion for LinkedIn and résumés",
        "Guidance on freelance positioning and finding clients",
      ],
      cta: "Enroll as an Individual",
    },
    {
      label: "University / College",
      icon: GraduationCap,
      color: "text-blue-400",
      activeBg: "bg-blue-400/10 border-blue-400/40",
      headline: "Bring Industry-Relevant AI & VoIP Skills to Your Campus.",
      sub: "We partner with universities and colleges to deliver guest lectures, semester modules, student batch training, and specialised workshops that bridge the gap between academia and industry.",
      bullets: [
        "Curriculum-aligned modules on AI, VoIP, WebRTC, and Pipecat",
        "Guest lectures and industry talks by practitioners with 18+ years' experience",
        "Student batch programmes (20–200 students)",
        "Hackathons and capstone project mentorship",
        "Lab setup guidance for VoIP and AI labs",
        "Research collaboration on voice AI, SIP, and edge computing",
      ],
      cta: "Partner With Us",
    },
    {
      label: "Corporate Teams",
      icon: Briefcase,
      color: "text-green-400",
      activeBg: "bg-green-400/10 border-green-400/40",
      headline: "Close Skill Gaps. Ship Faster. Reduce Dependency on Vendors.",
      sub: "Your engineers don't need to spend months figuring out FreeSWITCH or Pipecat. We compress years of learning into intensive, focused bootcamps tailored to your stack.",
      bullets: [
        "Custom curriculum built around your exact tech stack and goals",
        "Bootcamp format: 1-day to 2-week intensive programmes",
        "Delivered at your office or online — we travel",
        "Hands-on labs using your actual infrastructure",
        "Post-training support and Q&A access",
        "Teams of 5 to 100+ engineers trained simultaneously",
      ],
      cta: "Request Corporate Training",
    },
    {
      label: "Enterprise",
      icon: Building,
      color: "text-purple-400",
      activeBg: "bg-purple-400/10 border-purple-400/40",
      headline: "Platform-Specific Deep Dives for Your Engineering Organisation.",
      sub: "Large organisations deploying FreeSWITCH clusters, OpenSIPS farms, or Pipecat-based agent fleets need trainers who've done it at scale. That's us.",
      bullets: [
        "Architecture review + training combined in one engagement",
        "Custom scenarios based on your live production systems",
        "Onboarding packages for new engineering hires",
        "Train-the-trainer programmes for internal knowledge transfer",
        "Ongoing retainer for technical enablement across quarters",
        "NDA-covered sessions for sensitive infrastructure topics",
      ],
      cta: "Discuss Enterprise Training",
    },
    {
      label: "Research Institutions",
      icon: Cpu,
      color: "text-orange-400",
      activeBg: "bg-orange-400/10 border-orange-400/40",
      headline: "Deep Technical Enablement for Research Teams.",
      sub: "Building voice AI systems, exploring real-time communications protocols, or researching AI agents in critical infrastructure? We provide targeted technical sessions that accelerate your research.",
      bullets: [
        "Deep-dive sessions on SIP, RTP, WebRTC, and Pipecat internals",
        "Offline/air-gapped AI stack (Whisper + Ollama + Kokoro) workshops",
        "Voice AI security and privacy research guidance",
        "Custom lab environments for protocol experimentation",
        "Joint documentation and workshop materials",
        "Collaboration on publications and technical reports",
      ],
      cta: "Contact for Research Training",
    },
  ];

  const deliveryModes = [
    {
      icon: Monitor,
      title: "Online Live",
      color: "border-primary/40",
      iconColor: "text-primary",
      desc: "Instructor-led sessions over Zoom or Google Meet. Scheduled batches or 1-on-1. Recorded for later review.",
      features: ["Live Q&A with trainer", "Screen-share labs", "Session recordings", "LMS access"],
    },
    {
      icon: MapPin,
      title: "On-Site / Offline",
      color: "border-blue-400/40",
      iconColor: "text-blue-400",
      desc: "Trainer travels to your office, campus, or facility. Ideal for corporate teams, universities, and enterprise engagements.",
      features: ["Your premises, your schedule", "Hands-on lab setup", "Team workshops", "Whiteboard deep dives"],
    },
    {
      icon: Layers,
      title: "Hybrid",
      color: "border-green-400/40",
      iconColor: "text-green-400",
      desc: "Mix of online and in-person. Theory online, hands-on labs on-site. Best of both worlds for distributed teams.",
      features: ["Flexible scheduling", "On-site for key sessions", "Remote for theory", "Custom pace"],
    },
  ];

  const outcomes = [
    { icon: "🚀", title: "Market Ready", body: "Every track ends with a deployable project you can show employers or clients — not just a certificate." },
    { icon: "💰", title: "Start Earning", body: "We teach you what companies pay for. VoIP engineers and AI agent developers are in high demand globally." },
    { icon: "🛠️", title: "Hands-On First", body: "No death-by-slides. Every session has labs, real configs, and something running by the end." },
    { icon: "🎓", title: "Expert Trainers", body: "Trainers with 18+ years of production deployments — not educators reading from a textbook." },
    { icon: "📡", title: "Latest Curriculum", body: "Updated constantly. Pipecat, MCP, Agentic AI — we teach what's shipping in production today." },
    { icon: "🔒", title: "Offline & Secure", body: "Air-gapped lab environments available for defence, government, and classified research training." },
  ];

  return (
    <div className="flex flex-col items-center">

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="w-full pt-24 pb-20 bg-gradient-to-b from-dark-bg via-dark-bg to-dark-nav relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/7 blur-[160px] rounded-full" />
          <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-blue-500/5 blur-[100px] rounded-full" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-primary/15 text-primary border border-primary/30 text-xs font-bold mb-6 tracking-widest uppercase">
              <GraduationCap className="w-3.5 h-3.5" /> Expert-Led · Hands-On · Market-Ready
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-[1.05]">
              Learn the Skills<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-green-400 to-blue-400">
                Companies Pay For
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed mb-4">
              Professional training in AI Agents, Voice & Video Bots, SIP, VoIP, WebRTC,
              FreeSWITCH, OpenSIPS, Kamailio, RTPEngine, and Linphone —
              taught by practitioners with 18+ years of real production experience.
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
              Individual · University · Corporate · Enterprise · Research<br />
              <span className="text-primary font-semibold">Online & On-Site worldwide.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-primary text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-primary/90 transition transform hover:scale-105 shadow-[0_0_20px_rgba(220,231,53,0.25)]"
              >
                Enroll Now <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white/8 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/15 transition border border-white/15 backdrop-blur-md"
              >
                Get Custom Curriculum <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Why Train With Us ────────────────────────────────────────────── */}
      <section className="w-full bg-dark-nav/60 border-y border-white/6 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {outcomes.map((o, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ delay: i * 0.07 }}
                className="bg-dark-bg border border-white/8 rounded-2xl p-5 text-center hover:border-primary/30 transition-colors"
              >
                <div className="text-3xl mb-3">{o.icon}</div>
                <div className="font-bold text-sm mb-2 text-white">{o.title}</div>
                <div className="text-xs text-gray-500 leading-relaxed">{o.body}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Course Tracks ────────────────────────────────────────────────── */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div {...fadeUp} className="text-center mb-14">
          <span className="text-xs font-bold text-primary tracking-widest uppercase">Course Tracks</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
            8 Specialised <span className="text-primary">Training Tracks</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Deep, practical programmes covering every technology we ship in production.
            Pick one track or combine them into a complete learning path.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {tracks.map((track, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ delay: (i % 4) * 0.07 }}
              className={`bg-dark-bg border rounded-2xl p-7 hover:border-opacity-70 transition-colors group ${track.color.split(" ").find(c => c.startsWith("border"))}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center flex-shrink-0 ${track.color}`}>
                  <track.icon className="w-6 h-6" />
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${track.levelColor}`}>
                  {track.level}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-1">{track.title}</h3>
              <p className="text-sm text-gray-500 italic mb-5">{track.tagline}</p>
              <ul className="space-y-2">
                {track.topics.map((topic, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-gray-400 text-sm">
                    <CheckCircle className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${track.color.split(" ")[0]}`} />
                    {topic}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className={`inline-flex items-center gap-1.5 mt-5 text-sm font-semibold ${track.color.split(" ")[0]} hover:opacity-80 transition`}
              >
                Enquire about this track <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Who We Train ─────────────────────────────────────────────────── */}
      <section className="w-full bg-dark-nav/40 border-y border-white/6 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-12">
            <span className="text-xs font-bold text-primary tracking-widest uppercase">Audiences</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
              We Train <span className="text-primary">Everyone</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              From a solo developer building their first voice agent to an enterprise onboarding 100 engineers — we customise every engagement.
            </p>
          </motion.div>

          {/* Audience tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {audiences.map((a, i) => (
              <button
                key={i}
                onClick={() => setActiveAudience(i)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                  activeAudience === i
                    ? `${a.color} border-current bg-white/6`
                    : "text-gray-400 border-white/10 hover:text-white bg-white/3"
                }`}
              >
                <a.icon className="w-4 h-4" />
                {a.label}
              </button>
            ))}
          </div>

          {/* Active audience panel */}
          <motion.div
            key={activeAudience}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className={`bg-dark-bg border rounded-3xl p-8 md:p-12 ${audiences[activeAudience].activeBg}`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/6 border border-white/10 flex items-center justify-center">
                    {(() => { const Icon = audiences[activeAudience].icon; return <Icon className={`w-6 h-6 ${audiences[activeAudience].color}`} />; })()}
                  </div>
                  <h3 className="text-2xl font-bold">{audiences[activeAudience].label}</h3>
                </div>
                <p className={`text-lg font-semibold mb-3 ${audiences[activeAudience].color}`}>
                  {audiences[activeAudience].headline}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {audiences[activeAudience].sub}
                </p>
                <ul className="space-y-3">
                  {audiences[activeAudience].bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-gray-300">
                      <CheckCircle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${audiences[activeAudience].color}`} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-dark-nav/60 rounded-2xl p-6 border border-white/6 space-y-4">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Available Tracks</div>
                <div className="flex flex-wrap gap-2">
                  {["Agentic AI & LLMs", "Voice & Video Bots", "SIP & VoIP", "FreeSWITCH", "OpenSIPS & Kamailio", "WebRTC", "RTPEngine", "Linphone & Mobile VoIP"].map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded-lg bg-white/6 border border-white/10 text-xs text-gray-400">{t}</span>
                  ))}
                </div>
                <div className="pt-3 border-t border-white/8 text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Delivery</div>
                <div className="flex gap-2 flex-wrap">
                  {["Online Live", "On-Site", "Hybrid"].map((m) => (
                    <span key={m} className="px-3 py-1 rounded-full bg-primary/12 border border-primary/25 text-xs text-primary font-semibold">{m}</span>
                  ))}
                </div>
                <div className="pt-4 border-t border-white/8">
                  <Link
                    href="/contact"
                    className={`inline-flex items-center gap-2 font-bold text-sm ${audiences[activeAudience].color} hover:opacity-80 transition`}
                  >
                    {audiences[activeAudience].cta} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Delivery Modes ───────────────────────────────────────────────── */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div {...fadeUp} className="text-center mb-14">
          <span className="text-xs font-bold text-primary tracking-widest uppercase">How We Deliver</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-3">
            Train Your Way — <span className="text-primary">Online or On-Site</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Our trainers travel globally for on-site engagements. For distributed teams, live online sessions with real labs work just as well.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {deliveryModes.map((mode, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ delay: i * 0.1 }}
              className={`bg-dark-bg border rounded-2xl p-8 hover:border-opacity-70 transition-colors ${mode.color}`}
            >
              <mode.icon className={`w-10 h-10 mb-5 ${mode.iconColor}`} />
              <h3 className="text-xl font-bold mb-3">{mode.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-5">{mode.desc}</p>
              <ul className="space-y-2">
                {mode.features.map((f) => (
                  <li key={f} className={`flex items-center gap-2 text-sm ${mode.iconColor}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current flex-shrink-0" />
                    <span className="text-gray-300">{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Learning Path Banner ─────────────────────────────────────────── */}
      <section className="w-full bg-dark-nav/50 border-y border-white/6 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeUp}>
            <span className="text-xs font-bold text-primary tracking-widest uppercase">Suggested Learning Path</span>
            <h2 className="text-2xl md:text-3xl font-bold mt-3 mb-8">
              From Zero to Deployable in One Learning Path
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-0">
              {[
                { step: "SIP & VoIP Basics", color: "bg-primary/15 border-primary/30 text-primary" },
                { step: "FreeSWITCH / OpenSIPS", color: "bg-green-400/15 border-green-400/30 text-green-400" },
                { step: "WebRTC Dev", color: "bg-cyan-400/15 border-cyan-400/30 text-cyan-400" },
                { step: "Agentic AI & LLMs", color: "bg-blue-400/15 border-blue-400/30 text-blue-400" },
                { step: "Pipecat Voice Agents", color: "bg-purple-400/15 border-purple-400/30 text-purple-400" },
                { step: "Ship & Earn 🚀", color: "bg-primary/20 border-primary/50 text-primary" },
              ].map((s, i, arr) => (
                <div key={i} className="flex items-center gap-2">
                  <span className={`px-3 py-2 rounded-xl border text-xs font-bold ${s.color}`}>
                    {s.step}
                  </span>
                  {i < arr.length - 1 && (
                    <span className="text-gray-600 text-lg hidden md:block">→</span>
                  )}
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-sm mt-6">
              Each track is standalone — or combine them into a structured path. We'll help you plan the right sequence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section className="w-full bg-primary py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-5">
              Ready to Start Learning?
            </h2>
            <p className="text-black/70 text-lg mb-4 max-w-2xl mx-auto">
              Tell us who you are, what you want to learn, and your preferred format.
              We'll come back with a curriculum, schedule, and pricing — fast.
            </p>
            <p className="text-black/60 text-sm mb-10">
              Individual enrolments · University partnerships · Corporate bootcamps · Enterprise enablement · Research programmes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-900 transition transform hover:scale-105"
              >
                Enroll or Enquire <ArrowRight className="w-5 h-5 text-primary" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-black/15 text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-black/25 transition border border-black/20"
              >
                Request Custom Curriculum <BookOpen className="w-5 h-5" />
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-black/55">
              <span>✓ Online live & on-site</span>
              <span>✓ 18+ years of trainer experience</span>
              <span>✓ Project-based, hands-on labs</span>
              <span>✓ Worldwide delivery</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
