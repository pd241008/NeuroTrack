"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

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
    <div className="flex items-center justify-center min-h-[calc(100vh-6rem)] p-4 relative z-10 w-full">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        onSubmit={handleSubmit}
        className="relative bg-white/[0.03] backdrop-blur-3xl p-8 rounded-3xl shadow-2xl w-full max-w-2xl border border-white/10 hover:border-purple-500/30 transition-all duration-500 overflow-hidden group">
        
        {/* Glow behind form */}
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-br from-purple-500/5 to-blue-500/5 -z-10 blur-3xl pointer-events-none group-hover:from-purple-500/10 group-hover:to-blue-500/10 transition-all duration-[2s]"></div>

        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent mb-8 text-center tracking-wide">
          Daily Reflection
        </h2>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-400 mb-2 ml-1">
            Date
          </label>
          <input
            type="date"
            value={date}
            readOnly
            disabled
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-gray-500 cursor-not-allowed font-medium tracking-wide"
          />
        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-400 mb-2 ml-1">
            Your Thoughts
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What's on your mind today? Let it flow naturally..."
            rows={8}
            required
            className="w-full bg-black/20 border border-white/10 rounded-2xl p-5 text-gray-100 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 placeholder-gray-600 shadow-inner"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !text.trim()}
          className="relative w-full overflow-hidden bg-purple-600 hover:bg-purple-500 text-white font-bold tracking-wide py-4 rounded-2xl transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] disabled:hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] flex items-center justify-center gap-3 group/btn">
          {loading ? (
             <>
               <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
               <span>Analyzing Connection...</span>
             </>
          ) : (
            <>
               <span className="relative z-10">Analyze Reflection</span>
               <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]"></span>
            </>
          )}
        </button>

        {message && (
          <motion.p 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="text-center text-sm mt-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
            {message}
          </motion.p>
        )}
      </motion.form>
    </div>
  );
}
