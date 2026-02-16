# 🚀 GROQ REAL-TIME AI AGENT HACKATHON PLATFORM - MASTER GUIDE

## 1. EXECUTIVE SUMMARY
This is a **high-performance, cinematic web platform** designed to host the "Groq Real-Time AI Agent Hackathon". It is not just a hackathon website; it is an **immersive digital experience** built to showcase the future of Agentic AI.

The platform combines **Next.js 14+ (App Router)** with advanced **WebGL (Three.js)** and **Framer Motion** animations to create a "Black & Gold" premium aesthetic. It includes full authentication, team management, project submission, and a live "Arena" gallery.

---

## 2. TECHNOLOGY STACK

### **Frontend Core**
- **Framework**: `Next.js 16` (Latest, App Router) using `React 19`.
- **Styling**: `Tailwind CSS v4` (Performance-first utility classes).
- **Animations**: `Framer Motion` (Complex UI transitions, spring physics).
- **3D Graphics**: `Three.js` + `@react-three/fiber` + `@react-three/drei` (WebGL scenes).
- **Icons**: `Lucide React` & `@tabler/icons-react`.

### **Backend & Database**
- **Database**: `PostgreSQL` (Managed via Neon or local Postgres).
- **ORM**: `Prisma` (Type-safe database interactions).
- **Authentication**: Custom JWT-based auth (for maximum control) using `bcryptjs` and `jsonwebtoken`.
- **API**: Next.js API Routes (`src/app/api/...`).

### **AI Integration**
- **SDK**: `groq-sdk` (For integrating Groq's high-speed LPU inference).

---

## 3. CORE FEATURES & MODULES

### **A. Immersive Landing Page (`src/app/page.tsx`)**
A scroll-based cinematic journey introducing the hackathon.
- **Hero Section**: Features the `GoldenTesseract` 3D core and `CinematicOverlay`.
- **Interactive Timeline**: A step-by-step roadmap of the event.
- **Tracks & Challenges**: Detailed breakdown of hackathon themes.
- **Prize Reveal**: High-impact section showcasing rewards.

### **B. Authentication System**
- **Register (`/register`)**: Custom sign-up flow with validation.
- **Login (`/login`)**: Secure JWT-based login.
- **Session Management**: Handled via `HttpOnly` cookies for security.

### **C. User Dashboard (`/dashboard`)**
The command center for participants.
- **Status Overview**: "Application Pending", "Accepted", "Team Formation".
- **Team Management**: Create a team, invite members via email, or join existing teams.
- **Project Submission**: Forms to submit GitHub repos, demo links, and descriptions.

### **D. The Arena / Gallery (`/gallery`)**
A "Netflix-style" showcase of all submitted AI agents.
- **Filtering**: Sort by track (Healthcare, FinTech, etc.).
- **Live Voting**: Participants can "heart" projects (stored in DB).
- **Leaderboard**: Real-time ranking based on judges' scores and community votes.

### **E. Admin Panel (Hidden Role)**
- Allows organizers to view all teams, approve applications, and grade projects.

---

## 4. VISUAL DESIGN SYSTEM: "OBSIDIAN & GOLD"

The design philosophy is **"Cinematic Sci-Fi Luxury"**.

### **Key Visual Elements (`src/components/ui/...`)**
1.  **Cinematic Overlay**: A global layer adding:
    - **Film Grain**: Dynamic noise texture for grit.
    - **Vignette**: Darkened corners to focus attention.
    - **Letterboxing**: Subtle black bars for a movie feel.
    - **Chromatic Aberration**: RGB lens splitting on edges.
2.  **Fairy Dust**: Interactive gold/white particles that float from the cursor.
3.  **Golden Tesseract**: A 3D React Three Fiber scene representing the "AI Core".
4.  **Glassmorphism**: Heavy use of `backdrop-filter: blur()` on dark translucent backgrounds.
5.  **Typography**: `Inter` (Google Fonts) with wide tracking (letter-spacing) for uppercase headers.

### **Color Palette**
- **Primary**: `#000000` (Obsidian Black)
- **Accent**: `#FFD700` (Cyber Gold)
- **Secondary**: `#22D3EE` (Electric Cyan - for "AI" elements)
- **Text**: White with varying opacities (100%, 60%, 40%).

---

## 5. PERFORMANCE ENGINEERING

The site is optimized to run smooth 3D graphics even on laptops.

1.  **FPS Limiter**: The background particles (`ReactiveParticles`) are capped at **30 FPS** to prevent CPU overheating.
2.  **Canvas Optimization**:
    - Removed duplicate canvas layers (preventing double rendering).
    - Reduced `GoldenTesseract` pixel ratio to **1.0** (Standard) from 2.0 (Retina) for 2x performance gain.
    - Lowered star count from 2000 to 500.
3.  **Component Lazy Loading**: Heavy 3D assets are loaded only when needed.

---

## 6. PROJECT DIRECTORY MAP

```
/src
  /app              # Next.js App Router Pages
    /api            # Backend API routes (auth, teams, projects)
    /dashboard      # User Dashboard
    /gallery        # Project Showcase
    /login          # Auth Pages
    page.tsx        # Main Landing Page
    layout.tsx      # Global Wrapper (Fonts, Metadata, Overlays)
  
  /components       # React Components
    /animations     # FairyDust, Particles, ScrollProgress
    /landing        # Feature-specific sections (Hero, Tracks)
    /three          # 3D Scenes (GoldenTesseract, NeuralBackground)
    /ui             # Reusable UI (Buttons, Cards, Logos)

  /lib              # Utilities
    auth.ts         # Authentication logic
    db.ts           # Prisma client instance
    utils.ts        # CN (Tailwind merger) helper
```

---

## 7. HOW TO DEPLOY

### **Option 1: Vercel (Recommended)**
1.  Push code to GitHub.
2.  Import project in Vercel.
3.  Add Environment Variables (`DATABASE_URL`, `JWT_SECRET`).
4.  Click **Deploy**.

### **Option 2: Local Deployment**
1.  Run `npm run build`.
2.  Run `npm start`.
3.  Access at `http://localhost:3000`.

---

## 8. FUTURE ROADMAP (What's Next?)
- [ ] **Real-time Chat**: Integrate WebSockets for team chat.
- [ ] **AI Judge**: Use Groq to auto-evaluate code quality on submission.
- [ ] **Live Streaming**: Embed Twitch/YouTube for the closing ceremony.

---

**© 2026 ANALYTICS VIDHYA AGENTIC AI PIONEER PROGRAM**
*Built with ❤️ by Groq & AV Engineering Team*
