"use client";
import { Button } from "@/components/ui/Button";
import { SparklesCore } from "@/components/ui/Sparkles";
import Link from 'next/link';
import { Trophy, Users, Zap, Layers } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";
import { HoverCard } from "@/components/animations/HoverCard";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { TextScramble } from "@/components/animations/TextScramble";
import { TextShimmer } from "@/components/animations/TextShimmer";
import { GoldenTesseract } from "@/components/three/GoldenTesseract";

export function Hero() {
    return (
        <section className="hero-section min-h-screen relative flex items-center justify-center overflow-hidden bg-black">

            {/* 0. THE CORE (3D Object) */}
            <GoldenTesseract />

            {/* 1. ULTRA-PREMIUM 2-COLOR AMBIENT LAYERS (Black & Gold) */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Top-Left: Subtle Gold Haze (The "Dawn") */}
                <div className="absolute top-[-30%] left-[-10%] w-[80%] h-[80%] bg-[radial-gradient(circle,rgba(212,175,55,0.08)_0%,transparent_70%)] animate-pulse duration-[8000ms]" />

                {/* Bottom-Right: Deep Obsidian Shine */}
                <div className="absolute bottom-[-30%] right-[-10%] w-[80%] h-[80%] bg-[radial-gradient(circle,rgba(255,255,255,0.03)_0%,transparent_70%)] animate-pulse delay-1000 duration-[10000ms]" />
            </div>

            {/* 2. Cinematic Dust (Gold & White Only) */}
            <div className="w-full absolute inset-0 h-screen pointer-events-none z-[1]">
                <SparklesCore
                    id="tsparticlesfullpage"
                    background="transparent"
                    minSize={0.4}
                    maxSize={1.0}
                    particleDensity={30}
                    className="w-full h-full"
                    particleColor="#FFD700" // Gold Dust
                />
            </div>

            {/* 3. Heavy Vignette for "Spotlight" Focus */}
            <div className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.9)_100%)]" />

            {/* Content Layer */}
            <div className="container relative z-20 mx-auto px-6 text-center pt-32">

                {/* Minimalist Badge */}
                <FadeIn delay={0.2} direction="down">
                    <div className="flex flex-col items-center gap-4 mb-4">
                        <div className="flex items-center gap-3 opacity-60">
                            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/40">Analytics Vidhya</span>
                            <span className="text-gold-500 font-bold">×</span>
                            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/40">Groq</span>
                        </div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 border border-white/10 rounded-full bg-white/5 backdrop-blur-md">
                            <div className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
                            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-gray-400">
                                <TextScramble text="PIONEER PROGRAM" />
                            </span>
                        </div>
                    </div>
                </FadeIn>

                {/* Main Headline - Sharp, Clean, Metallic with Shimmer */}
                <h1 className="hero-title text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8 text-white">
                    <FadeIn delay={0.3} direction="up">
                        AGENTIC <br />
                    </FadeIn>
                    <FadeIn delay={0.5} direction="up">
                        {/* Replaced static gradient with TextShimmer */}
                        <TextShimmer className="drop-shadow-[0_0_35px_rgba(212,175,55,0.4)]">
                            REVOLUTION
                        </TextShimmer>
                    </FadeIn>
                </h1>

                <FadeIn delay={0.7} direction="up">
                    <p className="hero-subtitle text-lg md:text-xl text-gray-500 max-w-xl mx-auto mb-16 font-light tracking-wide leading-relaxed">
                        Precision. Autonomy. Scale.<br />
                        Master the architecture of self-reasoning AI.
                    </p>
                </FadeIn>

                {/* Simplified Stats - Monochrome Glass */}
                <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20 max-w-5xl mx-auto" delayChildren={0.8}>
                    {[
                        { label: "\"THE FELLOWSHIP\"", value: "$50K", icon: Trophy },
                        { label: "ELITE BUILDERS", value: "1000+", icon: Users },
                        { label: "CORE MODULES", value: "08", icon: Layers },
                        { label: "PRODUCTION READY", value: "100%", icon: Zap },
                    ].map((stat, i) => (
                        <StaggerItem key={i}>
                            <div className="p-6 border-l border-white/5 hover:border-gold-500/50 transition-colors group text-left pl-8">
                                <span className="block text-2xl font-bold text-white mb-1 group-hover:text-gold-400 transition-colors font-mono">{stat.value}</span>
                                <span className="text-[10px] text-gray-600 uppercase tracking-[0.2em] group-hover:text-gray-400">{stat.label}</span>
                            </div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>

                {/* Premium CTA - High Contrast */}
                <FadeIn delay={1.0} direction="up">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                        <Link href="/register">
                            <MagneticButton className="group relative bg-white text-black px-12 py-4 font-bold text-sm tracking-widest uppercase overflow-hidden hover:bg-gold-400 transition-colors duration-500">
                                <span className="relative z-10">Initialize</span>
                                <div className="absolute inset-0 bg-gold-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out -z-0" />
                            </MagneticButton>
                        </Link>
                        <a href="https://www.analyticsvidhya.com/agentic-ai-pioneer-program/" target="_blank" rel="noopener noreferrer">
                            <span className="text-gray-500 text-xs tracking-[0.2em] uppercase hover:text-white transition-colors cursor-pointer border-b border-transparent hover:border-white pb-1">
                                View Syllabus
                            </span>
                        </a>
                    </div>
                </FadeIn>
            </div>

            {/* Minimal Scroll Line */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-24 w-[1px] bg-gradient-to-t from-transparent via-white/20 to-transparent animate-pulse" />
        </section>
    );
}
