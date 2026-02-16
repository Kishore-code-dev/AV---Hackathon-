import { prisma } from "@/lib/prisma"; // Assuming prisma client is exported from here
import { Team, TeamMember, User } from "@prisma/client";
import { randomBytes } from "crypto";

export const teamService = {
    // === Creation & Joining ===

    async createTeam(name: string, userId: string, hackathonId?: string) {
        const existingTeam = await prisma.team.findFirst({ where: { name } });
        if (existingTeam) throw new Error("Team name already taken");

        const joinCode = (await import('crypto')).randomBytes(4).toString("hex").toUpperCase();

        return await prisma.team.create({
            data: {
                name,
                joinCode,
                hackathonId,
                members: {
                    create: {
                        userId,
                        role: "LEADER"
                    }
                }
            },
            include: {
                members: { include: { user: true } }
            }
        });
    },

    async joinTeam(joinCode: string, userId: string) {
        const team = await prisma.team.findUnique({
            where: { joinCode },
            include: { members: true, hackathon: true }
        });

        if (!team) throw new Error("Invalid team code");

        if (team.hackathon?.maxTeamSize && team.members.length >= team.hackathon.maxTeamSize) {
            throw new Error("Team is full");
        }

        return await prisma.team.update({
            where: { id: team.id },
            data: {
                members: {
                    create: {
                        userId,
                        role: "MEMBER"
                    }
                }
            },
            include: { members: { include: { user: true } } }
        });
    },

    // === Management ===

    async getTeamByMember(userId: string) {
        // Find the team where the user is a member
        const membership = await prisma.teamMember.findFirst({
            where: { userId },
            include: {
                team: {
                    include: {
                        members: { include: { user: true } },
                        project: true,
                        hackathon: true
                    }
                }
            }
        });

        return membership?.team || null;
    }
};
