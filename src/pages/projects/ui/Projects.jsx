"use client";
import { useState } from "react";
import { LayoutHeader, LayoutAside } from "@/widgets/Layout";
import { ProjectCards } from "@/widgets/Projects";
import { Add } from "@/features/projects";

export function Projects() {
    const [isAsideCollapsed, setIsAsideCollapsed] = useState(false);
    
    const [projects, setProjects] = useState([
        { id: 1, title: "2025 스타트업 프로젝트", duration: "7월 24일", members: "32" },
        { id: 2, title: "프랑스어기초", duration: "7월 24일", members: "32" },
        { id: 3, title: "자료구조및실습", duration: "7월 24일", members: "32" },
        { id: 4, title: "프랑스어기초", duration: "7월 24일", members: "32" },
        { id: 5, title: "프랑스어기초", duration: "7월 24일", members: "32" },
        { id: 6, title: "프랑스어기초", duration: "7월 24일", members: "32" },
        { id: 7, title: "프랑스어기초", duration: "7월 24일", members: "32" },
        { id: 8, title: "프랑스어기초", duration: "7월 24일", members: "32" },
        { id: 9, title: "프랑스어기초", duration: "7월 24일", members: "32" },
        { id: 10, title: "프랑스어기초", duration: "7월 24일", members: "32" }
    ]);

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