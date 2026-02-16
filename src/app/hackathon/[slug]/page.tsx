import { hackathonService } from "@/lib/services/hackathonService";
import { HackathonDetails } from "@/components/hackathon/HackathonDetails";
// import { getCurrentUser } from "@/lib/auth"; // Assume needed later
import { notFound } from "next/navigation";

export default async function HackathonPage({ params }: { params: Promise<{ slug: string }> }) {
    // Await params as required in Next.js 15+
    const { slug } = await params;

    const hackathon = await hackathonService.getHackathonBySlug(slug);

    if (!hackathon) {
        notFound();
    }

    // Transform or enrich data if needed
    const enrichedHackathon = {
        ...hackathon,
        _count: {
            // Placeholder counts until service fully implemented or mock data
            teams: 12,
            projects: 8
        }
    };

    return (
        <main className="min-h-screen bg-black">
            <HackathonDetails hackathon={enrichedHackathon} />
        </main>
    );
}
