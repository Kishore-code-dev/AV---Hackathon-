"use client";
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from "framer-motion";
import {
    IconSearch,
    IconBrain,
    IconFileText,
    IconGavel,
    IconArrowRight,
    IconScale,
    IconDatabase,
    IconMessageChatbot,
    IconSitemap as IconWorkflow,
    IconCpu,
    IconSparkles
} from "@tabler/icons-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { AgentHQ } from "@/components/landing/AgentHQ";

// --- PREMIUM COMPONENTS ---

function PremiumCard({ children, onClick, highlight = false, className = "" }: any) {
    return (
        <motion.div
            onClick={onClick}
            whileHover={{ y: -5, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className={`
                relative overflow-hidden p-[1px] rounded-2xl cursor-pointer group transition-all duration-500
                ${highlight ? "shadow-[0_0_40px_-10px_rgba(212,175,55,0.3)]" : "hover:shadow-[0_0_30px_-10px_rgba(255,255,255,0.1)]"}
                ${className}
            `}
        >
            {/* Animated Border Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${highlight ? 'from-gold-400 via-gold-600 to-amber-800' : 'from-white/10 via-white/5 to-transparent'} opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />

            {/* Inner Content Content */}
            <div className="relative h-full bg-[#080808]/90 backdrop-blur-xl rounded-2xl p-6 flex flex-col items-center text-center border border-white/5 group-hover:border-white/10 transition-colors">

                {/* Subtle Grid Texture */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />

                {/* Highlight Glow */}
                {highlight && (
                    <div className="absolute -top-20 -left-20 w-40 h-40 bg-gold-500/20 rounded-full blur-[80px] pointer-events-none" />
                )}

                {children}
            </div>
        </motion.div>
    );
}

function ConnectionLine({ active }: { active: boolean }) {
    return (
        <div className="hidden md:block absolute top-1/2 -translate-y-1/2 -right-4 w-8 h-[1px] bg-white/10 z-0">
            {active && (
                <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-gold-500 to-transparent"
                />
            )}
        </div>
    );
}

export function SampleArchitecture() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
    const [isHQOpen, setIsHQOpen] = useState(false);

    // Parallax & Opacity
    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

    const workflowSteps = [
        { icon: IconSearch, title: "Deep Searcher", model: "Tavily + LangGraph", sub: "CASE LAW INGESTION", color: "text-cyan-200" },
        { icon: IconDatabase, title: "Vector Nexus", model: "Qdrant / Pinecone", sub: "SEMANTIC RETRIEVAL", color: "text-purple-200" },
        { icon: IconBrain, title: "Analyst Core", model: "Llama-3-70B (Groq)", sub: "SYNTHESIS ENGINE", color: "text-gold-400", highlight: true },
        { icon: IconGavel, title: "Legal Drafter", model: "Fine-tuned Mistral", sub: "BRIEF GENERATION", color: "text-emerald-200" },
        { icon: IconMessageChatbot, title: "Human Review", model: "Expert Loop", sub: "FINAL VALIDATION", color: "text-indigo-200" }
    ];

    return (
        <section ref={ref} className="py-32 relative bg-black overflow-hidden z-10 perspective-1000">
            {/* Cinematic Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(17,17,17,1)_0%,rgba(0,0,0,1)_100%)] z-0" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gold-600/5 rounded-full blur-[120px] pointer-events-none" />

            {/* THE AGENT HQ OVERLAY (3D SCENE) */}
            <AgentHQ isOpen={isHQOpen} onClose={() => setIsHQOpen(false)} />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header Section */}
                <div className="text-center mb-24">
                    <FadeIn direction="up">
                        <span className="inline-block px-3 py-1 mb-6 border border-gold-500/30 rounded-full bg-gold-500/5 text-[10px] font-mono tracking-[0.2em] text-gold-400 uppercase">
                            Architecture Reference
                        </span>
                        <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white">
                            Intelligent <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-amber-700">Workflows</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                            Experience the future of automation. From unstructured data ingestion to reasoning and final execution—powered by Groq's lightning-fast inference.
                        </p>
                    </FadeIn>
                </div>

                {/* Workflow Visualization */}
                <motion.div style={{ opacity, y }} className="relative max-w-7xl mx-auto">

                    {/* Connection Line Background */}
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 -translate-y-1/2 z-0 hidden md:block" />

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
                        {workflowSteps.map((node, i) => (
                            <div key={i} className="relative group">
                                <PremiumCard
                                    onClick={node.highlight ? () => setIsHQOpen(true) : undefined}
                                    highlight={node.highlight}
                                >
                                    {/* Icon Container with Glow */}
                                    <div className={`
                                        w-16 h-16 rounded-2xl flex items-center justify-center mb-6 relative
                                        ${node.highlight ? 'bg-gold-500/10' : 'bg-white/5'}
                                        border border-white/5 skew-y-0 transition-transform duration-500 group-hover:scale-110
                                    `}>
                                        <node.icon size={32} className={node.color} stroke={1.5} />
                                        {node.highlight && (
                                            <div className="absolute inset-0 bg-gold-400/20 blur-[20px] animate-pulse" />
                                        )}
                                    </div>

                                    {/* Text Content */}
                                    <h4 className={`text-lg font-bold mb-2 tracking-wide ${node.highlight ? 'text-white' : 'text-gray-200'}`}>
                                        {node.title}
                                    </h4>
                                    <p className="text-xs text-gray-500 font-mono tracking-wider uppercase mb-1">{node.sub}</p>
                                    <p className="text-[10px] text-gray-600 font-mono">{node.model}</p>

                                    {/* Interactive Label for Center Node */}
                                    {node.highlight && (
                                        <div className="mt-6 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse" />
                                            <span className="text-[10px] font-bold text-gold-400 tracking-widest uppercase">Live View</span>
                                        </div>
                                    )}
                                </PremiumCard>

                                {/* Connector */}
                                {i < 4 && <ConnectionLine active={true} />}
                            </div>
                        ))}
                    </div>

                    {/* LIVE VIEW CTA */}
                    <div className="mt-20 text-center">
                        <motion.button
                            onClick={() => setIsHQOpen(true)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-transparent overflow-hidden rounded-full"
                        >
                            <div className="absolute inset-0 border border-gold-500/30 rounded-full" />
                            <div className="absolute inset-0 bg-gold-500/5 group-hover:bg-gold-500/10 transition-colors" />
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent blur-[2px] group-hover:w-3/4 transition-all duration-500" />

                            <IconCpu size={20} className="text-gold-400 group-hover:text-gold-300 relative z-10" />
                            <span className="text-sm font-bold text-gold-400 tracking-[0.15em] uppercase relative z-10 group-hover:text-gold-300">
                                Enter Agent Workspace
                            </span>
                            <IconArrowRight size={16} className="text-gold-500/50 group-hover:translate-x-1 transition-transform relative z-10" />
                        </motion.button>
                    </div>

                </motion.div>
            </div>
        </section>
    );
}
