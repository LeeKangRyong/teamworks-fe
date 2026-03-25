"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { LayoutHeader, LayoutAside } from "@/widgets/Layout";
import { Options } from "@/features/project/layout";
import { TeamDetailWidget } from "@/widgets/Project/Whole";
import { projectsData } from "@/shared/mock";
import type { Project } from "@/entities/projects";

export function TeamDetail() {
    const params = useParams();
    const teamId = params.teamId as string;
    const projectId = params.id;
    const [activeTab, setActiveTab] = useState("team");
    const [projectData, setProjectData] = useState<Project | null>(null);

    useEffect(() => {
        const foundProject = projectsData.find(project => project.project_id === parseInt(String(projectId)));
        setProjectData((foundProject as Project) ?? null);
    }, [projectId]);

    return (
        <div className="bg-secondary-5 w-full min-h-screen">
            <LayoutHeader />
            <LayoutAside />

            <div className="transition-all duration-300 pl-12">
                <div className="flex justify-center mt-20">
                    <div className="w-full max-w-[1040px] px-4 lg:px-4">
                        <h1 className="text-heading-m font-bold mt-10 mb-5">
                            {projectData?.name || "과목"}
                        </h1>
                        <article className="bg-white w-full py-4 mb-10 rounded-md">
                            <Options activeTab={activeTab} setActiveTab={setActiveTab} />
                            <div className="border-b-1 border-gray-20 w-full"/>
                            <div className="mt-8 bg-transparent">
                                <TeamDetailWidget teamId={teamId} />
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </div>
    );
}
