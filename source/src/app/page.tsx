"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowRight, Mic, Server, Smartphone, Camera, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const heroSlides = [
  {
    badge: "Open Source · AGPL v3",
    eyebrow: "AI-First Network Video Recorder",
    title: "OpenNVR",
    highlight: "Platform",
    desc: "Plug any AI model into your IP cameras via BYOM adapters. Zero-trust architecture, full data sovereignty, and complete open-source auditability — built for critical infrastructure.",
    chips: ["Bring Your Own Model", "Zero-Trust VLAN", "ONVIF Compatible", "100% On-Premise"],
    cta: "Explore OpenNVR",
    link: "/opennvr",
    Icon: Camera,
    accentGlow: "rgba(220,231,53,0.12)",
  },
  {
    badge: "Offline-First · Air-Gapped Ready",
    eyebrow: "Mobile Device Management for Secure Networks",
    title: "CV MDM",
    highlight: "Platform",
    desc: "Manage and enforce policy on every device with zero internet dependency. Trusted by Indian Army Signals 21 with 500+ licenses. QR zero-touch enrollment, HMAC-signed syncs, Samsung Knox support.",
    chips: ["Indian Army Signals 21", "Zero Cloud Required", "QR Zero-Touch Enroll", "Samsung Knox"],
    cta: "Try CV MDM Free",
    link: "/mdm",
    Icon: Smartphone,
    accentGlow: "rgba(220,231,53,0.10)",
  },
  {
    badge: "Pipecat · RAG · MCP · Agents",
    eyebrow: "Custom-Built AI Agent Development",
    title: "Voice & Video",
    highlight: "Agents",
    desc: "We build real AI agents — not chatbots. Using Pipecat with RAG intelligence and MCP integrations, your agents complete CRM workflows, handle calls, and run entirely on-premise if needed.",
    chips: ["Cloud & On-Premise", "MCP + CRM Automation", "Full Code Ownership", "Sub-500ms Latency"],
    cta: "Build Your Agent",
    link: "/ai-bots",
    Icon: Mic,
    accentGlow: "rgba(59,130,246,0.10)",
  },
  {
    badge: "18+ Years · FreeSWITCH · OpenSIPS",
    eyebrow: "SIP, RTP, WebRTC — Every Layer of the Stack",
    title: "VoIP & WebRTC",
    highlight: "Experts",
    desc: "The deepest real-time communications expertise you'll find. We customise existing platforms, deploy complete infra, build applications from scratch, and wire AI directly into your SIP stack.",
    chips: ["FreeSWITCH & OpenSIPS", "Custom Dev & Deployment", "AI over SIP", "On-Premise & Cloud"],
    cta: "Discuss Your Project",
    link: "/voip-webrtc",
    Icon: Server,
    accentGlow: "rgba(220,231,53,0.08)",
  },
];

