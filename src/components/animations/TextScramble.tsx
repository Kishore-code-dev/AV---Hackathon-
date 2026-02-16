"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

interface TextScrambleProps {
    text: string;
    duration?: number;
    delay?: number;
    className?: string;
    scrambleChars?: string;
}

export const TextScramble = ({
    text,
    duration = 800,
    delay = 0,
    className,
    scrambleChars = "!<>-_\\/[]{}—=+*^?#________"
}: TextScrambleProps) => {
    const [displayText, setDisplayText] = useState(text);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;

        let startTime = Date.now();
        let frameId: number;
        let timeoutId: NodeJS.Timeout;

        const animate = () => {
            const now = Date.now();
            const elapsed = now - (startTime + delay);

            if (elapsed < 0) {
                frameId = requestAnimationFrame(animate);
                return;
            }

            const progress = Math.min(1, elapsed / duration);

            let nextText = "";
            for (let i = 0; i < text.length; i++) {
                if (i < Math.floor(text.length * progress)) {
                    nextText += text[i];
                } else {
                    nextText += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
                }
            }

            setDisplayText(nextText);

            if (progress < 1) {
                frameId = requestAnimationFrame(animate);
            }
        };

        timeoutId = setTimeout(() => {
            startTime = Date.now();
            frameId = requestAnimationFrame(animate);
        }, delay);

        return () => {
            cancelAnimationFrame(frameId);
            clearTimeout(timeoutId);
        };
    }, [isInView, text, duration, delay, scrambleChars]);

    return <span ref={ref} className={className}>{displayText}</span>;
};
