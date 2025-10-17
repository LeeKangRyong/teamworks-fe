"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { LayoutHeader, LayoutAside } from "@/widgets/Layout";
import { TeamWidget } from "@/widgets/Project/Whole";
import { Options } from "@/features/project/layout";
import { projectsData } from "@/shared/mock";
import { useAsideStore } from "@/widgets/Layout";

export function Team({ id }) {
    const [activeTab, setActiveTab] = useState("team");
    const { isCollapsed } = useAsideStore();
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
                                <TeamWidget initialStatus={initialStatus} />
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </div>
    );
}