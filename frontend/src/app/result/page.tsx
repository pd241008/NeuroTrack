/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircleIcon, SparklesIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ResultPage() {
  const [analysis, setAnalysis] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("analysis");
    if (stored) setAnalysis(JSON.parse(stored));
  }, []);

  if (!analysis) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-400">
        <p>No analysis found. Please write a reflection first.</p>
      </div>
    );
  }

  // Fallback data in the new Array format
  const moodData = analysis.mood_distribution || [
    { name: "Happy", value: 40 },
    { name: "Calm", value: 30 },
    { name: "Sad", value: 20 },
    { name: "Stressed", value: 10 },
  ];

  let labels: string[] = [];
  let values: number[] = [];

  // 🛠️ THE FIX: Safely parse the new Array format, with a fallback for old local storage data
  if (Array.isArray(moodData)) {
    labels = moodData.map((item: any) => item.name);
    values = moodData.map((item: any) => item.value);
  } else {
    // If old dictionary format is still in localStorage
    labels = Object.keys(moodData);
    values = Object.values(moodData).map(Number);
  }

  const dominantMood =
    analysis.dominant_mood ||
    labels[values.indexOf(Math.max(...values))] ||
    "Balanced";

  const keyMomentsText = Array.isArray(analysis.keyMoments)
    ? analysis.keyMoments
    : typeof analysis.keyMoments === "string"
      ? analysis.keyMoments
          .split(/\d\.\s|\*\*/)
          .filter((line: string) => line.trim())
      : ["No key moments found."];

  const pieData = {
    labels,
    datasets: [
      {
        data: values,
        // Chart.js will match these colors to the labels in order
        backgroundColor: [
          "#34d399",
          "#60a5fa",
          "#fbbf24",
          "#f87171",
          "#a78bfa",
        ],
        borderWidth: 2,
      },
    ],
  };

  return (
    <main className="min-h-[calc(100vh-6rem)] relative z-10 text-white flex flex-col items-center p-4 md:p-8 font-sans w-full">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium mb-4 backdrop-blur-md">
          <SparklesIcon className="w-5 h-5" />
          <span>Analysis Complete</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent">
          Your Emotional Insight
        </h1>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl justify-center items-stretch">
        {/* 🍩 Chart Card */}
        <motion.div 
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.6, delay: 0.2 }}
           className="bg-white/[0.03] backdrop-blur-3xl p-8 rounded-3xl border border-white/10 flex-1 hover:border-purple-500/20 transition-all duration-300 group shadow-2xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] -z-10 group-hover:bg-purple-500/20 transition-all duration-700"></div>

          <h2 className="text-2xl text-center mb-8 bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent font-bold">
            Mood Distribution
          </h2>
          <div className="flex justify-center mb-8 flex-grow items-center">
            <div className="w-72 h-72">
              <Pie
                data={pieData}
                options={{
                  plugins: {
                    legend: {
                      position: "bottom" as const,
                      labels: { color: "#e5e7eb", font: { size: 13, family: "inherit" }, padding: 20 },
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="mt-auto bg-black/20 rounded-2xl p-4 border border-white/5 text-center">
            <p className="text-lg text-gray-300 flex items-center justify-center gap-2">
              <span className="text-xl">🌟</span> Dominant Mood:{" "}
              <span className="text-purple-400 font-bold tracking-wide">
                {dominantMood}
              </span>
            </p>
          </div>
        </motion.div>

        {/* 💬 Key Moments Card */}
        <motion.div 
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.6, delay: 0.4 }}
           className="bg-white/[0.03] backdrop-blur-3xl p-8 rounded-3xl border border-white/10 flex-1 hover:border-blue-500/20 transition-all duration-300 shadow-2xl relative overflow-hidden flex flex-col">
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -z-10 group-hover:bg-blue-500/20 transition-all duration-700"></div>

          <h2 className="text-2xl mb-6 bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent font-bold">
            Key Reflections
          </h2>
          
          <ul className="space-y-4 text-gray-300 text-sm leading-relaxed overflow-y-auto pr-2 custom-scrollbar flex-grow">
            {keyMomentsText.map((moment: string, i: number) => (
              <motion.li 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + (i * 0.1) }}
                key={i} 
                className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                <CheckCircleIcon className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-[15px]">{moment}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.6, delay: 0.8 }}
         className="mt-12">
        <button
          onClick={() => (window.location.href = "/journal")}
          className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 shadow-[0_0_20px_rgba(0,0,0,0.5)] overflow-hidden">
          <ArrowPathIcon className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
          <span className="relative">Write Another Reflection</span>
        </button>
      </motion.div>
    </main>
  );
}
