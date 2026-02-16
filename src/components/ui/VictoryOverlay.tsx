"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAI } from "@/lib/ai-context";
import { Check } from "lucide-react";

/**
 * VICTORY SILENCE MOMENT
 * Implements Prompt Requirement #9:
 * 1. Global Stillness (Darkens screen)
 * 2. Single expanding golden pulse
 * 3. Slow emergence of success state
 */
export function VictoryOverlay() {
    const { aiState } = useAI();
    const [showPulse, setShowPulse] = useState(false);

    useEffect(() => {
        if (aiState === "COMPLETED") {
            // Trigger the sequence
            setShowPulse(true);

            // Reset after animation
            const timer = setTimeout(() => setShowPulse(false), 4000);
            return () => clearTimeout(timer);
        }
    }, [aiState]);

    return (
        <AnimatePresence>
            {showPulse && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">

                    {/* 1. Global Stillness / Dimming */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        transition={{ duration: 0.5 }}
                    />

                    {/* 2. Frozen/Slow Particles can be simulated by the background being dimmed */}

                    {/* 3. The Golden Pulse (Shockwave) */}
                    <motion.div
                        initial={{ scale: 0, opacity: 1, borderWidth: "50px" }}
                        animate={{ scale: 20, opacity: 0, borderWidth: "0px" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="absolute w-20 h-20 rounded-full border-gold-400 border-[50px] z-10"
                    />

                    {/* 4. Center Impact Flash */}
                    <motion.div
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: [1, 1.5, 0], opacity: [1, 1, 0] }}
                        transition={{ duration: 0.8 }}
                        className="absolute w-10 h-10 bg-white rounded-full z-20 mix-blend-overlay"
                    />

                    {/* 5. Success Card Emergence */}
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: 0.8, duration: 0.8, type: "spring", bounce: 0.3 }}
                        className="relative z-30 flex flex-col items-center gap-4"
                    >
                        <div className="w-20 h-20 rounded-full bg-gold-500/10 border border-gold-500 flex items-center justify-center shadow-[0_0_50px_rgba(212,175,55,0.4)]">
                            <Check className="w-10 h-10 text-gold-400 drop-shadow-[0_0_10px_rgba(212,175,55,1)]" strokeWidth={3} />
                        </div>
                        <h2 className="text-3xl font-bold text-white tracking-widest uppercase">
                            Protocol Complete
                        </h2>
                        <p className="text-gold-400 font-mono text-sm tracking-[0.2em] opacity-80">
                            OPTIMAL SOLUTION GENERATED
                        </p>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
