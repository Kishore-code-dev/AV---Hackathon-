"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface FadeInProps {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
    direction?: "up" | "down" | "left" | "right" | "none";
    fullWidth?: boolean;
    className?: string;
    viewportAmount?: number;
}

export function FadeIn({
    children,
    delay = 0,
    duration = 0.5,
    direction = "up",
    fullWidth = false,
    className,
    viewportAmount = 0.3
}: FadeInProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: viewportAmount });

    const variants: Variants = {
        hidden: {
            opacity: 0,
            y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
            x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
            filter: "blur(10px)",
            scale: 0.95
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            filter: "blur(0px)",
            scale: 1,
            transition: {
                duration,
                delay,
                ease: "easeInOut"
            }
        }
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants}
            className={cn(fullWidth ? "w-full" : "w-auto", className)}
        >
            {children}
        </motion.div>
    );
}
