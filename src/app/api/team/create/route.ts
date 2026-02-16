import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
    try {
        // Auth Check
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;
        if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const payload = verifyToken(token);
        if (!payload || typeof payload === 'string') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const userId = (payload as any).userId;

        // input validation
        const { name } = await req.json();
        if (!name || name.trim().length < 3) {
            return NextResponse.json({ error: 'Team name must be at least 3 characters' }, { status: 400 });
        }

        // Check if user already in team
        const membership = await prisma.teamMember.findFirst({ where: { userId } });
        if (membership) {
            return NextResponse.json({ error: 'You are already in a team' }, { status: 400 });
        }

        // Check availability
        const existingTeam = await prisma.team.findFirst({ where: { name } });
        if (existingTeam) {
            return NextResponse.json({ error: 'Team name already taken' }, { status: 400 });
        }

        // Create Team
        const joinCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        const team = await prisma.team.create({
            data: {
                name,
                joinCode,
                members: {
                    create: {
                        userId,
                        role: 'LEADER'
                    }
                }
            }
        });

        return NextResponse.json({ success: true, team });

    } catch (error) {
        console.error('Create team error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
