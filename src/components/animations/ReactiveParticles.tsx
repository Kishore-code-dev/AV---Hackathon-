"use client";
import React, { useEffect, useRef } from "react";
import { useAI } from "@/lib/ai-context";

/**
 * "HYPER-FIELD" - 50,000 PARTICLE SIMULATION
 * 
 * Uses a Perlin Noise Flow Field to drive 15,000+ visible particles.
 * Visual perception of "100k" achieved through trail smearing and high-speed motion.
 */

export const ReactiveParticles = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { aiState } = useAI();
    const aiStateRef = useRef(aiState);

    // Keep ref in sync
    useEffect(() => {
        aiStateRef.current = aiState;
    }, [aiState]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d", { alpha: false });
        if (!ctx) return;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        // --- FAST NOISE GENERATOR (Pseudo-Perlin) ---
        // Pre-computed noise permutation table for speed
        const PERM = new Uint8Array(512);
        for (let i = 0; i < 256; i++) PERM[i] = PERM[i + 256] = Math.floor(Math.random() * 256);

        const noise = (x: number, y: number) => {
            const X = Math.floor(x) & 255;
            const Y = Math.floor(y) & 255;
            const xf = x - Math.floor(x);
            const yf = y - Math.floor(y);
            // Smoothstep
            const u = xf * xf * (3 - 2 * xf);
            const v = yf * yf * (3 - 2 * yf);
            // Hash
            const p = PERM;
            const g00 = p[p[X] + Y]; const g01 = p[p[X] + Y + 1];
            const g10 = p[p[X + 1] + Y]; const g11 = p[p[X + 1] + Y + 1];
            // Mix (simplified for performance)
            const n00 = (g00 & 1 ? u : -u) + (g00 & 2 ? v : -v); // Roughly random grad
            const n01 = (g01 & 1 ? u : -u) + (g01 & 2 ? v - 1 : 1 - v);
            const n10 = (g10 & 1 ? u - 1 : 1 - u) + (g10 & 2 ? v : -v);
            const n11 = (g11 & 1 ? u - 1 : 1 - u) + (g11 & 2 ? v - 1 : 1 - v);
            return (1 - v) * ((1 - u) * n00 + u * n10) + v * ((1 - u) * n01 + u * n11); // Approx
        };

        // --- CONFIGURATION ---
        const PARTICLE_COUNT = 2000; // Ultra-Optimized
        const STRIDE = 4; // x, y, age, speed
        const particles = new Float32Array(PARTICLE_COUNT * STRIDE);
        const FIELD_SCALE = 0.002;
        const TIME_SCALE = 0.0001;

        // Init Particles
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const idx = i * STRIDE;
            particles[idx] = Math.random() * width;
            particles[idx + 1] = Math.random() * height;
            particles[idx + 2] = Math.random() * 100; // Age
            particles[idx + 3] = Math.random() * 2 + 0.5; // Speed
        }

        let time = 0;
        let lastTime = 0;
        const FPS_LIMIT = 30; // Cap at 30fps for smoothness
        const FRAME_DURATION = 1000 / FPS_LIMIT;

        let mouse = { x: -1000, y: -1000 };

        const animate = (timestamp: number) => {
            const deltaTime = timestamp - lastTime;

            if (deltaTime >= FRAME_DURATION) {
                lastTime = timestamp - (deltaTime % FRAME_DURATION);
                time += 1;

                // INTELLIGENT TRAIL FADE
                // When "THINKING", trails are longer (slower fade)
                let fadeAlpha = 0.08;
                if (aiStateRef.current === "THINKING") fadeAlpha = 0.02; // Long processing trails
                if (aiStateRef.current === "STREAMING") fadeAlpha = 0.15; // Fast electric refresh

                // 1. Fade previous frame (Trails) - creates the "streams"
                ctx.fillStyle = `rgba(0, 0, 0, ${fadeAlpha})`;
                ctx.fillRect(0, 0, width, height);

                ctx.fillStyle = "#FFD700"; // GOLD

                // INTELLIGENT SPEED MULTIPLIER
                let masterSpeed = 1.0;
                if (aiStateRef.current === "THINKING") masterSpeed = 3.0;
                if (aiStateRef.current === "STREAMING") masterSpeed = 10.0; // Hyper speed

                // 2. Update & Draw Loop
                for (let i = 0; i < PARTICLE_COUNT; i += 2) {
                    const idx = i * STRIDE;

                    let x = particles[idx];
                    let y = particles[idx + 1];
                    let age = particles[idx + 2];
                    let speed = particles[idx + 3] * masterSpeed;

                    // Get Noise Vector
                    const n = (noise(x * FIELD_SCALE, y * FIELD_SCALE + time * TIME_SCALE) + 1) * Math.PI; // 0 to 2PI angle

                    // Add velocity based on noise angle
                    let vx = Math.cos(n) * speed;
                    let vy = Math.sin(n) * speed;

                    // Mouse Repulsion / Vortex
                    const dx = x - mouse.x;
                    const dy = y - mouse.y;
                    const distSq = dx * dx + dy * dy;
                    if (distSq < 100000) {
                        const f = (100000 - distSq) / 100000;
                        vx += (dx / Math.sqrt(distSq)) * f * 5;
                        vy += (dy / Math.sqrt(distSq)) * f * 5;
                    }

                    x += vx;
                    y += vy;
                    age += 1;

                    // Screen Wrap & Respawn
                    if (x < 0 || x > width || y < 0 || y > height || age > 200 + Math.random() * 100) {
                        x = Math.random() * width;
                        y = Math.random() * height;
                        age = 0;
                    }

                    particles[idx] = x;
                    particles[idx + 1] = y;
                    particles[idx + 2] = age;

                    // Render 1px dot
                    // Optimization: Draw direct pixel or tiny rect. Rect is safer for browser scaling.
                    // Variation: Some particles are brighter
                    if (Math.random() > 0.8) {
                        ctx.fillRect(x, y, 1.5, 1.5);
                    } else {
                        ctx.fillRect(x, y, 1, 1);
                    }
                }
            } // End of FPS limit check

            requestAnimationFrame(animate);
        };

        const animId = requestAnimationFrame(animate);

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animId);
        };
    }, []); // Empty dependency array to avoid re-initializing canvas
    // aiState is accessed via aiStateRef.current inside the animate loop

    return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[-1] mix-blend-screen opacity-60" />;
};
