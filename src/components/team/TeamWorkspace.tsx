"use client";

import { Team, TeamMember, User, Project, Hackathon } from "@prisma/client";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Copy, Plus, Send } from "lucide-react"; // Assuming lucide-react is installed

interface TeamWorkspaceProps {
    team: Team & {
        members: (TeamMember & { user: User })[];
        project: Project | null;
        hackathon: Hackathon | null;
    };
}

export function TeamWorkspace({ team }: TeamWorkspaceProps) {
    const isLeader = false; // Logic to determine if user is leader based on context or session

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Team Identity */}
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                {team.name}
                            </h2>
                            {team.hackathon && (
                                <p className="text-xs text-blue-400 mt-1 uppercase tracking-wider">
                                    Competing in {team.hackathon.name}
                                </p>
                            )}
                        </div>
                        {/* Status Badge */}
                        <span className={`px-2 py-1 rounded text-xs font-mono 
              ${team.project ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                            {team.project ? team.project.status : "NO PROJECT"}
                        </span>
                    </div>

                    <div className="bg-black/40 p-3 rounded-lg flex items-center justify-between border border-white/5">
                        <div>
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest">Join Code</p>
                            <p className="font-mono text-xl tracking-widest text-gold-400">{team.joinCode}</p>
                        </div>
                        <Button size="sm" variant="ghost" onClick={() => navigator.clipboard.writeText(team.joinCode)}>
                            <Copy size={14} />
                        </Button>
                    </div>
                </div>

                {/* Members List */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-4">Squad Members</h3>
                    <ul className="space-y-3">
                        {team.members.map((member) => (
                            <li key={member.id} className="flex items-center justify-between group">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-xs font-bold border border-white/10">
                                        {member.user.name?.charAt(0) || "U"}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-200">{member.user.name}</p>
                                        <p className="text-[10px] text-gray-500">{member.role}</p>
                                    </div>
                                </div>
                                {/* Leader Crown or Role Badge */}
                                {member.role === "LEADER" && (
                                    <span className="text-xs text-yellow-500">👑</span>
                                )}
                            </li>
                        ))}
                    </ul>

                    {/* Invite UI could go here */}
                </div>
            </div>

            {/* Main Column: Workflow */}
            <div className="lg:col-span-2 space-y-6">

                {/* Project Module */}
                <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-32 bg-blue-500/10 blur-[100px] rounded-full group-hover:bg-blue-500/20 transition-all duration-700" />

                    <div className="relative z-10">
                        <h3 className="text-xl font-bold mb-4">Current Project</h3>

                        {team.project ? (
                            <div className="space-y-4">
                                <h4 className="text-3xl font-light">{team.project.title}</h4>
                                <p className="text-gray-400">{team.project.description || "No description provided."}</p>

                                <div className="flex gap-3 pt-4">
                                    <Link href={`/dashboard/submission/`}>
                                        <Button>Edit Submission</Button>
                                    </Link>
                                    {team.project.demoUrl && (
                                        <Link href={team.project.demoUrl} target="_blank">
                                            <Button variant="outline">View Demo</Button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-12 border-2 border-dashed border-white/10 rounded-xl hover:border-white/20 transition-colors">
                                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                                    <Plus size={24} />
                                </div>
                                <h4 className="text-lg font-medium text-white mb-2">Start a New Project</h4>
                                <p className="text-gray-500 text-sm max-w-sm mx-auto mb-6">
                                    Begin your hackathon journey. Create a project to track milestones and submit your work.
                                </p>
                                <Link href="/dashboard/submission/new">
                                    <Button variant="primary">Initialize Project</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Real-Time Comm / Activity Log */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 min-h-[300px]">
                    <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-4">Workspace Activity</h3>
                    <div className="flex items-center justify-center h-full text-gray-500 text-sm italic">
                        Connecting to secure socket layer...
                    </div>
                </div>

            </div>
        </div>
    );
}
