"use client";
import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { IconCopy, IconMail, IconBrandWhatsapp, IconBrandLinkedin } from '@tabler/icons-react';

interface InviteModalProps {
    isOpen: boolean;
    onClose: () => void;
    joinCode: string;
    teamName: string;
}

export function InviteModal({ isOpen, onClose, joinCode, teamName }: InviteModalProps) {
    const [email, setEmail] = useState('');
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(joinCode);
        alert("Join Code Copied to Clipboard!");
    };

    const handleSendInvite = async (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSending(false);
        setSent(true);
        setTimeout(() => {
            setSent(false);
            setEmail('');
            onClose(); // Optional: Close on success
        }, 2000);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Invite Teammates">
            <div className="space-y-8">
                {/* Method 1: Share Code */}
                <div>
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
                        Share Access Code
                    </h4>
                    <div className="bg-black/30 p-4 rounded-xl border border-white/10 flex items-center justify-between gap-4">
                        <div className="font-mono text-2xl font-bold text-gold-500 tracking-widest">
                            {joinCode}
                        </div>
                        <Button variant="outline" size="sm" onClick={handleCopy}>
                            <IconCopy size={16} className="mr-2" /> Copy
                        </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        Share this code with your friends. They can enter it in their dashboard to join <strong>{teamName}</strong>.
                    </p>
                </div>

                <div className="w-full h-px bg-white/5" />

                {/* Method 2: Email Invite */}
                <div>
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
                        Invite via Email
                    </h4>
                    {sent ? (
                        <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl text-center">
                            Invitation sent successfully! 🚀
                        </div>
                    ) : (
                        <form onSubmit={handleSendInvite} className="flex gap-2">
                            <div className="relative flex-1">
                                <IconMail className="absolute left-3 top-3 text-gray-500" size={18} />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter teammate's email..."
                                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-gold-500 transition-colors"
                                />
                            </div>
                            <Button disabled={sending} className="bg-white text-black hover:bg-gray-200">
                                {sending ? 'Sending...' : 'Send'}
                            </Button>
                        </form>
                    )}
                </div>

                {/* Social Share (Mock) */}
                <div className="flex gap-4 justify-center pt-4">
                    <button className="p-3 rounded-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-colors">
                        <IconBrandWhatsapp size={24} />
                    </button>
                    <button className="p-3 rounded-full bg-[#0077b5]/10 text-[#0077b5] hover:bg-[#0077b5]/20 transition-colors">
                        <IconBrandLinkedin size={24} />
                    </button>
                </div>
            </div>
        </Modal>
    );
}
