import Groq from "groq-sdk";

// Initialize Groq Client
// In a real env, use process.env.GROQ_API_KEY
// We use a dummy key here or expect the user to set it
export const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY || "gsk_dummy_key_for_build_purposes",
    dangerouslyAllowBrowser: true // ONLY for hackathon prototypes, avoid in prod
});

export async function runAgentInference(systemPrompt: string, userContent: string) {
    try {
        if (!process.env.GROQ_API_KEY) {
            console.warn("Using simulated inference: No GROQ_API_KEY found.");
            return null; // Signals the caller to use simulation
        }

        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userContent }
            ],
            model: "llama3-70b-8192",
            temperature: 0.7,
        });

        return completion.choices[0]?.message?.content || "";
    } catch (e) {
        console.error("Groq Inference Failed:", e);
        return null; // Fallback to simulation
    }
}
