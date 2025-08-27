"use client";
import { useState, useEffect } from "react";
import { LayoutHeader, LayoutAside } from "@/widgets/Layout";
import { ProjectForm } from "@/widgets/Projects";

export function ProjectsAdd() {
    const [isAsideCollapsed, setIsAsideCollapsed] = useState(false);

    return (
        <div className="bg-secondary-5 flex justify-center w-full min-h-screen relative">
            <LayoutHeader />
            <LayoutAside 
                isCollapsed={isAsideCollapsed} 
                onToggle={() => setIsAsideCollapsed(!isAsideCollapsed)} 
            />
            <div className="mt-20 ml-[208px]">
                <h1 className="text-heading-m mt-7 mb-5 font-bold">프로젝트 생성</h1>
                <ProjectForm type="add" />
            </div>
        </div>
    );
}