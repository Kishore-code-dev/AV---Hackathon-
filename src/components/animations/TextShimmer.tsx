"use client";
import React, { FC } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextShimmerProps {
    children: string;
    className?: string;
    duration?: number;
}

export const TextShimmer: FC<TextShimmerProps> = ({
    children,
    className,
    duration = 2,
}) => {
    return (
        <motion.span
            className={cn(
                "bg-clip-text text-transparent bg-[linear-gradient(110deg,#D4AF37,45%,#FFF,55%,#D4AF37)] bg-[length:250%_100%]",
                className
            )}
            animate={{
                backgroundPosition: ["0% 0%", "-200% 0%"],
            }}
            transition={{
                repeat: Infinity,
                duration: duration,
                ease: "linear",
            }}
        >
            {children}
        </motion.span>
    );
};
