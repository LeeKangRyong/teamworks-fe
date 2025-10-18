"use client";
import { useState } from "react";
import { LayoutHeader, LayoutAside, useAsideStore } from "@/widgets/Layout";
import { ProjectCards } from "@/widgets/Projects";
import { Add } from "@/features/projects";
import { projectsData } from "@/shared/mock";

// Test 용
// const projectsData = [];
//

export function Projects() {
    const { isCollapsed } = useAsideStore();
    const [projects, setProjects] = useState(projectsData);

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
                        {projects.length > 0 && (
                            <h1 className="text-heading-l mt-10 mb-5 font-bold">내 프로젝트</h1>
                        )}
                        <ProjectCards projects={projects} setProjects={setProjects} />
                    </div>
                </div>
            </div>
            {projects.length > 0 ? <Add /> : ""}
        </div>
    );
}