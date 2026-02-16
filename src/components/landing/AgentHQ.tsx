"use client";
import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, OrbitControls, Html, useCursor, Sparkles, Stars, Text } from '@react-three/drei';
import { MinecraftCopperGolem, MassiveAgentCloud } from "@/components/three/CopperGolem";
import { motion, AnimatePresence } from "framer-motion";
import { IconX, IconServer, IconCpu } from '@tabler/icons-react';
import { EffectComposer, Bloom, ChromaticAberration, Noise, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

/**
 * THE MASSIVE AGENT WORKSPACE
 * A busy, bustling high-tech office/server room with many agents.
 */

// --- SUB-COMPONENTS ---

function ServerRack({ position }: { position: [number, number, number] }) {
    return (
        <group position={position}>
            {/* Rack Body */}
            <mesh position={[0, 2, 0]}>
                <boxGeometry args={[1, 4, 1]} />
                <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Blinking Lights */}
            {Array.from({ length: 8 }).map((_, i) => (
                <mesh key={i} position={[0, 0.5 + i * 0.4, 0.51]}>
                    <planeGeometry args={[0.8, 0.1]} />
                    <meshStandardMaterial
                        color={Math.random() > 0.5 ? "#22D3EE" : "#00ff00"}
                        emissive={Math.random() > 0.5 ? "#22D3EE" : "#00ff00"}
                        emissiveIntensity={2}
                    />
                </mesh>
            ))}
        </group>
    );
}

function HolographicFloor() {
    return (
        <gridHelper args={[60, 60, '#22D3EE', '#111']} position={[0, 0.01, 0]} />
    );
}

function AgentStation({ position, rotation, role, id }: any) {
    const [hovered, setHover] = useState(false);

    // Random offset for animations so they don't sync
    const randomDelay = useMemo(() => Math.random() * 10, []);

    return (
        <group position={position} rotation={rotation}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}>

            {/* Desk / Console */}
            <group position={[0, 0, 0.6]}>
                <mesh position={[0, 0.5, 0]}>
                    <boxGeometry args={[1.4, 0.1, 0.6]} />
                    <meshStandardMaterial color="#222" metalness={0.6} roughness={0.4} />
                </mesh>
                <mesh position={[0, 0.55, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[1.3, 0.5]} />
                    <meshBasicMaterial color="#000" />
                </mesh>
                {/* Holographic Keyboard */}
                <mesh position={[0, 0.56, 0.1]} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[0.8, 0.3]} />
                    <meshBasicMaterial color="#22D3EE" transparent opacity={0.3} side={2} />
                </mesh>
            </group>

            {/* The Agent */}
            <group position={[0, 0, 0]}>
                <MinecraftCopperGolem scale={0.7} role={role} />
            </group>

            {/* Floating Holographic Screens */}
            <group position={[0, 1.2, 0.8]}>
                <Float speed={2} rotationIntensity={0.05} floatIntensity={0.05}>
                    <mesh rotation={[-0.1, 0, 0]}>
                        <planeGeometry args={[1.2, 0.7]} />
                        <meshBasicMaterial color="#22D3EE" transparent opacity={0.1} side={2} />
                    </mesh>
                    <mesh position={[0, 0, 0.01]} rotation={[-0.1, 0, 0]}>
                        <planeGeometry args={[1.1, 0.6]} />
                        <meshBasicMaterial color="#22D3EE" wireframe transparent opacity={0.1} />
                    </mesh>
                    {/* Data Lines */}
                    <mesh position={[0, 0.1, 0.02]} rotation={[-0.1, 0, 0]}>
                        <planeGeometry args={[1.0, 0.02]} />
                        <meshBasicMaterial color="#22D3EE" />
                    </mesh>
                    <mesh position={[0, -0.1, 0.02]} rotation={[-0.1, 0, 0]}>
                        <planeGeometry args={[0.8, 0.02]} />
                        <meshBasicMaterial color="#22D3EE" />
                    </mesh>
                </Float>
            </group>

            {/* Status Indicator */}
            <mesh position={[0, 2, 0]}>
                <sphereGeometry args={[0.05]} />
                <meshBasicMaterial color="#00ff00" />
            </mesh>

            {/* ID Tag */}
            {hovered && (
                <Html position={[0, 2.5, 0]} center>
                    <div className="bg-black/90 border border-cyan-500/50 p-2 rounded text-[10px] text-cyan-400 font-mono whitespace-nowrap z-50">
                        AGENT_{id}<br />
                        STATUS: PROCESSING
                    </div>
                </Html>
            )}
        </group>
    );
}


// --- MAIN SCENE ---

