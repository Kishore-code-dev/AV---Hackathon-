"use client";
import React from "react";
import { Hero } from "@/components/landing/Hero";
import { AboutGroq } from "@/components/landing/AboutGroq";
import { ChallengeDetails } from "@/components/landing/ChallengeDetails";
import { SampleArchitecture } from "@/components/landing/SampleArchitecture";
import { Tracks } from "@/components/landing/Tracks";
import { Timeline } from "@/components/landing/Timeline";
import { PrizeReveal } from "@/components/landing/PrizeReveal";
import { SubmissionGuidelines } from "@/components/landing/SubmissionGuidelines";
import { Resources } from "@/components/landing/Resources";
import { CallToAction } from "@/components/landing/CallToAction";
import { Footer } from "@/components/landing/Footer";
import './landing.css';

export default function Home() {
  return (
    <main className="min-h-screen relative selection:bg-gold-500 selection:text-black">
      <div className="fade-in">
        <Hero />
        <AboutGroq />
        <ChallengeDetails />
        <Tracks />
        <SampleArchitecture />
        <Timeline />
        <PrizeReveal />
        <SubmissionGuidelines />
        <Resources />
        <CallToAction />
        <Footer />
      </div>
    </main>
  );
}
