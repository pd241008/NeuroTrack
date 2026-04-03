import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { date, keyMoments } = await req.json();

    // Send to FastAPI backend
    const backendUrl = process.env.BACKEND_API_URL || "http://127.0.0.1:8000";
    const res = await fetch(`${backendUrl}/receive-data`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date, keyMoments }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Backend Error:", res.status, errText);
      return NextResponse.json(
        { error: "FastAPI returned an error", details: errText },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error contacting FastAPI:", error);
    return NextResponse.json(
      { error: "Failed to reach FastAPI backend" },
      { status: 500 }
    );
  }
}
