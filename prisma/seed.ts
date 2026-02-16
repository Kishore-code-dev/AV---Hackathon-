
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    // 1. Create a sample Hackathon
    const hackathon = await prisma.hackathon.upsert({
        where: { slug: 'groq-ai-challenge-2025' },
        update: {},
        create: {
            name: 'Groq AI Challenge 2025',
            slug: 'groq-ai-challenge-2025',
            description: 'Build the fastest AI inference agents using Groq LPUs.',
            startDate: new Date(),
            endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
            status: 'ACTIVE',
            rubric: {
                create: {
                    items: {
                        create: [
                            { label: 'Innovation', description: 'Novelty of the idea', weight: 1.5, maxPoints: 10 },
                            { label: 'Performance', description: 'Inference speed on Groq', weight: 2.0, maxPoints: 10 },
                            { label: 'UX', description: 'Usability and design', weight: 1.0, maxPoints: 10 },
                        ]
                    }
                }
            }
        }
    })

    // 2. Create a User (Participant)
    const user = await prisma.user.upsert({
        where: { email: 'dev@example.com' },
        update: {},
        create: {
            email: 'dev@example.com',
            name: 'Jane Developer',
            password: '$2a$12$eX.ab....................', // Dummy hash
            role: 'PARTICIPANT',
            persona: {
                create: {
                    archetype: 'System Architect',
                    skills: '["Next.js", "PostgreSQL", "AI"]',
                    githubHandle: 'janedev'
                }
            }
        }
    })

    // 3. Create a Team
    const team = await prisma.team.create({
        data: {
            name: 'Velocity Vanguards',
            joinCode: 'VELO25',
            hackathonId: hackathon.id,
            members: {
                create: {
                    userId: user.id,
                    role: 'LEADER'
                }
            },
            project: {
                create: {
                    title: 'Real-Time Stock Predictor',
                    description: 'Using Groq to predict stock movements in milliseconds.',
                    githubUrl: 'https://github.com/janedev/stock-predictor',
                    demoUrl: 'https://demo.stockpredictor.com',
                    status: 'SUBMITTED',
                    hackathonId: hackathon.id
                }
            }
        }
    })

    console.log({ hackathon, user, team })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
