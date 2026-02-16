"use client";
import { BentoGrid, BentoGridItem } from "@/components/ui/BentoGrid";
import { IconCpu, IconBolt, IconPlugConnected, IconBulb, IconEye, IconRobot } from "@tabler/icons-react";

export function ChallengeDetails() {
    return (
        <section className="py-24 relative bg-transparent overflow-visible">
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-obsidian/30 to-transparent pointer-events-none" />
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-gold-500 font-bold tracking-widest text-sm uppercase mb-2 block animate-pulse">The Mission</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Hackathon <span className="text-gold-500">Goal</span></h2>
                    <p className="text-gray-400 max-w-3xl mx-auto text-lg font-light">
                        Build real-world AI agent systems that <span className="text-white font-medium">perceive, reason, and act</span> powered by Groq's ultra-fast inference and optionally integrated with Model Context Protocol (MCP).
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    {/* Criteria Cards with Hover Build Effect */}
                    {[
                        { icon: IconRobot, title: "Multi-Agent Architecture", desc: "Deploy at least 2 specialized agents working together to solve complex tasks.", color: "blue" },
                        { icon: IconBolt, title: "Real-Time Performance", desc: "Leverage Groq's lightning-fast inference for responsive, millisecond-latency experiences.", color: "gold" },
                        { icon: IconPlugConnected, title: "MCP Integration", desc: "Use Model Context Protocol to seamlessly connect with external databases and tools.", color: "purple" }
                    ].map((card, i) => (
                        <div key={i} className={`glass p-8 rounded-2xl border border-white/5 hover:border-${card.color}-500/50 bg-gradient-to-br from-white/5 to-transparent group transition-colors duration-500`}>
                            <div className={`w-12 h-12 bg-${card.color}-500/10 rounded-lg flex items-center justify-center mb-6 text-${card.color === 'gold' ? 'yellow' : card.color}-400 group-hover:scale-110 transition-transform duration-300`}>
                                <card.icon size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gold-400 transition-colors">{card.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{card.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Looking for / Judging - Cinematic Layout */}
                <div className="glass-card rounded-3xl p-10 relative overflow-hidden group">
                    {/* Animated Gradient Orb */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[120px] group-hover:bg-gold-500/10 transition-colors duration-700" />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
                        <div>
                            <h3 className="text-3xl font-bold text-white mb-8">Judging Intelligence</h3>
                            <div className="space-y-8">
                                {[
                                    { label: "Technical Excellence", val: 35, desc: "Code quality, architecture.", color: "bg-gold-500" },
                                    { label: "Real-World Impact", val: 35, desc: "Practical value effectiveness.", color: "bg-blue-500" },
                                    { label: "Innovation", val: 30, desc: "Creativity and novelty.", color: "bg-purple-500" }
                                ].map((crit, idx) => (
                                    <div key={idx} className="space-y-3 group/bar">
                                        <div className="flex justify-between text-sm font-bold text-white">
                                            <span>{crit.label}</span>
                                            <span className="text-gold-500">{crit.val}%</span>
                                        </div>
                                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full ${crit.color} w-0 group-hover/bar:w-[${crit.val}%] transition-all duration-1000 ease-out`}
                                                style={{ width: `${crit.val}%` }}
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500">{crit.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="border-l border-white/10 pl-12">
                            <h3 className="text-3xl font-bold text-white mb-6">Beyond Chatbots</h3>
                            <p className="text-gray-400 mb-8 leading-relaxed">
                                This challenge is about orchestrating <span className="text-white">intelligent workflows</span>. We want agents that do real work.
                            </p>
                            <ul className="space-y-6">
                                {[
                                    { icon: IconCpu, title: "Intelligent Reasoning", sub: "Decision making vs Q&A." },
                                    { icon: IconEye, title: "Multi-modal Processing", sub: "Text, Voice, Vision." },
                                    { icon: IconBulb, title: "Genuine Use Case", sub: "Solve a real problem." }
                                ].map((item, ix) => (
                                    <li key={ix} className="flex items-center gap-4 group/item">
                                        <div className="bg-white/5 p-2 rounded-lg text-gold-500 group-hover/item:text-white group-hover/item:bg-gold-500 transition-colors">
                                            <item.icon size={20} />
                                        </div>
                                        <div>
                                            <strong className="text-white block group-hover/item:text-gold-400 transition-colors">{item.title}</strong>
                                            <span className="text-gray-500 text-sm">{item.sub}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
