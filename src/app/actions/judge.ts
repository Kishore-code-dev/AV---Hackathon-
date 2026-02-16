"use server";
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

interface JudgeInput {
    projectId: string;
    judgeId?: string;
    scores: {
        novelty: number;
        tech: number;
        impact: number;
        ux: number;
    }
    feedback?: string;
}

export async function submitJudgeScore(input: JudgeInput) {
    try {
        /*
        await prisma.judgeScore.create({
            data: {
                projectId: input.projectId,
                judgeId: input.judgeId || 'ANONYMOUS_JUDGE',
                novelty: input.scores.novelty,
                technical: input.scores.tech,
                impact: input.scores.impact,
                ux: input.scores.ux,
                feedback: input.feedback
            }
        });
        */
        console.log("Mock scoring submitted:", input);

        revalidatePath('/leaderboard');
        return { success: true };
    } catch (e) {
        console.error("Scoring Error:", e);
        return { success: false, error: "Failed to save score" };
    }
}

export async function getJudgingQueue() {
    // Get all projects that are SUBMITTED but maybe not fully judged?
    // For demo, just get all SUBMITTED projects
    const projects = await prisma.project.findMany({
        where: { status: { not: "DRAFT" } },
        include: { team: true }
    });

    return projects;
}
