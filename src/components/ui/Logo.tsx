"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { Particle } from "./Particle";

interface LogoProps {
    className?: string;
    showText?: boolean;
}

export function Logo({ className, showText = true }: LogoProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    // 💎 Precision Physics for Realistic Feel (Heavy, Industrial)
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [45, -45]); // More dramatic rotation
    const rotateY = useTransform(x, [-100, 100], [-45, 45]);

    // 🏎️ Damped, High-Fidelity Physics
    const springConfig = { damping: 20, stiffness: 300, mass: 1.5 }; // Snappier but still heavy
    const rotateXSpring = useSpring(rotateX, springConfig);
    const rotateYSpring = useSpring(rotateY, springConfig);

    // ⚡ Global Event Listener for Navbar Trigger
    useEffect(() => {
        const handleToggle = () => setIsExpanded(true);
        window.addEventListener('toggle-nexus', handleToggle);
        return () => window.removeEventListener('toggle-nexus', handleToggle);
    }, []);

    return (
        <>
            {/* 1. The Small "Toy" Logo */}
            <motion.div
                className={cn("flex items-center gap-4 select-none sidebar-logo perspective-1000 z-50 relative", className)}
                layoutId="solar-root" // Shared layout ID for magic transition
                onClick={() => !isDragging && setIsExpanded(true)} // Only expand if not dragging
            >
                <div className="relative w-16 h-16 cursor-grab active:cursor-grabbing">
                    <motion.div
                        className="w-full h-full relative z-10"
                        drag
                        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                        dragElastic={0.6}
                        onDragStart={() => setIsDragging(true)}
                        onDragEnd={() => setTimeout(() => setIsDragging(false), 100)} // Prevent click overlap
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        whileHover={{ scale: 1.2, rotate: 15, filter: "brightness(1.5)" }} // MUCH More visible interaction
                        whileTap={{ scale: 0.8 }} // Deep press
                        style={{ x, y, rotateX: rotateXSpring, rotateY: rotateYSpring }}
                    >
                        {/* 2. The Golden Atom Engine SVG */}
                        <svg viewBox="0 0 100 100" className="w-full h-full relative z-10 overflow-visible drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
                            <defs>
                                <linearGradient id="goldMetal" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#FBbf24" /> {/* Amber 400 */}
                                    <stop offset="25%" stopColor="#F59E0B" /> {/* Amber 500 */}
                                    <stop offset="50%" stopColor="#FFFBEB" /> {/* White highlight */}
                                    <stop offset="75%" stopColor="#B45309" /> {/* Brown shadow */}
                                    <stop offset="100%" stopColor="#FBbf24" />
                                </linearGradient>
                                <radialGradient id="sunBurst" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                                    <stop offset="30%" stopColor="#FCD34D" stopOpacity="0.8" />
                                    <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
                                </radialGradient>
                            </defs>

                            {/* The Nucleus (Golden Sun) */}
                            <motion.g animate={{ scale: isDragging ? [1, 1.2, 1] : 1 }} transition={{ duration: 0.5, repeat: isDragging ? Infinity : 0 }}>
                                <circle cx="50" cy="50" r="14" fill="#B45309" />
                                <circle cx="50" cy="50" r="12" fill="url(#goldMetal)" className="drop-shadow-[0_0_15px_rgba(251,191,36,0.8)]" />
                                <circle cx="50" cy="50" r="14" fill="url(#sunBurst)" className="mix-blend-screen" />
                            </motion.g>

                            {/* Ring 1 - Vertical */}
                            <motion.g style={{ originX: "50px", originY: "50px" }} animate={{ rotate: 360, rx: isDragging ? 22 : 16 }} transition={{ repeat: Infinity, ease: "linear", duration: isDragging ? 0.5 : 8 }}>
                                <path d="M50,10 A16,40 0 1,1 50,90" stroke="#92400E" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />
                                <path d="M50,90 A16,40 0 1,1 50,10" stroke="url(#goldMetal)" strokeWidth="4" fill="none" strokeLinecap="round" filter="drop-shadow(0 0 2px rgba(0,0,0,0.5))" />
                                <circle cx="50" cy="10" r="3" fill="#FFF" className="drop-shadow-[0_0_5px_#FFF]" />
                            </motion.g>

                            {/* Ring 2 - Horizontal */}
                            <motion.g style={{ originX: "50px", originY: "50px" }} animate={{ rotate: -360 }} transition={{ repeat: Infinity, ease: "linear", duration: isDragging ? 0.6 : 10 }}>
                                <path d="M10,50 A40,16 0 1,1 90,50" stroke="#92400E" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />
                                <path d="M90,50 A40,16 0 1,1 10,50" stroke="url(#goldMetal)" strokeWidth="4" fill="none" strokeLinecap="round" filter="drop-shadow(0 0 2px rgba(0,0,0,0.5))" />
                                <circle cx="90" cy="50" r="3" fill="#FFF" className="drop-shadow-[0_0_5px_#FFF]" />
                            </motion.g>

                            {/* Ring 3 - Diagonal */}
                            <motion.g style={{ originX: "50px", originY: "50px" }} animate={{ rotate: isDragging ? 720 : 360, scale: isDragging ? 1.2 : 1 }} transition={{ repeat: Infinity, ease: "linear", duration: isDragging ? 1 : 12 }}>
                                <ellipse cx="50" cy="50" rx="35" ry="35" stroke="url(#goldMetal)" strokeWidth="3" fill="none" transform="rotate(45 50 50)" />
                            </motion.g>
                        </svg>
                    </motion.div>
                </div>

                {showText && (
                    <motion.div className="flex flex-col justify-center pointer-events-none" layoutId="solar-text">
                        <span className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600 drop-shadow-sm">
                            Agentic AI
                        </span>
                        <span className="text-xs uppercase tracking-[0.2em] text-amber-200/80 font-bold ml-0.5">
                            Pioneer Program
                        </span>
                    </motion.div>
                )}
            </motion.div>

            {/* 2. The "Breakout" Nexus Manager */}
            <NexusBreakout isExpanded={isExpanded} onClose={() => setIsExpanded(false)} />
        </>
    );
}

