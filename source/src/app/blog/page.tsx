"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Clock, Calendar, Shield, Cpu, FileWarning, AlertTriangle, QrCode } from "lucide-react";

const articles = [
  {
    slug: "what-is-mdm",
    title: "What Is MDM? A Plain-Language Guide for Government & Defense Teams",
    category: "Education",
    categoryColor: "text-blue-400",
    categoryBg: "bg-blue-500/10",
    categoryBorder: "border-blue-500/20",
    icon: BookOpen,
    iconColor: "text-blue-400",
    date: "April 14, 2026",
    readTime: "6 min",
    excerpt:
      "Mobile Device Management explained from first principles — what it does, why every organization with field devices needs it, and what separates basic MDM from enterprise-grade platforms.",
  },
  {
    slug: "smartphone-military-security-risk",
    title: "Your Soldiers' Smartphones Are Your Biggest Security Vulnerability",
    category: "Defense",
    categoryColor: "text-red-400",
    categoryBg: "bg-red-500/10",
    categoryBorder: "border-red-500/20",
    icon: AlertTriangle,
    iconColor: "text-red-400",
    date: "April 10, 2026",
    readTime: "8 min",
    excerpt:
      "Unmanaged Android devices in operational environments have revealed base locations, leaked orders, and handed adversaries real-time intelligence. Here is the threat picture most commanders are not seeing.",
  },
  {
    slug: "offline-mdm-air-gapped-networks",
    title: "The Offline MDM Imperative: Managing Devices in Air-Gapped Networks",
    category: "Technical",
    categoryColor: "text-primary",
    categoryBg: "bg-primary/10",
    categoryBorder: "border-primary/20",
    icon: Cpu,
    iconColor: "text-primary",
    date: "April 7, 2026",
    readTime: "7 min",
    excerpt:
      "Cloud MDM fails the moment a network boundary appears. This article explains how offline-first MDM architectures work and why they are the only viable option for classified and isolated environments.",
  },
  {
    slug: "5-breaches-mdm-could-have-prevented",
    title: "5 Real-World Incidents Where MDM Could Have Prevented a Breach",
    category: "Incidents",
    categoryColor: "text-orange-400",
    categoryBg: "bg-orange-500/10",
    categoryBorder: "border-orange-500/20",
    icon: FileWarning,
    iconColor: "text-orange-400",
    date: "April 3, 2026",
    readTime: "10 min",
    excerpt:
      "From the Strava military base exposure of 2018 to NSO Group Pegasus attacks on government officials — five documented incidents where mobile device policy failures had consequences.",
  },
  {
    slug: "zero-touch-enrollment-guide",
    title: "Zero-Touch Enrollment: Deploy 500 Devices in a Day Without Touching Each One",
    category: "How-To",
    categoryColor: "text-green-400",
    categoryBg: "bg-green-500/10",
    categoryBorder: "border-green-500/20",
    icon: QrCode,
    iconColor: "text-green-400",
    date: "March 28, 2026",
    readTime: "7 min",
    excerpt:
      "A step-by-step look at how QR-based zero-touch provisioning works, why it is essential for large fleet deployments, and how Indian Army Signals 21 used it to enroll 500+ devices on an air-gapped network.",
  },
];

export default function BlogIndex() {
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <div className="flex flex-col items-center">

      {/* ── Hero ── */}
      <section className="w-full pt-20 pb-16 bg-gradient-to-b from-dark-bg to-dark-nav relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 blur-[140px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary border border-primary/30 text-xs font-bold tracking-widest uppercase mb-6">
              Security Intelligence · MDM · Defense
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              Security Insights &amp;{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-400">
                Field Intelligence
              </span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Research, analysis, and operational guidance on MDM, secure mobility, and critical infrastructure protection — written for defense IT professionals and government procurement teams.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Articles ── */}
      <section className="w-full bg-dark-bg py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Featured Article — full width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <Link href={`/blog/${featured.slug}`} className="block group">
              <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 md:p-10 hover:border-primary/40 hover:bg-white/[0.05] transition-all">
                <div className="flex flex-col md:flex-row md:items-start gap-8">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-5">
                      <span className={`inline-block py-1 px-3 rounded-full ${featured.categoryBg} ${featured.categoryColor} border ${featured.categoryBorder} text-xs font-bold tracking-widest uppercase`}>
                        {featured.category}
                      </span>
                      <span className="text-gray-500 text-xs font-medium uppercase tracking-wider">Featured</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight mb-4 group-hover:text-primary transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-gray-400 text-base leading-relaxed mb-6 max-w-2xl">
                      {featured.excerpt}
                    </p>
                    <div className="flex flex-wrap items-center gap-5 text-gray-500 text-sm">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {featured.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {featured.readTime} read
                      </span>
                      <span className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                        Read Article <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                  <div className="md:w-52 md:shrink-0">
                    <div className={`w-full md:w-52 h-40 rounded-2xl ${featured.categoryBg} border ${featured.categoryBorder} flex items-center justify-center`}>
                      <featured.icon className={`w-16 h-16 ${featured.iconColor} opacity-60`} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* 2-column grid for remaining articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rest.map((article, i) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link href={`/blog/${article.slug}`} className="block group h-full">
                  <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-7 hover:border-primary/40 hover:bg-white/[0.05] transition-all h-full flex flex-col">
                    <div className="flex items-start gap-4 mb-5">
                      <div className={`w-12 h-12 rounded-xl ${article.categoryBg} border ${article.categoryBorder} flex items-center justify-center shrink-0`}>
                        <article.icon className={`w-6 h-6 ${article.iconColor}`} />
                      </div>
                      <span className={`inline-block py-1 px-3 rounded-full ${article.categoryBg} ${article.categoryColor} border ${article.categoryBorder} text-xs font-bold tracking-widest uppercase mt-1`}>
                        {article.category}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-white leading-snug mb-3 group-hover:text-primary transition-colors flex-1">
                      {article.title}
                    </h2>
                    <p className="text-gray-400 text-sm leading-relaxed mb-5">
                      {article.excerpt}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-gray-500 text-xs mt-auto">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {article.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {article.readTime} read
                      </span>
                      <span className="flex items-center gap-1.5 text-primary font-semibold ml-auto group-hover:gap-2 transition-all">
                        Read Article <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="w-full bg-dark-nav border-t border-white/10 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
              <Shield className="w-7 h-7 text-primary" />
            </div>
            <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary border border-primary/30 text-xs font-bold tracking-widest uppercase mb-5">
              CV MDM Platform
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-5 leading-tight">
              Ready to See Offline MDM in Action?
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
              CV MDM runs entirely on your infrastructure — no cloud dependency, no data leaving your network perimeter. Enroll your first device in under two minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/mdm"
                className="px-8 py-4 rounded-full bg-primary text-black font-bold hover:bg-primary/90 transition transform hover:scale-105 shadow-[0_0_20px_rgba(220,231,53,0.3)] flex items-center gap-2"
              >
                Explore CV MDM
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 rounded-full bg-white/10 text-white font-bold hover:bg-white/20 transition border border-white/20"
              >
                Contact Sales
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
