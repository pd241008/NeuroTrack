from typing import List, Dict

# 🧠 Emotion Keyword Lists (expanded for richer detection)
MOOD_CATEGORIES: Dict[str, List[str]] = {
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
MOOD_SCALE: Dict[int, str] = {
    1: "Awful",
    2: "Bad",
    3: "Normal",
    4: "Good",
    5: "Amazing"
}

ALLOWED_ORIGINS: List[str] = ["*"]
