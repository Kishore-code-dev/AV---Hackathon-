import { prisma } from "@/lib/prisma"; // Assuming prisma client is exported from here
import { Project, JudgeScore, ScoreItem } from "@prisma/client";

export const judgingService = {
    // === Judge Dashboard === 

    async getAssignedProjects(judgeId: string) {
        return await prisma.judgeAssignment.findMany({
            where: {
                judgeId,
                status: "PENDING"
            },
            include: {
                project: {
                    select: {
                        id: true,
                        title: true,
                        demoUrl: true,
                        githubUrl: true,
                        documentation: true
                    }
                },
                // We could also include hackathon rubrics via project -> hackathon -> rubric
            }
        });
    },

    // === Scoring Logic ===

    async submitScore(judgeId: string, projectId: string, scores: Array<{ rubricItemId: string, score: number }>, feedback: string) {
        // 1. Validate if Judge is assigned
        const assignment = await prisma.judgeAssignment.findUnique({
            where: {
                judgeId_projectId: { judgeId, projectId }
            }
        });

        if (!assignment) {
            throw new Error("Judge not assigned to this project");
        }

        // 2. Create Score Record
        const scoreRecord = await prisma.judgeScore.create({
            data: {
                judgeId,
                projectId,
                feedback,
                isLocked: true,
                items: {
                    createMany: {
                        data: scores.map(s => ({
                            rubricItemId: s.rubricItemId,
                            score: s.score
                        }))
                    }
                }
            },
            include: {
                items: true
            }
        });

        // 3. Mark Assignment Complete
        await prisma.judgeAssignment.update({
            where: { id: assignment.id },
            data: {
                status: "COMPLETED",
                completedAt: new Date()
            }
        });

        // 4. Trigger Recalculation (or fire event)
        await this.calculateProjectTotal(projectId);

        return scoreRecord;
    },

    // === Aggregation ===

    async calculateProjectTotal(projectId: string) {
        // This could be complex per architecture (outlier removal, etc.)
        // Simplified version: Average of total scores
        const allScores = await prisma.judgeScore.findMany({
            where: { projectId },
            include: { items: true }
        });

        // ... logic to update a cached 'score' field on project or leaderboard table
        // For now, we just log
        console.log(`Recalculating score for project ${projectId} based on ${allScores.length} inputs.`);
    }
};
