# NeuroTrack

# NeuroTrack – MVP Roadmap & Folder Structure

---

## **Phase 1 – Core MVP (Foundation)**

👉 Goal: Get journaling, timer, and streaks working with auth & sync.

- 🔐 **Clerk Auth** (Sign-in, Sign-up, Profile)
- 🧾 **Daily mood + focus logging** (form with mood selector + textarea)
- 📦 **Store logs in Convex** (CRUD with userId from Clerk)
- 📜 **Journal history page** (list of past entries, editable/deletable)
- ⏱ **Pomodoro-style focus timer** (basic UI, store finished sessions in Convex)
- 🔁 **Basic streak tracking** (Convex function + dashboard view)

---

## 🔹 **Phase 2 – Intelligence & Insights (AI Layer)**

👉 Goal: Add personalized AI-driven insights using LangChain + RAG.

- 🤖 **AI Sentiment/Mood Detection** (FastAPI endpoint → classify moods from journal logs)
- 📊 **Mood & Focus Analytics Dashboard** (Recharts/Chart.js with Convex queries)
- 🧠 **Weekly Summary Reports** (FastAPI → LangChain retrieves logs from Convex, generates summary)
- 🔍 **Semantic Search in Journal** (Ask: “When was I most stressed?” → FastAPI RAG pipeline retrieves relevant logs)
- 💾 **Export Journal Data** (PDF/CSV download via FastAPI)

---

## 🔹 **Phase 3 – Personalization & Notifications**

👉 Goal: Make NeuroTrack engaging & long-term usable.

- 🎨 **Theme Switcher + Dark Mode** (Next.js theme provider + Tailwind themes.css)
- 🔔 **Notifications/Reminders** (Convex cron jobs or FastAPI scheduler → email/push)
- 🔗 **Shareable Streak/Mood Summary** (optional public report link)
- 🌐 **PWA Support (Offline Logs)** (service worker + local cache, sync with Convex on reconnect)

```bash
neurotrack/
├── /app                         # Next.js App Router
│   ├── /dashboard               # Mood & focus stats
│   ├── /journal
│   │   ├── /new                 # Log new entry
│   │   └── /[id]                # View/edit single log
│   ├── /timer                   # Pomodoro timer
│   ├── /auth                    # Clerk auth (sign-in, sign-up, profile)
│   ├── /settings                # Theme, reminders, export
│   ├── /api                     # API routes (proxy + helpers)
│   │   ├── /convex              # (optional extra API helpers for Convex)
│   │   └── /fastapi             # Proxy to FastAPI
│   │       ├── /summarize
│   │       │   └── route.ts     # Calls FastAPI /summarize
│   │       ├── /sentiment
│   │       │   └── route.ts     # Calls FastAPI /sentiment
│   │       ├── /search
│   │       │   └── route.ts     # Calls FastAPI /search (RAG semantic search)
│   │       └── /export
│   │           └── route.ts     # Calls FastAPI /export (PDF/CSV)(Optional)
│   └── layout.tsx
│
├── /components                  # Reusable UI
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── MoodPicker.tsx
│   ├── Timer.tsx
│   ├── WeeklyReportCard.tsx
│   ├── Chart.tsx
│   └── AuthGuard.tsx            # Protect routes with Clerk
│
├── /convex                      # Convex backend functions
│   ├── schema.ts                # Convex DB schema
│   ├── logs.ts                  # Log CRUD (addLog, getLogs, deleteLog)
│   ├── streak.ts                # Streak tracking logic
│   └── user.ts                  # Helper queries for user data
│
├── /lib                         # Utilities
│   ├── clerk.ts                 # Clerk config
│   ├── convexClient.ts          # Convex client setup
│   ├── fastapiClient.ts         # Fetch wrapper to call Next.js proxy API
│   ├── streak.ts                # Streak calculation utils
│   ├── charts.ts                # Chart.js/Recharts helpers
│   └── theme.ts                 # Theme switcher utils
│
├── /styles
│   ├── globals.css              # Tailwind base
│   └── themes.css               # Dark/light mode themes
│
├── /fastapi                     # AI backend (separate service)
│   ├── main.py                  # FastAPI entrypoint
│   ├── rag_pipeline.py          # LangChain RAG workflow
│   ├── sentiment.py             # Mood/emotion detection
│   ├── embeddings.py            # Sync Convex logs → vector store(optional)
│   ├── export_utils.py          # PDF/CSV report generation(optional)
│   └── requirements.txt
│
├── /public                      # Static assets (icons, logos)
│
├── .env.local                   # Clerk/Convex/FastAPI keys/LLM API-Key
├── tailwind.config.js
├── package.json
└── README.md

```
