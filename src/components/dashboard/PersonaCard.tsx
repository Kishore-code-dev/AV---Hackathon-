"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Target, Shield } from 'lucide-react';

interface PersonaProps {
    archetype: string;
    strengths: string[];
    track: string;
}

export function PersonaCard({ archetype, strengths, track }: PersonaProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-2xl bg-black border border-white/10 p-6 group"
        >
            {/* Background Neural Pulse */}
            <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 to-purple-500/5 opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-gold-500/10 rounded-full blur-xl animate-pulse" />

            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-white/5 rounded-lg text-gold-500 border border-gold-500/20 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                        <Brain size={24} />
                    </div>
                    <div>
                        <h4 className="text-xs text-gray-500 uppercase tracking-widest font-mono">Cognitive Profile</h4>
                        <h3 className="text-xl font-bold text-white">{archetype}</h3>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2 text-sm text-gray-300">
                            <Zap size={14} className="text-blue-400" />
                            <span className="font-bold">Detected Strengths</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {strengths.map((str, i) => (
                                <span key={i} className="px-2 py-1 bg-blue-500/10 border border-blue-500/20 rounded text-xs text-blue-300">
                                    {str}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-2 text-sm text-gray-300">
                            <Target size={14} className="text-purple-400" />
                            <span className="font-bold">Recommended Track</span>
                        </div>
                        <div className="px-3 py-2 bg-purple-500/10 border border-purple-500/20 rounded-lg text-sm text-purple-300 font-mono">
                            {track}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
