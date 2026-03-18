"use client";
import { useState } from "react";
import { LayoutHeader, LayoutAside } from "@/widgets/Layout";
import { Options } from "@/features/project/layout";
import { SubmitDetailWidget } from "@/widgets/Project/Whole";
import { projectsData } from "@/shared/mock";
import { useAsideStore } from "@/widgets/Layout";

export function SubmitDetail({ projectId, assignmentId, submitId }) {
    const [activeTab, setActiveTab] = useState("assignment");
    const { isCollapsed } = useAsideStore();
    
    // TODO: projectsData도 나중에 hook으로 변경 필요
    const projectData = projectsData.find(
        project => project.project_id === parseInt(projectId)
    );

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
                                <SubmitDetailWidget submitId={submitId} />
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </div>
    );
}