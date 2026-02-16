"use client";
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Line } from '@react-three/drei';
import * as THREE from 'three';

function NeuralNetwork() {
    const pointsRef = useRef<THREE.Points>(null!);
    const linesRef = useRef<any>(null!); // For the connecting lines
    const count = 120; // Reduced count for performance with lines

    // Generate random points in a sphere
    const { positions, linePositions } = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const linePos: number[] = [];

        for (let i = 0; i < count; i++) {
            const r = 2.5 * Math.cbrt(Math.random()); // Larger radius
            const theta = Math.random() * 2 * Math.PI;
            const phi = Math.acos(2 * Math.random() - 1);

            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);

            pos[i * 3] = x;
            pos[i * 3 + 1] = y;
            pos[i * 3 + 2] = z;
        }

        // Pre-calculate some connections (static for performance)
        // In a real full simulation we'd update this every frame, but for a background static + rotation is better
        for (let i = 0; i < count; i++) {
            for (let j = i + 1; j < count; j++) {
                const dx = pos[i * 3] - pos[j * 3];
                const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
                const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                if (dist < 0.5) { // Connection threshold
                    linePos.push(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]);
                    linePos.push(pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]);
                }
            }
        }

        return {
            positions: pos,
            linePositions: new Float32Array(linePos)
        };
    }, []);

    useFrame((state, delta) => {
        if (pointsRef.current) {
            // Rotate the entire cloud
            pointsRef.current.rotation.x -= delta / 15;
            pointsRef.current.rotation.y -= delta / 20;
        }
        // Sync lines rotation with points
        if (linesRef.current) {
            linesRef.current.rotation.x = pointsRef.current.rotation.x;
            linesRef.current.rotation.y = pointsRef.current.rotation.y;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            {/* The Nodes */}
            <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#D4AF37"
                    opacity={0.8}
                    size={0.015} // Larger nodes
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>

            {/* The Connections (Synapses) */}
            <mesh ref={linesRef}>
                <primitive object={new THREE.LineSegments(
                    new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(linePositions, 3)),
                    new THREE.LineBasicMaterial({ color: "#D4AF37", transparent: true, opacity: 0.15 })
                )} />
            </mesh>
        </group>
    );
}

export function NeuralBackground() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
            <Canvas camera={{ position: [0, 0, 1.5] }}>
                <NeuralNetwork />
            </Canvas>
        </div>
    );
}
