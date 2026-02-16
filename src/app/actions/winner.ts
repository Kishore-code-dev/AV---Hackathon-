"use server";
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// Mock Config Table for Hackathon State
// Ideally, this should be in a separate `HackathonConfig` table
// For now, we'll use a hardcoded state or abuse a 'SYSTEM' user

export async function announceWinner(projectId: string) {
    try {
        console.log(`[ANNOUNCEMENT] Winner Declared: ${projectId}`);

        // 1. Mark the Project as Winner
        await prisma.project.update({
            where: { id: projectId },
            data: { status: 'WINNER' }
        });

        // 2. Broadcast Global Alert (Simulated via a System Signal)
        // We can update ALL users or use a dedicated `SystemState` table
        // For this hackathon demo, we'll rely on the client component polling for the winner status

        revalidatePath('/dashboard');
        return { success: true };
    } catch (e) {
        console.error("Winner Announcement Failed:", e);
        return { success: false, error: "Broadcast Failed" };
    }
}

export async function getWinner() {
    try {
        const winner = await prisma.project.findFirst({
            where: { status: 'WINNER' },
            include: { team: true }
        });
        return winner;
    } catch (e) {
        return null;
    }
}
