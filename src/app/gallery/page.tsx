"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IconSearch, IconHeart, IconMessage, IconTrophy, IconCode, IconUsers, IconFilter } from '@tabler/icons-react';
import { NeuralBackground } from "@/components/three/NeuralBackground";

import { getGalleryProjects } from '@/app/actions/leaderboard';

export default function ArenaPage() {
    const [filter, setFilter] = useState("All");
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        getGalleryProjects().then(data => {
            setProjects(data);
            setLoading(false);
        });
    }, []);

    // Mock Data failover if DB empty (Optional, but good for demo if empty)
    // Removed for production realism


    return (
        <div className="min-h-screen bg-obsidian text-white font-sans relative overflow-hidden">
            {/* Background */}
            <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
                <NeuralBackground />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">

                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-amber-600"
                    >
                        THE ARENA
                    </motion.h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Explore the cutting-edge innovations built on Groq. Vote for your favorites and scout the competition.
                    </p>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto custom-scrollbar">
                        {['All', 'Conversational Agents', 'FinTech', 'Healthcare', 'Sustainability'].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${filter === cat
                                    ? 'bg-gold-500 text-black shadow-[0_0_15px_rgba(251,191,36,0.3)]'
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-80">
                        <IconSearch className="absolute left-3 top-3 text-gray-500" size={18} />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-gold-500"
                        />
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, i) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-gold-500/50 hover:shadow-[0_0_30px_rgba(251,191,36,0.1)] transition-all duration-300"
                        >
                            {/* Rank Badge */}
                            <div className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-2">
                                <IconTrophy size={14} className="text-gold-500" />
                                <span className="text-xs font-bold font-mono">Rank #{project.rank}</span>
                            </div>

                            {/* Image */}
                            <div className="relative h-48 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10 opactiy-80" />
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-6 relative z-20 -mt-10">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="bg-black/50 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold uppercase text-gold-500 border border-gold-500/20">
                                        {project.track}
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-red-500 transition-colors">
                                            <IconHeart size={18} />
                                        </button>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-gold-500 transition-colors">{project.title}</h3>
                                <p className="text-sm text-gray-400 flex items-center gap-2 mb-4">
                                    <IconUsers size={14} /> {project.team}
                                </p>

                                <p className="text-sm text-gray-300 mb-6 line-clamp-2">
                                    {project.description}
                                </p>

                                {/* Footer Stats */}
                                <div className="flex justify-between items-center text-xs font-bold text-gray-500 border-t border-white/5 pt-4">
                                    <div className="flex gap-4">
                                        <span className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
                                            <IconHeart size={14} className="text-red-500" /> {project.likes}
                                        </span>
                                        <span className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
                                            <IconMessage size={14} /> {project.comments}
                                        </span>
                                    </div>
                                    <a
                                        href={project.githubUrl || project.demoUrl || "#"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white transition-colors"
                                    >
                                        View Project <IconCode size={14} />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </div>
    );
}
