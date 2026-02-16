"use client";
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconTrophy, IconMedal, IconFlame } from '@tabler/icons-react';
import { getLeaderboard } from '@/app/actions/leaderboard';
import { NeuralBackground } from "@/components/three/NeuralBackground";

export default function LeaderboardPage() {
    const [teams, setTeams] = useState<any[]>([]);

    useEffect(() => {
        getLeaderboard().then(setTeams);
    }, []);

    return (
        <div className="min-h-screen bg-obsidian text-white font-sans relative overflow-hidden flex flex-col items-center py-12">
            <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
                <NeuralBackground />
            </div>

            <h1 className="text-5xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-amber-600 relative z-10">
                HALL OF FAME
            </h1>
            <p className="text-gray-400 mb-12 tracking-widest uppercase text-sm font-bold relative z-10">
                Live Global Rankings
            </p>

            <div className="w-full max-w-4xl px-6 relative z-10 space-y-4">
                {teams.map((team, index) => (
                    <motion.div
                        key={team.id}
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className={`
                            relative flex items-center justify-between p-6 rounded-2xl border backdrop-blur-md transition-all group
                            ${index === 0 ? 'bg-gradient-to-r from-yellow-500/20 to-transparent border-yellow-500 scale-105 shadow-[0_0_40px_rgba(234,179,8,0.2)]' :
                                index === 1 ? 'bg-white/10 border-white/20' :
                                    index === 2 ? 'bg-amber-700/10 border-amber-700/30' :
                                        'bg-white/5 border-white/5 hover:bg-white/10'}
                        `}
                    >
                        {/* Rank */}
                        <div className="flex items-center gap-6">
                            <div className={`
                                w-12 h-12 flex items-center justify-center text-2xl font-black rounded-lg
                                ${index === 0 ? 'bg-yellow-500 text-black' :
                                    index === 1 ? 'bg-gray-300 text-black' :
                                        index === 2 ? 'bg-amber-700 text-white' :
                                            'text-gray-500 font-mono'}
                            `}>
                                {index + 1}
                            </div>

                            <div>
                                <h3 className={`text-xl font-bold ${index === 0 ? 'text-yellow-500' : 'text-white'}`}>
                                    {team.projectTitle}
                                </h3>
                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                    <span className="text-white font-bold">{team.teamName}</span>
                                    <span>•</span>
                                    <span>{team.track || 'General'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Score */}
                        <div className="text-right">
                            <div className="flex items-center gap-2 justify-end">
                                <IconFlame size={20} className={index === 0 ? 'text-orange-500 animate-pulse' : 'text-gray-600'} />
                                <span className={`text-3xl font-black ${index === 0 ? 'text-white' : 'text-gray-400'}`}>
                                    {team.score}
                                </span>
                            </div>
                            <div className="text-[10px] uppercase font-bold text-gray-600 mt-1">Total Score</div>
                        </div>

                        {/* Winner Crown for #1 */}
                        {index === 0 && (
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
                                <div className="text-yellow-500 animate-bounce mb-2">
                                    <IconTrophy size={48} />
                                </div>
                                <button
                                    onClick={async () => {
                                        if (confirm(`Declare ${team.teamName} as the Global Winner? This will be announced to all candidates.`)) {
                                            const { announceWinner } = await import('@/app/actions/winner');
                                            await announceWinner(team.id);
                                            alert("Winner Declared! Broadcast sent.");
                                        }
                                    }}
                                    className="px-4 py-1 bg-red-600 hover:bg-red-500 text-white text-[10px] font-bold uppercase rounded-full shadow-lg transition-transform hover:scale-105"
                                >
                                    Broadcast Win
                                </button>
                            </div>
                        )}
                    </motion.div>
                ))}

                {teams.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        Calculating Scores...
                    </div>
                )}
            </div>
        </div>
    );
}
