import { runAgentInference } from '../groq';

export type GrowthRoadmap = {
    startupPotential: number; // 0-100
    fundingLikelihood: "Seed" | "Series A" | "Bootstrap" | "Research Grant";
    executionPlan: string[]; // 30-day plan steps
};

export async function generateGrowthRoadmap(projectDescription: string): Promise<GrowthRoadmap> {
    const systemPrompt = `You are a VC Post-Victory Intelligence Narrator. Analyze this hackathon project for startup potential.
    Output JSON: { "startupPotential": number, "fundingLikelihood": string, "executionPlan": string[] }.
    Plan should be a 4-step 30-day micro-execution strategy.`;

    const aiResponse = await runAgentInference(systemPrompt, `Project: ${projectDescription}`);

    if (aiResponse) {
        try {
            return JSON.parse(aiResponse);
        } catch (e) { console.error("Failed to parse roadmap"); }
    }

    // Fallback Simulation
    return {
        startupPotential: 78,
        fundingLikelihood: "Seed",
        executionPlan: [
            "Week 1: Deploy MVP to Vercel and gather 50 beta user emails.",
            "Week 2: Refine the 'Vision Agent' latency using Groq optimization.",
            "Week 3: Prepare YC application video focusing on the unique multi-modal approach.",
            "Week 4: Launch on Product Hunt."
        ]
    };
}
