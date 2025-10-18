"use client";
import { useState, useEffect } from "react";
import { LayoutHeader, LayoutAside, useAsideStore } from "@/widgets/Layout";
import { ProjectForm } from "@/widgets/Projects";

export function ProjectsUpdate() {
    const { isCollapsed } = useAsideStore();
    
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
                    <div className="w-full max-w-[1040px] px-4 lg:px-4 flex flex-col items-center">
                        <h1 className="text-heading-m mt-7 mb-5 font-bold">프로젝트 수정</h1>
                        <ProjectForm type="update" />
                    </div>
                </div>
            </div>
        </div>
    );
}