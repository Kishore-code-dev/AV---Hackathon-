"use client";


import { Project } from "@prisma/client";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Since I don't have zod or yup installed in context, I'll stick to raw react-hook-form or just simple state if user prefers logic.
// But `react-hook-form` is standard. I'll use simple state to avoid dependency issues if not installed.

interface ProjectSubmitFormProps {
    initialData?: Partial<Project>;
    teamId: string;
    hackathonId: string;
}

export function ProjectSubmitForm({ initialData, teamId, hackathonId }: ProjectSubmitFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        description: initialData?.description || "",
        githubUrl: initialData?.githubUrl || "",
        demoUrl: initialData?.demoUrl || "",
        documentation: initialData?.documentation || ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Mock API call - in real app would use Server Action or API Route
            const res = await fetch("/api/project/submit", {
                method: "POST",
                body: JSON.stringify({
                    ...formData,
                    teamId,
                    hackathonId
                }),
                headers: { "Content-Type": "application/json" }
            });

            if (!res.ok) throw new Error("Submission failed");

            router.refresh();
            router.push(`/dashboard/team`); // Redirect to workspace
        } catch (error) {
            console.error(error);
            alert("Failed to submit project. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto p-6 bg-white/5 border border-white/10 rounded-2xl">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold">Project Submission</h2>
                <p className="text-sm text-gray-400">
                    Provide details about your hackathon entry. You can update this until the deadline.
                </p>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Project Title</label>
                    <Input
                        required
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                        placeholder="e.g. Quantum Analytics Engine"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Short Description</label>
                    <Textarea
                        required
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                        placeholder="What does your project do?"
                        className="min-h-[100px]"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">GitHub Repository</label>
                        <Input
                            type="url"
                            value={formData.githubUrl}
                            onChange={e => setFormData({ ...formData, githubUrl: e.target.value })}
                            placeholder="https://github.com/..."
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Live Demo URL</label>
                        <Input
                            type="url"
                            value={formData.demoUrl}
                            onChange={e => setFormData({ ...formData, demoUrl: e.target.value })}
                            placeholder="https://..."
                        />
                    </div>
                </div>

                {/* Basic Markdown / Documentation Field */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Detailed Documentation (Markdown)</label>
                    <Textarea
                        value={formData.documentation}
                        onChange={e => setFormData({ ...formData, documentation: e.target.value })}
                        placeholder="## Architecture..."
                        className="min-h-[200px] font-mono text-xs"
                    />
                </div>
            </div>

            <div className="pt-4 flex gap-4">
                <Button type="submit" disabled={loading} className="w-full">
                    {loading ? "Saving..." : "Save Draft"}
                </Button>
            </div>
        </form>
    );
}
