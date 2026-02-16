"use client";
import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, useCursor, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

/**
 * MINECRAFT ACCURATE COPPER GOLEM
 * Supports multiple roles:
 * - 'scout': Trigger/Searcher (Deep Searcher)
 * - 'analyst': Processor/Logic (N8N Logic)
 * - 'scribe': Output/Writer (Legal Drafter)
 */

// Colors
const C_COPPER = "#E77C56";
const C_SHADOW = "#A6573D";
const C_OXIDIZED = "#4C9A83";
const C_ROD = "#E9956D";

const Block = ({ args, color, materialType = 'metal', ...props }: any) => {
    // Advanced AAA Materials
    const isCopper = color === C_COPPER || color === C_SHADOW || color === C_ROD;
    const isOxidized = color === C_OXIDIZED;
    // Emissive logic: eyes (white/black), rod (C_ROD), or specific colors
    const isEmissive = color === "#22D3EE" || color === "white";

    return (
        <mesh {...props}>
            <boxGeometry args={args} />
            {isEmissive ? (
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={4} // High intensity for Bloom
                    toneMapped={false}
                />
            ) : (
                <meshPhysicalMaterial
                    color={color}
                    roughness={isOxidized ? 0.8 : 0.2}
                    metalness={isOxidized ? 0.2 : 0.9} // Shiny copper
                    clearcoat={isCopper ? 1 : 0}
                    clearcoatRoughness={0.1}
                    reflectivity={1}
                    envMapIntensity={2}
                />
            )}
        </mesh>
    );
};

const PixelNose = () => (
    <Block args={[0.1, 0.15, 0.1]} color={C_SHADOW} position={[0, -0.1, 0.25]} />
);

interface GolemProps {
    scale?: number;
    role?: 'scout' | 'analyst' | 'scribe';
    [key: string]: any;
}

