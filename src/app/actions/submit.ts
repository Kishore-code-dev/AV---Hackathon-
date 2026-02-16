"use server";
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

export async function submitProject(formData: { title: string; description: string; track: string; repoUrl?: string; demoUrl?: string }) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth-token')?.value;

        if (!token) return { success: false, error: "Unauthorized: No session token found." };

        const payload = verifyToken(token);
        const userId = typeof payload === 'object' && payload !== null && 'userId' in payload
            ? (payload as any).userId
            : null;

        if (!userId) return { success: false, error: "Invalid Token: Session expired." };

        // Check for existing team membership
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                memberships: {
                    include: { team: true }
                }
            }
        });

        if (!user) return { success: false, error: "User not found." };

        let teamId = user.memberships[0]?.teamId;

        // Auto-create team if not exists (Solo Mode)
        if (!teamId) {
            const newTeam = await prisma.team.create({
                data: {
                    name: `${user.name || 'Agent'}'s Squad`,
                    joinCode: Math.random().toString(36).substring(7).toUpperCase(),
                    members: {
                        create: {
                            userId: user.id,
                            role: 'LEADER'
                        }
                    }
                }
            });
            teamId = newTeam.id;
        }

        // Determine Action: Create or Update Project
        const existingProject = await prisma.project.findUnique({
            where: { teamId: teamId }
        });

        if (existingProject) {
            await prisma.project.update({
                where: { id: existingProject.id },
                data: {
                    title: formData.title,
                    description: formData.description,
                    track: formData.track,
                    githubUrl: formData.repoUrl,
                    demoUrl: formData.demoUrl,
                    status: 'SUBMITTED',
                    updatedAt: new Date()
                } as any
            });
        } else {
            await prisma.project.create({
                data: {
                    teamId: teamId,
                    title: formData.title,
                    description: formData.description,
                    track: formData.track,
                    githubUrl: formData.repoUrl, // Now mapped correctly
                    demoUrl: formData.demoUrl,
                    status: 'SUBMITTED'
                } as any
            });
        }

        return { success: true };

    } catch (e) {
        console.error("Submit Project Error:", e);
        return { success: false, error: "Database Error: " + (e as Error).message };
    }
}
