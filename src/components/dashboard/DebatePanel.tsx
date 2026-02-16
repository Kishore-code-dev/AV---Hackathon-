"use client";
import React, { useState, useEffect, useTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconBrain, IconBulb, IconAlertTriangle, IconServer, IconRefresh } from '@tabler/icons-react';
import { DebateTurn } from '@/lib/ai/debateSystem';
import { Button } from "@/components/ui/Button";
import { triggerNewDebate } from "@/app/actions/ai"; // Server Action

interface DebatePanelProps {
    debateTurns: DebateTurn[];
    projectId?: string;
    description?: string;
}

export function DebatePanel({ debateTurns: initialTurns, projectId, description }: DebatePanelProps) {
    const [turns, setTurns] = useState<DebateTurn[]>(initialTurns);
    const [currentTurn, setCurrentTurn] = useState(0);
    const [isPending, startTransition] = useTransition();

    // Auto-advance debate
    useEffect(() => {
        if (currentTurn < turns.length && !isPending) {
            const timer = setTimeout(() => setCurrentTurn(prev => prev + 1), 2000);
            return () => clearTimeout(timer);
        }
    }, [currentTurn, turns.length, isPending]);

    const handleRefreshDebate = () => {
        if (!projectId || !description) return;

        startTransition(async () => {
            setCurrentTurn(0);
            const result = await triggerNewDebate(projectId, description);
            if (result.success && result.debateTurns) {
                setTurns(result.debateTurns);
            }
        });
    };

    const getIcon = (speaker: string) => {
        switch (speaker) {
            case "Visionary": return <IconBulb className="text-gold-500" />;
            case "Skeptic": return <IconAlertTriangle className="text-red-500" />;
            case "Architect": return <IconServer className="text-blue-500" />;
            default: return <IconBrain className="text-gray-500" />;
        }
    };

    return (
        <div className="glass-card p-6 rounded-2xl h-[400px] overflow-hidden flex flex-col relative group">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <IconBrain size={20} className="text-purple-500" />
                    Emergent Debate Intelligence
                </h3>
                {projectId && (
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleRefreshDebate}
                        disabled={isPending}
                        className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <IconRefresh size={14} className={isPending ? "animate-spin" : ""} />
                    </Button>
                )}
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-hide relative">
                {isPending && (
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-10 text-gold-500 text-xs font-mono animate-pulse">
                        SIMULATING NEW SCENARIOS...
                    </div>
                )}
                <AnimatePresence mode='wait'>
                    {turns.slice(0, currentTurn).map((turn, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.5 }}
                            className={`p-3 rounded-lg border border-white/5 ${turn.speaker === "Visionary" ? "bg-gold-500/10 ml-8" :
                                    turn.speaker === "Skeptic" ? "bg-red-500/10 mr-8" :
                                        "bg-blue-500/10 mx-4"
                                }`}
                        >
                            <div className="flex items-center gap-2 mb-1">
                                {getIcon(turn.speaker)}
                                <span className="font-bold text-xs uppercase tracking-wider text-gray-300">{turn.speaker} AI</span>
                            </div>
                            <p className="text-sm text-gray-300 leading-relaxed">{turn.content}</p>
                        </motion.div>
                    ))}
                </AnimatePresence>
                {!isPending && currentTurn < turns.length && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2 text-xs text-gray-500 animate-pulse pl-2"
                    >
                        <span className="w-2 h-2 bg-gray-500 rounded-full" />
                        Analyzing via Groq LPU...
                    </motion.div>
                )}
            </div>
        </div>
    );
}
