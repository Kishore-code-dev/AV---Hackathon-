import { Project, Team } from '@prisma/client';

export type DashboardState = {
    layout: 'standard' | 'focus' | 'panic';
    modules: string[];
    priority: string[];
};

// Self-Evolving Interface Engine Logic
export function generateDashboardLayout(team?: Team & { project?: Project | null }): DashboardState {
    const daysRemaining = 45; // Hardcoded for now, would be calculated
    const hasProject = !!team?.project;
    const isCrisis = daysRemaining < 2 && !hasProject;

    // 1. Emergency Focus Mode (Failure Prevention)
    if (isCrisis) {
        return {
            layout: 'panic',
            modules: ['EmergencyActionPlan', 'SubmitDraft', 'MentorHelp'],
            priority: ['SubmitDraft']
        };
    }

    // 2. Standard Build Phase
    if (hasProject) {
        return {
            layout: 'standard',
            modules: ['ProjectStatus', 'AIReview', 'TeamChat', 'Persona'],
            priority: ['AIReview']
        };
    }

    // 3. Onboarding / Ideation Phase
    return {
        layout: 'standard',
        modules: ['Persona', 'TeamFormation', 'IdeaGenerator', 'Resources'],
        priority: ['TeamFormation']
    };
}
