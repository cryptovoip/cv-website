"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Shield, ArrowRight, Mic, Server, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      badge: "Open Source AI Security",
      title: "OpenNVR",
      highlight: "Platform",
      desc: "Our open-source NVR platform for critical infrastructure. IP Camera Security redefined. Easily integrate any AI model using AI Adapters. Retain complete data and AI sovereignty.",
      link: "/solutions"
    },
    {
      badge: "Absolute Control",
      title: "CV MDM",
      highlight: "Platform",
      desc: "We provide on-premise, completely offline device management ensuring absolute security of your devices. Proven and flawlessly working in Captive Networks.",
      link: "/mdm"
    },
    {
      badge: "Next-Gen Automation",
      title: "Voice & Video",
      highlight: "Bots",
      desc: "Custom RAG and MCP-based Pipecat voice and video bots. Integrate instantly with popular CRMs for seamless, low-latency automated workflows.",
      link: "/ai-bots"
    },
    {
      badge: "20+ Years Expertise",
      title: "VoIP & WebRTC",
      highlight: "Development",
      desc: "Hire the best Industry SIP, VoIP, and WebRTC experts. Deep industry experts with over 20 years of experience consulting to design and develop your next-gen communication services and infra.",
      link: "/voip-webrtc"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000); // 6 seconds per slide
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col items-center text-center relative min-h-[600px] flex justify-center">

        {heroSlides.map((slide, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20, position: 'absolute' }}
            animate={{
              opacity: currentSlide === index ? 1 : 0,
              y: currentSlide === index ? 0 : 20,
              pointerEvents: currentSlide === index ? 'auto' : 'none'
            }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-primary border border-primary/30 text-sm font-semibold mb-6">
              {slide.badge}
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
              {slide.title} <br className="hidden md:block" /> <span className="text-primary">{slide.highlight}</span>
            </h1>
            <p className="md:text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed min-h-[80px]">
              {slide.desc}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={slide.link}
                className="px-8 py-4 rounded-full bg-primary text-black font-bold text-lg hover:bg-primary/90 transition transform hover:scale-105 shadow-[0_0_20px_rgba(220,231,53,0.3)] flex items-center"
              >
                Explore Services
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 rounded-full bg-white/10 text-white font-bold text-lg hover:bg-white/20 transition backdrop-blur-md border border-white/20"
              >
                Talk To Us
              </Link>
            </div>
          </motion.div>
        ))}

        {/* Slider dots */}
        <div className="absolute bottom-8 flex space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? "bg-primary w-8" : "bg-white/30 hover:bg-white/50"}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="w-full bg-dark-nav/50 py-24 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Empowering the Future</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our core pillars of technology bring unprecedented security and operational intelligence to scale globally.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-dark-bg border border-white/10 p-8 rounded-2xl hover:border-primary/50 transition-colors shadow-lg group"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">IP Camera Security</h3>
              <p className="text-gray-400">
                Driven by our OpenNVR research, secure your critical video streams and retain complete data sovereignty with unique AI Adapters.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -10 }}
              className="bg-dark-bg border border-white/10 p-8 rounded-2xl hover:border-primary/50 transition-colors shadow-lg group"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Mic className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Voice & Video Bots</h3>
              <p className="text-gray-400">
                Custom low-latency Pipecat bots with RAG and MCP pipelines, directly integrated into your CRMs to generate revenue seamlessly.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -10 }}
              className="bg-dark-bg border border-white/10 p-8 rounded-2xl hover:border-primary/50 transition-colors shadow-lg group"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Server className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">VoIP & WebRTC</h3>
              <p className="text-gray-400">
                Hire our industry experts with over 20+ years of experience to design, develop, and scale your FreeSwitch and OpenSIPS infrastructure.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -10 }}
              className="bg-dark-bg border border-white/10 p-8 rounded-2xl hover:border-primary/50 transition-colors shadow-lg group"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Practical Trainings</h3>
              <p className="text-gray-400">
                Empower your team with expert guidance. Comprehensive programs covering VoIP integration and Pipecat bot generation.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
