"use client";
import { useState, useEffect } from "react";
import { LayoutHeader, LayoutAside } from "@/widgets/Layout";
import { projectsData } from "@/shared/mock";
import { Options } from "@/features/project/layout";
import { AssignmentDetailWidget } from "@/widgets/Project/Whole";

export function AssignmentDetail({ projectId, assignmentId }) {
    const [activeTab, setActiveTab] = useState("assignment");
    const [isAsideCollapsed, setIsAsideCollapsed] = useState(false);
    const [projectData, setProjectData] = useState(null);

    useEffect(() => {
        const foundProject = projectsData.find(project => 
            project.project_id === parseInt(projectId)
        );
        setProjectData(foundProject);
    }, [projectId]);

    return (
        <div className="bg-secondary-5 flex justify-center w-full min-h-screen relative">
            <LayoutHeader />
            <LayoutAside 
                isCollapsed={isAsideCollapsed} 
                onToggle={() => setIsAsideCollapsed(!isAsideCollapsed)} 
            />
            <div className="mt-20 ml-[208px]">
                <h1 className="text-heading-m font-bold mt-10 mb-5 ml-4">
                    { projectData?.title || "과목" }
                </h1>
                <article className="bg-white w-full max-w-none py-4 ml-4 mb-10 rounded-md">
                    <Options activeTab={activeTab} setActiveTab={setActiveTab} />
                    <div className="border-b-1 border-gray-20 w-full"/>
                    <div className="mt-8 bg-transparent">
                        <AssignmentDetailWidget 
                            assignmentId={assignmentId}
                        />
                    </div>
                </article>
            </div>
        </div>
    );
}