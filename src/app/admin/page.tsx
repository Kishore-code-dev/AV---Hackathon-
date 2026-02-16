"use client";
import React from 'react';
import Link from 'next/link';
import {
    IconEye,
    IconGavel,
    IconTrophy,
    IconLock,
    IconActivity,
    IconArrowRight
} from '@tabler/icons-react';
import './admin.css'; // Pure CSS Import

export default function AdminHub() {
    return (
        <div className="admin-container">
            {/* CSS-Only Background */}
            <div className="admin-bg" />

            <div className="admin-content">

                {/* Header */}
                <div className="admin-header">
                    <div className="lock-badge">
                        <IconLock size={12} /> RESTRICTED · LEVEL 9 CLEARANCE
                    </div>
                    <h1 className="admin-title">
                        SYSTEM OVERSEER
                    </h1>
                    <p className="admin-subtitle">
                        Initiate administrative protocols. Monitor the global neural network of hackathon submissions in real-time.
                    </p>
                </div>

                {/* Grid */}
                <div className="admin-grid">

                    {/* 1. OVERWATCH */}
                    <Link href="/overwatch" className="admin-card card-overwatch">
                        <div className="card-icon-bg">
                            <IconActivity size={120} />
                        </div>

                        <div className="icon-box">
                            <IconEye size={24} />
                        </div>

                        <h3 className="card-title">God's Eye</h3>
                        <p className="card-desc">
                            Deploy omniscient surveillance over the entire event ecosystem. Visualize data streams and pulse metrics.
                        </p>

                        <div className="card-action">
                            Initialize Global View <IconArrowRight size={16} className="action-arrow" />
                        </div>
                    </Link>

                    {/* 2. JUDGE PORTAL */}
                    <Link href="/judge" className="admin-card card-judge">
                        <div className="card-icon-bg">
                            <IconGavel size={120} />
                        </div>

                        <div className="icon-box">
                            <IconGavel size={24} />
                        </div>

                        <h3 className="card-title">The Council</h3>
                        <p className="card-desc">
                            Access the High Court of Innovation. Execute judgment on architecture, creativity, and execution.
                        </p>

                        <div className="card-action">
                            Enter The Chamber <IconArrowRight size={16} className="action-arrow" />
                        </div>
                    </Link>

                    {/* 3. LEADERBOARD */}
                    <Link href="/leaderboard" className="admin-card card-leaderboard">
                        <div className="card-icon-bg">
                            <IconTrophy size={120} />
                        </div>

                        <div className="icon-box">
                            <IconTrophy size={24} />
                        </div>

                        <h3 className="card-title">Apex Legends</h3>
                        <p className="card-desc">
                            The Pantheon of Victors. Identify the highest-performing neural clusters and declare the singularity.
                        </p>

                        <div className="card-action">
                            View Rankings <IconArrowRight size={16} className="action-arrow" />
                        </div>
                    </Link>

                </div>

                <div className="admin-footer">
                    SECURE CONNECTION ESTABLISHED • ID: ADM_8X92
                </div>

            </div>
        </div>
    );
}

