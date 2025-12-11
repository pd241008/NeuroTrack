// /api/from-submit/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // important

export async function GET() {
  console.log("Loaded Gemini key:", process.env.GEMINI_API_KEY);
  return NextResponse.json({ keyLoaded: !!process.env.GEMINI_API_KEY });
}

export async function POST(request: Request) {
  try {
    const { date, text } = await request.json();

    const prompt = `Extract 3-5 key moments from this text:\n"${text}" (Date: ${date})`;

    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY || "",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    if (!res.ok) {
      const err = await res.json();
      console.error("🚨 Gemini API Error:", err);
      return NextResponse.json(
        { error: "Gemini API failed to respond" },
        { status: 502 }
      );
    }

    const data = await res.json();
    const keyMoments =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      "No key moments extracted.";

    console.log("✨ Gemini Extracted:", keyMoments);

    // 🔥 Send to FastAPI backend
    try {
      await fetch("http://127.0.0.1:8000/receive-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date, keyMoments }),
      });
    } catch (fastApiErr) {
      console.error("❌ Failed to send to FastAPI:", fastApiErr);
    }

    return NextResponse.json({ keyMoments });
  } catch (error) {
    console.error("❌ /api/from-submit Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