// ----------------------------------------------------------------------------
// 🚀 The "Nexus Breakout" (Manually Mounts to Body for Fullscreen HUD)
// ----------------------------------------------------------------------------
import { createRoot } from "react-dom/client";

function NexusBreakout({ isExpanded, onClose }: { isExpanded: boolean; onClose: () => void }) {
    useEffect(() => {
        if (!isExpanded) return;

        const div = document.createElement("div");
        div.style.position = "fixed";
        div.style.inset = "0";
        div.style.zIndex = "999999";
        document.body.appendChild(div);

        const root = createRoot(div);
        root.render(<NexusOverlay onClose={() => {
            onClose();
            setTimeout(() => {
                root.unmount();
                div.remove();
            }, 800);
        }} />);

        return () => { };
    }, [isExpanded, onClose]);

    return null;
}

// ----------------------------------------------------------------------------
// 💎 The Holographic Nexus HUD - POWERFUL EDITION
// ----------------------------------------------------------------------------
function NexusOverlay({ onClose }: { onClose: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#020617] flex items-center justify-center overflow-hidden font-mono text-gold-500/80 cursor-default"
        >
            {/* 1. Cinematic Background Layer */}
            <NeuralField />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] z-0" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none z-50 opacity-20" />

            {/* 2. Corner Brackets (The Scouter Look) */}
            <CornerUI />

            {/* 3. The Core Central Intelligence */}
            <div className="relative z-10 flex items-center justify-center scale-75 md:scale-100">
                <PowerCore />
            </div>

            {/* 4. Top Left: Terminal Operations */}
            <div className="absolute top-12 left-12 w-64 hidden lg:block border-l-2 border-gold-500/20 pl-4 py-2">
                <p className="text-[10px] text-white/40 uppercase mb-4 tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
                    System_Logs.exe
                </p>
                <div className="space-y-1 overflow-hidden h-32 text-[10px] opacity-60">
                    <p className="text-emerald-400">{'>>'} INITIALIZING_PIONEER_CORE...</p>
                    <p>{'>>'} SYNCING_WITH_GROQ_LPU_CLUSTER_04</p>
                    <p>{'>>'} LOADING_AGENT_NEURAL_WEIGHTS</p>
                    <p className="text-gold-400">{'>>'} HANDSHAKE_ESTABLISHED</p>
                    <motion.p
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                    >{'>>>'} LISTENING_FOR_INPUT_SIGNAL_...</motion.p>
                </div>
            </div>

            {/* 5. Top Right: Hardware Metrics (Groq Visualization) */}
            <div className="absolute top-12 right-12 text-right hidden lg:block border-r-2 border-gold-500/20 pr-4 py-2">
                <p className="text-[10px] text-white/40 uppercase mb-4 tracking-widest flex items-center justify-end gap-2">
                    Groq_LPU_Status
                    <span className="w-2 h-2 rounded bg-cyan-400" />
                </p>
                <div className="space-y-4">
                    <div className="space-y-1">
                        <div className="flex justify-between gap-12 text-[10px]">
                            <span>INFERENCE_SPEED</span>
                            <span className="text-white">824 T/s</span>
                        </div>
                        <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden">
                            <motion.div className="h-full bg-cyan-400" animate={{ width: ["10%", "95%", "85%"] }} transition={{ duration: 2, repeat: Infinity }} />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <div className="flex justify-between gap-12 text-[10px]">
                            <span>NEURAL_LOAD</span>
                            <span className="text-white">42.8%</span>
                        </div>
                        <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden">
                            <motion.div className="h-full bg-gold-500" animate={{ width: ["40%", "45%", "42%"] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* 6. Bottom Left: Mission Control (Navigation) */}
            <div className="absolute bottom-12 left-12 p-6 border border-white/10 bg-white/5 backdrop-blur-xl rounded-sm group">
                <div className="absolute -top-3 left-4 px-2 bg-black text-[10px] text-white/40 tracking-[0.3em] uppercase">Command_Interface</div>
                <div className="flex flex-col gap-3">
                    <a href="/register" className="flex items-center gap-3 text-sm hover:text-white transition-all group/btn">
                        <div className="w-2 h-2 bg-gold-500 rounded-sm rotate-45 group-hover/btn:scale-150 transition-transform" />
                        <span className="group-hover/btn:translate-x-1 transition-transform">DEPLOY_AGENT.sh</span>
                        <span className="text-[10px] opacity-30 ml-auto">01</span>
                    </a>
                    <a href="/leaderboard" className="flex items-center gap-3 text-sm hover:text-white transition-all group/btn">
                        <div className="w-2 h-2 bg-white/20 rounded-sm rotate-45 group-hover/btn:bg-white transition-colors" />
                        <span className="group-hover/btn:translate-x-1 transition-transform">GLOBAL_RANKS.idx</span>
                        <span className="text-[10px] opacity-30 ml-auto">02</span>
                    </a>
                    <a href="/gallery" className="flex items-center gap-3 text-sm hover:text-white transition-all group/btn">
                        <div className="w-2 h-2 bg-white/20 rounded-sm rotate-45 group-hover/btn:bg-white transition-colors" />
                        <span className="group-hover/btn:translate-x-1 transition-transform">PROJECT_ARENA.db</span>
                        <span className="text-[10px] opacity-30 ml-auto">03</span>
                    </a>
                </div>
            </div>

            {/* 7. Bottom Right: Global Activity Feed */}
            <div className="absolute bottom-12 right-12 w-64 text-right hidden md:block">
                <div className="inline-block px-3 py-1 bg-gold-500/10 border border-gold-500/20 text-[10px] font-bold text-gold-400 mb-4 animate-pulse">
                    LIVE_HACKATHON_FEED
                </div>
                <div className="space-y-4 text-[10px] opacity-40 italic">
                    <p>0x4fe... just deployed "Neural_Sage_v2"</p>
                    <p>Team_Quantum moved up to Rank #4</p>
                    <p>Server_Cluster_AZ2 status set to HIGH_LOAD</p>
                </div>
            </div>

            {/* 8. Exit Protocol */}
            <button
                onClick={onClose}
                className="absolute top-8 left-1/2 -translate-x-1/2 group flex flex-col items-center gap-2 hover:scale-110 transition-transform"
            >
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-red-500/20 group-hover:border-red-500 transition-all duration-500">
                    <span className="text-white/40 group-hover:text-red-500 text-lg">✕</span>
                </div>
                <span className="text-[8px] uppercase tracking-[0.5em] text-white/20 group-hover:text-red-500/60 transition-colors">Terminate_Session</span>
            </button>
        </motion.div>
    );
}

