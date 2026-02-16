import { prisma } from "@/lib/prisma"; // Assuming prisma client is exported from here or I'll create it
import { Hackathon } from "@prisma/client";

export const hackathonService = {
    // === Public Access ===

    async getActiveHackathons() {
        return await prisma.hackathon.findMany({
            where: {
                status: { in: ["ACTIVE", "UPCOMING", "JUDGING"] }
            },
            orderBy: { startDate: "asc" },
            include: {
                _count: {
                    select: { teams: true, projects: true }
                }
            }
        });
    },

    async getHackathonBySlug(slug: string) {
        return await prisma.hackathon.findUnique({
            where: { slug },
            include: {
                rubric: {
                    include: { items: true }
                }
            }
        });
    },

    // === Admin Management ===

    async createHackathon(data: {
        name: string;
        slug: string;
        description?: string;
        startDate: Date;
        endDate: Date;
        maxTeamSize?: number;
    }) {
        return await prisma.hackathon.create({
            data: {
                ...data,
                status: "UPCOMING"
            }
        });
    },

    async updateStatus(id: string, status: string) {
        return await prisma.hackathon.update({
            where: { id },
            data: { status }
        });
    }
};
