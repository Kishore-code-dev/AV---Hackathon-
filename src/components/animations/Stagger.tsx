"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface StaggerContainerProps {
    children?: React.ReactNode;
    staggerChildren?: number;
    delayChildren?: number;
    className?: string;
}

export function StaggerContainer({
    children,
    staggerChildren = 0.1,
    delayChildren = 0,
    className
}: StaggerContainerProps) {
    return (
        <motion.div
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: staggerChildren,
                        delayChildren: delayChildren,
                    },
                },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

interface StaggerItemProps {
    children: React.ReactNode;
    className?: string;
    yOffset?: number;
}

export function StaggerItem({ children, className, yOffset = 20 }: StaggerItemProps) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: yOffset, filter: "blur(4px)" },
                visible: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: {
                        type: "spring",
                        bounce: 0,
                        duration: 0.8,
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
