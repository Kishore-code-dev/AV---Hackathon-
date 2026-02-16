"use client";
import { IconCheck, IconFileDescription, IconDeviceLaptop, IconServer, IconRocket, IconSettings } from "@tabler/icons-react";


export function SubmissionGuidelines() {
    return (
        <section className="py-20 bg-transparent relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Submission <span className="text-gold-500">Guidelines</span></h2>
                    <p className="text-gray-400">Everything you need to submit your project successfully.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {[
                        {
                            title: "1. Executive Summary",
                            icon: IconFileDescription,
                            points: ["Project Title", "Problem Statement", "Solution Overview", "Key Results"]
                        },
                        {
                            title: "2. System Architecture",
                            icon: IconServer,
                            points: ["Agent Roles", "Model Selection (Justify Groq)", "MCP Integration Diagram", "Communication Flow"]
                        },
                        {
                            title: "3. Technical Implementation",
                            icon: IconSettings,
                            points: ["Agent Code Documentation", "MCP Connectors", "Orchestration Logic", "Error Handling"]
                        },
                        {
                            title: "4. Live Demonstration",
                            icon: IconDeviceLaptop,
                            points: ["End-to-End User Journey", "Multi-Modal Inputs", "Real-Time Showcase", "External System Integration"]
                        },
                        {
                            title: "5. Performance Analysis",
                            icon: IconRocket,
                            points: ["Speed Benchmarks", "User Experience Improvement", "Business Impact", "Scalability"]
                        },
                        {
                            title: "6. Setup & Deployment",
                            icon: IconCheck,
                            points: ["Environment Setup Instructions", "Dependencies List", "MCP Configuration", "Run Locally Guide"]
                        }
                    ].map((item, i) => (
                        <div key={i} className="glass p-6 rounded-xl border border-white/5 hover:border-gold-500/30 transition-all group">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-2 bg-white/5 rounded-lg text-gold-500 group-hover:scale-110 transition-transform">
                                    <item.icon size={24} />
                                </div>
                                <h3 className="font-bold text-white text-lg">{item.title}</h3>
                            </div>
                            <ul className="space-y-2 pl-2 border-l-2 border-white/10">
                                {item.points.map((point, idx) => (
                                    <li key={idx} className="text-sm text-gray-400">{point}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <div className="inline-block glass p-6 rounded-xl text-center">
                        <p className="text-gray-400 mb-4">Requirements: GitHub Repository + Max 3 Min Video + Live Link</p>
                        <a href="/submit" className="inline-flex h-12 items-center justify-center rounded-md bg-gold-500 px-8 text-sm font-medium text-black transition-colors hover:bg-gold-600 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                            Submit Project
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
