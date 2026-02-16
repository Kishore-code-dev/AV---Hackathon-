"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import particles from "@/lib/particles";

export const SparklesCore = ({
    id,
    className,
    background,
    minSize,
    maxSize,
    particleDensity,
    particleColor,
    particleOffsetTop = 0,
    particleOffsetBottom = 0,
}: {
    id?: string;
    className?: string;
    background?: string;
    minSize?: number;
    maxSize?: number;
    particleDensity?: number;
    particleColor?: string;
    particleOffsetTop?: number;
    particleOffsetBottom?: number;
}) => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        setInit(true);
    }, []);

    return (
        <div className={className} id={id}>
            {/* Placeholder for complex canvas animations if we had tsparticles installed */}
            {/* Simulating sparkle effect with CSS for now to avoid heavy dependencies */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
                {init && Array.from({ length: particleDensity || 50 }).map((_, i) => (
                    <span
                        key={i}
                        className="absolute rounded-full animate-twinkle"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * (maxSize || 2) + (minSize || 0.5)}px`,
                            height: `${Math.random() * (maxSize || 2) + (minSize || 0.5)}px`,
                            backgroundColor: particleColor || "#FFFFFF",
                            animationDelay: `${Math.random() * 5}s`,
                            opacity: Math.random(),
                            display: 'block' // Ensure visibility
                        }}
                    />
                ))}
            </div>
        </div>
    );
};
