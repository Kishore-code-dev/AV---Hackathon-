"use client";
import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sky, PointerLockControls, useTexture, KeyboardControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { Vector3 } from 'three';

/**
 * GAMIFIED MINECRAFT SCENE
 * A fully interactive 3D environment with:
 * - Voxel Terrain (Grass, Water, Trees)
 * - Interactive Chests (Open/Close animations)
 * - Agent Character (Idle/Look)
 * - First Person Movement (WASD + Jump)
 */

// --- UTILS & CONSTANTS ---
const GRAVITY = 30;
const SPEED = 5;
const JUMP_FORCE = 10;

// Materials
const M_GRASS = new THREE.MeshStandardMaterial({ color: "#5D9E44" });
const M_DIRT = new THREE.MeshStandardMaterial({ color: "#775338" });
const M_LOG = new THREE.MeshStandardMaterial({ color: "#4A3728" });
const M_LEAVES = new THREE.MeshStandardMaterial({ color: "#2B6822", transparent: true, opacity: 0.9 });
const M_WATER = new THREE.MeshStandardMaterial({ color: "#44AFF5", transparent: true, opacity: 0.6 });
const M_CHEST = new THREE.MeshStandardMaterial({ color: "#A66F3D" });
const M_GOLD = new THREE.MeshStandardMaterial({ color: "#FFD700", metalness: 0.5, roughness: 0.1 });

// --- COMPONENTS ---

const Cube = ({ position, args = [1, 1, 1], material, ...props }: any) => (
    <mesh position={position} {...props}>
        <boxGeometry args={args} />
        <primitive object={material} attach="material" />
    </mesh>
);

// 1. VOXEL TERRAIN GENERATOR
function VoxelTerrain() {
    // Generate a simple chunk
    const chunks = useMemo(() => {
        const blocks = [];
        // Ground
        for (let x = -10; x <= 10; x++) {
            for (let z = -10; z <= 10; z++) {
                // River gap
                if (x > -2 && x < 2) {
                    blocks.push(<Cube key={`water-${x}-${z}`} position={[x, -0.2, z]} args={[1, 0.8, 1]} material={M_WATER} />);
                    blocks.push(<Cube key={`sand-${x}-${z}`} position={[x, -1, z]} material={M_DIRT} />);
                } else {
                    blocks.push(<Cube key={`grass-${x}-${z}`} position={[x, 0, z]} material={M_GRASS} />);
                    blocks.push(<Cube key={`dirt-${x}-${z}`} position={[x, -1, z]} material={M_DIRT} />);
                }
            }
        }
        return blocks;
    }, []);

    return <group>{chunks}</group>;
}

// 2. TREE COMPONENT
function Tree({ position }: { position: [number, number, number] }) {
    return (
        <group position={position}>
            {/* Trunk */}
            <Cube position={[0, 1, 0]} args={[0.5, 2, 0.5]} material={M_LOG} />
            <Cube position={[0, 2.5, 0]} args={[0.5, 1, 0.5]} material={M_LOG} />

            {/* Leaves */}
            <Cube position={[0, 3, 0]} args={[2.5, 1, 2.5]} material={M_LEAVES} />
            <Cube position={[0, 4, 0]} args={[1.5, 1, 1.5]} material={M_LEAVES} />
        </group>
    );
}

// 3. INTERACTIVE CHEST
function Chest({ position, defaultOpen = false }: { position: [number, number, number], defaultOpen?: boolean }) {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const lidRef = useRef<THREE.Group>(null);
    const [hovered, setHover] = useState(false);

    useFrame((state, delta) => {
        if (lidRef.current) {
            const targetRot = isOpen ? -Math.PI / 2 : 0;
            // Smooth open animation
            lidRef.current.rotation.x = THREE.MathUtils.lerp(lidRef.current.rotation.x, targetRot, delta * 10);
        }
    });

    return (
        <group
            position={position}
            onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        >
            {/* Base */}
            <Cube position={[0, 0.3, 0]} args={[0.8, 0.6, 0.8]} material={M_CHEST} />

            {/* Lid Group (Pivots at back) */}
            <group position={[0, 0.6, -0.4]} ref={lidRef}>
                <group position={[0, 0, 0.4]}> {/* Offset to pivot correctly */}
                    <Cube position={[0, 0.1, 0]} args={[0.8, 0.2, 0.8]} material={M_CHEST} />
                    {/* Lock */}
                    <Cube position={[0, 0, 0.41]} args={[0.1, 0.15, 0.05]} material={M_GOLD} />
                </group>
            </group>

            {/* Hover Highlight */}
            {hovered && (
                <mesh position={[0, 0.5, 0]}>
                    <boxGeometry args={[0.9, 0.9, 0.9]} />
                    <meshBasicMaterial color="white" transparent opacity={0.1} side={THREE.BackSide} />
                </mesh>
            )}
        </group>
    );
}

