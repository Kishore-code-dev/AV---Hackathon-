"use client";
import { Copy, ExternalLink, Book, Database, GraduationCap, Terminal, Cpu, Award } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations/FadeIn";
import { HoverCard } from "@/components/animations/HoverCard";
import { SparklesCore } from "@/components/ui/Sparkles";
import { TextShimmer } from "@/components/animations/TextShimmer";
import { cn } from "@/lib/utils";

export function Resources() {
    return (
        <section id="resources" className="py-24 bg-black relative overflow-hidden">
            {/* 1. Global Background: Obsidian Haze */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.03)_0%,transparent_70%)] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <FadeIn direction="up">
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 border border-white/10 rounded-full bg-white/5 backdrop-blur-md">
                            <div className="w-1 h-1 rounded-full bg-gold-400 animate-pulse" />
                            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-gray-400">
                                CURRICULUM ACCESS
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
                            Master <TextShimmer className="text-gold-400">Agentic Architecture</TextShimmer>
                        </h2>
                        <p className="text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
                            Access the official "Analytics Vidhya Pioneer" modules.
                            <br />Authorized for <span className="text-gray-300">Cohort 2026</span> applicants only.
                        </p>
                    </div>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* CARD 1: LangGraph */}
                    <ResourceCard
                        icon={GraduationCap}
                        title="LangGraph Academy"
                        subtitle="Orchestration"
                        badge="Module 01"
                        description="Deep dive into stateful multi-agent graphs. Learn persistence, cyclicity, and human-in-the-loop patterns."
                        href="https://academy.langchain.com"
                    />

                    {/* CARD 2: CrewAI */}
                    <ResourceCard
                        icon={Users}
                        title="CrewAI Swarms"
                        subtitle="Role-Playing Agents"
                        badge="Module 02"
                        description="Production patterns for role-based agent teams. Hierarchical vs Sequential processes."
                        href="https://docs.crewai.com"
                    />

                    {/* CARD 3: Vector DBs */}
                    <ResourceCard
                        icon={Database}
                        title="Vector Memories"
                        subtitle="Pinecone / Weaviate"
                        badge="Module 03"
                        description="Architecting long-term memory. HNSW indexes, hybrid search, and semantic re-ranking strategies."
                        href="https://docs.pinecone.io"
                    />

                    {/* CARD 4: Advanced RAG */}
                    <ResourceCard
                        icon={Book}
                        title="Self-RAG Systems"
                        subtitle="Retrieval Strategies"
                        badge="Module 04"
                        description="Implementing CRAG (Corrective RAG) and self-reflective retrieval loops to eliminate hallucinations."
                        href="https://github.com/langchain-ai/langgraph/tree/main/examples/rag"
                    />

                    {/* CARD 5: Groq Optimization */}
                    <ResourceCard
                        icon={Cpu}
                        title="Groq LPU Cookbook"
                        subtitle="Inference Speed"
                        badge="Module 05"
                        description="Maximizing tokens/sec on Groq LPUs. JSON mode optimization, function calling, and batching."
                        href="https://console.groq.com/docs/quickstart"
                    />

                    {/* CARD 6: Evaluation */}
                    <ResourceCard
                        icon={Award}
                        title="Agent Evaluation"
                        subtitle="Ragas Framework"
                        badge="Module 06"
                        description="Quantitative testing pipelines. Measuring Faithfulness, Answer Relevance, and Context Precision."
                        href="https://docs.ragas.io"
                    />
                </div>

                {/* PROMO BANNER: The "Black Card" */}
                <FadeIn delay={0.4} direction="up">
                    <div className="mt-16 w-full max-w-4xl mx-auto relative group">
                        <div className="absolute inset-0 bg-gold-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/80 backdrop-blur-xl p-8 flex flex-col md:flex-row items-center justify-between gap-8">

                            {/* Inner Sparkles for Premium Feel */}
                            <div className="absolute inset-0 pointer-events-none opacity-20">
                                <SparklesCore
                                    id="banner-sparkles"
                                    background="transparent"
                                    minSize={0.4}
                                    maxSize={1}
                                    particleDensity={40}
                                    className="w-full h-full"
                                    particleColor="#FFD700"
                                />
                            </div>

                            <div className="flex items-center gap-6 relative z-10">
                                <div className="p-4 rounded-full bg-gold-400/10 border border-gold-400/20 text-gold-400">
                                    <Terminal size={32} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="text-2xl font-bold text-white tracking-tight">Fellowship Grants</h3>
                                        <span className="px-2 py-0.5 rounded text-[10px] bg-gold-500 text-black font-bold uppercase tracking-widest">Active</span>
                                    </div>
                                    <p className="text-gray-400 text-sm">Use your unique fellowship code to unlock $50 in GroqCloud credits.</p>
                                </div>
                            </div>

                            <div className="relative z-10 bg-white/5 border border-white/10 rounded-lg p-1 pr-1 flex items-center gap-3 hover:border-gold-500/50 transition-colors">
                                <div className="px-4 py-2 font-mono text-gold-400 tracking-widest font-bold">
                                    GROQ-AGENTIC-2026
                                </div>
                                <CopyButton code="GROQ-AGENTIC-2026" />
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}

function ResourceCard({ icon: Icon, title, subtitle, badge, description, href }: any) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="block h-full cursor-pointer">
            <HoverCard className="h-full group">
                <div className="p-6 h-full flex flex-col relative z-20">
                    {/* 1. Internal Sparkles (The "Living Card" effect) */}
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity duration-1000">
                        <SparklesCore
                            id={`sparkles-${title}`}
                            background="transparent"
                            minSize={0.4}
                            maxSize={1.2}
                            particleDensity={15}
                            className="w-full h-full"
                            particleColor="#FFFFFF"
                        />
                    </div>

                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-gray-300 group-hover:text-gold-400 group-hover:border-gold-500/20 transition-colors duration-300">
                            <Icon size={24} />
                        </div>
                        <span className="text-[10px] font-mono border border-white/10 px-2 py-1 rounded text-gray-500 group-hover:text-gold-200 group-hover:border-gold-500/20 transition-colors">
                            {badge}
                        </span>
                    </div>

                    <div className="mb-4">
                        <h4 className="text-xl font-bold text-white mb-1 group-hover:text-gold-100 transition-colors">{title}</h4>
                        <p className="text-xs font-mono text-gray-500 uppercase tracking-wider">{subtitle}</p>
                    </div>

                    <p className="text-sm text-gray-400 leading-relaxed max-w-[90%] mb-6">
                        {description}
                    </p>

                    <div className="mt-auto flex items-center gap-2 text-xs font-bold text-white/40 group-hover:text-gold-400 transition-colors uppercase tracking-widest">
                        <span>Initialize Module</span>
                        <ExternalLink size={12} />
                    </div>
                </div>
            </HoverCard>
        </a>
    );
}

function CopyButton({ code }: { code: string }) {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={handleCopy}
            className="p-2 hover:bg-white/10 rounded-md transition-colors text-gray-400 hover:text-white"
        >
            {copied ? <span className="text-gold-400 text-xs font-bold">COPIED</span> : <Copy size={16} />}
        </button>
    );
}

// Icon Components wrapper if needed, or direct import adjustments
import { Users } from "lucide-react";

