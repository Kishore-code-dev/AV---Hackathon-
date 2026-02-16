"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import React, { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Creates a "spotlight" button where a gradient follows the cursor movement.
 */
export const MagneticButton = ({ children, className = "", onClick }: any) => {
    const ref = useRef<HTMLButtonElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();

        x.set(clientX - left);
        y.set(clientY - top);
    };

    return (
        <motion.button
            ref={ref}
            className={cn(
                "relative overflow-hidden rounded-md bg-zinc-900 px-8 py-3 text-white transition-colors hover:bg-zinc-800",
                className
            )}
            onMouseMove={handleMouseMove}
            onClick={onClick}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${x}px ${y}px,
              rgba(255,255,255,0.1),
              transparent 80%
            )
          `,
                }}
            />
            <div className="relative z-10">{children}</div>
        </motion.button>
    );
};
