"use server";
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function sendAdminTransmission(projectId: string, type: 'ALERT' | 'AWARD' | 'INTERVIEW', message: string) {
    try {
        console.log(`[TRANSMISSION] To: ${projectId} | Type: ${type}`);

        // 1. Create a "System Message" (We'll use a new Communication model if possible, but for now we'll piggyback or just update Status)
        // Since we don't have a specific message model yet and migrations on windows can be tricky,
        // let's use the Project 'status' as a high-priority signal channel for this demo.

        await prisma.project.update({
            where: { id: projectId },
            data: {
                status: `SIGNAL: ${type} - ${message}`
            }
        });

        // 2. Also log it as an Activity so it persists in history
        /*
        await prisma.userActivity.create({
            data: {
                actionType: `ADMIN_${type}`,
                metadata: JSON.stringify({ message, projectId }),
                userId: 'ADMIN_SYSTEM', // Mock ID
            }
        });
        */

        revalidatePath('/overwatch');
        return { success: true };
    } catch (e) {
        console.error("Transmission Failed:", e);
        return { success: false, error: "Signal Jammed" };
    }
}
