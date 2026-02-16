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
        const { joinCode } = await req.json();
        if (!joinCode) {
            return NextResponse.json({ error: 'Join code is required' }, { status: 400 });
        }

        // Check if user already in team
        const membership = await prisma.teamMember.findFirst({ where: { userId } });
        if (membership) {
            return NextResponse.json({ error: 'You are already in a team' }, { status: 400 });
        }

        // Find team
        const team = await prisma.team.findUnique({ where: { joinCode: joinCode.toUpperCase() } });
        if (!team) {
            return NextResponse.json({ error: 'Invalid join code' }, { status: 404 });
        }

        // Join Team
        await prisma.teamMember.create({
            data: {
                teamId: team.id,
                userId: userId,
                role: 'MEMBER'
            }
        });

        return NextResponse.json({ success: true, team });

    } catch (error) {
        console.error('Join team error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