export function MinecraftCopperGolem({ scale = 1, role = 'analyst', ...props }: GolemProps) {
    const group = useRef<THREE.Group>(null);
    const headRef = useRef<THREE.Group>(null);
    const armLRef = useRef<THREE.Group>(null);
    const armRRef = useRef<THREE.Group>(null);
    const buttonRef = useRef<THREE.Mesh>(null);
    const laptopRef = useRef<THREE.Group>(null); // For Scribe

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        if (group.current) {
            // Base Waddle
            group.current.rotation.z = Math.sin(t * 3) * 0.03;
            group.current.position.y = Math.abs(Math.sin(t * 3)) * 0.05;
        }

        // --- ROLE BASED ANIMATIONS ---

        // 1. HEAD
        if (headRef.current) {
            if (role === 'scout') {
                // Hyper-scanning (Searcher/Trigger)
                headRef.current.rotation.y = Math.sin(t * 1.5) * 0.5;
                headRef.current.rotation.x = Math.sin(t * 2) * 0.1;
            } else if (role === 'scribe') {
                // Focused down (Writer)
                headRef.current.rotation.x = 0.2 + Math.sin(t) * 0.02;
                headRef.current.rotation.y = Math.sin(t * 0.5) * 0.1;
            } else {
                // Analyst (Standard Look)
                headRef.current.rotation.y = Math.sin(t * 0.5) * 0.3;
            }
        }

        // 2. ARMS
        if (armRRef.current && armLRef.current) {
            if (role === 'scribe') {
                // Typing Fury
                armLRef.current.rotation.x = -1.2 + Math.sin(t * 20) * 0.1;
                armRRef.current.rotation.x = -1.2 + Math.cos(t * 20) * 0.1;
            } else if (role === 'scout') {
                // Signaling / Waving
                armLRef.current.rotation.z = 2.5 + Math.sin(t * 5) * 0.5; // Hand up
                armRRef.current.rotation.x = Math.sin(t * 2) * 0.1;
            } else {
                // Analyst (Button Pressing)
                armLRef.current.rotation.x = Math.sin(t * 2) * 0.1;
                const pressSpeed = t * 15;
                const isDown = Math.sin(pressSpeed) > 0.5;
                armRRef.current.rotation.x = -1.5 + (isDown ? 0.4 : 0);

                if (buttonRef.current) {
                    buttonRef.current.position.y = isDown ? -0.02 : 0;
                }
            }
        }
    });

    return (
        <group ref={group} scale={scale} {...props}>
            {/* --- COMMON BODY PARTS --- */}
            {/* HEAD GROUP */}
            <group position={[0, 0.6, 0]} ref={headRef}>
                <Block args={[0.5, 0.4, 0.4]} color={C_COPPER} />
                <PixelNose />
                {/* Eyes */}
                <Block args={[0.08, 0.08, 0.01]} color="white" position={[-0.15, 0, 0.205]} />
                <Block args={[0.08, 0.08, 0.01]} color="white" position={[0.15, 0, 0.205]} />
                <Block args={[0.04, 0.04, 0.015]} color="black" position={[-0.15, 0, 0.205]} />
                <Block args={[0.04, 0.04, 0.015]} color="black" position={[0.15, 0, 0.205]} />
                {/* Rod */}
                <group position={[0, 0.2, 0]}>
                    <Block args={[0.1, 0.05, 0.1]} color={C_SHADOW} position={[0, 0, 0]} />
                    <Block args={[0.05, 0.2, 0.05]} color={C_ROD} position={[0, 0.1, 0]} />
                    <Block args={[0.08, 0.08, 0.08]} color={C_ROD} position={[0, 0.2, 0]} />
                </group>

                {role === 'scout' && (
                    // Scout Headset / Antenna
                    <Block args={[0.6, 0.05, 0.05]} color={C_OXIDIZED} position={[0, 0, 0]} />
                )}
            </group>

            {/* BODY */}
            <group position={[0, 0.15, 0]}>
                <Block args={[0.3, 0.35, 0.2]} color={C_COPPER} />
                <Block args={[0.05, 0.05, 0.01]} color={C_OXIDIZED} position={[0, 0.1, 0.105]} />
                <Block args={[0.05, 0.05, 0.01]} color={C_OXIDIZED} position={[0, -0.05, 0.105]} />
            </group>

            {/* ARMS */}
            <group position={[-0.15, 0.3, 0]} ref={armLRef}>
                <group position={[-0.1, -0.2, 0]}>
                    <Block args={[0.12, 0.5, 0.12]} color={C_COPPER} />
                </group>
            </group>
            <group position={[0.15, 0.3, 0]} ref={armRRef}>
                <group position={[0.1, -0.2, 0]}>
                    <Block args={[0.12, 0.5, 0.12]} color={C_COPPER} />
                </group>
            </group>

            {/* LEGS */}
            <group position={[-0.1, -0.1, 0]}>
                <Block args={[0.12, 0.3, 0.12]} color={C_SHADOW} position={[0, -0.15, 0]} />
            </group>
            <group position={[0.1, -0.1, 0]}>
                <Block args={[0.12, 0.3, 0.12]} color={C_SHADOW} position={[0, -0.15, 0]} />
            </group>

            {/* --- PROPS BASED ON ROLE --- */}

            {role === 'analyst' && (
                <group position={[0.4, 0, 0.4]}>
                    <Block ref={buttonRef} args={[0.3, 0.1, 0.3]} color={C_OXIDIZED} />
                    <Block args={[0.4, 0.05, 0.4]} color={C_SHADOW} position={[0, -0.05, 0]} />
                </group>
            )}

            {role === 'scribe' && (
                <group position={[0, 0, 0.4]} ref={laptopRef}>
                    {/* Keyboard Base */}
                    <Block args={[0.6, 0.05, 0.4]} color="#333" />
                    {/* Screen */}
                    <group position={[0, 0.25, -0.2]} rotation={[-0.2, 0, 0]}>
                        <Block args={[0.6, 0.4, 0.05]} color="#222" />
                        <Block args={[0.5, 0.3, 0.01]} color="#22D3EE" position={[0, 0, 0.03]} /> {/* Glowing Screen */}
                    </group>
                </group>
            )}

        </group>
    );
}

/**
 * 600K ANIMATION SYSTEM
 */
export function MassiveAgentCloud({ count = 2000 }) {
    // Interactive data cloud
    const mesh = useRef<THREE.InstancedMesh>(null);
    const light = useRef<THREE.PointLight>(null);

    // Generate random positions
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.01 + Math.random() / 200;
            const x = Math.random() * 100 - 50;
            const y = Math.random() * 100 - 50;
            const z = Math.random() * 100 - 50;
            temp.push({ t, factor, speed, x, y, z, mx: 0, my: 0 });
        }
        return temp;
    }, [count]);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame((state) => {
        if (!mesh.current) return;
        const currentMesh = mesh.current;

        particles.forEach((particle, i) => {
            let { t, factor, speed, x, y, z } = particle;
            t = particle.t += speed / 2;
            const a = Math.cos(t) + Math.sin(t * 1) / 10;
            const b = Math.sin(t) + Math.cos(t * 2) / 10;
            const s = Math.cos(t);

            // Swarm movement
            dummy.position.set(
                (particle.mx / 10) * a + x + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
                (particle.my / 10) * b + y + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
                (particle.my / 10) * b + z + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
            );
            dummy.scale.set(s, s, s);
            dummy.rotation.set(s * 5, s * 5, s * 5);
            dummy.updateMatrix();

            // Update instance
            currentMesh.setMatrixAt(i, dummy.matrix);
        });
        currentMesh.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]} frustumCulled={false}>
            <dodecahedronGeometry args={[0.05, 0]} />
            <meshStandardMaterial 
                color="#FFD700" 
                emissive="#FFD700"
                emissiveIntensity={2}
                transparent 
                opacity={0.8} 
                blending={THREE.AdditiveBlending} 
                toneMapped={false}
            />
        </instancedMesh>
    );
}
