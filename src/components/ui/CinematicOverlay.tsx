"use client";
import React from "react";

/**
 * ADDS HOLLYWOOD-STYLE FILM TEXTURE
 * - Film Grain (SVG Noise)
 * - Vignette (Dark corners)
 * - Chromatic Aberration (Subtle edge color split)
 */
export function CinematicOverlay() {
    return (
        <div className="fixed inset-0 pointer-events-none z-[40] w-full h-full overflow-hidden">
            {/* 1. MOVIE FILM GRAIN (Subtle & Clean) */}
            <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none">
                <svg className='w-full h-full'>
                    <filter id='noiseFilter'>
                        <feTurbulence
                            type='fractalNoise'
                            baseFrequency='0.8'
                            numOctaves='3'
                            stitchTiles='stitch'
                        />
                    </filter>
                    <rect width='100%' height='100%' filter='url(#noiseFilter)' />
                </svg>
            </div>

            {/* 2. CINEMATIC VIGNETTE (Soft Focus) */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_60%,rgba(0,0,0,0.5)_100%)] mix-blend-multiply" />

            {/* 3. LETTERBOX BARS (Very Subtle) */}
            <div className="absolute top-0 left-0 right-0 h-[6vh] bg-gradient-to-b from-black to-transparent opacity-60" />
            <div className="absolute bottom-0 left-0 right-0 h-[6vh] bg-gradient-to-t from-black to-transparent opacity-60" />

            {/* 4. RGB SPLIT (Micro-detail only) */}
            <div className="absolute inset-0 opacity-[0.05] mix-blend-screen bg-repeat pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(90deg, rgba(255,0,0,0.2) 1px, transparent 1px), linear-gradient(rgba(0,0,255,0.2) 1px, transparent 1px)',
                    backgroundSize: '3px 3px'
                }}
            />
        </div>
    );
}
