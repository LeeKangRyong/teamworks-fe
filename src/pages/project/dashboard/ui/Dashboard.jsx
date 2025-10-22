"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { LayoutHeader, LayoutAside, useAsideStore } from "@/widgets/Layout";
import { Options } from "@/features/project/layout";
import { DashboardWidget } from "@/widgets/Project/Whole";
import { useProjectDetail } from "@/entities/projects";

export function Dashboard() {
    const params = useParams();
    const projectId = params.id;
    const [activeTab, setActiveTab] = useState("dashboard");
    const { isCollapsed } = useAsideStore();
    const { project, isLoading, error } = useProjectDetail(projectId);

    if (isLoading) {
        return (
            <div className="bg-secondary-5 w-full min-h-screen">
                <LayoutHeader />
                <LayoutAside />
                <div 
                    className="transition-all duration-300 flex justify-center items-center min-h-screen"
                    style={{
                        paddingLeft: isCollapsed ? '48px' : '200px'
                    }}
                >
                    <p className="text-body-m text-secondary-60">로딩 중...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-secondary-5 w-full min-h-screen">
                <LayoutHeader />
                <LayoutAside />
                <div 
                    className="transition-all duration-300 flex justify-center items-center min-h-screen"
                    style={{
                        paddingLeft: isCollapsed ? '48px' : '200px'
                    }}
                >
                    <p className="text-body-m text-error-50">에러: {error}</p>
                </div>
            </div>
        );
    }

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
                            {project?.name || "프로젝트"}
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