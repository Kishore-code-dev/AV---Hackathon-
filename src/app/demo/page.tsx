"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { SparklesCore } from "@/components/ui/Sparkles";
import { FadeIn } from "@/components/animations/FadeIn";

export default function CinematicDemoPage() {
    const [instructionVisible, setInstructionVisible] = useState(true);

    return (
        <main
            className="min-h-screen w-full bg-black relative overflow-hidden flex items-center justify-center"
            onClick={() => setInstructionVisible(false)} // Hide UI on first interaction for recording
        >
            {/* 1. Cinematic Background Layer: Soft Gradients */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-blue-900/10 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-purple-900/10 rounded-full blur-[150px] animate-pulse delay-1000" />
                <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] bg-gold-500/5 rounded-full blur-[120px]" />
            </div>

            {/* 2. Subtle Particles (Layered on top of global ReactiveParticles) */}
            <div className="absolute inset-0 z-0 opacity-40">
                <SparklesCore
                    id="cinematic-sparkles"
                    background="transparent"
                    minSize={0.4}
                    maxSize={1.2}
                    particleDensity={20} // Minimal density
                    className="w-full h-full"
                    particleColor="#FFFFFF"
                />
            </div>

            {/* 3. Instruction Overlay (Fades out) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: instructionVisible ? 1 : 0 }}
                transition={{ duration: 1 }}
                className="relative z-10 text-center pointer-events-none"
            >
                <FadeIn delay={0.5}>
                    <h1 className="text-xl font-light text-gray-500 tracking-[0.5em] uppercase mb-4">
                        Cinematic <span className="text-gold-500">Demo</span>
                    </h1>
                </FadeIn>
                <FadeIn delay={1.5}>
                    <div className="flex flex-col gap-2 text-xs text-gray-600 font-mono">
                        <p>[ SINGLE CLICK ] ............... IGNITE SYSTEM</p>
                        <p>[ DOUBLE CLICK ] ............... POWER DOWN</p>
                        <p>[ HOVER CENTER ] ............... LENS FOCUS</p>
                    </div>
                </FadeIn>
            </motion.div>

            {/* 4. Center Focus Object (To show 'Hover' lens effect) */}
            <motion.div
                className="absolute z-20 w-64 h-64 border border-white/5 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-1000"
            >
                <div className="w-full h-full rounded-full border border-gold-500/10 scale-90 animate-[spin_10s_linear_infinite]" />
                <div className="absolute inset-0 rounded-full border border-white/5 scale-110 animate-[spin_15s_linear_infinite_reverse]" />
            </motion.div>

            {/* 5. Vignette for Cinematic Feel */}
            <div className="absolute inset-0 pointer-events-none z-30 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
            <div className="absolute inset-0 pointer-events-none z-30 bg-gradient-to-b from-black/80 via-transparent to-black/80" />
        </main>
    );
}
