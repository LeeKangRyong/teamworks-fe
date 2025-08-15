"use client";
import { useState } from "react";
import { LayoutHeader, LayoutAside } from "@/widgets/Layout";
import { ProjectCards } from "@/widgets/Cards";
import { Add } from "@/features/projects";

export function Projects() {
    const [isAsideCollapsed, setIsAsideCollapsed] = useState(false);

    return (
        <div className="bg-secondary-5 flex justify-center w-full min-h-screen relative">
            <div 
                className={`
                    fixed left-0 top-0 h-screen bg-white z-30 border-r-1 border-gray-10
                    transition-all duration-300 ease-in-out
                    ${isAsideCollapsed ? 'w-6' : 'w-[240px]'}
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
                <p className="text-heading-l mt-10 mb-5 font-bold">내 프로젝트</p>
                <ProjectCards />
            </main>
            <Add />
        </div>
    );
}