export function AgentHQ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {

    // Generate Rows of Agents
    const agents = useMemo(() => {
        const rows = 4;
        const cols = 5;
        const temp = [];
        let idCount = 0;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const x = (c - cols / 2) * 2.5; // Spread horizontally
                const z = r * 3; // Spread depth
                const role = Math.random() > 0.7 ? 'scribe' : (Math.random() > 0.5 ? 'analyst' : 'scout');

                temp.push(
                    <AgentStation
                        key={`${r}-${c}`}
                        position={[x, 0, z]}
                        rotation={[0, 0, 0]}
                        role={role}
                        id={idCount++}
                    />
                );
            }
        }
        return temp;
    }, []);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-black"
                >
                    {/* UI OVERLAY */}
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 flex flex-col justify-between p-8">
                        {/* Header */}
                        <div className="flex justify-between items-start pointer-events-auto">
                            <div>
                                <h1 className="text-4xl font-bold text-white tracking-widest flex items-center gap-3">
                                    <IconServer size={32} className="text-cyan-400" />
                                    NEXUS CORE
                                </h1>
                                <p className="text-cyan-500/70 font-mono mt-1">
                                    /// REAL-TIME AGENT WORKSPACE /// ACTIVE NODES: 24
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors border border-white/10"
                            >
                                <IconX />
                            </button>
                        </div>

                        {/* Footer Stats */}
                        <div className="grid grid-cols-3 gap-8 text-xs font-mono text-gray-400 border-t border-white/10 pt-4">
                            <div>
                                <span className="text-gold-500">SYSTEM STATUS:</span> OPTIMAL<br />
                                <span className="text-gold-500">TOTAL OPS:</span> 642,912/s
                            </div>
                            <div className="text-center">
                                <span className="text-cyan-400 animate-pulse">● LIVE CONNECTION</span>
                            </div>
                            <div className="text-right">
                                GROQ LPU™ PROVISIONED<br />
                                LATENCY: 12ms
                            </div>
                        </div>
                    </div>

                    {/* 3D SCENE */}
                    <Canvas shadows camera={{ position: [0, 8, 12], fov: 50 }}>
                        <color attach="background" args={['#020205']} />
                        <fog attach="fog" args={['#020205', 5, 30]} />

                        <ambientLight intensity={0.1} />

                        {/* Cinematic Lighting Rig */}
                        <group position={[0, 10, 0]}>
                            <spotLight
                                position={[-10, 0, 5]}
                                angle={0.4}
                                penumbra={1}
                                intensity={2}
                                color="#22D3EE"
                                castShadow
                                shadow-bias={-0.0001}
                            />
                            <spotLight
                                position={[10, 0, 5]}
                                angle={0.4}
                                penumbra={1}
                                intensity={2}
                                color="#FFD700"
                                castShadow
                                shadow-bias={-0.0001}
                            />
                            <pointLight position={[0, -2, 0]} intensity={1} color="#00ffff" distance={10} decay={2} />
                        </group>

                        <group position={[0, -2, 0]}>
                            {/* Detailed Floor with Reflections */}
                            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                                <planeGeometry args={[100, 100]} />
                                <meshStandardMaterial
                                    color="#020205"
                                    roughness={0.1}
                                    metalness={0.8}
                                    envMapIntensity={1}
                                />
                            </mesh>
                            <HolographicFloor />

                            {/* The Agent Grid */}
                            <group position={[0, 0, -5]}>
                                {agents}
                            </group>

                            {/* Server Racks in Background */}
                            <group position={[-8, 0, -10]} rotation={[0, 0.5, 0]}><ServerRack position={[0, 0, 0]} /></group>
                            <group position={[-10, 0, -8]} rotation={[0, 0.5, 0]}><ServerRack position={[0, 0, 0]} /></group>
                            <group position={[8, 0, -10]} rotation={[0, -0.5, 0]}><ServerRack position={[0, 0, 0]} /></group>
                            <group position={[10, 0, -8]} rotation={[0, -0.5, 0]}><ServerRack position={[0, 0, 0]} /></group>

                            {/* MASSIVE Data Cloud (Overhead) */}
                            <group position={[0, 5, 0]}>
                                <MassiveAgentCloud count={1000} />
                            </group>

                            {/* Floating Particles Everywhere */}
                            <Sparkles count={500} scale={20} size={3} speed={0.4} opacity={0.6} color="#22D3EE" />
                            <Sparkles count={300} scale={15} size={5} speed={0.2} opacity={0.4} color="#FFD700" />

                        </group>

                        <Environment preset="city" background={false} />

                        {/* POST PROCESSING STACK (AAA LOOK) */}
                        <EffectComposer enableNormalPass={false}>
                            <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} radius={0.4} />
                            <ChromaticAberration offset={[0.002, 0.002]} />
                            <Noise opacity={0.05} />
                            <Vignette eskil={false} offset={0.1} darkness={1.1} />
                        </EffectComposer>

                        <OrbitControls
                            autoRotate
                            autoRotateSpeed={0.5}
                            minPolarAngle={Math.PI / 4}
                            maxPolarAngle={Math.PI / 2 - 0.1}
                            minDistance={5}
                            maxDistance={25}
                            enableDamping
                            dampingFactor={0.5}
                        />
                    </Canvas>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
