"use client";
import { useState } from "react";
import { LayoutHeader, LayoutAside } from "@/widgets/Layout";
import { Dashboard, Team, Participation, Notice, Assignment } from "@/widgets/Project";
import { Options } from "@/features/project/layout";

export function Project({ id }) {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [isAsideCollapsed, setIsAsideCollapsed] = useState(false);

    const renderContent = () => {
        switch(activeTab) {
            case "dashboard":
                return <Dashboard />;
            case "team":
                return <Team />;
            case "participation":
                return <Participation />;
            case "notice":
                return <Notice />;
            case "assignment":
                return <Assignment />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="bg-secondary-5 flex justify-center w-full min-h-screen relative">
            <div 
                className={`
                    fixed left-0 top-0 h-screen bg-white z-30 border-r-1 border-gray-10
                    transition-all duration-300 ease-in-out
                    ${isAsideCollapsed ? 'w-6' : 'w-[200px]'}
                `}
            />
            <LayoutHeader />
            <LayoutAside 
                isCollapsed={isAsideCollapsed} 
                onToggle={() => setIsAsideCollapsed(!isAsideCollapsed)} 
            />
            <div 
                className={`
                    mt-20 transition-all duration-300 ease-in-out
                    ${isAsideCollapsed ? 'ml-8' : 'ml-25'}
                `}
            >
                <h1 className="text-heading-m font-bold mt-10 mb-5">2025 스타트업 프로젝트</h1>
                <article className="bg-white w-full max-w-none py-4">
                    <Options activeTab={activeTab} setActiveTab={setActiveTab} />
                    <div className="border-b-1 border-gray-20 w-full"/>
                    <div className="mt-8">
                        {renderContent()}
                    </div>
                </article>
            </div>
        </div>
    );
}