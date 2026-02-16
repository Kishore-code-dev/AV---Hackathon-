import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Cursor } from "@/components/ui/Cursor";
import { ScrollProgress } from "@/components/animations/ScrollProgress";
import { ReactiveParticles } from "@/components/animations/ReactiveParticles";
import { MatrixRain } from "@/components/animations/MatrixRain";
import { Scanline } from "@/components/ui/Scanline"; // Added Scanline
import { Navbar } from "@/components/Navbar";
import { getCurrentUser } from "@/lib/auth";

import { Inter } from "next/font/google"; // Fallback to a standard font or just use system fonts if this fails too. Actually, let's just use a standard one.
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Analytics Vidhya Agentic AI Pioneer Program | Build the Future",
  description: "Join the world's most premium Agentic AI hackathon. Powered by LangGraph, CrewAI & AutoGen.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} antialiased cursor-none md:cursor-auto bg-black text-white selection:bg-yellow-500 selection:text-black font-sans`}
      >
        <ScrollProgress />
        <Scanline /> {/* Global HUD Scanning Effect */}
        <ReactiveParticles />
        <MatrixRain />
        <Cursor />
        <Navbar user={user} />
        {children}
      </body>
    </html>
  );
}
