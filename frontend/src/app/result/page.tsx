/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
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
    <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8 font-sans">
      <h1 className="text-3xl font-bold text-purple-400 mb-8">
        Your Emotional Analysis 🌈
      </h1>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl justify-center items-start">
        {/* 🍩 Chart */}
        <div className="bg-gray-800/70 p-6 rounded-2xl shadow-2xl border border-gray-700 flex-1">
          <h2 className="text-2xl text-center mb-6 text-purple-300 font-semibold">
            Mood Distribution
          </h2>
          <div className="flex justify-center">
            <div className="w-80 h-80">
              <Pie
                data={pieData}
                options={{
                  plugins: {
                    legend: {
                      position: "bottom" as const,
                      labels: { color: "#ccc", font: { size: 14 } },
                    },
                  },
                }}
              />
            </div>
          </div>

          <p className="mt-6 text-center text-lg text-gray-300">
            🌟 Dominant Mood:{" "}
            <span className="text-purple-400 font-semibold">
              {dominantMood}
            </span>
          </p>
        </div>

        {/* 💬 Key Moments */}
        <div className="bg-gray-800/70 p-6 rounded-2xl shadow-2xl border border-gray-700 flex-1 overflow-auto max-h-[500px]">
          <h2 className="text-2xl mb-4 text-purple-300 font-semibold">
            Key Moments
          </h2>
          <ul className="list-disc list-inside space-y-3 text-gray-300 text-sm leading-relaxed">
            {keyMomentsText.map((moment: string, i: number) => (
              <li key={i}>{moment}</li>
            ))}
          </ul>
        </div>
      </div>

      <button
        onClick={() => (window.location.href = "/journal")}
        className="mt-10 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl text-white font-semibold transition duration-300">
        Write Another Reflection ✍️
      </button>
    </main>
  );
}
