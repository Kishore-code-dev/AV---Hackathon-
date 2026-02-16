"use client";
import React, { useState } from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/BentoGrid";
import {
    IconBrain,
    IconRobot,
    IconDatabase,
    IconCode,
    IconRocket,
    IconUsers,
    IconMessageChatbot,
    IconChartBar
} from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/animations/FadeIn";

export function Tracks() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section id="tracks" className="py-24 relative bg-transparent overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-0 pointer-events-none" />

            <div className="container mx-auto px-6 mb-16 relative z-10">
                <FadeIn direction="up">
                    <h2 className="text-4xl md:text-6xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
                        Pioneer Program <span className="text-gold-400">Curriculum</span>
                    </h2>
                </FadeIn>
                <FadeIn delay={0.2} direction="up">
                    <p className="text-gray-400 text-center max-w-2xl mx-auto text-lg">
                        Build with the exact stack taught in the Analytics Vidhya Agentic AI Pioneer Program.
                    </p>
                </FadeIn>
            </div>

            <BentoGrid className="max-w-7xl mx-auto relative z-10 px-6">
                {items.map((item, i) => (
                    <div
                        key={i}
                        onMouseEnter={() => setHoveredIndex(i)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className={`relative group ${item.colSpan || ""}`}
                    >
                        <AnimatePresence>
                            {hoveredIndex === i && (
                                <motion.span
                                    className="absolute inset-0 h-full w-full bg-gold-500/[0.1] block rounded-3xl -z-10 blur-xl"
                                    layoutId="hoverBackground"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1, transition: { duration: 0.15 } }}
                                    exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
                                />
                            )}
                        </AnimatePresence>

                        <BentoGridItem
                            title={item.title}
                            description={item.description}
                            header={item.header}
                            icon={item.icon}
                            className="border-white/10 group-hover:border-gold-500/30 transition-all duration-300 h-full bg-white/5 backdrop-blur-sm"
                        />
                    </div>
                ))}
            </BentoGrid>
        </section>
    );
}

const items = [
    {
        title: "AutoGen Multi-Agent Swarms",
        description: "Module 4 Focus: Master conversation patterns (GroupChat, 2-Agent) using Microsoft AutoGen. Build swarms that solve tasks collaboratively.",
        header: <div className="flex flex-1 w-full h-40 rounded-xl bg-gradient-to-br from-blue-900/50 to-black border border-white/5 relative overflow-hidden group-hover:scale-[1.02] transition-transform">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=800&auto=format&fit=crop')] bg-cover opacity-40 mix-blend-overlay" />
            <div className="absolute inset-0 bg-blue-500/10" />
        </div>,
        icon: <IconMessageChatbot className="h-6 w-6 text-blue-400" />,
        colSpan: "md:col-span-2"
    },
    {
        title: "LangGraph Reasoning",
        description: "Module 5 Focus: Implement cyclical graphs, persistence, and human-in-the-loop workflows. Build agents that can reason and self-correct.",
        header: <div className="flex flex-1 w-full h-40 rounded-xl bg-gradient-to-br from-purple-900/50 to-black border border-white/5 relative overflow-hidden group-hover:scale-[1.02] transition-transform">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop')] bg-cover opacity-40 mix-blend-overlay" />
        </div>,
        icon: <IconBrain className="h-6 w-6 text-purple-400" />,
        colSpan: "md:col-span-1"
    },
    {
        title: "Advanced RAG Pipelines",
        description: "Module 3 Focus: Build 'Chat with PDF' systems using Vector DBs (Pinecone/Qdrant) and hybrid search retrieval techniques.",
        header: <div className="flex flex-1 w-full h-40 rounded-xl bg-gradient-to-br from-emerald-900/50 to-black border border-white/5 relative overflow-hidden group-hover:scale-[1.02] transition-transform">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop')] bg-cover opacity-40 mix-blend-overlay" />
        </div>,
        icon: <IconDatabase className="h-6 w-6 text-emerald-400" />,
        colSpan: "md:col-span-1"
    },
    {
        title: "CrewAI Orchestration",
        description: "Module 6 Focus: Assign specific roles (Researcher, Writer, Analyst) to agents. Create structured, predictable enterprise workflows.",
        header: <div className="flex flex-1 w-full h-40 rounded-xl bg-gradient-to-br from-amber-900/50 to-black border border-white/5 relative overflow-hidden group-hover:scale-[1.02] transition-transform">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800&auto=format&fit=crop')] bg-cover opacity-40 mix-blend-overlay" />
        </div>,
        icon: <IconUsers className="h-6 w-6 text-amber-400" />,
        colSpan: "md:col-span-2"
    },
    {
        title: "AgentOps & Evaluation",
        description: "Module 8 Focus: Learn to measure agent performance (accuracy, latency) and deploy observed systems using AgentOps.",
        header: <div className="flex flex-1 w-full h-40 rounded-xl bg-gradient-to-br from-gray-800 to-black border border-white/5 relative overflow-hidden group-hover:scale-[1.02] transition-transform">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop')] bg-cover opacity-30 mix-blend-overlay" />
        </div>,
        icon: <IconChartBar className="h-6 w-6 text-white" />,
        colSpan: "md:col-span-3"
    },
];
