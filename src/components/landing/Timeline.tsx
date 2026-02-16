"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { IconCheck, IconCircle } from "@tabler/icons-react";

const events = [
    {
        date: "Aug 26 - 6:00 PM IST",
        title: "Registration Opens",
        desc: "Registration begins for all participants worldwide.",
        status: "completed"
    },
    {
        date: "Sep 1 - 9:00 AM IST",
        title: "Hackathon Begins",
        desc: "Development phase starts, access to Groq API and resources.",
        status: "active"
    },
    {
        date: "Sep 1 - Oct 6",
        title: "Judging Period",
        desc: "Expert panel reviews and evaluates all submissions.",
        status: "upcoming"
    },
    {
        date: "Oct 6 - 11:59 PM IST",
        title: "Submission Deadline",
        desc: "Final submissions must be completed by this deadline.",
        status: "upcoming"
    },
    {
        date: "Oct 6 - 12:00 PM IST",
        title: "Results Announced",
        desc: "Winners announced and prizes distributed.",
        status: "upcoming"
    },
];

export function Timeline() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });

    // Animate vertical line drawing down
    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section ref={ref} id="timeline" className="py-32 bg-transparent relative overflow-hidden">
            {/* Background Warp Effect */}
            <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
            <div className="absolute -left-40 top-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]" />

            <div className="container mx-auto px-6 relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold mb-20 text-center">Event <span className="text-gold-500">Timeline</span></h2>

                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical Line Container */}
                    <div className="absolute top-0 bottom-0 left-[19px] md:left-1/2 md:-ml-px w-0.5 bg-white/5">
                        <motion.div
                            style={{ height: lineHeight }}
                            className="w-full bg-gradient-to-b from-transparent via-gold-500 to-transparent"
                        />
                    </div>

                    <div className="space-y-12">
                        {events.map((event, i) => (
                            <motion.div
                                key={i}
                                className={`relative flex items-center md:items-start ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                            >
                                {/* Dot */}
                                <div className={`absolute left-0 md:left-1/2 md:-translate-x-1/2 w-10 h-10 rounded-full border-4 border-obsidian z-10 flex items-center justify-center ${event.status === 'active' ? 'bg-gold-500 shadow-[0_0_20px_rgba(212,175,55,0.6)] animate-pulse' : event.status === 'completed' ? 'bg-gold-500/50' : 'bg-gray-800'}`}>
                                    {event.status === 'completed' ? <IconCheck size={16} className="text-black" /> : <div className={`w-3 h-3 rounded-full ${event.status === 'active' ? 'bg-white' : 'bg-gray-500'}`} />}
                                </div>

                                {/* Content Card */}
                                <div className={`ml-16 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                                    <div className="glass p-6 rounded-xl border border-white/5 hover:border-gold-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gold-500/10 group">
                                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 ${event.status === 'active' ? 'bg-gold-500/20 text-gold-500' : event.status === 'completed' ? 'bg-green-500/20 text-green-500' : 'bg-white/5 text-gray-500'}`}>
                                            {event.status}
                                        </span>
                                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-gold-400 transition-colors">{event.title}</h3>
                                        <p className="text-gold-500 font-mono text-sm mb-3">{event.date}</p>
                                        <p className="text-gray-400 text-sm leading-relaxed">{event.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
