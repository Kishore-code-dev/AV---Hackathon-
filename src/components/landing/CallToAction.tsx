"use client";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { motion } from "framer-motion";


export function CallToAction() {
    return (
        <section className="py-32 relative overflow-hidden flex items-center justify-center min-h-[60vh] bg-black/40 backdrop-blur-lg">
            {/* Background Video or Abstract Shapes could go here */}
            <div className="absolute inset-0 bg-gold-500/5 z-0" />
            <div className="absolute -top-full -left-full w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:24px_24px] opacity-20 animate-spin-slow pointer-events-none" />

            <div className="container relative z-10 text-center px-6">
                <motion.h2
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-8xl font-bold text-white mb-8 tracking-tighter"
                >
                    Build the <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-amber-600">Impossible.</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-xl text-gray-400 max-w-2xl mx-auto mb-12"
                >
                    Access 500M+ tokens. Join the Pioneer Program. Win $50k.<br />
                    The future of AI agents starts with your code.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <Link href="/register">
                        <div className="inline-block p-[2px] bg-gradient-to-r from-gold-500 via-white to-gold-500 rounded-full bg-[length:200%_auto] animate-shimmer">
                            <button className="px-10 py-5 rounded-full bg-black text-white text-xl font-bold hover:bg-white hover:text-black transition-colors duration-300">
                                Register for Hackathon
                            </button>
                        </div>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
