"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

export default function Journal() {
  const router = useRouter();
  const date = getTodayDate();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !text.trim()) {
      setMessage("Please fill out both the date and the entry.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      // ✨ STEP 1 — Get key moments from Gemini
      const geminiRes = await fetch("/api/form-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, text }),
      });

      if (!geminiRes.ok) throw new Error("Gemini API request failed");
      const geminiData = await geminiRes.json();

      // Handle different output shapes
      let keyMoments = "";
      if (Array.isArray(geminiData.keyMoments)) {
        keyMoments = geminiData.keyMoments.join("\n");
      } else if (typeof geminiData.keyMoments === "string") {
        keyMoments = geminiData.keyMoments;
      } else if (geminiData.output) {
        keyMoments = geminiData.output;
      } else {
        keyMoments = "No key moments found.";
      }

      // ✨ STEP 2 — Send those key moments to FastAPI for analysis
      const analysisRes = await fetch("/api/analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, keyMoments }),
      });

      if (!analysisRes.ok) throw new Error("FastAPI analysis failed");
      const analysis = await analysisRes.json();

      // ✨ STEP 3 — Merge Gemini + FastAPI data and save to localStorage
      const fullResult = { ...analysis, keyMoments };
      localStorage.setItem("analysis", JSON.stringify(fullResult));

      // ✨ STEP 4 — Go to results page
      router.push("/result");
    } catch (error) {
      console.error("Error:", error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-lg border border-gray-700/50 transition duration-300 hover:shadow-purple-600/20">
        <h2 className="text-3xl font-light text-gray-50 mb-6 text-center tracking-wider">
          Daily Reflection
        </h2>

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Date
          </label>
          <input
            type="date"
            value={date}
            readOnly
            disabled
            className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-gray-400 shadow-inner cursor-not-allowed"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Journal Entry
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What's on your mind today?"
            rows={10}
            required
            className="w-full bg-gray-700 border border-gray-600 rounded-lg p-4 text-gray-200 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200 placeholder-gray-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !text}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold tracking-wide py-3 rounded-xl transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-600/30">
          {loading ? "Analyzing Reflection..." : "Analyze Reflection"}
        </button>

        {message && (
          <p className="text-center text-sm mt-4 p-2 rounded bg-gray-700/50 text-red-400">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
