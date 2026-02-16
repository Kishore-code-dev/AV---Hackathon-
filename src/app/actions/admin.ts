"use server";
import { prisma } from '@/lib/prisma';

export async function getAdminData() {
    try {
        const [totalUsers, totalTeams, totalProjects] = await Promise.all([
            prisma.user.count(),
            prisma.team.count(),
            prisma.project.count()
        ]);

        const recentSubmissions = await prisma.project.findMany({
            take: 10,
            orderBy: { createdAt: 'desc' },
            include: {
                team: {
                    include: {
                        members: true
                    }
                },
                aiReviews: true
            }
        });

        // Calculate "Platform Health" based on activity (mocked slightly for demo if empty)
        const platformHealth = Math.min(100, (totalProjects * 10) + (totalUsers * 2));

        return {
            stats: {
                users: totalUsers,
                teams: totalTeams,
                projects: totalProjects,
                health: platformHealth
            },
            submissions: recentSubmissions
        };
    } catch (error) {
        console.error("Admin Data Error:", error);
        return null;
    }
}
