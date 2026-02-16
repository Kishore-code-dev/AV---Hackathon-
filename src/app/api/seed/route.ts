import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';

export async function GET() {
    try {
        // Idempotent Seed
        const hackathon = await prisma.hackathon.upsert({
            where: { slug: 'agentic-pioneer-2026' },
            update: {},
            create: {
                name: 'Analytics Vidhya Agentic AI Pioneer Program',
                slug: 'agentic-pioneer-2026',
                description: 'The ultimate Agentic AI hackathon. Build swarms, use RAG, deploy on Groq.',
                startDate: new Date('2026-03-01'),
                endDate: new Date('2026-03-15'),
                status: 'ACTIVE',
            }
        });

        return NextResponse.json({ success: true, hackathon });
    } catch (error) {
        return NextResponse.json({ error: 'Seed failed' }, { status: 500 });
    }
}
