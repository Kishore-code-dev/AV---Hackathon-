"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { Lightbulb, Users, Award, Rocket } from "lucide-react";
import { useRef } from "react";
import { FadeIn } from "@/components/animations/FadeIn";
import { HoverCard } from "@/components/animations/HoverCard";

export function AboutGroq() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], [100, -100]); // Parallax effect

    return (
        <section ref={ref} id="about" className="py-24 relative bg-black overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <FadeIn direction="right">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                            The Agentic AI <br />
                            <span className="text-gold-500">Pioneer Program</span>
                        </h2>
                        <div className="w-20 h-1 bg-gold-500 mb-8" />

                        <p className="text-gray-300 text-lg leading-relaxed mb-6">
                            This is not just a hackathon. It is the culmination of the <strong>Analytics Vidhya Agentic AI Pioneer Program</strong>—a rigorous curriculum designed to forge the next generation of AI architects.
                        </p>
                        <p className="text-gray-400 leading-relaxed mb-8">
                            Participants have spent weeks mastering <strong>LangGraph</strong>, <strong>CrewAI</strong>, and <strong>AutoGen</strong>. Now, they apply these skills to solve real-world problems with autonomous swarms that plan, reason, and execute.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { icon: Lightbulb, title: "Deep Curriculum", desc: "150+ hours of intelligent agent training." },
                                { icon: Users, title: "Community", desc: "Join 1000+ builders in a collaborative ecosystem." },
                                { icon: Award, title: "Certification", desc: "Earn the prestigious Pioneer Program credential." },
                                { icon: Rocket, title: "Launchpad", desc: "Direct path from prototype to production deployment." }
                            ].map((item, i) => (
                                <HoverCard
                                    key={i}
                                    className="glass p-6 rounded-xl border border-white/10 group cursor-default"
                                    glowColor="gold"
                                >
                                    <item.icon className="w-8 h-8 text-gold-500 mb-4" />
                                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                    <p className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors">{item.desc}</p>
                                </HoverCard>
                            ))}
                        </div>
                    </FadeIn>

                    <motion.div
                        style={{ y }}
                        className="relative hidden lg:block"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-gold-500/10 to-purple-500/10 blur-[120px] rounded-full animate-pulse" />

                        <FadeIn delay={0.3} direction="left">
                            <div className="glass-card p-10 rounded-3xl relative z-10 border border-white/10 bg-black/60 shadow-2xl shadow-black/50 overflow-hidden">
                                {/* Animated Scanner Bar */}
                                <motion.div
                                    className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-50"
                                    animate={{ top: ["0%", "100%", "0%"] }}
                                    transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                                />

                                <div className="flex items-center justify-between mb-8">
                                    <div className="bg-gold-500/20 p-3 rounded-full">
                                        <Award className="w-8 h-8 text-gold-500" />
                                    </div>
                                    <div className="flex -space-x-4">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className={`w-10 h-10 rounded-full border-2 border-black bg-gray-${i * 200 + 300}`} style={{ backgroundImage: `url(https://i.pravatar.cc/100?img=${i + 10})`, backgroundSize: 'cover' }} />
                                        ))}
                                    </div>
                                </div>

                                <h3 className="text-3xl font-bold text-white mb-6">Program Highlights</h3>

                                <ul className="space-y-4 mb-8">
                                    {[
                                        "Mastering Agentic Reasoning (ReAct)",
                                        "Building Multi-Agent Swarms",
                                        "RAG with Vector Databases",
                                        "Human-in-the-Loop Workflows"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-gray-300">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>

                                <div className="flex items-center justify-between border-t border-white/10 pt-6">
                                    <span className="text-xs font-mono text-gold-500 tracking-widest uppercase">Analytics Vidhya</span>
                                    <a href="https://www.analyticsvidhya.com/agentic-ai-pioneer-program/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gold-500 transition-colors text-sm font-bold flex items-center gap-2 group">
                                        View Syllabus <span className="group-hover:translate-x-1 transition-transform">→</span>
                                    </a>
                                </div>
                            </div>
                        </FadeIn>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
