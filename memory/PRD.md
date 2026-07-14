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
- P1: Deploy FastAPI backend to Render (separate from GitHub Pages frontend) when ready to go live.
- P1: Update `REACT_APP_BACKEND_URL` in frontend `.env` to the live Render URL before final GitHub Pages deploy.
- P2: Add real GitHub/LinkedIn social links in Contact section (placeholder currently omitted — ask Dain for handles).
- P2: Optionally add a blog/writeups section for security & AI learning notes.
- P2: Optionally verify a custom domain in Resend for a branded "from" address (currently uses onboarding@resend.dev).

## Enhancement Idea
Add a small "guestbook" or downloadable resume/CV button inside the terminal windows — recruiters
browsing a security/AI portfolio often want a one-click resume download; could boost profile engagement.
