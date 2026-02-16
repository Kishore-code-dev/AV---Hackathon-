"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IconStar, IconCheck, IconX, IconCode, IconExternalLink } from '@tabler/icons-react';
import { getJudgingQueue, submitJudgeScore } from '@/app/actions/judge';

export default function JudgePage() {
    const [queue, setQueue] = useState<any[]>([]);
    const [activeProject, setActiveProject] = useState<any>(null);
    const [scores, setScores] = useState({ novelty: 5, tech: 5, impact: 5, ux: 5 });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getJudgingQueue().then(data => {
            setQueue(data);
            if (data.length > 0) setActiveProject(data[0]);
            setLoading(false);
        });
    }, []);

    const handleScore = (key: string, val: number) => {
        setScores(prev => ({ ...prev, [key]: val }));
    };

    const submitScore = async () => {
        if (!activeProject) return;

        setSubmitted(true);
        // Call Server Action
        await submitJudgeScore({
            projectId: activeProject.id,
            scores: scores
        });

        setTimeout(() => {
            setSubmitted(false);
            // Move to next
            const currentIndex = queue.findIndex(p => p.id === activeProject.id);
            const next = queue[currentIndex + 1] || queue[0];
            if (next && next.id !== activeProject.id) {
                setActiveProject(next);
                setScores({ novelty: 5, tech: 5, impact: 5, ux: 5 });
            } else {
                alert("All projects reviewed!");
            }
        }, 1500);
    };

    if (loading) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading Judiciary...</div>;
    if (queue.length === 0) return <div className="min-h-screen bg-black text-white flex items-center justify-center">No projects in queue.</div>;

    return (
        <div className="min-h-screen bg-[#050505] text-white flex">
            {/* LEFT: QUEUE */}
            <div className="w-80 border-r border-white/10 p-6 hidden md:block">
                <h2 className="text-xl font-bold mb-6 text-gray-400 uppercase tracking-widest">Judging Queue</h2>
                <div className="space-y-4">
                    {queue.map(p => (
                        <div
                            key={p.id}
                            onClick={() => setActiveProject(p)}
                            className={`p-4 rounded-xl cursor-pointer border transition-all ${activeProject?.id === p.id
                                    ? 'bg-gold-500/10 border-gold-500 text-white shadow-lg'
                                    : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                                }`}
                        >
                            <h3 className="font-bold text-sm truncate">{p.title}</h3>
                            <p className="text-xs mt-1 opacity-70 truncate">{p.team?.name || 'Unknown Team'}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* MIDDLE: PROJECT VIEW */}
            <div className="flex-1 p-8 overflow-y-auto">
                {activeProject && (
                    <div className="max-w-4xl mx-auto">
                        {/* Header */}
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h1 className="text-4xl font-bold mb-2">{activeProject.title}</h1>
                                <p className="text-xl text-gray-400">{activeProject.team?.name}</p>
                            </div>
                            <div className="flex gap-3">
                                {activeProject.githubUrl && <a href={activeProject.githubUrl} className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"><IconCode /></a>}
                                {activeProject.demoUrl && <a href={activeProject.demoUrl} className="p-3 bg-gold-500 hover:bg-gold-400 text-black font-bold rounded-lg transition-colors"><IconExternalLink /></a>}
                            </div>
                        </div>

                        <p className="text-gray-300 text-lg leading-relaxed mb-12 bg-white/5 p-6 rounded-xl border border-white/10">
                            {activeProject.description || "No description provided."}
                        </p>

                        {/* SCORING SHEET */}
                        <div className="bg-black/40 border border-white/10 rounded-2xl p-8 backdrop-blur-md">
                            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                <IconStar className="text-gold-500 fill-gold-500" /> Scoring Sheet
                            </h3>

                            {submitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-12"
                                >
                                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <IconCheck size={40} className="text-black" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-green-500">Score Submitted!</h3>
                                    <p className="text-gray-400 mt-2">Loading next project...</p>
                                </motion.div>
                            ) : (
                                <div className="space-y-8">
                                    {[
                                        { id: 'novelty', label: 'Innovation & Freshness' },
                                        { id: 'tech', label: 'Technical Complexity' },
                                        { id: 'impact', label: 'Business Impact / Viability' },
                                        { id: 'ux', label: 'Design & User Experience' }
                                    ].map((criteria) => (
                                        <div key={criteria.id}>
                                            <div className="flex justify-between mb-2">
                                                <label className="font-bold text-gray-300">{criteria.label}</label>
                                                <span className="text-gold-500 font-mono font-bold text-xl">
                                                    {scores[criteria.id as keyof typeof scores]}/10
                                                </span>
                                            </div>
                                            <input
                                                type="range"
                                                min="1" max="10"
                                                value={scores[criteria.id as keyof typeof scores]}
                                                onChange={(e) => handleScore(criteria.id, parseInt(e.target.value))}
                                                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold-500 hover:accent-gold-400"
                                            />
                                            <div className="flex justify-between text-xs text-gray-600 mt-1 uppercase font-bold tracking-widest">
                                                <span>Poor</span>
                                                <span>Excellent</span>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="pt-8 border-t border-white/10 flex justify-end gap-4">
                                        <button className="px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors font-bold text-gray-400">
                                            Critique (Comment)
                                        </button>
                                        <button
                                            onClick={submitScore}
                                            className="px-8 py-3 bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-400 hover:to-amber-500 text-black font-black text-lg rounded-xl shadow-[0_0_20px_rgba(251,191,36,0.3)] transition-all transform hover:scale-105 active:scale-95"
                                        >
                                            SUBMIT SCORE
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
