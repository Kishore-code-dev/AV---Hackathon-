import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { FadeIn } from "@/components/animations/FadeIn";
import { Calendar, Users, Trophy, Code, ArrowRight, Activity, Cpu } from "lucide-react";
import Link from "next/link";
import { NeuralBackground } from "@/components/ui/NeuralBackground";

export const dynamic = 'force-dynamic';

export default async function HackathonsPage() {
    const hackathons = await prisma.hackathon.findMany({
        where: { status: 'ACTIVE' }
    });

    return (
        <div className="min-h-screen relative overflow-hidden bg-black text-white font-mono selection:bg-gold-500 selection:text-black">
            <NeuralBackground />

            <div className="relative z-10 pt-32 pb-20 container mx-auto px-6 max-w-6xl">
                <FadeIn>
                    <header className="text-center mb-20">
                        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 border border-gold-500/30 bg-gold-500/10 rounded-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse" />
                            <span className="text-[10px] tracking-[0.3em] uppercase text-gold-400 font-bold">
                                OPERATIONAL_DIRECTIVES
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter">
                            Active <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-amber-600">Missions</span>
                        </h1>
                        <p className="text-gray-500 text-sm tracking-widest max-w-2xl mx-auto uppercase">
                            Select a protocol to begin deployment. Authorized personnel only.
                        </p>
                    </header>

                    <div className="grid grid-cols-1 gap-12">
                        {hackathons.length === 0 ? (
                            <div className="text-center py-32 border border-white/10 bg-white/5 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_70%)]" />
                                <Activity size={48} className="mx-auto text-gray-700 mb-6 group-hover:text-gold-500/50 transition-colors" />
                                <h3 className="text-2xl font-bold text-gray-500 uppercase tracking-widest">No Active Missions</h3>
                                <p className="text-gray-600 mt-4 text-xs font-mono">System is calibrating. Awaiting directives.</p>
                                <Link href="/api/seed" className="inline-block mt-8 text-[10px] text-gray-800 uppercase hover:text-white transition-colors">
                                    [ADMIN_OVERRIDE: INITIALIZE_SYSTEM]
                                </Link>
                            </div>
                        ) : (
                            hackathons.map((hackathon) => (
                                <div key={hackathon.id} className="group relative border border-white/10 bg-black hover:border-gold-500/50 transition-all duration-500">
                                    {/* Tech corners */}
                                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover:border-gold-500 transition-colors" />
                                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 group-hover:border-gold-500 transition-colors" />
                                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 group-hover:border-gold-500 transition-colors" />
                                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-gold-500 transition-colors" />

                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                                        {/* Visual Side */}
                                        <div className="md:col-span-4 bg-white/[0.02] relative min-h-[300px] border-b md:border-b-0 md:border-r border-white/10 group-hover:bg-gold-500/5 transition-colors duration-500 overflow-hidden">
                                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                            {/* Animated Scan Line */}
                                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold-500/10 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 ease-in-out" />

                                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                                                <div className="w-20 h-20 rounded-full border border-gold-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 bg-black">
                                                    <Cpu size={32} className="text-gold-500" />
                                                </div>
                                                <div className="text-[10px] text-gold-500 uppercase tracking-[0.3em] font-bold">
                                                    Classification: {hackathon.status}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content Side */}
                                        <div className="md:col-span-8 p-8 md:p-12 flex flex-col relative">
                                            <div className="absolute top-6 right-6 text-[10px] text-gray-600 font-mono">
                                                ID: <span className="text-white">{hackathon.slug.toUpperCase()}</span>
                                            </div>

                                            <h3 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight group-hover:text-gold-400 transition-colors">
                                                {hackathon.name}
                                            </h3>

                                            <p className="text-gray-400 text-sm leading-relaxed mb-10 border-l-2 border-white/10 pl-6 max-w-2xl">
                                                {hackathon.description || "Mission objectives are currently classified. Proceed to initialization for full briefing."}
                                            </p>

                                            <div className="grid grid-cols-3 gap-8 mb-10 border-t border-white/5 pt-8">
                                                <div>
                                                    <div className="text-gray-600 text-[10px] uppercase tracking-widest mb-2 flex items-center gap-2">
                                                        <Calendar size={10} /> T-Minus
                                                    </div>
                                                    <div className="text-white font-mono text-lg">{hackathon.startDate.toLocaleDateString()}</div>
                                                </div>
                                                <div>
                                                    <div className="text-gray-600 text-[10px] uppercase tracking-widest mb-2 flex items-center gap-2">
                                                        <Users size={10} /> Squad_Size
                                                    </div>
                                                    <div className="text-white font-mono text-lg">{hackathon.maxTeamSize} Units</div>
                                                </div>
                                                <div>
                                                    <div className="text-gray-600 text-[10px] uppercase tracking-widest mb-2 flex items-center gap-2">
                                                        <Trophy size={10} /> Bounty
                                                    </div>
                                                    <div className="text-gold-400 font-mono text-lg font-bold">$50,000</div>
                                                </div>
                                            </div>

                                            <div className="mt-auto">
                                                <Link href={`/hackathon/${hackathon.slug}`} className="block">
                                                    <button className="w-full py-4 bg-white text-black font-black text-xs uppercase tracking-[0.2em] hover:bg-gold-500 hover:text-black transition-all duration-300 flex items-center justify-between px-8 group/btn">
                                                        <span>Initialize Protocol</span>
                                                        <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform" />
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </FadeIn>
            </div>
        </div>
    );
}
