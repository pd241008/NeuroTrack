import re
from typing import Dict, Tuple, Any

from app.core.config import MOOD_CATEGORIES, MOOD_SCALE

def analyze_mood(text: str) -> Dict[str, Any]:
    text_lower = text.lower()
    
    # Initialize mood counts
    mood_counts: Dict[str, int] = {mood: 0 for mood in MOOD_CATEGORIES.keys()}

    # 🔍 Smarter punctuation-tolerant word matching
    for mood, keywords in MOOD_CATEGORIES.items():
        for word in keywords:
            # Match even if word ends with punctuation or markdown 
            pattern = rf"(?<!\w){word}(?!\w)"
            matches = re.findall(pattern, text_lower)
            mood_counts[mood] += len(matches)

    total_words = sum(mood_counts.values())

    # 🧮 Normalize to percentages, ensuring small moods show at least 1%
    if total_words == 0:
        mood_distribution: Dict[str, float] = {mood: 0.0 for mood in MOOD_CATEGORIES.keys()}
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
        re.search(r"\b(focused|productive|flow|clarity|concentrated|mindful)\b", text_lower)
    )

    # 🧩 Sentiment-based Mood Score (Happy+Calm vs Sad+Stressed)
    sentiment_score = (
        (mood_distribution["Happy"] + mood_distribution["Calm"])
        - (mood_distribution["Sad"] + mood_distribution["Stressed"])
    ) / 100

    mood_score = round(((sentiment_score + 1) / 2) * 4 + 1)
    mood_score = max(1, min(mood_score, 5))
    mood_label = MOOD_SCALE[mood_score]

    return {
        "mood_distribution": mood_distribution,
        "dominant_mood": dominant_mood,
        "dominant_score": dominant_score,
        "mood_score": mood_score,
        "mood_label": mood_label,
        "focused": focused
    }
