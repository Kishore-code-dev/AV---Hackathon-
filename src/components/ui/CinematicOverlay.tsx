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
            {/* 1. MOVIE FILM GRAIN (Animated via CSS) */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay">
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

            {/* 2. CINEMATIC VIGNETTE (Focus Center) */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.6)_100%)]" />

            {/* 3. LETTERBOX BARS (Subtle 2.35:1 Aspect Ratio Hint) */}
            {/* We don't fully block the screen, just a subtle gradient hint at top/bottom */}
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/60 to-transparent" />

            {/* 4. SUBTLE RGB SPLIT (Chromatic Aberration on edges) */}
            {/* Creates that "shot on lens" look */}
            <div className="absolute inset-0 opacity-10 mix-blend-screen bg-repeat animate-pulse"
                style={{
                    backgroundImage: 'linear-gradient(90deg, rgba(255,0,0,0.1) 1px, transparent 1px), linear-gradient(rgba(0,0,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '4px 4px'
                }}
            />
        </div>
    );
}
