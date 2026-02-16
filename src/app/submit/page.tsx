"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from "@/components/Navbar";
import { NeuralBackground } from "@/components/ui/NeuralBackground";
import { FadeIn } from "@/components/animations/FadeIn";
import { Brain, Rocket, Check, AlertTriangle, Terminal, Code, Cpu, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

import { submitProject } from '@/app/actions/submit';

export default function SubmitPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        repoUrl: '',
        demoUrl: '',
        track: 'GenAI'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const result = await submitProject(formData);
            if (result.success) {
                setStep(3);
            } else {
                setError(result.error || "Transmission Failed: Unknown Error");
            }
        } catch (err) {
            setError("System Uplink Failed: Network Error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white font-mono selection:bg-gold-500 selection:text-black overflow-hidden relative">
            <NeuralBackground />

            {/* Nav placeholder if layout doesn't provide it */}
            <div className="fixed top-0 w-full z-50">
                {/* Assuming global nav exists, otherwise we'd render one here */}
            </div>

            <main className="relative z-10 pt-32 pb-20 container mx-auto px-6 max-w-4xl">
                <FadeIn>
                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 border border-emerald-500/30 bg-emerald-500/10 rounded-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] tracking-[0.3em] uppercase text-emerald-400 font-bold">
                                SYSTEM_READY_FOR_UPLOAD
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
                            Deploy <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Agent</span>
                        </h1>
                        <p className="text-gray-500 text-sm tracking-widest uppercase max-w-xl mx-auto">
                            Transmit your neural architecture to the Groq Consensus Network for evaluation.
                        </p>
                    </div>

                    {/* Progress Steps */}
                    <div className="flex justify-center items-center gap-4 mb-12">
                        {[
                            { id: 1, label: 'Manifest' },
                            { id: 2, label: 'Specs' },
                            { id: 3, label: 'Uplink' }
                        ].map((s) => (
                            <div key={s.id} className="flex items-center gap-2">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center border text-xs font-bold transition-all ${step >= s.id
                                    ? 'bg-emerald-500 text-black border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                                    : 'bg-black text-gray-600 border-white/10'
                                    }`}>
                                    {step > s.id ? <Check size={14} /> : s.id}
                                </div>
                                <span className={`text-[10px] uppercase tracking-widest ${step >= s.id ? 'text-white' : 'text-gray-700'}`}>
                                    {s.label}
                                </span>
                                {s.id < 3 && <div className="w-12 h-[1px] bg-white/10 mx-2" />}
                            </div>
                        ))}
                    </div>

                    {/* Form Container */}
                    <div className="relative border border-white/10 bg-black/50 backdrop-blur-xl p-8 md:p-12 overflow-hidden shadow-2xl">
                        {/* Animated Border Gradient */}
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                        {step === 1 && (
                            <motion.form
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-8"
                                onSubmit={(e) => { e.preventDefault(); setStep(2); }}
                            >
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-500 flex items-center gap-2">
                                        <Code size={12} /> Protocol_Name (Project Title)
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        placeholder="e.g. NEURAL_SAGE_V1"
                                        className="w-full bg-white/5 border border-white/10 text-white p-4 focus:outline-none focus:border-emerald-500/50 focus:bg-emerald-500/5 transition-all font-mono placeholder:text-gray-700"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-500 flex items-center gap-2">
                                        <Brain size={12} /> System_Architecture (Description)
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        placeholder="Describe your agentic workflow and Groq LPU integration..."
                                        rows={6}
                                        className="w-full bg-white/5 border border-white/10 text-white p-4 focus:outline-none focus:border-emerald-500/50 focus:bg-emerald-500/5 transition-all font-mono placeholder:text-gray-700"
                                        required
                                    />
                                </div>

                                <div className="flex justify-end pt-4">
                                    <button className="px-8 py-3 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-emerald-400 transition-colors flex items-center gap-2 group">
                                        Proceed to Specs <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </motion.form>
                        )}

                        {step === 2 && (
                            <motion.form
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-8"
                                onSubmit={handleSubmit}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-gray-500 flex items-center gap-2">
                                            <Terminal size={12} /> Source_Code_Repository
                                        </label>
                                        <input
                                            type="url"
                                            name="repoUrl"
                                            value={formData.repoUrl}
                                            onChange={handleInputChange}
                                            placeholder="https://github.com/..."
                                            className="w-full bg-white/5 border border-white/10 text-white p-4 focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-500/5 transition-all font-mono placeholder:text-gray-700"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-gray-500 flex items-center gap-2">
                                            <Cpu size={12} /> Live_Demo_Link
                                        </label>
                                        <input
                                            type="url"
                                            name="demoUrl"
                                            value={formData.demoUrl}
                                            onChange={handleInputChange}
                                            placeholder="https://..."
                                            className="w-full bg-white/5 border border-white/10 text-white p-4 focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-500/5 transition-all font-mono placeholder:text-gray-700"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-500 block">
                                        Select_Track_Vector
                                    </label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {['GenAI', 'Infrastructure', 'Social Good', 'Finance'].map(track => (
                                            <div
                                                key={track}
                                                onClick={() => setFormData({ ...formData, track })}
                                                className={`p-4 border cursor-pointer transition-all text-center ${formData.track === track
                                                    ? 'bg-emerald-500/20 border-emerald-500 text-white'
                                                    : 'bg-white/5 border-white/10 text-gray-500 hover:border-white/30'
                                                    }`}
                                            >
                                                <div className="text-xs font-bold uppercase tracking-widest">{track}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {error && (
                                    <div className="flex items-center gap-2 p-4 bg-red-900/20 border border-red-500/30 text-red-400 text-xs uppercase tracking-widest">
                                        <AlertTriangle size={16} />
                                        {error}
                                    </div>
                                )}

                                <div className="flex justify-between items-center pt-8 border-t border-white/10 mt-8">
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="text-xs text-gray-500 uppercase tracking-widest hover:text-white transition-colors"
                                    >
                                        &larr; Back to Manifest
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="px-8 py-4 bg-emerald-500 text-black font-bold text-xs uppercase tracking-widest hover:bg-emerald-400 transition-all flex items-center gap-2 group disabled:opacity-50 disabled:cursor-wait"
                                    >
                                        {isSubmitting ? 'Initialising Uplink...' : (
                                            <>
                                                Initiate Deployment <Rocket size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </motion.form>
                        )}

                        {step === 3 && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-12"
                            >
                                <div className="w-24 h-24 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-8 relative">
                                    <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full animate-pulse" />
                                    <Check size={48} className="text-emerald-500 relative z-10" />
                                </div>
                                <h2 className="text-3xl font-bold text-white mb-4 uppercase tracking-tight">Transmission Complete</h2>
                                <p className="text-gray-400 max-w-md mx-auto mb-10 leading-relaxed text-sm">
                                    Your architecture code <span className="text-emerald-400 font-mono">[{formData.title}]</span> has been successfully indexed by the Groq Neural Core.
                                </p>
                                <Link href="/dashboard">
                                    <button className="px-8 py-3 border border-white/20 hover:bg-white hover:text-black transition-all text-xs uppercase tracking-widest font-bold">
                                        Return to Command
                                    </button>
                                </Link>
                            </motion.div>
                        )}
                    </div>
                </FadeIn>
            </main>
        </div>
    );
}
