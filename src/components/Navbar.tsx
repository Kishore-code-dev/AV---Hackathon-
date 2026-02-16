"use client";
import { useAI } from "@/lib/ai-context";

import { useState, useEffect } from "react";
import Link from 'next/link';
import { Button } from "@/components/ui/Button";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
    user?: {
        name: string | null;
        email: string;
    } | null;
}



export function Navbar({ user }: NavbarProps) {
    const { aiState, setAIState } = useAI();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: 'Hackathons', href: '/hackathons' },
        { name: 'Modules', href: '/#tracks' },
        { name: 'Curriculum', href: '/#resources' },
        { name: 'Leaderboard', href: '/leaderboard' },
    ];

    const handleLogout = async () => {
        await fetch('/api/logout', { method: 'POST' });
        window.location.href = '/login';
    };

    // DEBUG/DEMO: Toggle AI State
    const cycleAIState = () => {
        if (aiState === "IDLE") setAIState("THINKING");
        else if (aiState === "THINKING") setAIState("STREAMING");
        else if (aiState === "STREAMING") setAIState("COMPLETED");
        else setAIState("IDLE");
    }

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{
                y: 0,
                width: scrolled ? "80%" : "100%",
                maxWidth: scrolled ? "1200px" : "100%",
                borderRadius: scrolled ? "99px" : "0px",
                backgroundColor: scrolled ? "rgba(0,0,0,0.6)" : "transparent",
                border: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
                top: scrolled ? 20 : 0
            }}
            transition={{ duration: 0.5, type: "spring", damping: 20 }}
            className={`fixed left-1/2 -translate-x-1/2 z-50 backdrop-blur-md transition-all duration-500 will-change-[width,transform,background] glass-nav`}
        >
            <div className="flex items-center justify-between px-6 md:px-8 py-3 w-full h-full">
                {/* Logo Area (Interactive - No Navigation) */}
                <div className="flex items-center gap-4 relative z-50">
                    {/* The Logo triggers the HUD overlay */}
                    <div className="cursor-pointer group" onClick={() => window.dispatchEvent(new CustomEvent('toggle-nexus'))}>
                        <Logo showText={!scrolled} className={scrolled ? "scale-90 origin-left" : ""} />
                    </div>

                    {/* AI STATUS INDICATOR (Click to cycle state) */}
                    <button
                        onClick={cycleAIState}
                        className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all cursor-pointer group"
                    >
                        <span className={`w-2 h-2 rounded-full transition-colors duration-500 ${aiState === "IDLE" ? "bg-emerald-500" :
                            aiState === "THINKING" ? "bg-amber-500 animate-pulse" :
                                aiState === "STREAMING" ? "bg-cyan-500 animate-ping" :
                                    "bg-purple-500"
                            }`} />
                        <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest group-hover:text-white transition-colors">
                            SYSTEM: {aiState}
                        </span>
                    </button>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8 bg-white/5 px-6 py-2 rounded-full border border-white/5 backdrop-blur-lg shadow-inner">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gold-500 transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                </div>

                {/* Right Actions */}
                <div className="hidden md:flex items-center gap-4">
                    {user ? (
                        <>
                            <Link href="/dashboard">
                                <Button size="sm" variant="ghost" className="h-9 text-xs font-mono uppercase tracking-widest hover:bg-white/10 rounded-full">Dashboard</Button>
                            </Link>
                            <button onClick={handleLogout} className="text-xs text-gray-500 hover:text-red-400 transition-colors uppercase tracking-widest">Sign Out</button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="text-xs font-bold text-gray-400 hover:text-white uppercase tracking-widest transition-colors">Log In</Link>
                            <Link href="/register">
                                <Button size="sm" className="bg-white text-black hover:bg-gold-400 hover:scale-105 transition-all duration-300 rounded-full px-6 font-bold text-xs uppercase tracking-widest shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                                    Join
                                </Button>
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white p-2 hover:bg-white/10 rounded-full transition-colors"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10 overflow-hidden rounded-b-3xl absolute w-full left-0 top-full"
                    >
                        <div className="flex flex-col p-6 gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-lg font-medium text-gray-300 hover:text-gold-400 py-2 border-b border-white/5"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="flex gap-4 mt-4">
                                <Link href="/login" className="flex-1">
                                    <Button fullWidth variant="outline" className="border-white/20">Log In</Button>
                                </Link>
                                <Link href="/register" className="flex-1">
                                    <Button fullWidth className="bg-gold-500 text-black border-none">Join</Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
