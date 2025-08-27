"use client";
import { useState, useEffect } from "react";
import { LayoutHeader, LayoutAside } from "@/widgets/Layout";
import { TeamWidget } from "@/widgets/Project/Whole";
import { Options } from "@/features/project/layout";

export function Team({ id }) {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [isAsideCollapsed, setIsAsideCollapsed] = useState(false);

    return (
        <div className="bg-secondary-5 flex justify-center w-full min-h-screen relative">
            <LayoutHeader />
            <LayoutAside 
                isCollapsed={isAsideCollapsed} 
                onToggle={() => setIsAsideCollapsed(!isAsideCollapsed)} 
            />
            <div className="mt-20 ml-[208px]">
                <h1 className="text-heading-m font-bold mt-10 mb-5 ml-4">2025 스타트업 프로젝트</h1>
                <article className="bg-white w-full max-w-none py-4 ml-4 mb-10 rounded-md">
                    <Options activeTab={activeTab} setActiveTab={setActiveTab} />
                    <div className="border-b-1 border-gray-20 w-full"/>
                    <div className="mt-8 bg-transparent">
                        <TeamWidget />
                    </div>
                </article>
            </div>
        </div>
    );
}