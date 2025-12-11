"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-100 font-sans relative overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* 🌅 Hero Section */}
      <section className="flex flex-col items-center justify-center text-center h-screen px-4">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
          Track Your Mind. Understand Yourself.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-gray-400 max-w-2xl mb-10 leading-relaxed">
          NeuroTrack helps you record your daily reflections and analyze your
          emotional patterns using AI — to improve focus, mood, and
          self-awareness.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}>
          <Link
            href="/journal"
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl text-lg font-semibold tracking-wide transition-all duration-300 shadow-lg shadow-purple-600/30 hover:scale-105">
            Start Journaling →
          </Link>
        </motion.div>
      </section>

      {/* 💡 About Section */}
      <section
        id="about"
        className="py-24 px-6 md:px-20 text-center bg-gray-950/60 border-t border-gray-800">
        <h2 className="text-3xl font-bold text-purple-400 mb-6">
          About NeuroTrack
        </h2>
        <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
          NeuroTrack is your personal AI companion that transforms your daily
          thoughts into meaningful emotional insights. By analyzing your
          reflections, it helps you track mood trends, spot stress patterns, and
          build a more mindful routine.
        </p>
      </section>

      {/* ⚙️ Features Section */}
      <section
        id="features"
        className="py-24 px-6 md:px-20 bg-gray-900/60 border-t border-gray-800">
        <h2 className="text-3xl font-bold text-purple-400 mb-12 text-center">
          Key Features
        </h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              title: "AI-Powered Mood Analysis",
              desc: "Automatically interpret your reflections into emotional trends and insights.",
            },
            {
              title: "Focus Detection",
              desc: "Detect when you’re in flow state and track your productive days.",
            },
            {
              title: "Visual Insights",
              desc: "See your mood evolution through intuitive charts and daily summaries.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800/40 backdrop-blur-lg border border-gray-700 rounded-2xl p-8 shadow-lg shadow-black/20 transition-all">
              <h3 className="text-lg font-semibold text-purple-300 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🧩 Footer */}
      <footer className="py-10 border-t border-gray-800 text-center text-gray-500 text-sm bg-gray-950/60">
        © {new Date().getFullYear()} NeuroTrack. All rights reserved.
      </footer>
    </div>
  );
}
