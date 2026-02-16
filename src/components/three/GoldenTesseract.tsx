"use client";
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Stars, Sparkles, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

/**
 * THE GOLDEN NEURAL MESH - AGENTIC CORE V3
 * A transparent, high-tech neural network visualization.
 * It represents the complexity and interconnectivity of AI Agents.
 */

function NeuralCore() {
    const meshRef = useRef<THREE.Group>(null);
    const outerRingRef = useRef<THREE.Mesh>(null);
    const innerRingRef = useRef<THREE.Mesh>(null);

    // Generate points for the neural sphere
    const particleCount = 400;

    // Memoize the geometry attributes completely
    const geometryAttributes = useMemo(() => {
        const pos = new Float32Array(particleCount * 3);
        const cols = new Float32Array(particleCount * 3);
        const color1 = new THREE.Color("#FFD700"); // Gold
        const color2 = new THREE.Color("#22D3EE"); // Cyan

        for (let i = 0; i < particleCount; i++) {
            // Fibonacci Sphere Distribution
            const phi = Math.acos(1 - 2 * (i + 0.5) / particleCount);
            const theta = Math.PI * (1 + 5 ** 0.5) * (i + 0.5);

            const r = 2.5; // Radius
            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);

            pos[i * 3] = x;
            pos[i * 3 + 1] = y;
            pos[i * 3 + 2] = z;

            const mixedColor = i % 2 === 0 ? color1 : color2;
            cols[i * 3] = mixedColor.r;
            cols[i * 3 + 1] = mixedColor.g;
            cols[i * 3 + 2] = mixedColor.b;
        }

        return (
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particleCount}
                    array={pos}
                    itemSize={3}
                    args={[pos, 3]}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={particleCount}
                    array={cols}
                    itemSize={3}
                    args={[cols, 3]}
                />
            </bufferGeometry>
        );
    }, []);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.getElapsedTime();

        // Slow, majestic rotation of the core
        meshRef.current.rotation.y = time * 0.05;
        meshRef.current.rotation.z = time * 0.02;

        // Rings rotate faster and counter-wise
        if (outerRingRef.current) {
            outerRingRef.current.rotation.x = Math.sin(time * 0.2) * 0.5;
            outerRingRef.current.rotation.y = time * 0.1;
        }
        if (innerRingRef.current) {
            innerRingRef.current.rotation.x = Math.PI / 2 + Math.cos(time * 0.3) * 0.5;
            innerRingRef.current.rotation.z = time * 0.2;
        }
    });

    return (
        <group scale={[0.8, 0.8, 0.8]}>
            {/* 1. NEURAL NODES (Points) */}
            <group ref={meshRef}>
                <points>
                    {geometryAttributes}
                    <pointsMaterial
                        size={0.08}
                        vertexColors
                        transparent
                        opacity={0.8}
                        sizeAttenuation
                        depthWrite={false}
                    />
                </points>

                {/* 2. WIREFRAME MESH (The Structure) */}
                <mesh>
                    <icosahedronGeometry args={[2.5, 2]} />
                    <meshBasicMaterial
                        color="#FFD700"
                        wireframe
                        transparent
                        opacity={0.05} // Very subtle
                    />
                </mesh>
            </group>

            {/* 3. ORBITAL DATA RINGS (Thin & Sharp) */}
            <mesh ref={outerRingRef}>
                <torusGeometry args={[4, 0.02, 16, 100]} />
                <meshBasicMaterial color="#FFD700" transparent opacity={0.3} />
            </mesh>

            <mesh ref={innerRingRef}>
                <torusGeometry args={[3.2, 0.02, 16, 100]} />
                <meshBasicMaterial color="#22D3EE" transparent opacity={0.4} />
            </mesh>
        </group>
    );
}

export function GoldenTesseract() {
    return (
        <div className="absolute inset-0 z-0 opacity-100 pointer-events-none transition-opacity duration-1000">
            <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
                <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />

                <ambientLight intensity={0.5} />

                <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                    <NeuralCore />
                </Float>

                {/* Stars in background for depth */}
                <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={0.5} />

                {/* Subtle fog for depth blending */}
                <fog attach="fog" args={['#000000', 5, 20]} />
            </Canvas>
        </div>
    );
}
