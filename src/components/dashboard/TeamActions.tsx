"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { Users, UserPlus, X, Command, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function TeamActions() {
    const router = useRouter();
    const [mode, setMode] = useState<'none' | 'create' | 'join'>('none');
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const endpoint = mode === 'create' ? '/api/team/create' : '/api/team/join';
        const body = mode === 'create' ? { name: inputValue } : { joinCode: inputValue };

        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error);

            router.refresh();
            setMode('none');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (mode === 'none') {
        return (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8 glass-card border border-white/5 rounded-xl bg-gradient-to-b from-white/5 to-transparent"
            >
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                    <Users className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-white font-bold mb-1">Operative Status: SOLO</h3>
                <p className="text-xs text-gray-500 mb-6 max-w-[200px] mx-auto">
                    Formation of a squad increases survival probability by 84%.
                </p>
                <div className="grid grid-cols-2 gap-3 px-4">
                    <Button
                        size="sm"
                        onClick={() => setMode('create')}
                        className="bg-white text-black hover:bg-gold-400 hover:text-black transition-all font-bold"
                    >
                        <Shield size={14} className="mr-2" />
                        Initialize Unit
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setMode('join')}
                        className="border-white/20 hover:bg-white/10"
                    >
                        <UserPlus size={14} className="mr-2" />
                        Join Unit
                    </Button>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-4 glass border border-gold-500/20 rounded-xl p-6 bg-black/40 relative overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />

            <div className="flex justify-between items-center mb-6">
                <h4 className="font-bold text-lg text-white flex items-center gap-2">
                    {mode === 'create' ? <Shield className="text-gold-500" size={18} /> : <UserPlus className="text-blue-400" size={18} />}
                    {mode === 'create' ? 'Initialize New Unit' : 'Authentication Protocol'}
                </h4>
                <button onClick={() => setMode('none')} className="text-gray-500 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full">
                    <X size={18} />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                        {mode === 'create' ? 'Unit Designation (Name)' : 'Access Code (Token)'}
                    </label>
                    <div className="relative group">
                        <input
                            type="text"
                            required
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500 transition-colors font-mono tracking-wide placeholder:text-gray-700"
                            placeholder={mode === 'create' ? "e.g. OMEGA_SQUADRON" : "e.g. X7-99-AZ"}
                            autoFocus
                        />
                        <div className="absolute inset-0 border border-gold-500/20 rounded-lg pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity" />
                    </div>
                </div>

                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 p-2 rounded flex items-center gap-2"
                        >
                            <span className="w-1 h-1 bg-red-500 rounded-full animate-ping" />
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>

                <Button
                    fullWidth
                    size="lg"
                    disabled={loading}
                    className={`font-bold tracking-widest text-xs uppercase ${mode === 'create' ? 'bg-gold-500 hover:bg-gold-400 text-black' : 'bg-white hover:bg-gray-200 text-black'}`}
                >
                    {loading ? (
                        <span className="flex items-center gap-2">
                            <Command className="animate-spin" size={14} /> PROCESSING...
                        </span>
                    ) : (
                        mode === 'create' ? 'CONFIRM DEPLOYMENT' : 'SUBMIT CREDENTIALS'
                    )}
                </Button>
            </form>
        </motion.div>
    );
}
