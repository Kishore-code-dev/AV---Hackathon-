"use server";
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getLeaderboard() {
    const projects = await prisma.project.findMany({
        take: 10,
        include: {
            team: true,
            aiReviews: true,
            judgeScores: true
        }
    });

    const leaderboard = projects.map((p: any) => {
        // 1. AI Score (Average of all AI reviews)
        const aiScore = p.aiReviews.length > 0
            ? p.aiReviews.reduce((acc: number, r: any) => acc + r.score, 0) / p.aiReviews.length
            : 0;

        // 2. Human Judge Score (Total Score from JudgeScore model)
        let humanScore = 0;
        if (p.judgeScores.length > 0) {
            const total = p.judgeScores.reduce((acc: number, j: any) => acc + j.totalScore, 0);
            humanScore = total / p.judgeScores.length;
        }

        // 3. Final Weighted Score (e.g. 30% AI, 70% Human)
        const finalScore = p.judgeScores.length > 0
            ? Math.round((aiScore * 0.3) + (humanScore * 0.7))
            : Math.round(aiScore);

        return {
            id: p.id,
            teamName: p.team?.name || "Unknown Team",
            projectTitle: p.title,
            score: finalScore,
            track: p.track,
            status: p.status
        };
    }).sort((a, b) => b.score - a.score);

    return leaderboard;
}

export async function getGalleryProjects() {
    const projects = await prisma.project.findMany({
        where: { status: 'SUBMITTED' },
        include: {
            team: true,
            _count: {
                select: {
                    judgeScores: true,
                    aiReviews: true
                }
            }
        }
    });

    return projects.map((p: any, i: number) => ({
        id: p.id,
        title: p.title,
        team: p.team?.name || "Unknown Team",
        track: p.track || "General",
        likes: (p._count?.judgeScores || 0) * 12 + (Math.floor(Math.random() * 50)), // Mock 'likes' for visual
        comments: p._count?.aiReviews || 0,
        description: p.description || "No description provided.",
        githubUrl: p.githubUrl,
        demoUrl: p.demoUrl,
        rank: i + 1,
        image: `https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop&q=tech,${i}` // Modern placeholder
    }));
}
