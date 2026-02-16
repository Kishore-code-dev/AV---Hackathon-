import { runAgentInference } from '../groq';

export type DebateTurn = {
    speaker: "Skeptic" | "Visionary" | "Architect";
    content: string;
    sentiment: "positive" | "negative" | "neutral";
};

// Simulated Debate Logic (Fallback)
const SIMULATED_DEBATES = [
    { speaker: "Visionary", content: "This idea fundamentally shifts the paradigm of user interaction. The novelty score is off the charts.", sentiment: "positive" },
    { speaker: "Skeptic", content: "Novelty is useless without utility. The implementation details are vague. How does it handle edge cases?", sentiment: "negative" },
    { speaker: "Architect", content: "The scalability is concerning. Relying on a single model endpoint introduces a massive bottleneck.", sentiment: "negative" },
    { speaker: "Visionary", content: "But think of the potential! If they solve the latency issue, this is a unicorn product.", sentiment: "positive" },
    { speaker: "Skeptic", content: "Big 'if'. I need to see concrete performance benchmarks before I'm convinced.", sentiment: "neutral" },
    { speaker: "Architect", content: "Agreed. They should implement a caching layer and use edge functions. Then it might work.", sentiment: "neutral" }
] as DebateTurn[];

export async function generateDebate(projectDescription: string): Promise<DebateTurn[]> {
    // 1. Try Real AI First
    const systemPrompt = `You are a Multi-Agent Debate System. Simulate a conversation between 3 AI judges:
    - Visionary: Optimistic, focuses on big picture and potential.
    - Skeptic: Critical, focuses on flaws and missing details.
    - Architect: Technical, focuses on scalability and implementation.
    
    Output a JSON array of objects with format: { "speaker": "Visionary"|"Skeptic"|"Architect", "content": string, "sentiment": "positive"|"negative"|"neutral" }.
    Generate 4-6 turns of debate about the following project.`;

    const aiResponse = await runAgentInference(systemPrompt, `Project: ${projectDescription}`);

    if (aiResponse) {
        try {
            return JSON.parse(aiResponse);
        } catch (e) {
            console.error("Failed to parse debate JSON", e);
        }
    }

    // 2. Fallback Simulation
    return SIMULATED_DEBATES;
}