function PowerCore() {
    return (
        <div className="relative group cursor-pointer">
            {/* Pulsing Aura */}
            <motion.div
                className="absolute inset-0 bg-gold-500/20 blur-[100px] rounded-full"
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
            />

            {/* Outer Hexagon Rings */}
            {[0, 120, 240].map((rot, i) => (
                <motion.div
                    key={i}
                    className="absolute border-[2px] border-gold-500/10"
                    style={{ width: 440, height: 440, borderRadius: "20%", rotate: rot }}
                    animate={{ rotate: rot + 360, scale: [1, 1.05, 1] }}
                    transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
                />
            ))}

            {/* Central Orbital Paths */}
            <svg viewBox="0 0 400 400" className="w-[400px] h-[400px] relative z-10 overflow-visible">
                {/* Orbital Paths */}
                <circle cx="200" cy="200" r="120" fill="none" stroke="white" strokeOpacity="0.05" strokeWidth="1" />
                <circle cx="200" cy="200" r="160" fill="none" stroke="white" strokeOpacity="0.05" strokeWidth="1" />

                {/* Orbiting Elements */}
                <motion.g animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} style={{ originX: "200px", originY: "200px" }}>
                    <circle cx="200" cy="80" r="4" fill="#fbbf24" />
                    <text x="210" y="80" className="text-[10px] fill-gold-400 font-bold uppercase tracking-widest">Groq_Engine</text>
                </motion.g>
                <motion.g animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} style={{ originX: "200px", originY: "200px" }}>
                    <circle cx="200" cy="360" r="4" fill="#22d3ee" />
                    <text x="210" y="360" className="text-[10px] fill-cyan-400 font-bold uppercase tracking-widest">Multi_Agent</text>
                </motion.g>

                {/* The Singularity */}
                <defs>
                    <radialGradient id="coreGlow">
                        <stop offset="0%" stopColor="#FFF" />
                        <stop offset="30%" stopColor="#fbbf24" />
                        <stop offset="100%" stopColor="#B45309" />
                    </radialGradient>
                </defs>
                <motion.circle
                    cx="200" cy="200" r="60"
                    fill="url(#coreGlow)"
                    className="drop-shadow-[0_0_50px_rgba(251,191,36,0.5)]"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                />
                <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="fill-black font-black text-xs uppercase tracking-[0.2em] pointer-events-none">
                    PIONEER
                </text>
            </svg>
        </div>
    );
}

