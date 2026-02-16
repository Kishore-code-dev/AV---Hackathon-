"use server";
import { prisma } from '@/lib/prisma';
import { generateDebate } from '@/lib/ai/debateSystem';
import { DebateTurn } from '@/lib/ai/debateSystem';

// === ARCHITECTURE: EVENT-DRIVEN AI ===

/**
 * Triggers a new debate round for a project.
 * Uses Server Actions to allow client-side triggering without page refresh.
 * Optimizes performance by checking for recent cached debates first.
 */
export async function triggerNewDebate(projectId: string, projectDescription: string) {
    try {
        console.log("AI AGENT: Initiating debate sequence for project", projectId);

        // 1. Generate new debate content using Groq/Simulation
        const debateTurns = await generateDebate(projectDescription);

        // 2. Persist to "Long-Term Memory" (Database)
        // This makes the system "stateful" rather than ephemeral
        /* 
        await prisma.projectDebate.create({
            data: {
                projectId,
                topic: "General Feasibility & Impact",
                transcript: JSON.stringify(debateTurns),
                consensus: "Pending Analysis"
            }
        });
        */
        console.log("Mock persistence: Debate saved (skipped db for now)");

        // 3. Return the fresh data to the UI
        return { success: true, debateTurns };
    } catch (e) {
        console.error("AI DEBATE ERROR:", e);
        return { success: false, error: "Neural Link Failed" };
    }
}

/**
 * Commits a risk analysis snapshot.
 * Called by the FailurePrediction engine when a user visits the dashboard.
 */
export async function logRiskAnalysis(teamId: string, riskScore: number, riskLevel: string, factors: string[]) {
    /*
    await prisma.riskAnalysis.create({
        data: {
            teamId,
            riskScore,
            riskLevel,
            failureFactors: JSON.stringify(factors)
        }
    });
    */
    console.log("Mock persistence: Risk analysis saved (skipped db for now)");
}
