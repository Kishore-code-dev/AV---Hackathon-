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
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.style.position = "fixed";
        canvas.style.top = "0";
        canvas.style.left = "0";
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.pointerEvents = "none";
        canvas.style.zIndex = "9999";
        document.body.appendChild(canvas);

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const particles: any[] = [];
        let mouse = { x: -100, y: -100 };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;

            // Spawn particles on move
            if (Math.random() > 0.5) {
                particles.push({
                    x: mouse.x + (Math.random() - 0.5) * 20,
                    y: mouse.y + (Math.random() - 0.5) * 20,
                    vx: (Math.random() - 0.5) * 1,
                    vy: -Math.random() * 2 - 0.5, // Float up
                    size: Math.random() * 2 + 1,
                    life: 1,
                    color: Math.random() > 0.6 ? "255, 215, 0" : "255, 255, 255"
                });
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.life -= 0.02; // Smooth fade

                if (p.life > 0) {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${p.color}, ${p.life})`;
                    ctx.fill();

                    // Glow
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = `rgba(${p.color}, ${p.life})`;
                } else {
                    particles.splice(i, 1);
                    i--;
                }
            }
            requestAnimationFrame(animate);
        };

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("resize", handleResize);
        animate();

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
            canvas.remove();
        };
    }, []);

    return null;
}