function CornerUI() {
    return (
        <div className="absolute inset-0 pointer-events-none z-10 p-8">
            {/* Top Left */}
            <div className="absolute top-8 left-8 w-24 h-24 border-t-2 border-l-2 border-gold-500/30" />
            <div className="absolute top-10 left-10 w-4 h-4 border-t border-l border-gold-500/20" />

            {/* Top Right */}
            <div className="absolute top-8 right-8 w-24 h-24 border-t-2 border-r-2 border-gold-500/30" />
            <div className="absolute top-10 right-10 w-4 h-4 border-t border-r border-gold-500/20" />

            {/* Bottom Left */}
            <div className="absolute bottom-8 left-8 w-24 h-24 border-b-2 border-l-2 border-gold-500/30" />
            <div className="absolute bottom-10 left-10 w-4 h-4 border-b border-l border-gold-500/20" />

            {/* Bottom Right */}
            <div className="absolute bottom-8 right-8 w-24 h-24 border-b-2 border-r-2 border-gold-500/30" />
            <div className="absolute bottom-10 right-10 w-4 h-4 border-b border-r border-gold-500/20" />

            {/* Side Labels */}
            <div className="absolute top-1/2 left-4 h-40 border-l border-white/5 -translate-y-1/2 flex items-center">
                <span className="rotate-[-90deg] text-[8px] uppercase tracking-[1em] text-white/20 whitespace-nowrap">MISSION_CRITICAL_PROTOCOL</span>
            </div>
            <div className="absolute top-1/2 right-4 h-40 border-r border-white/5 -translate-y-1/2 flex items-center">
                <span className="rotate-[90deg] text-[8px] uppercase tracking-[1em] text-white/20 whitespace-nowrap">NEURAL_SYNC_AUTHORIZED</span>
            </div>
        </div>
    );
}

function NeuralField() {
    return (
        <div className="absolute inset-0 pointer-events-none opacity-20">
            {/* Scanning Radar Line */}
            <motion.div
                className="absolute inset-x-0 h-[100px] bg-gradient-to-b from-transparent via-gold-500/10 to-transparent z-10"
                animate={{ top: ["-10%", "110%"] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />

            {[...Array(30)].map((_, i) => (
                <Particle key={i} />
            ))}

            {/* Hex Grid Overlay */}
            <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45v-30L30 0z' fill-rule='evenodd' stroke='%23d4af37' fill='none'/%3E%3C/svg%3E")`,
                backgroundSize: '30px 30px'
            }} />
        </div>
    );
}
