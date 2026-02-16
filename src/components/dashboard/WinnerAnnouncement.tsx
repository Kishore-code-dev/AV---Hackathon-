"use client";
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { IconTrophy, IconX } from '@tabler/icons-react';
import { getWinner } from '@/app/actions/winner';

export function WinnerAnnouncement() {
    const [winner, setWinner] = useState<any>(null);
    const [show, setShow] = useState(false);
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        // Poll for winner
        const checkWinner = async () => {
            const data = await getWinner();
            if (data && !sessionStorage.getItem('winnerSeen')) {
                setWinner(data);
                setShow(true);
            }
        };

        checkWinner();
        const interval = setInterval(checkWinner, 10000); // Check every 10s

        // Window size for confetti
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });

        return () => clearInterval(interval);
    }, []);

    const handleClose = () => {
        setShow(false);
        sessionStorage.setItem('winnerSeen', 'true');
    };

    return (
        <AnimatePresence>
            {show && winner && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
                    <Confetti width={windowSize.width} height={windowSize.height} />

                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        className="bg-neutral-900 border-2 border-gold-500 rounded-3xl p-12 max-w-2xl text-center relative shadow-[0_0_100px_rgba(234,179,8,0.5)]"
                    >
                        <button onClick={handleClose} className="absolute top-4 right-4 text-gray-500 hover:text-white">
                            <IconX />
                        </button>

                        <motion.div
                            initial={{ y: -20 }}
                            animate={{ y: 0 }}
                            className="w-32 h-32 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl"
                        >
                            <IconTrophy size={64} className="text-black" />
                        </motion.div>

                        <h2 className="text-gold-500 text-lg font-bold uppercase tracking-[0.3em] mb-4">Global Champion Declared</h2>
                        <h1 className="text-5xl md:text-6xl font-black text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gold-300 via-gold-500 to-amber-600">
                            {winner.title}
                        </h1>

                        <div className="inline-block px-6 py-2 bg-white/10 rounded-full text-white font-bold text-xl mb-8 border border-white/20">
                            Team: {winner.team.name}
                        </div>

                        <p className="text-gray-400 max-w-md mx-auto mb-8 leading-relaxed">
                            Congratulations on demonstrating expectational innovation using the Groq LPU Inference Engine.
                        </p>

                        <button
                            onClick={handleClose}
                            className="px-8 py-3 bg-gold-500 hover:bg-gold-400 text-black font-bold rounded-xl transition-all hover:scale-105"
                        >
                            View Full Standings
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
