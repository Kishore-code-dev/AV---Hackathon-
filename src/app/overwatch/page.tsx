"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    IconEye,
    IconUsers,
    IconCode,
    IconCpu,
    IconActivity,
    IconSearch,
    IconMessageCircle,
    IconTrophy
} from "@tabler/icons-react";
import { getAdminData } from "@/app/actions/admin";
import { NeuralBackground } from "@/components/three/NeuralBackground";

export default function OverwatchPage() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState<any>(null);
    const [viewMode, setViewMode] = useState<'grid' | 'network'>('grid');

    const handleTransmit = async (projectId: string, type: any, message: string) => {
        const { sendAdminTransmission } = await import('@/app/actions/transmission');
        const res = await sendAdminTransmission(projectId, type, message);
        if (res.success) {
            alert(`SIGNAL TRANSMITTED: ${type}`);
        } else {
            alert("TRANSMISSION FAILED");
        }
    };

    useEffect(() => {
        async function load() {
            const result = await getAdminData();
            setData(result);
            setLoading(false);
        }
        load();
        const interval = setInterval(load, 10000);
        return () => clearInterval(interval);
    }, []);

    if (loading || !data) return (
        <div className="min-h-screen bg-obsidian flex items-center justify-center text-gold-500 font-mono animate-pulse">
            <IconEye size={48} className="mr-4" /> INITIALIZING OVERWATCH...
        </div>
    );

    return (
        <div className="min-h-screen bg-obsidian text-white font-sans relative overflow-hidden">
            <div className="fixed inset-0 z-0 opacity-30 pointer-events-none">
                <NeuralBackground />
            </div>

            <div className="relative z-10 p-8">
                {/* Header */}
                <header className="flex justify-between items-center mb-12 border-b border-white/10 pb-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/50 animate-pulse">
                            <IconEye className="text-red-500 w-8 h-8" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500">
                                GOD'S EYE
                            </h1>
                            <p className="text-xs text-red-400 tracking-[0.2em] uppercase">Global Intelligence Matrix</p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`px-4 py-2 rounded-lg border ${viewMode === 'grid' ? 'bg-white/10 border-white/30 text-white' : 'border-transparent text-gray-500'}`}
                        >
                            GRID VIEW
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT COLUMN: VISUALIZER */}
                    <div className="lg:col-span-2 min-h-[600px] relative rounded-2xl border border-white/10 bg-black/20 overflow-hidden">
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

                        <div className="relative z-10 p-8 grid grid-cols-2 md:grid-cols-3 gap-6">
                            {data.submissions.map((project: any, i: number) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    onClick={() => setSelectedProject(project)}
                                    className={`
                                        relative group cursor-pointer p-4 rounded-xl border backdrop-blur-md transition-all
                                        ${selectedProject?.id === project.id
                                            ? 'bg-red-500/10 border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.3)]'
                                            : 'bg-white/5 border-white/10 hover:border-gold-500/50 hover:bg-gold-500/5'}
                                    `}
                                >
                                    {selectedProject?.id === project.id && (
                                        <>
                                            <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-red-500" />
                                            <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-red-500" />
                                            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-red-500" />
                                            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-red-500" />
                                        </>
                                    )}

                                    <div className="flex justify-between items-start mb-2">
                                        <div className="text-xs font-mono text-gray-500">NODE_{i.toString().padStart(3, '0')}</div>
                                        <div className={`w-2 h-2 rounded-full ${project.reviews?.length > 0 ? 'bg-green-500' : 'bg-gray-600'}`} />
                                    </div>
                                    <h3 className="font-bold text-lg leading-tight mb-1">{project.title}</h3>
                                    <p className="text-xs text-gray-400 truncate">{project.team.name}</p>

                                    <div className="mt-4 flex items-end gap-1 h-8 opacity-50 group-hover:opacity-100 transition-opacity">
                                        {[40, 60, 30, 80, 50, 90].map((h, idx) => (
                                            <div key={idx} className="w-full bg-current rounded-t-sm" style={{ height: `${h}%`, color: selectedProject?.id === project.id ? '#ef4444' : '#fbbf24' }} />
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: TACTICAL ANALYSIS */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 bg-neutral-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-0 overflow-hidden flex flex-col h-[600px]">
                            <div className="bg-black/50 p-4 border-b border-white/10 flex justify-between items-center">
                                <span className="font-mono text-xs text-red-500 animate-pulse">● LIVE CONNECTION</span>
                                <span className="font-mono text-xs text-gray-500">SECURE_LINK_ESTABLISHED</span>
                            </div>

                            {selectedProject ? (
                                <div className="p-6 flex-1 flex flex-col overflow-y-auto">
                                    <div className="mb-6">
                                        <h2 className="text-2xl font-bold text-white uppercase tracking-tighter">{selectedProject.title}</h2>
                                        <div className="flex gap-2 mt-2">
                                            <span className="px-2 py-1 bg-white/10 rounded text-[10px] uppercase font-bold text-gray-300">
                                                {selectedProject.track}
                                            </span>
                                            <span className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded text-[10px] uppercase font-bold border border-blue-500/20">
                                                ID: {selectedProject.id.substring(0, 8)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="bg-white/5 rounded-xl border border-white/10 p-4 mb-6">
                                        <div className="flex items-center gap-2 mb-3">
                                            <IconTrophy className="text-gold-500" size={16} />
                                            <span className="text-xs font-bold text-gold-500 uppercase">Intelligence Assessment</span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            <div className="text-center p-2 bg-black/20 rounded-lg">
                                                <div className="text-xs text-gray-500 uppercase">Novelty</div>
                                                <div className="text-xl font-bold text-white">{selectedProject.reviews[0]?.noveltyScore || 0}</div>
                                            </div>
                                            <div className="text-center p-2 bg-black/20 rounded-lg">
                                                <div className="text-xs text-gray-500 uppercase">Viability</div>
                                                <div className="text-xl font-bold text-white">{selectedProject.reviews[0]?.feasibilityScore || 0}</div>
                                            </div>
                                        </div>

                                        <div className="p-3 bg-gold-500/10 border border-gold-500/20 rounded-lg">
                                            <p className="text-xs text-gold-200 italic leading-relaxed">
                                                "{selectedProject.reviews[0]?.reasoning || "Analyzing neural patterns..."}"
                                            </p>
                                        </div>
                                    </div>

                                    <Section title="Systems Architecture" icon={<IconCode size={14} />}>
                                        {selectedProject.description}
                                    </Section>

                                    <div className="mt-auto pt-6 space-y-2">
                                        <div className="grid grid-cols-2 gap-2">
                                            <TransmissionButton
                                                label="INITIATE INTERVIEW"
                                                icon={<IconUsers size={14} />}
                                                color="bg-blue-600 hover:bg-blue-500"
                                                onClick={() => handleTransmit(selectedProject.id, 'INTERVIEW', 'Council requests immediate presence for architectural review.')}
                                            />
                                            <TransmissionButton
                                                label="GRANT FUNDING"
                                                icon={<IconTrophy size={14} />}
                                                color="bg-gold-500 hover:bg-gold-400 text-black"
                                                onClick={() => handleTransmit(selectedProject.id, 'AWARD', 'Project selected for seed acceleration. Funds transfer initiated.')}
                                            />
                                        </div>
                                        <TransmissionButton
                                            label="DEPLOY SUPPORT AGENT"
                                            icon={<IconActivity size={14} />}
                                            color="bg-purple-600 hover:bg-purple-500"
                                            onClick={() => handleTransmit(selectedProject.id, 'ALERT', 'Reinforcement agent deployed to assist with codebase optimization.')}
                                        />

                                        <a
                                            href={selectedProject.githubUrl}
                                            target="_blank"
                                            className="w-full py-3 bg-white/5 hover:bg-white/10 text-gray-300 font-bold text-xs uppercase tracking-widest rounded-lg transition-colors flex items-center justify-center gap-2 border border-white/10"
                                        >
                                            <IconCode size={16} /> Access Source Code
                                        </a>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex-1 flex flex-col items-center justify-center text-center p-8 opacity-40">
                                    <div className="w-24 h-24 rounded-full border border-dashed border-white/20 flex items-center justify-center mb-4 animate-[spin_10s_linear_infinite]">
                                        <div className="w-16 h-16 rounded-full bg-white/10" />
                                    </div>
                                    <h3 className="text-lg font-bold font-mono">AWAITING TARGET LOCK</h3>
                                    <p className="text-xs max-w-[200px]">Select a node from the grid to initiate deep neural scan.</p>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

function StatBox({ label, value, icon, color = "text-white" }: any) {
    return (
        <div className="flex flex-col items-center">
            <span className={`text-2xl font-black ${color}`}>{value}</span>
            <span className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1 mt-1">
                {icon} {label}
            </span>
        </div>
    );
}

function Section({ title, icon, children }: any) {
    return (
        <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase mb-2 flex items-center gap-2">
                {icon} {title}
            </h4>
            <div className="text-sm text-gray-300 leading-relaxed">
                {children}
            </div>
        </div>
    );
}

function TransmissionButton({ label, icon, color, onClick }: any) {
    return (
        <button
            onClick={onClick}
            className={`w-full py-3 ${color} text-white font-bold text-[10px] uppercase tracking-widest rounded-lg transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-lg`}
        >
            {icon} {label}
        </button>
    );
}
