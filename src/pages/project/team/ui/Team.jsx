"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { LayoutHeader, LayoutAside } from "@/widgets/Layout";
import { TeamWidget } from "@/widgets/Project/Whole";
import { Options } from "@/features/project/layout";
import { projectsData } from "@/shared/mock";

export function Team({ id }) {
    const [activeTab, setActiveTab] = useState("team");
    const [isAsideCollapsed, setIsAsideCollapsed] = useState(false);
    const [initialStatus, setInitialStatus] = useState(null);
    const [projectData, setProjectData] = useState(null);
    
    const params = useParams();
    const projectId = params.id || id;

    const searchParams = useSearchParams();

    useEffect(() => {
        const statusParam = searchParams.get('status');
        if (statusParam) {
            setInitialStatus(statusParam);
        }
    }, [searchParams]);

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
                        <TeamWidget initialStatus={initialStatus} />
                    </div>
                </article>
            </div>
        </div>
    );
}