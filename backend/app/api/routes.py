from fastapi import APIRouter, Request
from app.utils.analyzer import analyze_mood

router = APIRouter()

@router.post("/receive-data")
async def receive_data(request: Request):
    """
    Endpoint that receives analyzed key moments from Next.js + Gemini
    and performs keyword-based mood analysis.
    """
    data = await request.json()
    key_moments_text = data.get("keyMoments", "")
    date = data.get("date", "Unknown")

    analysis_result = analyze_mood(key_moments_text)

    # 🧠 Console Output (for debugging and demo)
    print("\n🧠 Received Data from Next.js:")
    print(f"Date: {date}")
    print(f"Key Moments:\n{key_moments_text}")
    print("------------------------------------------------")
    print("🧩 Mood Distribution (%):")
    for mood, value in analysis_result["mood_distribution"].items():
        print(f"   {mood}: {value}%")
    print("------------------------------------------------")
    print(f"🌈 Dominant Mood: {analysis_result['dominant_mood']} ({analysis_result['dominant_score']}%)")
    print(f"🧩 Mood Score: {analysis_result['mood_score']} ({analysis_result['mood_label']})")
    print(f"⚡ Focus Detected: {'Yes' if analysis_result['focused'] else 'No'}")
    print("------------------------------------------------\n")

    # ✅ Return analysis result to frontend
    return {
        "status": "success",
        "date": date,
        "mood_distribution": analysis_result["mood_distribution"],
        "dominant_mood": analysis_result["dominant_mood"],
        "mood_score": analysis_result["mood_score"],
        "mood_label": analysis_result["mood_label"],
        "focus_detected": analysis_result["focused"],
    }
