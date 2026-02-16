"use client";

import { Hackathon } from "@prisma/client";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface HackathonListProps {
    hackathons: Array<Hackathon & { _count: { teams: number, projects: number } }>;
}

export function HackathonList({ hackathons }: HackathonListProps) {
    if (hackathons.length === 0) {
        return (
            <div className="text-center py-20 text-gray-500">
                <h2 className="text-2xl font-bold">No Active Events</h2>
                <p>Stay tuned for upcoming challenges.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hackathons.map((h) => (
                <div key={h.id} className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300">
                    <div className="absolute top-0 right-0 p-4">
                        <span className={`px-2 py-1 rounded text-xs font-mono uppercase tracking-widest 
               ${h.status === 'ACTIVE' ? 'bg-green-500/10 text-green-400' : 'bg-gray-800 text-gray-400'}`}>
                            {h.status}
                        </span>
                    </div>

                    <div className="p-8 space-y-4">
                        <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                            {h.name}
                        </h3>
                        <p className="text-gray-400 text-sm line-clamp-2 min-h-[40px]">
                            {h.description || "Join the elite coding challenge."}
                        </p>

                        <div className="flex justify-between items-center text-xs text-gray-500 font-mono pt-4 border-t border-white/10">
                            <span>{new Date(h.startDate).toLocaleDateString()}</span>
                            <span>{h._count.teams} Teams</span>
                        </div>
                    </div>

                    <div className="p-4 bg-black/20">
                        <Link href={`/hackathon/${h.slug}`}>
                            <Button fullWidth variant="secondary" size="sm">
                                View Details
                            </Button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}
