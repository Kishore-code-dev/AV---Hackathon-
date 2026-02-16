"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function Particle() {
    const [mounted, setMounted] = useState(false);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [duration, setDuration] = useState(5);
    const [text, setText] = useState("");

    useEffect(() => {
        setMounted(true);
        if (typeof window !== "undefined") {
            setX(Math.random() * window.innerWidth);
            setY(Math.random() * window.innerHeight);
            setDuration(Math.random() * 5 + 5);
            setText(Math.random().toString(16).slice(2, 10).toUpperCase());
        }
    }, []);

    if (!mounted) return null;

    return (
        <motion.div
            className="absolute text-[8px] text-gold-500/30 font-mono"
            initial={{ x, y, opacity: 0 }}
            animate={{
                y: [y, y - 200],
                opacity: [0, 1, 0]
            }}
            transition={{ duration, repeat: Infinity }}
        >
            {text}
        </motion.div>
    );
}
