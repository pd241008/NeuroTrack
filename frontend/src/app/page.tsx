"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { SparklesIcon, EyeIcon, ChartBarIcon } from "@heroicons/react/24/outline";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-100 font-sans w-full">
      {/* 🌅 Hero Section */}
      <section className="flex flex-col items-center justify-center text-center min-h-[85vh] px-4 w-full">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium mb-8 backdrop-blur-md md:mt-20 mt-10"
        >
          <SparklesIcon className="w-5 h-5" />
          <span>Your AI-Powered Emotional Companion</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
          Track Your Mind.<br />
          <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(168,85,247,0.4)]">Understand Yourself.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-gray-400 max-w-2xl mb-12 text-lg md:text-xl leading-relaxed">
          NeuroTrack helps you record your daily reflections and analyze your
          emotional patterns using AI — to improve focus, mood, and
          self-awareness.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}>
          <Link
            href="/journal"
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white transition-all duration-300 bg-purple-600 rounded-2xl hover:bg-purple-500 hover:scale-[1.02] shadow-[0_0_40px_rgba(168,85,247,0.4)] overflow-hidden">
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:transition-transform group-hover:duration-[1.5s] group-hover:translate-x-full ease-out"></span>
            <span className="relative font-bold tracking-wide">Start Journaling →</span>
          </Link>
        </motion.div>
      </section>

      {/* ⚙️ Features Section */}
      <section
        id="features"
        className="w-full py-24 px-6 md:px-20 relative z-10">
        <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-3xl border-y border-white/5 -z-10"></div>
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent mb-4">
              Unlock Your Mind's Potential
            </h2>
            <p className="text-gray-400">Discover features designed to elevate your mental clarity.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <SparklesIcon className="w-8 h-8 text-fuchsia-400" />,
                title: "AI-Powered Analysis",
                desc: "Automatically interpret your reflections into emotional trends and profound psychological insights.",
              },
              {
                icon: <EyeIcon className="w-8 h-8 text-blue-400" />,
                title: "Focus Detection",
                desc: "Identify triggers that shift you into your most productive flow state and track periods of deep work.",
              },
              {
                icon: <ChartBarIcon className="w-8 h-8 text-purple-400" />,
                title: "Visual Insights",
                desc: "Observe your mood evolution over time through intuitive, interactive charts and daily summaries.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 shadow-2xl hover:shadow-purple-500/20 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-100 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🧩 Footer */}
      <footer className="w-full py-10 border-t border-white/5 text-center text-gray-500 text-sm bg-black/20 backdrop-blur-md">
        © {new Date().getFullYear()} NeuroTrack. All rights reserved. Let your mind flow.
      </footer>
    </div>
  );
}
