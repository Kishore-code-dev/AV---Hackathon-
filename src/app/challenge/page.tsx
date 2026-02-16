"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    IconCalendar,
    IconUsers,
    IconTrophy,
    IconMapPin,
    IconClock,
    IconShare,
    IconBookmark
} from "@tabler/icons-react";
import Link from 'next/link';

// Mock Data mimicking Unstop structure
const rounds = [
    { id: 1, title: "Round 1: Ideation Phase", date: "Oct 1 - Oct 5", status: "completed", type: "Online" },
    { id: 2, title: "Round 2: Prototype Submission", date: "Oct 6 - Oct 11", status: "live", type: "Submission" },
    { id: 3, title: "Round 3: Grand Finale", date: "Oct 14", status: "upcoming", type: "Offline" },
];

const prizes = [
    { title: "Winner", amount: "$10,000", desc: "Cash Prize + Groq Credits" },
    { title: "Runner Up", amount: "$5,000", desc: "Cash Prize + Swag" },
    { title: "Top Innovator", amount: "$2,000", desc: "Special Jury Award" },
];

export default function ChallengePage() {
    const [activeTab, setActiveTab] = useState("about");

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
            {/* HER HERO BANNER (Unstop style) */}
            <div className="relative h-80 bg-gradient-to-r from-red-900 to-black overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

                <div className="max-w-7xl mx-auto px-6 h-full flex flex-col justify-end pb-8 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="flex items-end gap-6">
                            <div className="w-24 h-24 bg-white rounded-xl shadow-xl flex items-center justify-center overflow-hidden border-2 border-white/20">
                                {/* Logo Placeholder */}
                                <div className="text-3xl font-black text-black">G</div>
                            </div>
                            <div>
                                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Groq Real-Time AI Hackathon</h1>
                                <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                                    <span className="flex items-center gap-1"><IconUsers size={16} /> 1,240 Registered</span>
                                    <span className="flex items-center gap-1"><IconMapPin size={16} /> Online / Virtual</span>
                                    <span className="flex items-center gap-1"><IconClock size={16} /> Ends in 4 Days</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"><IconShare size={20} /></button>
                            <button className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"><IconBookmark size={20} /></button>
                            <Link href="/dashboard">
                                <button className="px-8 py-3 bg-gold-500 hover:bg-gold-400 text-black font-bold rounded-lg transition-colors shadow-[0_0_20px_rgba(251,191,36,0.5)]">
                                    Register / Dashboard
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT GRID */}
            <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* LEFT: CONTENT TABS (2 cols) */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Navigation Tabs */}
                    <div className="flex border-b border-white/10 sticky top-0 bg-[#0a0a0a]/95 backdrop-blur-md z-20">
                        {['about', 'rounds', 'prizes', 'reviews'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-4 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors ${activeTab === tab ? 'border-gold-500 text-gold-500' : 'border-transparent text-gray-500 hover:text-white'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="min-h-[400px]">
                        {activeTab === 'about' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 text-gray-300 leading-relaxed">
                                <h3 className="text-xl font-bold text-white">Challenge Overview</h3>
                                <p>Join the world's first Real-Time AI Hackathon powered by Groq LPU™ Inference Engine. Build lightning-fast AI applications that respond in milliseconds.</p>

                                <h4 className="text-lg font-bold text-white mt-8">Theme: Speed of Thought</h4>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li><strong>Conversational Agents:</strong> Voice interfaces that feel human.</li>
                                    <li><strong>Real-time Analytics:</strong> Dashboards that update faster than you can blink.</li>
                                    <li><strong>Gaming AI:</strong> NPCs that react instantly to player actions.</li>
                                </ul>

                                <div className="p-6 bg-white/5 border border-white/10 rounded-xl mt-8">
                                    <h4 className="text-lg font-bold text-white mb-2">Eligibility</h4>
                                    <p className="text-sm">Open to all developers, students, and professionals worldwide. Teams of up to 4 members allowed.</p>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'rounds' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                                {rounds.map((round) => (
                                    <div key={round.id} className="group relative p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors flex gap-6">
                                        <div className="flex-shrink-0 flex flex-col items-center">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 ${round.status === 'completed' ? 'bg-green-500 text-black border-green-500' :
                                                    round.status === 'live' ? 'bg-gold-500 text-black border-gold-500 animate-pulse' :
                                                        'bg-transparent text-gray-500 border-gray-600'
                                                }`}>
                                                {round.id}
                                            </div>
                                            <div className="h-full w-0.5 bg-white/10 mt-2 group-last:hidden" />
                                        </div>
                                        <div className="flex-1 pb-6">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="text-lg font-bold text-white">{round.title}</h4>
                                                <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${round.status === 'live' ? 'bg-gold-500/20 text-gold-500' : 'bg-white/10 text-gray-400'
                                                    }`}>
                                                    {round.status}
                                                </span>
                                            </div>
                                            <div className="flex gap-4 text-sm text-gray-400">
                                                <span className="flex items-center gap-1"><IconCalendar size={14} /> {round.date}</span>
                                                <span className="flex items-center gap-1"><IconMapPin size={14} /> {round.type}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        )}

                        {activeTab === 'prizes' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-4">
                                {prizes.map((prize, i) => (
                                    <div key={i} className="p-6 bg-gradient-to-r from-white/5 to-transparent border border-white/10 rounded-xl flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <IconTrophy size={32} className={i === 0 ? "text-gold-500" : i === 1 ? "text-gray-400" : "text-amber-700"} />
                                            <div>
                                                <h4 className="text-xl font-bold text-white">{prize.title}</h4>
                                                <p className="text-sm text-gray-400">{prize.desc}</p>
                                            </div>
                                        </div>
                                        <div className="text-2xl font-black text-white">{prize.amount}</div>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* RIGHT: SIDEBAR WIDGETS (1 col) */}
                <div className="hidden lg:block space-y-6">
                    {/* Important Dates Widget */}
                    <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                        <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                            <IconCalendar size={18} /> Important Dates
                        </h4>
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Registration Ends</span>
                                <span className="text-white">Oct 5, 2026</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Submission Deadline</span>
                                <span className="text-white">Oct 11, 2026</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Result Declaration</span>
                                <span className="text-gold-500 font-bold">Oct 14, 2026</span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Widget */}
                    <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                        <h4 className="font-bold text-white mb-4">Organizer</h4>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-black">G</div>
                            <div>
                                <div className="text-sm font-bold text-white">Groq Inc.</div>
                                <div className="text-xs text-gray-400">support@groq.com</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
