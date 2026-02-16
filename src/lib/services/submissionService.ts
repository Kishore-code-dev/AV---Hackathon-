import { prisma } from "@/lib/prisma";
import { Project } from "@prisma/client";

export const submissionService = {
    // === Project Management ===

    async getProjectByTeam(teamId: string) {
        return await prisma.project.findUnique({
            where: { teamId },
            include: {
                aiReviews: true,
                judgeScores: true,
                hackathon: true
            }
        });
    },

    async createOrUpdateProject(userId: string, teamId: string, data: {
        title: string;
        description?: string;
        githubUrl?: string;
        demoUrl?: string;
        documentation?: string;
        hackathonId?: string; // Optional if team already linked, but explicit is better
    }) {
        // 1. Validate User is in Team (and maybe Leader)
        const membership = await prisma.teamMember.findFirst({
            where: { teamId, userId }
        });

        if (!membership) throw new Error("User not in team");

        // 2. Check if project exists
        const existing = await prisma.project.findUnique({
            where: { teamId }
        });

        let project;

        if (existing) {
            project = await prisma.project.update({
                where: { id: existing.id },
                data: {
                    title: data.title,
                    description: data.description,
                    githubUrl: data.githubUrl,
                    demoUrl: data.demoUrl,
                    documentation: data.documentation,
                    updatedAt: new Date()
                    // Do not update hackathonId usually
                }
            });
        } else {
            if (!data.hackathonId) {
                // Try to get from team
                const team = await prisma.team.findUnique({ where: { id: teamId } });
                if (!team?.hackathonId) throw new Error("Hackathon context missing");
                data.hackathonId = team.hackathonId;
            }

            project = await prisma.project.create({
                data: {
                    teamId,
                    hackathonId: data.hackathonId,
                    title: data.title,
                    description: data.description,
                    githubUrl: data.githubUrl,
                    demoUrl: data.demoUrl,
                    documentation: data.documentation,
                    status: "DRAFT"
                }
            });
        }

        // 3. Trigger Async Evaluation Pipelne (Stub)
        // await runAutoEvaluation(project.id);

        return project;
    },

    async submitProject(projectId: string) {
        return await prisma.project.update({
            where: { id: projectId },
            data: { status: "SUBMITTED" }
        });
    }
};
