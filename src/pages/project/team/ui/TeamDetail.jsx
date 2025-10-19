"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { LayoutHeader, LayoutAside, useAsideStore } from "@/widgets/Layout";
import { Options } from "@/features/project/layout";
import { TeamDetailWidget } from "@/widgets/Project/Whole";
import { projectsData } from "@/shared/mock";

export function TeamDetail() {
    const params = useParams();
    const teamId = params.teamId;
    const projectId = params.id;
    const [activeTab, setActiveTab] = useState("team");
    const { isCollapsed } = useAsideStore();
    const [projectData, setProjectData] = useState(null);

    useEffect(() => {
        const foundProject = projectsData.find(project => project.project_id === parseInt(projectId));
        setProjectData(foundProject);
    }, [projectId]);

    return (
        <div className="bg-secondary-5 w-full min-h-screen">
            <LayoutHeader />
            <LayoutAside />
            
            <div 
                className="transition-all duration-300"
                style={{
                    paddingLeft: isCollapsed ? '48px' : '200px'
                }}
            >
                <div className="flex justify-center mt-20">
                    <div className="w-full max-w-[1040px] px-4 lg:px-4">
                        <h1 className="text-heading-m font-bold mt-10 mb-5">
                            {projectData?.title || "과목"}
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
