"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mic, Video, Bot, Code, Activity, Brain, Zap, Globe,
  Shield, Server, Phone, MessageSquare, Database, CloudOff,
  Cpu, ArrowRight, CheckCircle, Users, Layers, Network,
  Workflow, Settings, ChevronRight, Building, Combine
} from "lucide-react";

const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.55 } };

export default function AIBots() {
  const [activeUseCase, setActiveUseCase] = useState(0);
  const [activeStack, setActiveStack] = useState(0);

  const stats = [
    { value: "$79B", label: "Voice AI market by 2034", sub: "29.5% CAGR" },
    { value: "340%", label: "YoY growth in enterprise deployments", sub: "2024 → 2025" },
    { value: "331%", label: "Average 3-year ROI", sub: "<6 month payback" },
    { value: "<500ms", label: "End-to-end agent latency", sub: "Real-time feel" },
  ];

  const capabilities = [
    {
      icon: Mic,
      title: "Voice AI Agents",
      desc: "Real-time conversational voice agents that handle inbound calls, outbound campaigns, customer service, and complex multi-turn dialogues — 24/7 without human intervention.",
    },
    {
      icon: Video,
      title: "Video AI Agents",
      desc: "Full WebRTC video agents for interviews, sales demos, onboarding, and client interactions. The agent sees, hears, and responds — indistinguishable from a human call.",
    },
    {
      icon: Brain,
      title: "RAG-Powered Intelligence",
      desc: "Agents grounded in your company knowledge: product docs, FAQs, policies, pricing. Retrieval-Augmented Generation eliminates hallucinations and keeps responses accurate.",
    },
    {
      icon: Network,
      title: "MCP Server Integration",
      desc: "Using Anthropic's Model Context Protocol, agents connect to any business system — Salesforce, HubSpot, Slack, databases — via standardised, auditable tool calls.",
    },
    {
      icon: Workflow,
      title: "CRM & Business Automation",
      desc: "Every conversation auto-updates your CRM: lead creation, deal stages, ticket generation, appointment scheduling. Agents complete workflows, not just conversations.",
    },
    {
      icon: CloudOff,
      title: "On-Premise & Offline AI",
      desc: "Full offline stack: Whisper.cpp (STT) + Ollama/vLLM (LLM) + Kokoro (TTS). Deploy in air-gapped networks with zero API costs and complete data sovereignty.",
    },
    {
      icon: Cpu,
      title: "Custom AI Model Integration",
      desc: "Not locked to any provider. Mix Groq's ultra-fast inference, ElevenLabs voice quality, Deepgram's accuracy — or run your own fine-tuned models at any layer.",
    },
    {
      icon: Globe,
      title: "AI-Enabled Websites",
      desc: "Replace static contact forms with live AI agents. Visitors get instant answers, qualify themselves, book demos, and complete purchases — handled entirely by your agent.",
    },
    {
      icon: Layers,
      title: "Agent-as-a-Platform",
      desc: "We architect white-label infrastructure so you become the provider. Sell AI agent services to your own clients under your brand, powered by your server.",
    },
  ];

  const useCases = [
    {
      industry: "Customer Service",
      icon: Phone,
      color: "text-primary",
      border: "border-primary/40",
      headline: "Cut support costs by 50%. Resolve 60% of calls without a human.",
      items: [
        "24/7 inbound call handling with natural conversation",
        "Automatic ticket creation and CRM record updates",
        "Escalation routing to human agents with full context",
        "Multi-language support across all channels",
        "Post-call summary and sentiment analysis",
      ],
      stat: "50% cost reduction · 39% faster handle time",
    },
    {
      industry: "Sales & Lead Gen",
      icon: Users,
      color: "text-blue-400",
      border: "border-blue-400/40",
      headline: "Outbound campaigns that qualify, pitch, and book — automatically.",
      items: [
        "AI outbound calls for lead qualification and follow-up",
        "Dynamic pitch personalisation using CRM context",
        "Real-time objection handling with RAG knowledge base",
        "Instant calendar booking via Calendly / Google Calendar",
        "Automatic deal stage updates in your CRM",
      ],
      stat: "3× pipeline capacity · Zero SDR cost per call",
    },
    {
      industry: "Healthcare",
      icon: Activity,
      color: "text-green-400",
      border: "border-green-400/40",
      headline: "Patient intake, appointment booking, and clinical assistance — on-premise.",
      items: [
        "AI receptionist for appointment scheduling and reminders",
        "Symptom triage and pre-visit questionnaire collection",
        "Insurance verification via voice or video",
        "On-premise deployment for HIPAA/health data compliance",
        "Clinical note dictation and summarisation",
      ],
      stat: "37.3% CAGR in healthcare voice AI · Full HIPAA compliance",
    },
    {
      industry: "Defence & Government",
      icon: Shield,
      color: "text-yellow-400",
      border: "border-yellow-400/40",
      headline: "Air-gapped voice agents for classified and captive networks.",
      items: [
        "100% offline deployment — no internet or cloud APIs",
        "On-premise STT/LLM/TTS stack (Whisper + Ollama + Kokoro)",
        "Role-based access and multi-tenant admin control",
        "Secure MCP integrations with internal systems only",
        "Audit logs and HMAC-signed interaction records",
      ],
      stat: "Zero cloud dependency · Full data sovereignty",
    },
    {
      industry: "Finance & BFSI",
      icon: Building,
      color: "text-purple-400",
      border: "border-purple-400/40",
      headline: "Voice agents handling 156K calls/month with 94% first-call resolution.",
      items: [
        "Account inquiry, balance checks, transaction disputes via voice",
        "KYC/identity verification using voice biometrics",
        "Loan application pre-qualification calls",
        "Fraud alert outbound calls with live escalation",
        "Regulatory-compliant call recording and transcription",
      ],
      stat: "$7.7M annual savings per enterprise deployment",
    },
    {
      industry: "E-commerce & Retail",
      icon: Globe,
      color: "text-orange-400",
      border: "border-orange-400/40",
      headline: "From browsing to purchase — the entire journey handled by AI.",
      items: [
        "AI website agent answers product questions in real-time",
        "Order status, returns, and complaint resolution via voice",
        "Upsell and cross-sell during support interactions",
        "Post-purchase follow-up and review collection",
        "Shopify / WooCommerce direct integration",
      ],
      stat: "44% boost in CSAT · 80% operational cost reduction",
    },
  ];

  const stackTabs = [
    {
      label: "Cloud Stack",
      icon: Globe,
      color: "text-primary",
      activeBg: "bg-primary/10 border-primary/40",
      pipeline: [
        { step: "Voice Input", tech: "WebRTC / SIP / Phone", color: "bg-blue-500/20 border-blue-500/40 text-blue-300" },
        { step: "Speech-to-Text", tech: "Deepgram · AssemblyAI · Whisper API", color: "bg-purple-500/20 border-purple-500/40 text-purple-300" },
        { step: "LLM Brain", tech: "Claude · GPT-4o · Gemini · Groq", color: "bg-primary/20 border-primary/40 text-primary" },
        { step: "RAG + MCP Tools", tech: "Vector DB · CRM · Custom APIs", color: "bg-orange-500/20 border-orange-500/40 text-orange-300" },
        { step: "Text-to-Speech", tech: "ElevenLabs · Cartesia · Deepgram", color: "bg-green-500/20 border-green-500/40 text-green-300" },
        { step: "Response Delivery", tech: "WebRTC / SIP / Browser", color: "bg-blue-500/20 border-blue-500/40 text-blue-300" },
      ],
      note: "End-to-end latency: 300–500ms · Best-in-class provider mix · No vendor lock-in",
    },
    {
      label: "On-Premise Stack",
      icon: CloudOff,
      color: "text-yellow-400",
      activeBg: "bg-yellow-400/10 border-yellow-400/40",
      pipeline: [
        { step: "Voice Input", tech: "WebRTC / SIP (local)", color: "bg-blue-500/20 border-blue-500/40 text-blue-300" },
        { step: "Speech-to-Text", tech: "Whisper.cpp (GPU/CPU)", color: "bg-purple-500/20 border-purple-500/40 text-purple-300" },
        { step: "LLM Brain", tech: "Ollama · vLLM · Llama · Mistral", color: "bg-yellow-400/20 border-yellow-400/40 text-yellow-300" },
        { step: "RAG + MCP Tools", tech: "Local Vector DB · Internal APIs only", color: "bg-orange-500/20 border-orange-500/40 text-orange-300" },
        { step: "Text-to-Speech", tech: "Kokoro TTS · Piper · Coqui", color: "bg-green-500/20 border-green-500/40 text-green-300" },
        { step: "Response Delivery", tech: "WebRTC (LAN only, zero internet)", color: "bg-blue-500/20 border-blue-500/40 text-blue-300" },
      ],
      note: "Zero internet required · No API costs · Air-gap & HIPAA ready · Full data sovereignty",
    },
  ];

  const integrations = [
    { cat: "CRM", items: ["Salesforce", "HubSpot", "Zoho CRM", "Pipedrive", "Freshsales"] },
    { cat: "Communication", items: ["Twilio", "Vonage", "FreeSWITCH", "OpenSIPS", "WebRTC"] },
    { cat: "AI Models", items: ["Claude (Anthropic)", "GPT-4o", "Gemini", "Llama 3", "Mistral"] },
    { cat: "STT Providers", items: ["Deepgram", "AssemblyAI", "Whisper", "Gladia", "Azure Speech"] },
    { cat: "TTS Providers", items: ["ElevenLabs", "Cartesia", "Kokoro", "Deepgram TTS", "Piper"] },
    { cat: "MCP Servers", items: ["Slack", "Google Drive", "GitHub", "Postgres", "Custom APIs"] },
    { cat: "Calendars & Booking", items: ["Calendly", "Google Calendar", "Cal.com", "Acuity"] },
    { cat: "E-commerce", items: ["Shopify", "WooCommerce", "Stripe", "Razorpay"] },
  ];

  const whyCustom = [
    {
      title: "vs Vapi / Retell / Bland",
      points: [
        "Platforms charge per-minute markup on top of API costs",
        "You're locked into their pipeline — can't own the code",
        "No video agents, no offline mode, no air-gap support",
        "Generic templates can't handle complex business logic",
      ],
      color: "border-red-500/30",
      badge: "Platform Limitations",
      badgeColor: "bg-red-500/10 text-red-400 border-red-500/30",
    },
    {
      title: "CryptoVoIP Custom Build",
      points: [
        "You own every line of code — no recurring platform fees",
        "Mix the best provider at each layer (Groq speed + ElevenLabs voice)",
        "Full video, offline, air-gap, and custom model support",
        "Agents that trigger real workflows: CRM, payments, scheduling",
      ],
      color: "border-primary/50",
      badge: "Custom Advantage",
      badgeColor: "bg-primary/10 text-primary border-primary/30",
    },
  ];

  return (
    <div className="flex flex-col items-center">

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="w-full pt-24 pb-20 bg-gradient-to-b from-dark-bg via-dark-bg to-dark-nav relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/8 blur-[160px] rounded-full" />
          <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-blue-500/6 blur-[100px] rounded-full" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div {...fadeUp}>
            <span className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-primary/15 text-primary border border-primary/30 text-xs font-bold mb-6 tracking-widest uppercase">
              <Mic className="w-3.5 h-3.5" /> Pipecat · RAG · MCP · Agents
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-[1.1]">
              AI Voice & Video{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-green-400 to-blue-400">
                Agents
              </span>{" "}
              <br className="hidden md:block" />
              That Run Your Business
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed mb-4">
              We design and develop custom Voice & Video AI agents using{" "}
              <span className="text-primary font-semibold">Pipecat</span> —
              from RAG-powered customer service bots to fully agentic systems that
              integrate with your CRMs, MCP servers, and internal workflows.
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
              Cloud or fully offline. Online providers or your own models.
              We build, deploy, and hand you complete ownership.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-primary text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-primary/90 transition transform hover:scale-105 shadow-[0_0_20px_rgba(220,231,53,0.25)]"
              >
                Build My Agent <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white/8 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/15 transition border border-white/15 backdrop-blur-md"
              >
                Talk to an Expert <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Market Stats Bar ────────────────────────────────────────────── */}
      <section className="w-full bg-dark-nav/70 border-y border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((s, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.08, duration: 0.5 }} className="text-center">
                <div className="text-3xl md:text-4xl font-extrabold text-primary mb-1">{s.value}</div>
                <div className="text-sm text-gray-300 font-medium">{s.label}</div>
                <div className="text-xs text-gray-500 mt-1">{s.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What We Build ───────────────────────────────────────────────── */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div {...fadeUp} className="text-center mb-16">
          <span className="text-xs font-bold text-primary tracking-widest uppercase">What We Build</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
            Beyond Bots — Full{" "}
            <span className="text-primary">AI Agent Systems</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            We've evolved from building simple chatbots to engineering autonomous agents that
            complete real business tasks — not just answer questions.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="bg-dark-bg border border-white/8 p-7 rounded-2xl hover:border-primary/40 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <cap.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">{cap.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{cap.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Pipecat Section ─────────────────────────────────────────────── */}
      <section className="w-full bg-dark-nav/50 border-y border-white/6 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp}>
              <span className="text-xs font-bold text-primary tracking-widest uppercase">Our Framework</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-5">
                Built on <span className="text-primary">Pipecat</span> —<br />
                The Open Standard for Real-Time AI Agents
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                Pipecat (by Daily.co) is the open-source orchestration framework trusted by enterprises worldwide
                to build real-time voice, video, and multimodal AI pipelines. We are expert Pipecat developers —
                it's the foundation of every agent we ship.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "40+ AI service integrations — STT, LLM, TTS, tools",
                  "WebRTC-native: real-time voice + video in a single pipeline",
                  "Sub-500ms end-to-end latency for natural conversation",
                  "Swap any model layer without rewriting the agent",
                  "Deploy cloud, on-premise, or Pipecat Cloud managed hosting",
                  "Active open-source community, regular releases (latest: March 2025)",
                ].map((pt, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    {pt}
                  </li>
                ))}
              </ul>
              <div className="flex gap-3 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-white/6 border border-white/10 text-xs text-gray-400">Voice Agents</span>
                <span className="px-3 py-1 rounded-full bg-white/6 border border-white/10 text-xs text-gray-400">Video Agents</span>
                <span className="px-3 py-1 rounded-full bg-white/6 border border-white/10 text-xs text-gray-400">Multimodal</span>
                <span className="px-3 py-1 rounded-full bg-white/6 border border-white/10 text-xs text-gray-400">On-Premise</span>
                <span className="px-3 py-1 rounded-full bg-white/6 border border-white/10 text-xs text-gray-400">Open Source</span>
              </div>
            </motion.div>

            {/* Agent Pipeline Visual */}
            <motion.div {...fadeUp} transition={{ delay: 0.15 }}>
              <div className="flex gap-3 mb-6">
                {stackTabs.map((tab, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveStack(i)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                      activeStack === i
                        ? tab.activeBg
                        : "bg-white/4 border-white/10 text-gray-400 hover:text-white"
                    } ${tab.color}`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="bg-dark-bg border border-white/8 rounded-2xl p-6">
                <div className="flex flex-col gap-2">
                  {stackTabs[activeStack].pipeline.map((step, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`flex-1 px-4 py-2.5 rounded-xl border text-sm font-medium ${step.color}`}>
                        <span className="font-bold">{step.step}</span>
                        <span className="text-xs block opacity-75 mt-0.5">{step.tech}</span>
                      </div>
                      {i < stackTabs[activeStack].pipeline.length - 1 && (
                        <div className="text-gray-600 text-lg select-none">↓</div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-white/8 text-xs text-gray-500">
                  {stackTabs[activeStack].note}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Use Cases by Industry ────────────────────────────────────────── */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div {...fadeUp} className="text-center mb-12">
          <span className="text-xs font-bold text-primary tracking-widest uppercase">Use Cases</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
            Agents Deployed Across <span className="text-primary">Every Industry</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We tailor every agent to your industry's specific workflows, compliance requirements, and integration landscape.
          </p>
        </motion.div>

        {/* Tab buttons */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {useCases.map((uc, i) => (
            <button
              key={i}
              onClick={() => setActiveUseCase(i)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                activeUseCase === i
                  ? `${uc.color} border-current bg-white/6`
                  : "text-gray-400 border-white/10 hover:text-white bg-white/3"
              }`}
            >
              <uc.icon className="w-4 h-4" />
              {uc.industry}
            </button>
          ))}
        </div>

        {/* Active use case panel */}
        <motion.div
          key={activeUseCase}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className={`bg-dark-bg border rounded-3xl p-8 md:p-12 ${useCases[activeUseCase].border}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-white/6 border border-white/10 flex items-center justify-center">
                  {(() => { const Icon = useCases[activeUseCase].icon; return <Icon className={`w-6 h-6 ${useCases[activeUseCase].color}`} />; })()}
                </div>
                <h3 className="text-2xl font-bold">{useCases[activeUseCase].industry}</h3>
              </div>
              <p className={`text-lg font-semibold mb-6 ${useCases[activeUseCase].color}`}>
                {useCases[activeUseCase].headline}
              </p>
              <ul className="space-y-3">
                {useCases[activeUseCase].items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-gray-300 text-sm">
                    <CheckCircle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${useCases[activeUseCase].color}`} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-dark-nav/60 rounded-2xl p-6 border border-white/6">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Proven Impact</div>
              <div className={`text-2xl font-extrabold mb-2 ${useCases[activeUseCase].color}`}>
                {useCases[activeUseCase].stat}
              </div>
              <div className="mt-6 border-t border-white/8 pt-5">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">We Can Integrate With</div>
                <div className="flex flex-wrap gap-2">
                  {["Pipecat", "Claude / GPT-4o", "Deepgram", "ElevenLabs", "Salesforce", "HubSpot",
                    "Twilio / SIP", "WebRTC", "Custom APIs"].map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-lg bg-white/6 border border-white/10 text-xs text-gray-400">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <Link
                href="/contact"
                className={`mt-6 inline-flex items-center gap-2 font-semibold text-sm ${useCases[activeUseCase].color} hover:opacity-80 transition`}
              >
                Discuss this use case <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Integration Ecosystem ────────────────────────────────────────── */}
      <section className="w-full bg-dark-nav/40 border-y border-white/6 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <span className="text-xs font-bold text-primary tracking-widest uppercase">Integrations</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-3">
              Connect to <span className="text-primary">Anything</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Your agents don't just talk — they act. We integrate with the tools your business already runs on.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {integrations.map((group, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ delay: i * 0.05 }}
                className="bg-dark-bg border border-white/8 rounded-2xl p-5"
              >
                <div className="text-xs font-bold text-primary uppercase tracking-widest mb-3">{group.cat}</div>
                <ul className="space-y-1.5">
                  {group.items.map((item) => (
                    <li key={item} className="text-sm text-gray-400 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Custom Over Platforms ────────────────────────────────────── */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div {...fadeUp} className="text-center mb-14">
          <span className="text-xs font-bold text-primary tracking-widest uppercase">Why CryptoVoIP</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
            Custom Builds Beat <span className="text-primary">Platform Lock-In</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Vapi, Retell, and Bland are great starting points — but they're black boxes
            with per-minute markups, no video support, and zero offline capability.
            We build you what they can't.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {whyCustom.map((col, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ delay: i * 0.1 }}
              className={`bg-dark-bg border rounded-2xl p-8 ${col.color}`}
            >
              <span className={`text-xs font-bold px-3 py-1 rounded-full border mb-4 inline-block ${col.badgeColor}`}>
                {col.badge}
              </span>
              <h3 className="text-xl font-bold mb-5">{col.title}</h3>
              <ul className="space-y-3">
                {col.points.map((pt, j) => (
                  <li key={j} className={`flex items-start gap-3 text-sm ${i === 0 ? "text-gray-400" : "text-gray-300"}`}>
                    {i === 0
                      ? <span className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-400 font-bold">✕</span>
                      : <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />}
                    {pt}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Differentiators grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Code, title: "You Own the Code", desc: "Full IP transfer. No recurring platform fees." },
            { icon: Settings, title: "Any Model, Any Layer", desc: "Swap providers without touching agent logic." },
            { icon: CloudOff, title: "Offline Capable", desc: "Air-gapped, on-premise, or hybrid — your call." },
            { icon: Layers, title: "Become the Platform", desc: "We'll architect you as a reseller of AI agents." },
          ].map((item, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ delay: i * 0.08 }}
              className="bg-dark-nav/60 border border-white/8 p-5 rounded-2xl text-center hover:border-primary/30 transition"
            >
              <item.icon className="w-7 h-7 text-primary mx-auto mb-3" />
              <div className="font-bold text-sm mb-1">{item.title}</div>
              <div className="text-xs text-gray-500">{item.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── The Future of Voice AI ───────────────────────────────────────── */}
      <section className="w-full bg-dark-nav/50 border-y border-white/6 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-12">
            <span className="text-xs font-bold text-primary tracking-widest uppercase">The Road Ahead</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
              Voice AI Is the New <span className="text-primary">UI</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Brain,
                title: "Agentic Workflows",
                body: "Agents no longer just respond — they plan, execute multi-step tasks, and call other agents. We're building these systems today.",
              },
              {
                icon: Video,
                title: "Multimodal Agents",
                body: "Gartner predicts 40% of AI solutions will be multimodal by 2027. Voice + video + screen share agents are production-ready with Pipecat.",
              },
              {
                icon: Zap,
                title: "Real-Time Intelligence",
                body: "Sub-300ms latency is achievable today. With streaming STT/TTS and fast LLM inference, agents feel more responsive than human support staff.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ delay: i * 0.1 }}
                className="bg-dark-bg border border-white/8 p-7 rounded-2xl"
              >
                <item.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section className="w-full py-24 bg-gradient-to-b from-dark-nav to-dark-bg">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-5">
              Ready to Deploy Your <span className="text-primary">First Agent?</span>
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
              Whether you need a single inbound voice agent or a full agentic platform
              that powers your entire business — tell us your goal and we'll build it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-primary text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-primary/90 transition transform hover:scale-105 shadow-[0_0_25px_rgba(220,231,53,0.3)]"
              >
                Start Building <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white/8 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/15 transition border border-white/15"
              >
                Request a Demo <Video className="w-5 h-5" />
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-gray-500">
              <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-primary" /> Cloud & on-premise</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-primary" /> Full source code ownership</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-primary" /> 20+ years VoIP & WebRTC expertise</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-primary" /> Pipecat certified developers</span>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
