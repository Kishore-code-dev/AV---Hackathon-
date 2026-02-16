"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { IconCheck, IconCircle, IconLock, IconCurrentLocation } from '@tabler/icons-react';

const rounds = [
    { id: 1, title: "Registration", date: "Oct 1 - Oct 5", status: "completed" },
    { id: 2, title: "Team Formation", date: "Oct 6 - Oct 8", status: "completed" },
    { id: 3, title: "Prototype Submission", date: "Oct 9 - Oct 11", status: "active" },
    { id: 4, title: "AI Evaluation", date: "Oct 12", status: "upcoming" },
    { id: 5, title: "Grand Finale", date: "Oct 14", status: "locked" },
];

export function HackathonTimeline({ currentStage = 3 }: { currentStage?: number }) {
    return (
        <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-white/10" />

            <div className="space-y-8">
                {rounds.map((round) => {
                    const isCompleted = round.id < currentStage;
                    const isActive = round.id === currentStage;

                    return (
                        <div key={round.id} className={`relative flex items-start gap-6 group ${isActive ? 'opacity-100' : 'opacity-60 hover:opacity-100 transition-opacity'}`}>
                            {/* Icon/Dot */}
                            <div className={`
                                relative z-10 w-12 h-12 rounded-full flex items-center justify-center border-2 
                                ${isCompleted ? 'bg-green-500/20 border-green-500 text-green-500' :
                                    isActive ? 'bg-gold-500/20 border-gold-500 text-gold-500 shadow-[0_0_15px_rgba(251,191,36,0.3)]' :
                                        'bg-obsidian border-white/20 text-gray-500'}
                            `}>
                                {isCompleted ? <IconCheck size={20} /> :
                                    isActive ? <IconCurrentLocation size={20} className="animate-pulse" /> :
                                        <IconLock size={18} />}
                            </div>

                            {/* Content */}
                            <div className="flex-1 pt-2">
                                <div className="flex justify-between items-start">
                                    <h3 className={`text-lg font-bold ${isActive ? 'text-white' : 'text-gray-400'}`}>
                                        {round.title}
                                    </h3>
                                    <span className="text-xs font-mono text-gray-500 bg-white/5 px-2 py-1 rounded">
                                        {round.date}
                                    </span>
                                </div>
                                {isActive && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="mt-2 text-sm text-gold-500/80"
                                    >
                                        Current Phase: Submissions are open.
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
