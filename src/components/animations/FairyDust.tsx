"use client";
import React, { useEffect } from "react";
import Image from "next/image";

/**
 * CHARMING LIGHT PARTICLES (Fairy Dust)
 * - Little glowing orbs that float up around the cursor/screen
 * - Adds a magical, charming feel
 */
export function FairyDust() {
    useEffect(() => {
        const createParticle = (x: number, y: number) => {
            const particle = document.createElement("div");
            particle.className = "fairy-particle";

            // Randomize starting position slightly
            const ranX = x + (Math.random() - 0.5) * 50;
            const ranY = y + (Math.random() - 0.5) * 50;

            particle.style.left = `${ranX}px`;
            particle.style.top = `${ranY}px`;

            // Randomize size and color
            const size = Math.random() * 6 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.backgroundColor = Math.random() > 0.5 ? "#FFD700" : "#ffffff"; // Gold or White

            document.body.appendChild(particle);

            // Animate
            const animation = particle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${Math.random() * 100 - 50}px, -${Math.random() * 150 + 50}px) scale(0)`, opacity: 0 }
            ], {
                duration: Math.random() * 1500 + 1000,
                easing: 'cubic-bezier(0, .9, .57, 1)',
            });

            animation.onfinish = () => particle.remove();
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (Math.random() > 0.8) { // Only enable sometimes to avoid clutter
                createParticle(e.clientX, e.clientY);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <style jsx global>{`
            .fairy-particle {
                position: fixed;
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                box-shadow: 0 0 10px 2px rgba(255, 215, 0, 0.5);
                mix-blend-mode: screen;
            }
        `}</style>
    );
}
