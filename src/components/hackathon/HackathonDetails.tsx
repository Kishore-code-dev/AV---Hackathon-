"use client";

import { Hackathon, User } from "@prisma/client";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Trophy, Users, AlertCircle, CheckCircle, ArrowRight, Terminal, Shield, Zap } from "lucide-react";
import { NeuralBackground } from "@/components/ui/NeuralBackground";

interface HackathonDetailsProps {
    hackathon: Hackathon & {
        _count: { teams: number, projects: number }
    };
    user?: User | null;
}

export function HackathonDetails({ hackathon, user }: HackathonDetailsProps) {
    const [timeLeft, setTimeLeft] = useState<{ days: number, hours: number, minutes: number, seconds: number } | null>(null);
    const [activeTab, setActiveTab] = useState<'briefing' | 'protocol' | 'rewards'>('briefing');

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const end = new Date(hackathon.endDate).getTime();
            const distance = end - now;

            if (distance < 0) {
                setTimeLeft(null);
                clearInterval(timer);
            } else {
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000)
                });
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [hackathon.endDate]);

    return (
        <div className="min-h-screen relative bg-black text-white font-mono selection:bg-gold-500 selection:text-black overflow-hidden">
            <NeuralBackground />

            <div className="relative z-10 pt-32 pb-20 container mx-auto px-6 max-w-7xl">

                {/* 1. Header Section */}
                <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-20 border-b border-white/10 pb-12">
                    <div className="space-y-6 max-w-4xl">
                        <div className="flex items-center gap-4">
                            <span className={`px-3 py-1 rounded-sm text-[10px] uppercase tracking-[0.3em] font-bold border ${hackathon.status === 'ACTIVE'
                                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                    : 'bg-gray-800 text-gray-400 border-gray-700'
                                }`}>
                                Status: {hackathon.status}
                            </span>
                            <span className="text-[10px] text-gray-500 tracking-widest">
                                ID: {hackathon.slug.toUpperCase()}
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                            {hackathon.name}
                        </h1>

                        <p className="text-xl text-gray-400 leading-relaxed font-light max-w-2xl border-l-2 border-gold-500/50 pl-6">
                            {hackathon.description || "Mission objectives are classified. Authorization required to view full details."}
                        </p>
                    </div>

                    {/* Countdown Module */}
                    <div className="bg-white/5 border border-white/10 p-6 min-w-[300px] backdrop-blur-md">
                        <div className="flex items-center gap-2 mb-4 opacity-50">
                            <Clock size={14} />
                            <span className="text-[10px] uppercase tracking-[0.2em]">Mission Timer</span>
                        </div>
                        {timeLeft ? (
                            <div className="grid grid-cols-4 gap-2 text-center">
                                {Object.entries(timeLeft).map(([unit, value]) => (
                                    <div key={unit} className="bg-black border border-white/10 p-2">
                                        <div className="text-2xl font-bold text-gold-400">{String(value).padStart(2, '0')}</div>
                                        <div className="text-[8px] uppercase text-gray-600">{unit}</div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-red-500 font-bold text-center py-4 tracking-widest">MISSION EXPIRED</div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* 2. Main Intel Tabs */}
                    <div className="lg:col-span-8">
                        <div className="flex border-b border-white/10 mb-8">
                            {[
                                { id: 'briefing', label: 'Mission Briefing', icon: Terminal },
                                { id: 'protocol', label: 'Protocol & Rules', icon: Shield },
                                { id: 'rewards', label: 'Bounty', icon: Trophy },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`flex items-center gap-2 px-6 py-4 text-xs uppercase tracking-widest transition-all relative ${activeTab === tab.id
                                            ? 'text-gold-400 bg-white/5'
                                            : 'text-gray-500 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <tab.icon size={14} />
                                    {tab.label}
                                    {activeTab === tab.id && (
                                        <motion.div layoutId="tab-highlight" className="absolute bottom-0 left-0 w-full h-[2px] bg-gold-400" />
                                    )}
                                </button>
                            ))}
                        </div>

                        <div className="min-h-[400px]">
                            {activeTab === 'briefing' && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="prose prose-invert prose-lg max-w-none">
                                    <h3 className="text-gold-400 uppercase tracking-widest text-sm font-bold flex items-center gap-2">
                                        <Zap size={16} />
                                        Operational Context
                                    </h3>
                                    <p className="text-gray-300">
                                        The Agentic AI Pioneer Program is designed to push the boundaries of autonomous systems.
                                        Participants are tasked with architecting self-reasoning agents capable of complex decision-making loops.
                                        Using Groq's high-speed LPU inference engine, you will reduce latency to near-zero, enabling
                                        real-time agentic workflows.
                                    </p>

                                    <div className="grid grid-cols-2 gap-4 my-8 not-prose">
                                        <div className="p-4 border border-white/10 bg-white/5">
                                            <div className="text-[10px] uppercase text-gray-500 tracking-widest mb-1">Tech Stack A</div>
                                            <div className="text-cyan-400 font-bold">LangGraph</div>
                                        </div>
                                        <div className="p-4 border border-white/10 bg-white/5">
                                            <div className="text-[10px] uppercase text-gray-500 tracking-widest mb-1">Tech Stack B</div>
                                            <div className="text-cyan-400 font-bold">CrewAI</div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'protocol' && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                                    <div className="bg-red-500/10 border border-red-500/30 p-6 flex items-start gap-4">
                                        <AlertCircle className="text-red-500 shrink-0" />
                                        <div>
                                            <h4 className="text-red-400 font-bold uppercase tracking-widest text-sm mb-2">Critical Directive</h4>
                                            <p className="text-sm text-red-200/70">All submissions must include a public GitHub repository and a recorded demo of the agent in action.</p>
                                        </div>
                                    </div>
                                    <ul className="space-y-4 text-gray-400 text-sm">
                                        {[
                                            "Agents must use Groq API for inference.",
                                            "Teams must effectively demonstrate 'Agentic' behaviors (autonomy, tools).",
                                            "Submissions deadline is hard-coded. No extensions."
                                        ].map((rule, i) => (
                                            <li key={i} className="flex items-start gap-3 p-4 border border-white/5 hover:border-white/10 transition-colors">
                                                <span className="text-gold-500 font-mono">0{i + 1}.</span>
                                                {rule}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            )}

                            {activeTab === 'rewards' && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid gap-4">
                                    <div className="p-8 border border-gold-500/30 bg-gradient-to-r from-gold-500/10 to-transparent relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                            <Trophy size={100} />
                                        </div>
                                        <div className="relative z-10">
                                            <div className="text-gold-400 text-xs uppercase tracking-widest font-bold mb-2">Grand Prize</div>
                                            <div className="text-4xl md:text-5xl font-black text-white">$25,000</div>
                                            <p className="text-sm text-gold-200/60 mt-2">Plus rapid-access LPU credits and VC introduction.</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-6 border border-white/10 bg-white/5">
                                            <div className="text-gray-400 text-xs uppercase tracking-widest mb-1">Runner Up</div>
                                            <div className="text-2xl font-bold text-white">$15,000</div>
                                        </div>
                                        <div className="p-6 border border-white/10 bg-white/5">
                                            <div className="text-gray-400 text-xs uppercase tracking-widest mb-1">Best Technical</div>
                                            <div className="text-2xl font-bold text-white">$10,000</div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>

                    {/* 3. Mission Control Sidebar */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Stats Module */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/5 border border-white/10 p-6 text-center group hover:border-gold-500/30 transition-colors">
                                <Users className="mx-auto text-gray-500 mb-2 group-hover:text-gold-500 transition-colors" size={20} />
                                <div className="text-3xl font-black text-white">{hackathon._count.teams}</div>
                                <div className="text-[10px] uppercase tracking-widest text-gray-500">Active Units</div>
                            </div>
                            <div className="bg-white/5 border border-white/10 p-6 text-center group hover:border-cyan-500/30 transition-colors">
                                <Terminal className="mx-auto text-gray-500 mb-2 group-hover:text-cyan-500 transition-colors" size={20} />
                                <div className="text-3xl font-black text-white">{hackathon._count.projects}</div>
                                <div className="text-[10px] uppercase tracking-widest text-gray-500">Deployments</div>
                            </div>
                        </div>

                        {/* Action Module */}
                        <div className="p-8 border border-white/10 bg-white/[0.02] relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold-500 via-white to-gold-500 opacity-20" />

                            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                Mission Control
                            </h3>

                            <div className="space-y-4">
                                {!user ? (
                                    <Link href="/login" className="block">
                                        <Button fullWidth className="h-14 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-gold-400 transition-all">
                                            Authenticate to Join
                                        </Button>
                                    </Link>
                                ) : (
                                    <>
                                        <button className="w-full h-14 bg-gold-500 text-black font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2">
                                            <CheckCircle size={16} />
                                            Initialize Registration
                                        </button>

                                        <Link href={`/submit`} className="block">
                                            <button className="w-full h-14 border border-white/20 bg-transparent text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                                                <Terminal size={16} />
                                                Submit CodeBase
                                            </button>
                                        </Link>
                                    </>
                                )}

                                <Link href={`/leaderboard`} className="block pt-4 text-center">
                                    <span className="text-[10px] text-gray-500 hover:text-white uppercase tracking-widest border-b border-transparent hover:border-white transition-all pb-1 cursor-pointer">
                                        View Global Intelligence Ranks
                                    </span>
                                </Link>
                            </div>
                        </div>

                        {/* Organizer Info */}
                        <div className="flex items-center gap-4 p-4 border border-white/5 bg-white/[0.01]">
                            <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center font-bold text-xs">AV</div>
                            <div>
                                <div className="text-[10px] uppercase tracking-widest text-gray-500">Organized By</div>
                                <div className="text-sm font-bold text-white">Analytics Vidhya</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