const featureCards = [
  {
    Icon: Camera,
    title: "OpenNVR",
    sub: "AI Camera Platform",
    desc: "Bring AI to every camera frame. BYOM adapters let you swap models without new hardware. Open-source, auditable, fully on-premise.",
    link: "/opennvr",
    cta: "Explore OpenNVR",
  },
  {
    Icon: Mic,
    title: "Voice & Video Agents",
    sub: "Pipecat · RAG · MCP",
    desc: "Custom Pipecat agents with RAG intelligence and MCP integrations. Cloud or fully offline. You own the code — no platform lock-in.",
    link: "/ai-bots",
    cta: "Build an Agent",
  },
  {
    Icon: Server,
    title: "VoIP & WebRTC",
    sub: "18+ Years Expertise",
    desc: "FreeSWITCH, OpenSIPS, Kamailio, WebRTC — customise, deploy, scale, or build from scratch. Every layer of the comms stack.",
    link: "/voip-webrtc",
    cta: "View Services",
  },
  {
    Icon: Smartphone,
    title: "CV MDM",
    sub: "Offline Device Management",
    desc: "On-premise MDM with zero cloud dependency. QR zero-touch enrollment, remote wipe, and Samsung Knox support for captive networks.",
    link: "/mdm",
    cta: "Try Free →",
  },
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setCurrent((p) => (p + 1) % heroSlides.length), 6000);
    return () => clearInterval(t);
  }, [paused]);

  const slide = heroSlides[current];

  return (
    <div className="flex flex-col items-center">

      {/* ── Hero Slider ─────────────────────────────────────────────────── */}
      <section
        className="w-full relative overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Ambient glow — updates per slide */}
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 70% 60% at 50% 40%, ${slide.accentGlow}, transparent)`,
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 md:pt-28 md:pb-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center">

            {/* Left: text content */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">

              {/* Slide counter */}
              <div className="flex items-center gap-3 mb-5">
                <span className="text-xs font-bold text-gray-500 tabular-nums">
                  {String(current + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}
                </span>
                <div className="flex gap-1.5">
                  {heroSlides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      aria-label={`Slide ${i + 1}`}
                      className={`h-1 rounded-full transition-all duration-500 ${
                        i === current ? "w-8 bg-primary" : "w-3 bg-white/20 hover:bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Badge */}
              <motion.span
                key={`badge-${current}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-primary/15 text-primary border border-primary/30 text-xs font-bold mb-3 tracking-widest uppercase"
              >
                {slide.badge}
              </motion.span>

              {/* Eyebrow */}
              <motion.p
                key={`eye-${current}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.05 }}
                className="text-sm text-gray-500 font-medium mb-4 tracking-wide"
              >
                {slide.eyebrow}
              </motion.p>

              {/* Headline */}
              <motion.h1
                key={`h1-${current}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="text-5xl md:text-7xl font-extrabold tracking-tight mb-5 leading-[1.05]"
              >
                {slide.title}{" "}
                <span className="text-primary">{slide.highlight}</span>
              </motion.h1>

              {/* Description */}
              <motion.p
                key={`desc-${current}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.12 }}
                className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed mb-6"
              >
                {slide.desc}
              </motion.p>

              {/* Feature chips */}
              <motion.div
                key={`chips-${current}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.18 }}
                className="flex flex-wrap gap-2 justify-center lg:justify-start mb-8"
              >
                {slide.chips.map((chip) => (
                  <span
                    key={chip}
                    className="px-3 py-1 rounded-full bg-white/6 border border-white/12 text-xs text-gray-300 font-medium"
                  >
                    {chip}
                  </span>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                key={`ctas-${current}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.22 }}
                className="flex flex-col sm:flex-row items-center gap-4"
              >
                <Link
                  href={slide.link}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-black font-bold text-lg hover:bg-primary/90 transition transform hover:scale-105 shadow-[0_0_24px_rgba(220,231,53,0.28)]"
                >
                  {slide.cta}
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/8 text-white font-bold text-lg hover:bg-white/15 transition border border-white/15 backdrop-blur-md"
                >
                  Talk To Us <ChevronRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>

            {/* Right: icon visual */}
            <motion.div
              key={`icon-${current}`}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="hidden lg:flex items-center justify-center"
            >
              <div className="relative w-52 h-52">
                {/* Outer glow ring */}
                <div className="absolute inset-0 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm" />
                {/* Mid ring */}
                <div className="absolute inset-5 rounded-full border border-primary/15 bg-primary/4" />
                {/* Icon container */}
                <div className="absolute inset-10 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center shadow-[0_0_40px_rgba(220,231,53,0.2)]">
                  <slide.Icon className="w-14 h-14 text-primary" />
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-white/5">
          <motion.div
            key={`progress-${current}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: paused ? undefined : 1 }}
            transition={{ duration: 6, ease: "linear" }}
            style={{ transformOrigin: "left" }}
            className="h-full bg-primary/60 w-full"
          />
        </div>
      </section>

      {/* ── Features Grid ───────────────────────────────────────────────── */}
      <section className="w-full bg-dark-nav/50 py-24 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-primary tracking-widest uppercase">What We Build</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
              Infrastructure You Own. Intelligence You Control.
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Four specialised platforms and services — all open-source-first, all deployable on your own infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featureCards.map((card, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                className="bg-dark-bg border border-white/10 p-7 rounded-2xl hover:border-primary/50 transition-colors shadow-lg group flex flex-col"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform flex-shrink-0">
                  <card.Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">{card.sub}</div>
                <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-1">{card.desc}</p>
                <Link
                  href={card.link}
                  className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold mt-5 hover:gap-2.5 transition-all"
                >
                  {card.cta} <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
