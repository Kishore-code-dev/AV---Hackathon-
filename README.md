# Groq Agentic AI Hackathon Platform - Pioneer Edition

> **"Precision. Autonomy. Scale."**

This is the **Ultra-Premium** source code for the "Agentic AI Pioneer Program" platform. It features a cinematic "Mission Control" interface, 3D neural visualizations, and a robust full-stack architecture built with Next.js 14, Prisma, and TailwindCSS.

![Agentic AI Platform](https://media.discordapp.net/attachments/1093933333333333333/1175555555555555555/image.png)

## 🚀 Key Premium Features

-   **Cinematic UI**: Custom "Obsidian & Gold" design system with glassmorphism and micro-interactions.
-   **3D Neural Core**: Interactive `React Three Fiber` visualization of the agent network.
-   **Real-Time Dashboard**: "Mission Control" for participants to track status, team formation, and submissions.
-   **Full Authentication**: Secure, production-ready auth flow with hashed passwords and JWT cookies.
-   **Admin Overseer**: A "God Mode" dashboard for judges to view all activity.
-   **Performant**: Optimized for 100/100 Lighthouse scores with `next/image` and code splitting.

## 🛠 Quick Start

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Environment Setup**:
    Create a `.env` file in the root directory:
    ```env
    DATABASE_URL="file:./dev.db"
    JWT_SECRET="agentic-revolution-secret-key-2024"
    ```

3.  **Database Initialization**:
    ```bash
    npx prisma generate
    npx prisma db push
    ```

    (Optional) **Seed Data** for a populated experience:
    ```bash
    npx tsx prisma/seed.ts
    ```

4.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view the platform.

## 📦 Deployment (Vercel)

The fastest way to get a **live host link**:

1.  **Push to GitHub** (See below).
2.  Go to [Vercel.com](https://vercel.com) and sign up/login.
3.  Click **"Add New Project"** and import your GitHub repository.
4.  Vercel will detect Next.js. Click **Deploy**.
5.  **Done!** You will get a link like `https://groq-platform.vercel.app`.

## 🚀 **INSTANT DEPLOYMENT (No Git Required)**

Since you are running locally without Git, the fastest way to get a host link is:

1.  **Run the Deployment Script**:
    Double-click `DEPLOY_NOW.bat` in this folder.

2.  **Follow the Prompts**:
    -   Log in to Vercel (Browser will open)
    -   `Set up and deploy?` -> **Y**
    -   `Which scope?` -> **Enter** (Select yourself)
    -   `Link to existing project?` -> **N**
    -   `Project Name?` -> **Enter** (groq-platform)
    -   `In which directory?` -> **Enter** (./)
    -   `Want to modify settings?` -> **N**

3.  **Get Your Link**:
    It will generate a link like `https://groq-platform.vercel.app`.

---

**Built for the Agentic Revolution.**
, switch `provider` in `schema.prisma` to `postgresql` (e.g., Supabase or Neon).

---

**Architected for the Future of AI.**
