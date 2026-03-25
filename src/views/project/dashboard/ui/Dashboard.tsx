"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { LayoutHeader, LayoutAside } from "@/widgets/Layout";
import { DashboardWidget } from "@/widgets/Project/Whole";
import { Options } from "@/features/project/layout";
import projectsData from "@/shared/mock/project/projectsData.json";
import type { Project } from "@/entities/projects";

interface Props {
    id?: string;
}

export function Dashboard({ id }: Props) {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [projectData, setProjectData] = useState<Project | null>(null);
    const params = useParams();
    const projectId = params.id || id;

    useEffect(() => {
        const foundProject = (projectsData as Project[]).find(project =>
            project.project_id === parseInt(String(projectId))
        );
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
                                <DashboardWidget />
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </div>
    );
}
