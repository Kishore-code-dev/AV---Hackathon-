"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Lock, Mail, Fingerprint, ShieldCheck } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { NeuralBackground } from "@/components/ui/NeuralBackground";
import { motion } from "framer-motion";

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email");
        const password = formData.get("password");

        try {
            // Simulate rigorous auth check
            await new Promise(r => setTimeout(r, 1500));

            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (res.ok) {
                router.push("/dashboard");
                router.refresh();
            } else {
                const data = await res.json();
                setError(data.error || "Access Denied: Invalid Credentials");
            }
        } catch (err) {
            setError("System Error: Handshake Failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center p-4 bg-black overflow-hidden font-mono selection:bg-gold-500 selection:text-black">
            <NeuralBackground />

            <div className="relative z-10 w-full max-w-md">
                <FadeIn>
                    <div className="relative border border-white/10 bg-black/60 backdrop-blur-xl p-8 md:p-12 overflow-hidden shadow-2xl group">

                        {/* Scanner Line */}
                        <motion.div
                            className="absolute top-0 left-0 w-full h-[2px] bg-gold-500 shadow-[0_0_20px_#d4af37]"
                            animate={{ top: ["0%", "100%", "0%"] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        />

                        <div className="text-center mb-10">
                            <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-gold-500/30 flex items-center justify-center bg-gold-500/5 relative">
                                <Fingerprint size={32} className="text-gold-500 animate-pulse" />
                                <div className="absolute inset-0 border-t border-gold-500 animate-spin opacity-30 rounded-full" />
                            </div>
                            <h1 className="text-2xl font-bold text-white uppercase tracking-widest mb-2">
                                Identity Verification
                            </h1>
                            <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em]">
                                Secure Access Point v4.2
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Agent ID (Email)</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-3.5 text-gray-600 group-focus-within:text-gold-500 transition-colors" size={16} />
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        className="w-full bg-white/5 border border-white/10 py-3 pl-12 px-4 text-white focus:outline-none focus:border-gold-500/50 focus:bg-gold-500/5 transition-all text-sm font-mono placeholder:text-gray-800"
                                        placeholder="agent@groq.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Encryption Key</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-3.5 text-gray-600 group-focus-within:text-gold-500 transition-colors" size={16} />
                                    <input
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        className="w-full bg-white/5 border border-white/10 py-3 pl-12 px-4 text-white focus:outline-none focus:border-gold-500/50 focus:bg-gold-500/5 transition-all text-sm font-mono placeholder:text-gray-800"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-3.5 text-gray-600 hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center gap-2 text-red-400 text-[10px] uppercase tracking-widest bg-red-900/10 p-3 border border-red-500/20"
                                >
                                    <ShieldCheck size={14} /> {error}
                                </motion.div>
                            )}

                            <button
                                disabled={loading}
                                className="w-full bg-white text-black font-bold py-4 hover:bg-gold-400 transition-all uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-wait"
                            >
                                {loading ? (
                                    <>Processing Biometrics <span className="animate-pulse">...</span></>
                                ) : (
                                    <>Authenticate <span className="group-hover:translate-x-1 transition-transform">&rarr;</span></>
                                )}
                            </button>

                            <div className="text-center mt-6 pt-6 border-t border-white/5">
                                <Link href="/register" className="text-[10px] text-gray-600 hover:text-white transition-colors uppercase tracking-widest">
                                    No Clearance? <span className="text-gold-500 ml-2">Request Access</span>
                                </Link>
                            </div>
                        </form>
                    </div>
                </FadeIn>
            </div>
        </div>
    );
}
