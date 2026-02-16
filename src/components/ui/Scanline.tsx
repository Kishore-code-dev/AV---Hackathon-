"use client";
import React from 'react';

/**
 * SCANLINE - RETRO-FUTURISM
 * A subtle, moving beam of light that scans the interface.
 * Adds a "live monitor" fee.
 */
export function Scanline() {
    return (
        <div className="fixed inset-0 pointer-events-none z-[50] overflow-hidden">
            {/* The Beam */}
            <div className="w-full h-[5px] bg-[#FFD700] opacity-[0.05] blur-[3px] absolute top-[-10px] animate-scanline" />

            <style jsx global>{`
                @keyframes scanline {
                    0% { top: -10%; opacity: 0; }
                    10% { opacity: 0.1; }
                    50% { opacity: 0.05; }
                    90% { opacity: 0.1; }
                    100% { top: 120%; opacity: 0; }
                }
                .animate-scanline {
                    animation: scanline 8s cubic-bezier(0.5, 0, 0.5, 1) infinite;
                    box-shadow: 0 0 10px rgba(255, 215, 0, 0.2);
                }
            `}</style>
        </div>
    );
}
