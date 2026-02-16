"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Lock, Mail, User, ShieldPlus, AlertTriangle } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { NeuralBackground } from "@/components/ui/NeuralBackground";
import { motion } from "framer-motion";

export default function RegisterPage() {
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
        const name = formData.get("name");

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, name }),
            });

            if (res.ok) {
                router.push("/dashboard");
                router.refresh();
            } else {
                const data = await res.json();
                setError(data.error || "Registration Failed: Neural Link Rejected");
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
                            className="absolute top-0 left-0 w-full h-[2px] bg-emerald-500 shadow-[0_0_20px_#10b981]"
                            animate={{ top: ["0%", "100%", "0%"] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        />

                        <div className="text-center mb-10">
                            <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-emerald-500/30 flex items-center justify-center bg-emerald-500/5 relative">
                                <ShieldPlus size={32} className="text-emerald-500 animate-pulse" />
                                <div className="absolute inset-0 border-t border-emerald-500 animate-spin opacity-30 rounded-full" />
                            </div>
                            <h1 className="text-2xl font-bold text-white uppercase tracking-widest mb-2">
                                Initialize Agent ID
                            </h1>
                            <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em]">
                                Join the Pioneer Program Network
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Codename</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-3.5 text-gray-600 group-focus-within:text-emerald-500 transition-colors" size={16} />
                                    <input
                                        name="name"
                                        required
                                        className="w-full bg-white/5 border border-white/10 py-3 pl-12 px-4 text-white focus:outline-none focus:border-emerald-500/50 focus:bg-emerald-500/5 transition-all text-sm font-mono placeholder:text-gray-800"
                                        placeholder="e.g. NEO"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Signal (Email)</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-3.5 text-gray-600 group-focus-within:text-emerald-500 transition-colors" size={16} />
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        className="w-full bg-white/5 border border-white/10 py-3 pl-12 px-4 text-white focus:outline-none focus:border-emerald-500/50 focus:bg-emerald-500/5 transition-all text-sm font-mono placeholder:text-gray-800"
                                        placeholder="builder@groq.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">Passkey</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-3.5 text-gray-600 group-focus-within:text-emerald-500 transition-colors" size={16} />
                                    <input
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        className="w-full bg-white/5 border border-white/10 py-3 pl-12 px-4 text-white focus:outline-none focus:border-emerald-500/50 focus:bg-emerald-500/5 transition-all text-sm font-mono placeholder:text-gray-800"
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
                                    <AlertTriangle size={14} /> {error}
                                </motion.div>
                            )}

                            <button
                                disabled={loading}
                                className="w-full bg-white text-black font-bold py-4 hover:bg-emerald-400 transition-all uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-2 group disabled:opacity-50"
                            >
                                {loading ? "Encrypting Data..." : "Establish Neural Link"}
                            </button>

                            <div className="text-center mt-6 pt-6 border-t border-white/5">
                                <Link href="/login" className="text-[10px] text-gray-600 hover:text-white transition-colors uppercase tracking-widest">
                                    Have Clearance? <span className="text-emerald-500 ml-2">Access Portal</span>
                                </Link>
                            </div>
                        </form>
                    </div>
                </FadeIn>
            </div>
        </div>
    );
}
