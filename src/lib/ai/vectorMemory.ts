import { runAgentInference } from '../groq';

// Simple Vector Type (Array of numbers)
type Embedding = number[];

// In-Memory Vector Store (Simulated for Hackathon Speed)
// In production, use Pinecone/Milvus/pgvector
const MEMORY_BANK: { projectId: string; embedding: Embedding; description: string }[] = [];

/**
 * Generates a semantic embedding for a text string.
 * Uses Groq to extract key features and maps them to a vector space.
 */
export async function generateEmbedding(text: string): Promise<Embedding> {
    // 1. Ask Groq to extract features (Simulated Embedding)
    // Real embedding models output 1536 float vectors. 
    // We simulate a 5-dimension vector for "Concept Space":
    // [TechnicalComplexity, BusinessViability, Novelty, UserFocus, Scalability]

    const prompt = `Analyze the following project description and output a JSON array of 5 numbers between 0.0 and 1.0 representing:
    1. Technical Complexity
    2. Business Viability
    3. Conceptual Novelty
    4. User Focus
    5. Scalability
    
    Description: "${text}"
    Output ONLY the JSON array. Example: [0.8, 0.4, 0.9, 0.2, 0.5]`;

    const response = await runAgentInference(prompt, "");

    try {
        if (response) {
            const vector = JSON.parse(response);
            if (Array.isArray(vector) && vector.length === 5) return vector;
        }
    } catch (e) { console.error("Vector Generation Failed", e); }

    // Fallback: Random semantic hash
    return Array.from({ length: 5 }, () => Math.random());
}

/**
 * Calculates Cosine Similarity between two vectors.
 * Returns 1.0 (Identical) to -1.0 (Opposite).
 */
function cosineSimilarity(vecA: Embedding, vecB: Embedding): number {
    const dotProduct = vecA.reduce((sum, val, i) => sum + val * vecB[i], 0);
    const magA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
    const magB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (magA * magB);
}

/**
 * Checks a new project against the memory bank to find similar ideas.
 * Updates the bank with the new project.
 */
export async function checkNovelty(projectId: string, description: string): Promise<{ noveltyScore: number; similarProjects: number }> {
    const newVector = await generateEmbedding(description);

    let maxSimilarity = 0;

    // Compare against all existing memories
    for (const memory of MEMORY_BANK) {
        if (memory.projectId === projectId) continue; // Skip self
        const sim = cosineSimilarity(newVector, memory.embedding);
        if (sim > maxSimilarity) maxSimilarity = sim;
    }

    // Store this new memory
    MEMORY_BANK.push({ projectId, embedding: newVector, description });

    // Novelty is the inverse of max similarity
    // If maxSimilarity is 0.9 (very similar), Novelty is 0.1 (low)
    // We scale it 0-100
    const noveltyScore = Math.max(0, Math.min(100, (1 - maxSimilarity) * 100));

    return {
        noveltyScore: Math.round(noveltyScore),
        similarProjects: MEMORY_BANK.length // Just for context
    };
}
