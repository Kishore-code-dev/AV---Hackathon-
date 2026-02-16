"use client";
import Link from 'next/link';
import { IconBrandX, IconBrandTelegram } from '@tabler/icons-react';

export function Footer() {
    return (
        <footer className="bg-black border-t border-white/5 pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-6">
                            <span className="text-2xl font-bold text-white">
                                SNS <span className="text-gold-500">DT-AI-Hack</span>
                            </span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-6">
                            Building the future of AI through collaborative innovation and real-world problem solving.
                            Powered by <span className="text-white font-bold">Groq LPU™</span> technology.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://x.com/GroqInc" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors"><IconBrandX size={20} /></a>
                            <a href="https://t.me/analyticsvidhya" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-400 transition-colors"><IconBrandTelegram size={20} /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Quick Links</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li><Link href="/" className="hover:text-gold-500 transition-colors">Overview</Link></li>
                            <li><Link href="/#tracks" className="hover:text-gold-500 transition-colors">Challenge Tracks</Link></li>
                            <li><Link href="/#timeline" className="hover:text-gold-500 transition-colors">Timeline</Link></li>
                            <li><Link href="/#resources" className="hover:text-gold-500 transition-colors">Resources</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Connect</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li><a href="https://x.com/GroqInc" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">X: @GroqInc</a></li>
                            <li><a href="https://x.com/ozenhati" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">X: @ozenhati</a></li>
                            <li><a href="https://x.com/benankdev" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">X: @benankdev</a></li>
                            <li><a href="https://x.com/yawnxyz" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">X: @yawnxyz</a></li>
                            <li><a href="https://t.me/analyticsvidhya" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors font-bold mt-2 block">Join Telegram Group →</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
                    <p>&copy; 2025 SNS DT-AI-Hack. Powered by Groq. All rights reserved.</p>
                    <p>Hackathon evaluation outcomes are final.</p>
                </div>
            </div>
        </footer>
    );
}
