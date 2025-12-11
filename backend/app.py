from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import re

app = FastAPI()

# Enable CORS for frontend → backend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # you can restrict later to specific frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🧠 Emotion Keyword Lists (expanded for richer detection)
mood_categories = {
    "Happy": [
        "happy", "joy", "joyful", "grateful", "excited", "amazing", "great",
        "positive", "loved", "peaceful", "smile", "content", "satisfaction",
        "fulfilling", "fun", "pleasure", "enjoy", "laughter", "connected"
    ],
    "Sad": [
        "sad", "depressed", "upset", "cry", "lonely", "unhappy", "hopeless",
        "empty", "gloomy", "heartbroken", "grief", "melancholy", "disappointed",
        "regret", "missing"
    ],
    "Stressed": [
        "stressed", "anxious", "tired", "worried", "overwhelmed", "pressure",
        "nervous", "tense", "burnout", "fatigue", "panic", "restless", "exhausted"
    ],
    "Calm": [
        "calm", "relaxed", "peaceful", "clear", "balanced", "stillness",
        "serene", "composed", "centered", "grounded", "focused", "present"
    ]
}

# Mood quality scale for overall mood scoring
mood_scale = {
    1: "Awful",
    2: "Bad",
    3: "Normal",
    4: "Good",
    5: "Amazing"
}


@app.post("/receive-data")
async def receive_data(request: Request):
    """
    Endpoint that receives analyzed key moments from Next.js + Gemini
    and performs keyword-based mood analysis.
    """
    data = await request.json()
    key_moments_text = data.get("keyMoments", "")
    date = data.get("date", "Unknown")

    # Convert all text to lowercase for case-insensitive matching
    text = key_moments_text.lower()

    # Initialize mood counts
    mood_counts: dict[str, int] = {mood: 0 for mood in mood_categories.keys()}

    # 🔍 Smarter punctuation-tolerant word matching
    for mood, keywords in mood_categories.items():
        for word in keywords:
            # Match even if word ends with punctuation or markdown (e.g. "tired," "stressed." "**calm**")
            pattern = rf"(?<!\w){word}(?!\w)"
            matches = re.findall(pattern, text)
            mood_counts[mood] += len(matches)

    total_words = sum(mood_counts.values())

    # 🧮 Normalize to percentages, ensuring small moods show at least 1%
    if total_words == 0:
        mood_distribution: dict[str, float] = {mood: 0.0 for mood in mood_categories.keys()}
    else:
        mood_distribution = {
            mood: max(round((count / total_words) * 100, 2), 1.0 if count > 0 else 0.0)
            for mood, count in mood_counts.items()
        }

    # 🌈 Determine Dominant Mood
    dominant_mood: str = max(
        mood_distribution.keys(), key=lambda m: float(mood_distribution[m])
    )
    dominant_score = mood_distribution[dominant_mood]

    # ⚡ Focus Detection
    focused = bool(
        re.search(r"\b(focused|productive|flow|clarity|concentrated|mindful)\b", text)
    )

    # 🧩 Sentiment-based Mood Score (Happy+Calm vs Sad+Stressed)
    sentiment_score = (
        (mood_distribution["Happy"] + mood_distribution["Calm"])
        - (mood_distribution["Sad"] + mood_distribution["Stressed"])
    ) / 100

    mood_score = round(((sentiment_score + 1) / 2) * 4 + 1)
    mood_score = max(1, min(mood_score, 5))
    mood_label = mood_scale[mood_score]

    # 🧠 Console Output (for debugging and demo)
    print("\n🧠 Received Data from Next.js:")
    print(f"Date: {date}")
    print(f"Key Moments:\n{key_moments_text}")
    print("------------------------------------------------")
    print("🧩 Mood Distribution (%):")
    for mood, value in mood_distribution.items():
        print(f"   {mood}: {value}%")
    print("------------------------------------------------")
    print(f"🌈 Dominant Mood: {dominant_mood} ({dominant_score}%)")
    print(f"🧩 Mood Score: {mood_score} ({mood_label})")
    print(f"⚡ Focus Detected: {'Yes' if focused else 'No'}")
    print("------------------------------------------------\n")

    # ✅ Return analysis result to frontend
    return {
        "status": "success",
        "date": date,
        "mood_distribution": mood_distribution,
        "dominant_mood": dominant_mood,
        "mood_score": mood_score,
        "mood_label": mood_label,
        "focus_detected": focused,
    }
