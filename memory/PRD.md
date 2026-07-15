# Dain Ramnauth — Personal Portfolio Website

## Original Problem Statement
Build a personal website for Dain Ramnauth to be hosted through GitHub. Dain has a strong
interest in learning AI and building his own AI model, and also enjoys network security —
using Linux daily, learning penetration testing / WiFi penetration testing, mastering
Aircrack-ng and Wireshark, and being comfortable with ParrotOS and Kali Linux. Site must be
modern, animated, mobile responsive, fast, and follow coding standards.

## User Choices (explicit)
- No traditional navbar — swipe gesture (left/right) navigation between sections instead.
- Each section (Home, About, Skills, Projects, Contact) is a macOS-style terminal window,
  content types/reveals top-to-bottom.
- Bright/cheerful color theme (NOT dark hacker green-on-black), pastel accents on light bg.
- Working contact form emailing daindannyr@gmail.com via Resend.
- Backend needed only for contact form; rest of site is static.
- Final backend hosting target: Render (GitHub Pages can't host FastAPI). Frontend -> GitHub.

## Architecture
- Frontend: React (CRA-style, manual setup) + Swiper.js (keyboard/pagination/touch) +
  Tailwind CSS + lucide-react icons + Space Mono font. Single page, 5 full-screen slides.
- Backend: FastAPI + Motor (MongoDB) + Resend SDK. Single endpoint `POST /api/contact`
  (validates, stores in `contact_messages` collection, emails via Resend) + `GET /api/health`.
- DB: MongoDB `dain_portfolio` db, `contact_messages` collection.

## What's Been Implemented (as of Feb 2026)
- Home, About, Skills, Projects, Contact sections — all terminal-styled with sequential
  top-to-bottom text reveal (`useSequentialReveal` hook).
- Swiper-based navigation: arrow keys, pagination dots, and touch swipe all work.
- Projects section showcases Dain's real projects: GitScout (github repo search tool,
  https://gitreposcout.netlify.app/) and ClipBridge (cross-device clipboard sync,
  https://sharebridge.netlify.app/).
- Contact form wired to `/api/contact`, sends real email via Resend to daindannyr@gmail.com,
  persists submissions to Mongo. Field validation (min_length) added on name/message.
- Fully tested end-to-end (backend pytest + frontend Playwright) via testing_agent — 100% pass.

## Core Requirements (static)
- Mobile responsive, fast-loading, no dark-mode, data-testid on all interactive elements.
- No hardcoded URLs — frontend uses `REACT_APP_BACKEND_URL`; backend reads all secrets from `.env`.

## Prioritized Backlog / Next Steps
- P1: Push code to GitHub via Emergent's "Save to GitHub" button (user confirmed not pushed yet).
- P1: Connect Render (user already has account) to the GitHub repo and deploy backend using `/app/render.yaml` blueprint — see deployment instructions below.
- P1: After Render deploy, update `REACT_APP_BACKEND_URL` in frontend `.env` to the live Render URL, then `yarn deploy` (gh-pages) or GitHub Pages workflow to publish frontend.
- P2: Add real GitHub/LinkedIn social links in Contact section (placeholder currently omitted — ask Dain for handles).
- P2: Optionally add a blog/writeups section for security & AI learning notes.
- P2: Optionally verify a custom domain in Resend for a branded "from" address (currently uses onboarding@resend.dev).

## Render Deployment Notes (backend)
- `MONGO_URL` is intentionally NOT required in production — per user's choice, MongoDB storage
  of contact submissions is SKIPPED in production. Code in `server.py` now checks `if db is not None`
  before any Mongo operation, so the backend runs fine on Render with zero DB configured. Email-only.
- `/app/render.yaml` blueprint defines: rootDir=backend, build=`pip install -r requirements.txt`,
  start=`uvicorn server:app --host 0.0.0.0 --port $PORT`, and env vars (RESEND_API_KEY, CORS_ORIGINS
  marked `sync: false` — must be entered manually in Render dashboard for security).
- Steps for user: (1) Render Dashboard → New → Blueprint → select repo `ddr-ai/ddr-ai.github.io`
  (already pushed), Render auto-detects `render.yaml`, (2) enter env vars in dashboard:
  `RESEND_API_KEY=re_JPb1U6Gt_6t44bg9bAtPEy7cSrEgMAZJr`, `CORS_ORIGINS=https://ddr-ai.github.io`,
  (3) Deploy, (4) copy the live `https://xxx.onrender.com` URL.
- Frontend is prepped for GitHub Pages: `gh-pages` package installed, `yarn deploy` script added,
  `homepage: "https://ddr-ai.github.io"` set (this is a GitHub USER page repo — served at domain root).

## GitHub Pages Auto-Deploy (frontend)
- Repo: `ddr-ai/ddr-ai.github.io` (GitHub user page — auto-served at https://ddr-ai.github.io).
- Workflow at `/app/.github/workflows/deploy.yml`: on every push to `main`, builds `frontend/`
  with Yarn and deploys via `actions/deploy-pages` (modern Pages Actions flow, no gh-pages branch needed).
- **Required one-time setup by user (cannot be done by agent):**
  1. Repo Settings → Pages → "Build and deployment" → Source: set to **GitHub Actions**.
  2. Repo Settings → Secrets and variables → Actions → New repository secret:
     `REACT_APP_BACKEND_URL` = the live Render backend URL (e.g. `https://xxx.onrender.com`).
  3. Push to `main` (or re-run workflow manually) to trigger first deploy.
- After Render backend is live, also set `CORS_ORIGINS=https://ddr-ai.github.io` on Render so the
  deployed frontend can call the API without CORS errors.

## Enhancement Idea
Add a small "guestbook" or downloadable resume/CV button inside the terminal windows — recruiters
browsing a security/AI portfolio often want a one-click resume download; could boost profile engagement.
