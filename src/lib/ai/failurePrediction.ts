export type FailureRisk = {
    probability: number; // 0-100
    riskLevel: "Low" | "Moderate" | "Critical";
    predictedFailureDate: string | null;
    recommendations: string[];
};

export function predictFailureRisk(lastCommitDate: Date | null, projectStatus: string, deadline: Date): FailureRisk {
    const now = new Date();
    const daysUntilDeadline = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    // Simulate commit activity analysis
    const daysSinceLastCommit = lastCommitDate ? Math.floor((now.getTime() - lastCommitDate.getTime()) / (1000 * 60 * 60 * 24)) : 10;

    let score = 0;
    const recs: string[] = [];

    // Factor 1: Inactivity
    if (daysSinceLastCommit > 5) {
        score += 40;
        recs.push("Code stagnant. Immediate commit required to avoid project drift.");
    }

    // Factor 2: Time Pressure
    if (daysUntilDeadline < 7 && projectStatus === "Idea") {
        score += 50;
        recs.push("Critical timeline. Switch to MVP scope immediately.");
    }

    // Factor 3: Status
    if (projectStatus === "Draft") {
        score += 10;
    }

    let riskLevel: FailureRisk["riskLevel"] = "Low";
    if (score > 70) riskLevel = "Critical";
    else if (score > 30) riskLevel = "Moderate";

    return {
        probability: Math.min(score, 99),
        riskLevel,
        predictedFailureDate: score > 60 ? new Date(now.getTime() + (daysUntilDeadline / 2) * 24 * 60 * 60 * 1000).toISOString() : null,
        recommendations: recs
    };
}
