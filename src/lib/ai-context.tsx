"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

/**
 * AI STATE SYSTEM
 * "The heartbeat of the application"
 */

export type AIState = "IDLE" | "THINKING" | "STREAMING" | "COMPLETED" | "ERROR";

interface AIContextType {
    aiState: AIState;
    setAIState: (state: AIState) => void;
    // A value from 0-1 representing "System Arousal" (Activity/Intensity)
    intensity: number;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export function AIProvider({ children }: { children: React.ReactNode }) {
    const [aiState, setAIState] = useState<AIState>("IDLE");
    const [intensity, setIntensity] = useState(0);

    // SYSTEM BREATHING:
    // The system "breathes" based on the AI state.
    useEffect(() => {

        switch (aiState) {
            case "IDLE":
                // Slow, deep breaths (0.1 to 0.3)
                setIntensity(0.1);
                break;
            case "THINKING":
                // High tension, fluctuating (0.6 to 0.9)
                setIntensity(0.8);
                break;
            case "STREAMING":
                // High flow, consistent (1.0)
                setIntensity(1.0);
                break;
            case "COMPLETED":
                // Release (diminishing)
                setIntensity(0.5);
                setTimeout(() => setAIState("IDLE"), 3000); // Auto-reset after victory
                break;
        }

        // return () => clearInterval(interval);
    }, [aiState]);

    return (
        <AIContext.Provider value={{ aiState, setAIState, intensity }}>
            {children}
        </AIContext.Provider>
    );
}

export function useAI() {
    const context = useContext(AIContext);
    if (!context) {
        throw new Error("useAI must be used within an AIProvider");
    }
    return context;
}
