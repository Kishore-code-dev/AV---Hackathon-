import { PrismaClient } from '@prisma/client';
import { runAgentInference } from '../groq'; // Import real AI

const prisma = new PrismaClient();

// Cognitive Analysis - Hybrid (Real AI -> Fallback Simulation)
export async function generatePersona(userId: string, userData: any) {
    const { email, name, teamName } = userData;

    // 1. Try Real AI First
    const systemPrompt = `You are a Cognitive Persona Mapper. Analyze the user's details and output a JSON object with: { "archetype": string, "strengths": string[], "weaknesses": string[], "recommendedTrack": string }. Archetypes: "Visionary", "Architect", "Hacker", "Optimizer".`;
    const userContent = `User: ${name}, Team: ${teamName || "None"}, Email: ${email}`;

    let aiResult = null;
    const aiResponse = await runAgentInference(systemPrompt, userContent);

    if (aiResponse) {
        try {
            aiResult = JSON.parse(aiResponse);
        } catch (e) { console.error("Failed to parse AI response"); }
    }

    // 2. Fallback Logic (Simulation) if AI fails or no key
    // Analyze "Typing Patterns" (Simulated via name/email entropy for demo)
    const entropy = (str: string) => new Set(str.split('')).size;
    const complexityScore = entropy(email) + entropy(name || '');

    let archetype = aiResult?.archetype || "Code Sprinter";
    let strengths = aiResult?.strengths || ["Rapid Prototyping", "Frontend Velocity"];
    let weaknesses = aiResult?.weaknesses || ["System Architecture", "Security"];
    let track = aiResult?.recommendedTrack || "Customer Service Automation";

    // Cognitive Classification Logic (Fallback Overrides if simulation needed)
    if (!aiResult) {
        if (complexityScore > 25) {
            archetype = "System Architect";
            strengths = ["Scalability", "Backend Logic", "Data Structures"];
            weaknesses = ["UI/UX Polish", "Marketing"];
            track = "Financial Analysis";
        } else if (teamName && teamName.toLowerCase().includes("ai")) {
            archetype = "Neural Engineer";
            strengths = ["Model Fine-tuning", "Python", "RAG Pipelines"];
            weaknesses = ["Frontend State", "Design Systems"];
            track = "Healthcare & Diagnostics";
        }
    }

    // 3. Save to Database (Upsert)
    try {
        await prisma.persona.upsert({
            where: { userId },
            update: {
                archetype,
                skills: JSON.stringify(strengths)
            },
            create: {
                userId,
                archetype,
                skills: JSON.stringify(strengths)
            }
        });
    } catch (e) {
        console.error("Failed to save persona:", e);
    }

    return { archetype, strengths, track };
}
