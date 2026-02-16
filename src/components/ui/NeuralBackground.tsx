"use client";
import React from 'react';
import { motion } from 'framer-motion';

export function NeuralBackground() {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* 1. Deep Space Base */}
            <div className="absolute inset-0 bg-[#020617]" />

            {/* 2. Grid Overlay */}
            <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45v-30L30 0z' fill-rule='evenodd' stroke='%23d4af37' fill='none'/%3E%3C/svg%3E")`,
                backgroundSize: '30px 30px'
            }} />

            {/* 3. Scanning Radar Line */}
            <motion.div
                className="absolute inset-x-0 h-[300px] bg-gradient-to-b from-transparent via-gold-500/5 to-transparent z-0"
                animate={{ top: ["-20%", "120%"] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />

            {/* 4. Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />

            {/* 5. Floating Data Particles */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute text-[8px] text-gold-500/20 font-mono select-none"
                    initial={{
                        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                        y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                        opacity: 0
                    }}
                    animate={{
                        y: [null, Math.random() * -100],
                        opacity: [0, 1, 0]
                    }}
                    transition={{ duration: Math.random() * 10 + 10, repeat: Infinity }}
                >
                    {Math.random().toString(16).slice(2, 8).toUpperCase()}
                </motion.div>
            ))}
        </div>
    );
}
