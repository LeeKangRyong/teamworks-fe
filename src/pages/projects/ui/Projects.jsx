"use client";
import { useState } from "react";
import { LayoutHeader, LayoutAside } from "@/widgets/Layout";
import { ProjectCards } from "@/widgets/Projects";
import { Add } from "@/features/projects";
import { projectsData } from "@/shared/mock";

// Test 용
// const projectsData = [];
//

export function Projects() {
    const [isAsideCollapsed, setIsAsideCollapsed] = useState(false);
    
    const [projects, setProjects] = useState(projectsData);

    return (
        <div className="bg-secondary-5 flex justify-center w-full min-h-screen relative">
            <div 
                className={`
                    fixed left-0 top-0 h-1000 bg-white z-30 border-r-1 border-gray-10
                    transition-all duration-300 ease-in-out
                    ${isAsideCollapsed ? 'w-[48px]' : 'w-[200px]'}
                `}
            />
            <LayoutHeader />
            <LayoutAside 
                isCollapsed={isAsideCollapsed} 
                onToggle={() => setIsAsideCollapsed(!isAsideCollapsed)} 
            />
            <main 
                className={`
                    pt-16 h-full w-[75%] transition-all duration-300 ease-in-out
                    ${isAsideCollapsed ? 'pl-8' : 'pl-[12.5%]'}
                `}
            >
                {projects.length > 0 && (
                    <h1 className="text-heading-l mt-10 mb-5 font-bold">내 프로젝트</h1>
                )}
                <ProjectCards projects={projects} setProjects={setProjects} />
            </main>
            {projects.length > 0 ? <Add /> : ""}
        </div>
    );
}