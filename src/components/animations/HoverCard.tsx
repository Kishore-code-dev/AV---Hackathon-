"use client";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { cn } from "@/lib/utils";

interface HoverCardProps {
    children?: React.ReactNode;
    className?: string;
    glowColor?: "gold";
}

export function HoverCard({
    children,
    className,
}: HoverCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spring physics for smooth light movement
    const smoothX = useSpring(mouseX, { stiffness: 300, damping: 30 });
    const smoothY = useSpring(mouseY, { stiffness: 300, damping: 30 });

    const handleMouseMove = ({ clientX, clientY }: React.MouseEvent) => {
        if (!ref.current) return;
        const { left, top } = ref.current.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    // 3D Tilt Effect
    const rotateX = useTransform(mouseY, [0, 500], [5, -5]);
    const rotateY = useTransform(mouseX, [0, 500], [-5, 5]);

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => {
                mouseX.set(0);
                mouseY.set(0);
            }}
            style={{
                perspective: 1000,
            }}
            className={cn(
                "relative h-full",
                className
            )}
        >
            <motion.div
                style={{
                    rotateX: rotateX,
                    rotateY: rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="relative h-full overflow-hidden rounded-xl border border-white/5 bg-black/40 backdrop-blur-3xl group transition-all duration-200"
            >
                {/* 1. The Obsidian Shine (Moving Gloss) */}
                <motion.div
                    className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                        background: useMotionTemplate`
                            radial-gradient(
                                600px circle at ${smoothX}px ${smoothY}px,
                                rgba(255, 215, 0, 0.15),
                                transparent 60%
                            )
                        `,
                        zIndex: 1,
                    }}
                />

                {/* 2. Gold Border Trace (Revealed on Hover) */}
                <motion.div
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
                    style={{
                        background: useMotionTemplate`
                            radial-gradient(
                                300px circle at ${smoothX}px ${smoothY}px,
                                rgba(255, 215, 0, 0.6),
                                transparent 100%
                            )
                        `,
                        maskImage: "linear-gradient(black, black) padding-box, linear-gradient(black, black)",
                        maskComposite: "exclude",
                        WebkitMaskComposite: "xor",
                        padding: "1px",
                        zIndex: 2,
                    }}
                />

                {/* 3. Content Layer with 3D Pop */}
                <div className="relative z-10 h-full transform-gpu transition-transform duration-200 group-hover:translate-z-12">
                    {children}
                </div>
            </motion.div>
        </motion.div>
    );
}
