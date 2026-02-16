"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import {
    IconTrophy,
    IconMessage,
    IconBell,
    IconChevronRight,
    IconFileText,
    IconUsers,
    IconClock,
    IconCopy,
    IconRocket,
    IconPlus
} from '@tabler/icons-react';
import { HackathonTimeline } from './HackathonTimeline';
import { Button } from "@/components/ui/Button";
import { TeamActions } from './TeamActions';
import { InviteModal } from './InviteModal';
import { WinnerAnnouncement } from './WinnerAnnouncement';

interface AIInterfaceProps {
    layoutState: any;
    user: any;
    persona: any;
    review?: any;
    debateTurns?: any[];
    failureRisk?: any;
    roadmap?: any;
}

export function AIDashboardInterface({ user }: AIInterfaceProps) {
    const [showInviteModal, setShowInviteModal] = useState(false);

    // Parse Project Status specifically to check for "Admin Signals"
    const rawStatus = user.team?.project?.status || '';
    const isSignal = rawStatus.startsWith('SIGNAL:');

    let signalType = 'INFO';
    let signalMessage = '';

    if (isSignal) {
        const parts = rawStatus.replace('SIGNAL: ', '').split(' - ');
        signalType = parts[0] || 'INFO';
        signalMessage = parts[1] || rawStatus;
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* LEFT COLUMN: MAIN APPLICATION (8 cols) */}
            <div className="lg:col-span-8 space-y-6">

                {/* 1. STATUS CARD (Unstop Style) */}
                <div className="glass-card p-0 rounded-2xl overflow-hidden border border-white/10">
                    <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 p-6 border-b border-white/5 flex justify-between items-center">
                        <div>
                            <Link href="/challenge" className="hover:underline">
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    <IconTrophy className="text-gold-500" size={24} />
                                    Groq Real-Time AI Hackathon
                                </h2>
                            </Link>
                            <p className="text-sm text-gray-400 mt-1">Organized by Groq Inc.</p>
                        </div>
                        <div className="text-right flex items-center gap-4">
                            <Link href="/gallery" className="text-xs text-gold-500 hover:text-gold-400 transition-colors font-bold uppercase tracking-widest border-b border-gold-500/20 pb-0.5">
                                Enter The Arena
                            </Link>
                            <Link href="/challenge" className="text-xs text-gray-400 hover:text-white transition-colors underline">
                                Event Details
                            </Link>
                            <span className="inline-block px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full text-xs font-bold uppercase tracking-wider">
                                Live
                            </span>
                        </div>
                    </div>

                    <div className="p-8 bg-obsidian/50">
                        <div className="flex flex-col md:flex-row gap-8">
                            {/* Timeline */}
                            <div className="flex-1">
                                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6 border-b border-white/10 pb-2">
                                    Round Progress
                                </h3>
                                <HackathonTimeline currentStage={user.team?.project ? 3 : 2} />
                            </div>

                            {/* Action Area */}
                            <div className="w-full md:w-72 space-y-4">
                                <div className="bg-white/5 rounded-xl p-4 border border-white/10 relative overflow-hidden">
                                    {/* Team Header */}
                                    <h4 className="text-sm font-bold text-white mb-2 flex justify-between items-center">
                                        Squadron
                                        {user.team && (
                                            <span className="text-[10px] bg-gold-500/20 text-gold-500 px-2 py-0.5 rounded border border-gold-500/50">
                                                {user.team.members.length}/4
                                            </span>
                                        )}
                                    </h4>

                                    {user.team ? (
                                        <div>
                                            <div className="text-lg font-bold text-gold-500 mb-2 truncate" title={user.team.name}>
                                                {user.team.name}
                                            </div>

                                            {/* Members Avatars */}
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {user.team.members?.map((m: any) => (
                                                    <div key={m.id} title={m.name} className="relative z-10 w-8 h-8 rounded-full bg-neutral-700 flex items-center justify-center text-xs font-bold uppercase text-white border border-white/20 shadow-lg">
                                                        {m.name ? m.name[0] : '?'}
                                                    </div>
                                                ))}
                                                {/* Add Member Button - Opens Modal */}
                                                {(user.team.members?.length || 0) < 4 && (
                                                    <button
                                                        onClick={() => setShowInviteModal(true)}
                                                        className="w-8 h-8 rounded-full border border-dashed border-white/30 flex items-center justify-center text-white/50 hover:text-white hover:border-white hover:bg-white/5 transition-all"
                                                        title="Invite Member"
                                                    >
                                                        <IconPlus size={14} />
                                                    </button>
                                                )}
                                            </div>

                                            {/* Join Code Display */}
                                            <div className="bg-black/40 rounded-lg p-3 border border-white/10 mb-2">
                                                <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Access Code</div>
                                                <div className="flex justify-between items-center">
                                                    <code className="text-gold-500 font-mono font-bold tracking-widest text-lg">
                                                        {user.team.joinCode}
                                                    </code>
                                                    <button
                                                        onClick={() => {
                                                            navigator.clipboard.writeText(user.team.joinCode);
                                                            alert("Copied!");
                                                        }}
                                                        className="text-gray-500 hover:text-white transition-colors p-1"
                                                        title="Copy Code"
                                                    >
                                                        <IconCopy size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="mb-4">
                                            <p className="text-xs text-gray-400 mb-3">
                                                You are operating solo. Form a squadron to maximize survival probability.
                                            </p>
                                            <TeamActions />
                                        </div>
                                    )}
                                </div>

                                {user.team ? (
                                    user.team.project ? (
                                        <Link href="/submit" className="block">
                                            <Button className="w-full bg-white text-black hover:bg-gray-200 h-12 font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                                                <IconFileText size={18} className="mr-2" /> View Protocol
                                            </Button>
                                        </Link>
                                    ) : (
                                        <Link href="/submit" className="block">
                                            <Button className="w-full bg-gold-500 text-black hover:bg-gold-400 h-12 font-bold animate-pulse shadow-[0_0_20px_rgba(251,191,36,0.4)]">
                                                <IconRocket size={18} className="mr-2" /> Initialize Protocol
                                            </Button>
                                        </Link>
                                    )
                                ) : (
                                    <div className="p-3 rounded-lg border border-red-500/20 bg-red-500/5 text-red-400 text-xs text-center">
                                        Team formation required for protocol initialization.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* RIGHT COLUMN: NOTIFICATIONS & ACTIVITY (4 cols) */}
            <div className="lg:col-span-4 space-y-6">

                {/* 1. NOTIFICATIONS CENTER */}
                <div className="glass-card p-6 rounded-2xl border border-white/10 min-h-[400px]">
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <IconBell size={16} /> Notifications
                    </h3>

                    <div className="space-y-4">
                        {/* Admin Signal - The "Overwatch" Connection */}
                        {isSignal && (
                            <div className={`p-4 rounded-xl border relative overflow-hidden ${signalType === 'AWARD' ? 'bg-gold-500/10 border-gold-500/50' :
                                signalType === 'INTERVIEW' ? 'bg-blue-500/10 border-blue-500/50' :
                                    'bg-purple-500/10 border-purple-500/50'
                                }`}>
                                <div className="absolute top-0 right-0 p-2 opacity-20">
                                    <IconMessage size={48} />
                                </div>
                                <div className="relative z-10">
                                    <div className={`text-xs font-bold uppercase mb-1 ${signalType === 'AWARD' ? 'text-gold-500' :
                                        signalType === 'INTERVIEW' ? 'text-blue-400' :
                                            'text-purple-400'
                                        }`}>
                                        {signalType === 'AWARD' ? 'FUNDING GRANT' :
                                            signalType === 'INTERVIEW' ? 'INTERVIEW REQUEST' :
                                                'SYSTEM ALERT'}
                                    </div>
                                    <p className="text-sm text-white font-medium mb-2">
                                        {signalMessage}
                                    </p>
                                    <div className="text-[10px] text-gray-500 flex items-center gap-1">
                                        <IconClock size={10} /> Just now
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Standard Notifications */}
                        <div className="p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                            <p className="text-sm text-gray-300 mb-1">Welcome to the hackathon! Join the Discord.</p>
                            <div className="text-[10px] text-gray-500">2 days ago</div>
                        </div>

                        <div className="p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                            <p className="text-sm text-gray-300 mb-1">Team Formation phase is ending soon.</p>
                            <div className="text-[10px] text-gray-500">5 hours ago</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Invite Modal */}
            {user.team && (
                <InviteModal
                    isOpen={showInviteModal}
                    onClose={() => setShowInviteModal(false)}
                    joinCode={user.team.joinCode}
                    teamName={user.team.name}
                />
            )}

            {/* Global Winner Announcement Overlay */}
            <WinnerAnnouncement />

        </div>
    );
}
