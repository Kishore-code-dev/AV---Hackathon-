"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Microscope, Activity, GitGraph, FileText } from 'lucide-react';

interface AIReviewCardProps {
    review: {
        score: number;
        noveltyScore: number;
        feasibilityScore: number;
        impactScore: number;
        reasoning: string;
    };
}

export function AIReviewCard({ review }: AIReviewCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-0 rounded-2xl overflow-hidden border border-white/10"
        >
            <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-6 border-b border-white/10 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Microscope size={24} className="text-blue-400" />
                    <h3 className="text-lg font-bold text-white">Autonomous Research Review</h3>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-3xl font-bold text-white">{review.score}</span>
                    <span className="text-xs text-blue-300 uppercase tracking-wider">Innovation Score</span>
                </div>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Metrics */}
                <div className="space-y-6">
                    <div>
                        <div className="flex justify-between text-sm mb-1 text-gray-400">
                            <span>Semantic Novelty</span>
                            <span>{review.noveltyScore}%</span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${review.noveltyScore}%` }}
                                className="h-full bg-purple-500"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-sm mb-1 text-gray-400">
                            <span>Feasibility</span>
                            <span>{review.feasibilityScore}%</span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${review.feasibilityScore}%` }}
                                className="h-full bg-blue-500"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-sm mb-1 text-gray-400">
                            <span>Impact Projection</span>
                            <span>{review.impactScore}%</span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${review.impactScore}%` }}
                                className="h-full bg-green-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Reasoning Text */}
                <div className="md:col-span-2 bg-black/30 p-4 rounded-xl border border-white/5 font-mono text-sm text-gray-400 leading-relaxed whitespace-pre-wrap">
                    {review.reasoning.replace(/### \*\*AI Research Analysis\*\*\n\n/, '')}
                </div>
            </div>
        </motion.div>
    );
}