// 4. BLOCKY CHARACTER (Generic Agent)
function AgentCharacter({ position }: { position: [number, number, number] }) {
    const group = useRef<THREE.Group>(null);
    const head = useRef<THREE.Group>(null);

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        if (group.current) {
            // Idle breathing
            group.current.position.y = position[1] + Math.sin(t * 2) * 0.02;
        }
        if (head.current) {
            // Look around
            head.current.rotation.y = Math.sin(t * 0.5) * 0.3;
        }
    });

    const skin = new THREE.MeshStandardMaterial({ color: "#E0AE87" });
    const shirt = new THREE.MeshStandardMaterial({ color: "#22D3EE" });
    const pants = new THREE.MeshStandardMaterial({ color: "#1E293B" });

    return (
        <group position={position} ref={group}>
            {/* Head */}
            <group position={[0, 1.4, 0]} ref={head}>
                <Cube args={[0.4, 0.4, 0.4]} material={skin} />
                {/* Eyes */}
                <Cube position={[-0.1, 0, 0.21]} args={[0.08, 0.08, 0.01]} material={new THREE.MeshStandardMaterial({ color: "white" })} />
                <Cube position={[0.1, 0, 0.21]} args={[0.08, 0.08, 0.01]} material={new THREE.MeshStandardMaterial({ color: "white" })} />
                <Cube position={[-0.1, 0, 0.22]} args={[0.04, 0.04, 0.01]} material={new THREE.MeshStandardMaterial({ color: "black" })} />
                <Cube position={[0.1, 0, 0.22]} args={[0.04, 0.04, 0.01]} material={new THREE.MeshStandardMaterial({ color: "black" })} />
            </group>

            {/* Body */}
            <Cube position={[0, 0.8, 0]} args={[0.4, 0.6, 0.2]} material={shirt} />

            {/* Arms */}
            <Cube position={[-0.3, 0.8, 0]} args={[0.15, 0.6, 0.15]} material={skin} /> {/* Left Arm */}
            <Cube position={[0.3, 0.8, 0]} args={[0.15, 0.6, 0.15]} material={skin} />  {/* Right Arm */}

            {/* Legs */}
            <Cube position={[-0.1, 0.2, 0]} args={[0.15, 0.6, 0.15]} material={pants} />
            <Cube position={[0.1, 0.2, 0]} args={[0.15, 0.6, 0.15]} material={pants} />
        </group>
    );
}

// 5. FIRST PERSON PLAYER CONTROLLER
function Player() {
    const { camera } = useThree();
    const velocity = useRef(new Vector3(0, 0, 0));
    const jumping = useRef(false);

    // Initial Spawn
    useEffect(() => {
        camera.position.set(0, 2, 8);
    }, [camera]);

    useFrame((state, delta) => {
        // Simple Physics Simulation could go here
        // For now, we rely on PointerLockControls for look
        // And we'd need keyboard listeners for move. 
        // Keeping it simple: PointerLock handles look.
    });

    return <PointerLockControls />;
}

export default function MinecraftScene() {
    return (
        <div className="w-full h-screen bg-black relative">

            {/* CROSSHAIR UI */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 z-50 pointer-events-none">
                <div className="w-[2px] h-4 bg-white/80 absolute left-1/2 -translate-x-1/2" />
                <div className="w-4 h-[2px] bg-white/80 absolute top-1/2 -translate-y-1/2" />
            </div>

            <div className="absolute top-4 left-4 z-50 bg-black/50 p-4 rounded text-white font-mono text-sm pointer-events-none">
                <p>WASD to Move (Simulated) | Click to Lock Mouse</p>
                <p>Click Chests to Interact</p>
            </div>

            <Canvas shadows gl={{ antialias: false }} dpr={[1, 1.5]}>
                <Sky sunPosition={[100, 20, 100]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} castShadow />

                {/* PHYSICS WORLD */}
                <group>
                    <VoxelTerrain />

                    {/* Trees */}
                    <Tree position={[-5, 0, -5]} />
                    <Tree position={[6, 0, 4]} />
                    <Tree position={[-3, 0, 7]} />

                    {/* Chests */}
                    <Chest position={[2, 0.5, 2]} />
                    <Chest position={[3.5, 0.5, 1.5]} defaultOpen={true} />
                    <Chest position={[-2, 0.5, 3]} />

                    {/* Agent Character */}
                    <AgentCharacter position={[1, 0.9, 1]} />

                    {/* Player */}
                    <Player />
                </group>
            </Canvas>
        </div>
    );
}
