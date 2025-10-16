"use client";
import { useState } from "react";
import { LayoutHeader, LayoutAside } from "@/widgets/Layout";
import { Options } from "@/features/project/layout";
import { SubmitDetailWidget } from "@/widgets/Project/Whole";
import { projectsData } from "@/shared/mock";

export function SubmitDetail({ projectId, assignmentId, submitId }) {
    const [activeTab, setActiveTab] = useState("assignment");
    const [isAsideCollapsed, setIsAsideCollapsed] = useState(false);
    
    // TODO: projectsData도 나중에 hook으로 변경 필요
    const projectData = projectsData.find(
        project => project.project_id === parseInt(projectId)
    );

    return (
        <div className="bg-secondary-5 flex justify-center w-full min-h-screen relative">
            <LayoutHeader />
            <LayoutAside 
                isCollapsed={isAsideCollapsed} 
                onToggle={() => setIsAsideCollapsed(!isAsideCollapsed)} 
            />
            <div className="mt-20 ml-[208px]">
                <h1 className="text-heading-m font-bold mt-10 mb-5 ml-4">
                    {projectData?.title || "과목"}
                </h1>
                <article className="bg-white w-full max-w-none py-4 ml-4 mb-10 rounded-md">
                    <Options activeTab={activeTab} setActiveTab={setActiveTab} />
                    <div className="border-b-1 border-gray-20 w-full"/>
                    <div className="mt-8 bg-transparent">
                        <SubmitDetailWidget submitId={submitId} />
                    </div>
                </article>
            </div>
        </div>
    );
}