"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconTrophy, IconBrain } from "@tabler/icons-react";
import { getLeaderboard } from "@/app/actions/leaderboard"; // Server Action

export function GlobalIntelMatrix() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            setLoading(true);
            const data = await getLeaderboard();
            setProjects(data);
            setLoading(false);
        }
        loadData();

        // Poll for updates every 10s (Simulating Pulse)
        const interval = setInterval(loadData, 10000);
        return () => clearInterval(interval);
    }, []);

    if (loading && projects.length === 0) {
        return (
            <div className="w-full h-64 flex items-center justify-center text-gold-500 animate-pulse">
                <IconBrain size={48} className="animate-spin-slow" />
                <span className="ml-4 font-mono">ESTABLISHING NEURAL LINK...</span>
            </div>
        );
    }

    if (projects.length === 0) {
        return (
            <div className="text-center py-20 text-gray-500">
                <p>No active intelligence nodes detected.</p>
                <p className="text-sm">Be the first to submit.</p>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="grid grid-cols-12 text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 px-6">
                <div className="col-span-1">Rank</div>
                <div className="col-span-4">Project Entity</div>
                <div className="col-span-2 text-center">AI Score</div>
                <div className="col-span-2 text-center">Novelty</div>
                <div className="col-span-3 text-right">Council Consensus</div>
            </div>

            <div className="space-y-3">
                <AnimatePresence>
                    {projects.map((p, i) => (
                        <motion.div
                            layout
                            key={p.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`
                                grid grid-cols-12 items-center px-6 py-4 rounded-xl border backdrop-blur-md relative overflow-hidden group
                                ${i === 0 ? "bg-gold-500/10 border-gold-500/50 shadow-[0_0_30px_rgba(251,191,36,0.1)]" : "bg-white/5 border-white/5"}
                            `}
                        >
                            {/* Rank */}
                            <div className="col-span-1 flex items-center gap-2 font-mono text-lg">
                                {i === 0 ? <IconTrophy size={20} className="text-gold-500" /> :
                                    <span className="text-gray-500">#{i + 1}</span>}
                            </div>

                            {/* Project Info */}
                            <div className="col-span-4">
                                <h3 className={`font-bold text-lg ${i === 0 ? "text-white" : "text-gray-200"}`}>{p.title}</h3>
                                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    Live Processing
                                </div>
                            </div>

                            {/* Main Score with Sparkline */}
                            <div className="col-span-2 flex flex-col items-center justify-center">
                                <span className={`text-2xl font-black ${getScoreColor(p.score)}`}>
                                    {p.score.toFixed(1)}
                                </span>
                                <div className="h-1 w-16 bg-white/10 rounded-full mt-1 overflow-hidden">
                                    <motion.div
                                        className="h-full bg-current"
                                        style={{ width: `${p.score}%`, color: p.score > 80 ? '#fbbf24' : '#6b7280' }}
                                    />
                                </div>
                            </div>

                            {/* Novelty Metric */}
                            <div className="col-span-2 flex flex-col items-center justify-center">
                                <div className="relative w-12 h-12 flex items-center justify-center">
                                    <svg className="w-full h-full -rotate-90">
                                        <circle cx="24" cy="24" r="20" stroke="rgba(255,255,255,0.1)" strokeWidth="4" fill="none" />
                                        <motion.circle
                                            cx="24" cy="24" r="20"
                                            stroke="url(#gradientNovelty)"
                                            strokeWidth="4"
                                            fill="none"
                                            strokeDasharray="126"
                                            animate={{ strokeDashoffset: 126 - (126 * p.novelty) / 100 }}
                                            transition={{ duration: 1 }}
                                        />
                                    </svg>
                                    <span className="absolute text-[10px] font-bold text-white">{p.novelty}</span>
                                </div>
                                <span className="text-[9px] uppercase text-gray-500 mt-1">Unique</span>
                            </div>

                            {/* AI Quote */}
                            <div className="col-span-3 text-right">
                                <p className="text-xs text-gray-400 italic leading-tight">"{p.agentQuote}"</p>
                                <div className="flex justify-end gap-1 mt-2">
                                    {/* Mock Agent Avatars */}
                                    <div className="w-4 h-4 rounded-full bg-gold-500 border border-black/50" title="Visionary" />
                                    <div className="w-4 h-4 rounded-full bg-blue-500 border border-black/50" title="Architect" />
                                    <div className="w-4 h-4 rounded-full bg-red-500 border border-black/50" title="Skeptic" />
                                </div>
                            </div>

                            {/* Hover Effect */}
                            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* SVG Gradients */}
            <svg style={{ height: 0 }}>
                <defs>
                    <linearGradient id="gradientNovelty" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#d4af37" />
                        <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
}

function getScoreColor(score: number) {
    if (score >= 90) return "text-gold-500";
    if (score >= 80) return "text-emerald-400";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
}
