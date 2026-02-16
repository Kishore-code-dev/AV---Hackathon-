"use client";
import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * "LUX" Cursor - Black & Gold Edition
 * 
 * Flow:
 * - Idle: Minimal White/Glass Ring.
 * - Single Click: Turn ON (Deep Gold Bloom).
 * - Double Click: Turn OFF.
 */
export const Cursor = () => {
    const [isOn, setIsOn] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [clickCount, setClickCount] = useState(0);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 30, stiffness: 350, mass: 0.5 };
    const springX = useSpring(cursorX, springConfig);
    const springY = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseDown = () => {
            setClickCount(prev => prev + 1);
            if (!isOn) setIsOn(true);
        };

        const handleDoubleClick = () => {
            setIsOn(false);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === "BUTTON" ||
                target.tagName === "A" ||
                target.tagName === "INPUT" ||
                target.closest("button") ||
                target.closest("a") ||
                target.closest(".interactive") ||
                window.getComputedStyle(target).cursor === "pointer"
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("dblclick", handleDoubleClick);
        window.addEventListener("mouseover", handleMouseOver);

        document.body.style.cursor = "none";

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("dblclick", handleDoubleClick);
            window.removeEventListener("mouseover", handleMouseOver);
            document.body.style.cursor = "auto";
        };
    }, [cursorX, cursorY, isOn]);

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block mix-blend-screen"
            style={{
                x: springX,
                y: springY,
                translateX: "-50%",
                translateY: "-50%"
            }}
        >
            {/* 1. Global Ambient Light (Gold Only) */}
            <motion.div
                animate={{
                    opacity: isOn ? 0.6 : 0.3, // Increased from 0.4 : 0.05
                    scale: isOn ? 3.0 : 1.5, // Increased from 2.5 : 1
                    backgroundColor: isOn ? "rgba(255, 215, 0, 0.25)" : "rgba(255, 255, 255, 0.15)" // Increased opacity
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full blur-[80px] w-64 h-64 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 -z-30" // Increased blur
            />

            {/* 2. Floating Dust (Gold/White Only) */}
            <AnimatePresence>
                {!isOn && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 -z-10"
                    >
                        {[...Array(4)].map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    x: [0, Math.cos(i) * 20, 0],
                                    y: [0, Math.sin(i) * 20, 0],
                                    opacity: [0, 0.4, 0],
                                    scale: [0.5, 1, 0.5]
                                }}
                                transition={{
                                    duration: 4 + i * 0.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: i * 0.2
                                }}
                                className="absolute top-1/2 left-1/2 w-0.5 h-0.5 bg-gold-200 rounded-full blur-[0.5px]"
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 3. The Bulb Core (Sharp Glass) */}
            <motion.div
                animate={{
                    width: isHovering ? 40 : 16,
                    height: isHovering ? 40 : 16,
                    backgroundColor: isOn
                        ? "rgba(255, 215, 0, 0.2)" // Increased from 0.1
                        : "rgba(255, 255, 255, 0.1)", // Increased from 0.05
                    borderColor: isOn
                        ? "rgba(255, 215, 0, 0.9)" // Increased from 0.8
                        : "rgba(255, 255, 255, 0.6)", // Increased from 0.3
                    scale: isHovering ? 1.1 : 1
                }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
                className={cn(
                    "rounded-full border relative flex items-center justify-center backdrop-blur-[2px] transition-all duration-300 shadow-2xl"
                )}
            >
                {/* 4. Filament (Pure Gold vs White Ion) */}
                <motion.div
                    animate={{
                        width: isOn ? 6 : 3, // Slightly larger base
                        height: isOn ? 6 : 3,
                        backgroundColor: isOn ? "#FFD700" : "#FFFFFF",
                        boxShadow: isOn
                            ? "0 0 25px 5px rgba(255, 215, 0, 0.8), 0 0 50px 10px rgba(255, 180, 0, 0.5)" // Massive glow boost
                            : "0 0 15px 3px rgba(255, 255, 255, 0.6), 0 0 25px 5px rgba(255, 255, 255, 0.2)" // Added secondary glow
                    }}
                    className="rounded-full"
                />
            </motion.div>

            {/* 5. Click Ripple (Gold Shockwave) */}
            <AnimatePresence>
                {isOn && (
                    <motion.div
                        key={clickCount}
                        initial={{ scale: 0.5, opacity: 0.6, borderWidth: 1, borderColor: "#FFD700" }}
                        animate={{ scale: 3, opacity: 0, borderWidth: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute inset-0 rounded-full border z-[-1]"
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
};
