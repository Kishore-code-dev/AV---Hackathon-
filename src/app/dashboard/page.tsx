import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { HoverCard } from "@/components/animations/HoverCard";
import { FadeIn } from "@/components/animations/FadeIn";
import { Terminal, Trophy, Wallet, Clock, ArrowRight, Zap, Database, Activity } from "lucide-react";
import Link from "next/link";
import { TextScramble } from "@/components/animations/TextScramble";
import { NeuralBackground } from "@/components/ui/NeuralBackground";

export default async function DashboardPage() {
    const user = await getCurrentUser();
    if (!user) redirect("/login");

    return (
        <div className="min-h-screen relative overflow-hidden bg-black text-white font-mono selection:bg-gold-500 selection:text-black">
            {/* 1. Cinematic Background */}
            <NeuralBackground />

            <div className="relative z-10 pt-32 pb-20 container mx-auto px-6 max-w-7xl">

                {/* 2. Command Header */}
                <FadeIn>
                    <header className="mb-16 flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-8">
                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1 border border-emerald-500/30 bg-emerald-500/10 rounded-sm">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
                                    <span className="text-[10px] tracking-[0.3em] uppercase text-emerald-400 font-bold">
                                        NEURAL_UPLINK_ESTABLISHED
                                    </span>
                                </div>
                                <span className="text-[10px] text-white/20 tracking-widest">v2.0.4</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black text-white mb-2 uppercase tracking-tighter">
                                Operator <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-amber-600">{user.name}</span>
                            </h1>
                            <p className="text-gray-500 text-xs tracking-[0.2em] flex items-center gap-2">
                                ID: <span className="text-white">{user.id.split('-')[0]}</span>
                                <span className="text-white/20">|</span>
                                CLEARANCE_LEVEL: <span className="text-gold-400">PIONEER</span>
                            </p>
                        </div>
                        <div className="text-right hidden md:block">
                            <div className="text-[10px] text-white/40 mb-1 uppercase tracking-widest">Server Time</div>
                            <div className="text-2xl font-bold text-white font-mono">
                                {new Date().toLocaleTimeString('en-US', { hour12: false })}
                            </div>
                        </div>
                    </header>
                </FadeIn>

                {/* 3. Operational Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-16">
                    {/* Stat Module: Rank */}
                    <div className="lg:col-span-1 group relative p-6 bg-white/5 border border-white/10 hover:border-gold-500/50 transition-all duration-300 overflow-hidden">
                        <div className="absolute top-0 right-0 p-2 opacity-20"><Trophy size={48} /></div>
                        <div className="relative z-10">
                            <div className="text-[10px] text-gold-500 uppercase tracking-[0.2em] mb-4">Global_Rank</div>
                            <div className="text-4xl font-bold text-white mb-2 group-hover:text-gold-400 transition-colors">--</div>
                            <div className="h-1 w-full bg-white/10 mt-4 overflow-hidden">
                                <div className="h-full bg-gold-500 w-[0%] group-hover:w-[100%] transition-all duration-1000 ease-out" />
                            </div>
                            <p className="text-[10px] text-gray-500 mt-2">Awaiting Calibration...</p>
                        </div>
                    </div>

                    {/* Stat Module: Credits */}
                    <div className="lg:col-span-1 group relative p-6 bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden">
                        <div className="absolute top-0 right-0 p-2 opacity-20"><Zap size={48} /></div>
                        <div className="relative z-10">
                            <div className="text-[10px] text-cyan-500 uppercase tracking-[0.2em] mb-4">Compute_Credits</div>
                            <div className="text-4xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">$0.00</div>
                            <div className="h-1 w-full bg-white/10 mt-4 overflow-hidden">
                                <div className="h-full bg-cyan-500 w-[0%] group-hover:w-[100%] transition-all duration-1000 ease-out delay-100" />
                            </div>
                            <p className="text-[10px] text-gray-500 mt-2">Grant Pending Approval</p>
                        </div>
                    </div>

                    {/* Stat Module: Active Missions */}
                    <div className="lg:col-span-2 group relative p-6 bg-gradient-to-br from-gold-500/10 to-transparent border border-gold-500/20 hover:border-gold-500 transition-all duration-300 overflow-hidden flex flex-col justify-between">
                        <div className="absolute top-0 right-0 p-4 opacity-10"><Activity size={80} /></div>
                        <div>
                            <div className="flex justify-between items-start">
                                <div className="text-[10px] text-gold-400 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
                                    Active_Directives
                                </div>
                                <span className="text-[10px] border border-gold-500/30 px-2 py-1 text-gold-500 rounded bg-gold-500/5">PRIORITY_ALPHA</span>
                            </div>
                            <h3 className="text-3xl font-bold text-white mt-2 max-w-md">Agentic AI Pioneer Program</h3>
                        </div>
                        <div className="flex items-end justify-between mt-8">
                            <div>
                                <p className="text-xs text-gray-400 mb-1">Status: <span className="text-white">RECRUITING</span></p>
                                <p className="text-xs text-gray-400">Total Prize: <span className="text-gold-400">$50,000 USD</span></p>
                            </div>
                            <Link href="/hackathons/agentic-ai-pioneer-program">
                                <button className="px-6 py-2 bg-gold-500 text-black font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors group-hover:scale-105 duration-300">
                                    Initialize &rarr;
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* 4. Secondary Directives (Modules) */}
                <h2 className="text-sm font-bold text-gray-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-4">
                    <span className="w-8 h-[1px] bg-gray-600" />
                    Subroutines
                    <span className="flex-1 h-[1px] bg-gray-600/30" />
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Browse Docs */}
                    <Link href="/hackathons" className="group block">
                        <div className="h-full p-6 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />

                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-black border border-white/10 rounded group-hover:border-cyan-500/50 transition-colors">
                                    <Terminal size={20} className="text-gray-400 group-hover:text-cyan-400" />
                                </div>
                                <span className="text-xs font-bold text-gray-300 group-hover:text-white uppercase tracking-widest">Documentation</span>
                            </div>
                            <p className="text-sm text-gray-500 leading-relaxed font-sans">
                                Access classified data on LangGraph, CrewAI, and Groq LPU architecture.
                            </p>
                        </div>
                    </Link>

                    {/* View Leaderboard */}
                    <Link href="/leaderboard" className="group block">
                        <div className="h-full p-6 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-gold-500/0 via-gold-500/5 to-gold-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />

                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-black border border-white/10 rounded group-hover:border-gold-500/50 transition-colors">
                                    <Trophy size={20} className="text-gray-400 group-hover:text-gold-400" />
                                </div>
                                <span className="text-xs font-bold text-gray-300 group-hover:text-white uppercase tracking-widest">Global Intelligence</span>
                            </div>
                            <p className="text-sm text-gray-500 leading-relaxed font-sans">
                                Analyze top-ranking agent submissions and competitive metrics.
                            </p>
                        </div>
                    </Link>

                    {/* Submit Project */}
                    <Link href="/submit" className="group block">
                        <div className="h-full p-6 border border-dashed border-white/10 bg-white/[0.01] hover:bg-white/[0.05] hover:border-emerald-500/30 transition-all duration-300 relative overflow-hidden">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-black border border-white/10 rounded group-hover:border-emerald-500/50 transition-colors">
                                    <Database size={20} className="text-gray-400 group-hover:text-emerald-400" />
                                </div>
                                <span className="text-xs font-bold text-gray-300 group-hover:text-white uppercase tracking-widest">Deploy Agent</span>
                            </div>
                            <p className="text-sm text-gray-500 leading-relaxed font-sans">
                                Upload finalized codebase for evaluation by the Neural Core.
                            </p>
                        </div>
                    </Link>
                </div>

            </div>
        </div>
    );
}
