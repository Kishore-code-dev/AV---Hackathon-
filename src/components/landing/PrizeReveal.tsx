"use client";
import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { IconTrophy, IconStar, IconAward, IconCertificate, IconRocket } from '@tabler/icons-react';
import { FadeIn } from "@/components/animations/FadeIn";
import { HoverCard } from "@/components/animations/HoverCard";

// 3D Tilt Card Component for the Winner (Requirement 5)
function TiltCard({ children, className }: { children: React.ReactNode, className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const ySpring = useSpring(y, { stiffness: 300, damping: 30 });

    const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = (e.clientX - rect.left) * 32.5;
        const mouseY = (e.clientY - rect.top) * 32.5;

        const rX = (mouseY / height - 32.5 / 2) * -1;
        const rY = (mouseX / width - 32.5 / 2) * 1;

        x.set(rX);
        y.set(rY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transformStyle: "preserve-3d",
                transform
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function PrizeReveal() {
    return (
        <section className="py-32 relative bg-black overflow-hidden perspective-1000">
            {/* Quantum Burst Center - Enhanced */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-500/5 rounded-full blur-[150px] animate-pulse pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <FadeIn direction="up">
                        <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                            Global AI <span className="text-gold-500">Fellowships</span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Beyond cash prizes. Secure funding, mentorship, and cloud resources to launch your agentic startup.
                        </p>
                    </FadeIn>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end max-w-6xl mx-auto align-bottom">
                    {/* 2nd Place */}
                    <FadeIn delay={0.2} direction="up" className="order-2 md:order-1 h-full">
                        <HoverCard className="glass p-8 rounded-2xl border border-white/5 bg-gradient-to-b from-white/5 to-transparent text-center relative h-full flex flex-col justify-end" glowColor="gold">
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-gray-300 text-black rounded-full flex items-center justify-center border-4 border-black shadow-lg z-20 font-bold text-xl">
                                2
                            </div>
                            <div className="mt-8 mb-4">
                                <IconCertificate size={48} className="mx-auto text-gray-300 mb-2" />
                                <h3 className="text-2xl font-bold text-white">Research Grant</h3>
                            </div>
                            <p className="text-3xl font-bold text-gold-500 mb-2">$10,000</p>
                            <ul className="text-sm text-gray-400 space-y-3 mt-4 text-left px-4">
                                <li className="flex gap-2"><IconStar size={14} className="text-gray-300 mt-1" /> $5,000 Seed Funding</li>
                                <li className="flex gap-2"><IconStar size={14} className="text-gray-300 mt-1" /> $5,000 Cloud Credits</li>
                                <li className="flex gap-2"><IconStar size={14} className="text-gray-300 mt-1" /> Accelerator Interview</li>
                            </ul>
                        </HoverCard>
                    </FadeIn>

                    {/* 1st Place - QUANTUM TILT CARD */}
                    <FadeIn delay={0.4} direction="up" className="order-1 md:order-2 relative z-20 -top-12">
                        <TiltCard className="glass-card p-12 rounded-2xl border-2 border-gold-500/30 bg-gradient-to-tr from-gold-500/10 to-black text-center relative shadow-[0_0_80px_rgba(212,175,55,0.15)] group h-full">

                            {/* 3D Floating Elements */}
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-gold-400 text-black rounded-full flex items-center justify-center border-4 border-black shadow-[0_0_30px_rgba(255,215,0,0.6)] animate-[bounce_3s_infinite]">
                                <IconTrophy size={40} />
                            </div>

                            <div className="mt-8 mb-6 transform translate-z-10">
                                <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">The IQIGAI Fellowship</h3>
                                <span className="inline-block px-3 py-1 bg-gradient-to-r from-gold-400 to-amber-600 text-black text-xs font-bold uppercase tracking-widest rounded-full">
                                    Grand Prize
                                </span>
                            </div>
                            <p className="text-6xl font-bold text-white mb-2 text-shadow-gold transform translate-z-20">$50,000</p>
                            <p className="text-sm text-gold-400/80 mb-6 uppercase tracking-widest font-mono">Total Value</p>

                            <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-500/50 to-transparent my-6" />

                            <ul className="text-lg text-gray-200 space-y-4 text-left pl-4">
                                <li className="flex items-center gap-3"><IconRocket size={20} className="text-gold-500" /> $20,000 Cash Grant</li>
                                <li className="flex items-center gap-3"><IconStar size={20} className="text-gold-500" /> $30,000 Compute</li>
                                <li className="flex items-center gap-3"><IconAward size={20} className="text-gold-500" /> VP-Level Mentorship</li>
                            </ul>
                        </TiltCard>
                    </FadeIn>

                    {/* 3rd Place */}
                    <FadeIn delay={0.3} direction="up" className="order-3 h-full">
                        <HoverCard className="glass p-8 rounded-2xl border border-white/5 bg-gradient-to-b from-white/5 to-transparent text-center relative h-full flex flex-col justify-end" glowColor="gold">
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-orange-700 text-white rounded-full flex items-center justify-center border-4 border-black shadow-lg z-20 font-bold text-xl">
                                3
                            </div>
                            <div className="mt-8 mb-4">
                                <IconAward size={48} className="mx-auto text-orange-700 mb-2" />
                                <h3 className="text-2xl font-bold text-white">Builder Grant</h3>
                            </div>
                            <p className="text-3xl font-bold text-gold-500 mb-2">$5,000</p>
                            <ul className="text-sm text-gray-400 space-y-3 mt-4 text-left px-4">
                                <li className="flex gap-2"><IconStar size={14} className="text-gray-300 mt-1" /> $2,000 Cash</li>
                                <li className="flex gap-2"><IconStar size={14} className="text-gray-300 mt-1" /> $3,000 Credits</li>
                                <li className="flex gap-2"><IconStar size={14} className="text-gray-300 mt-1" /> Certification</li>
                            </ul>
                        </HoverCard>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
}
