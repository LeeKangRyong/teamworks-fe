"use client";
import { useState, useEffect } from "react";
import { LayoutHeader, LayoutAside } from "@/widgets/Layout";
import { Dashboard, Team, Participation, Notice, Assignment } from "@/widgets/Project";
import { Options } from "@/features/project/layout";

export function Project({ id }) {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [isAsideCollapsed, setIsAsideCollapsed] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

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
                className="fixed left-0 top-0 h-screen bg-white z-30 border-r-1 border-gray-10 transition-all duration-300 ease-in-out"
                style={{
                    width: isMounted && isAsideCollapsed ? '48px' : '200px'
                }}
            />
            <LayoutHeader />
            <LayoutAside 
                isCollapsed={isMounted ? isAsideCollapsed : false} 
                onToggle={() => setIsAsideCollapsed(!isAsideCollapsed)} 
            />
            <div 
                className="mt-20 transition-all duration-300 ease-in-out"
                style={{
                    marginLeft: isMounted && isAsideCollapsed ? '56px' : '208px'
                }}
            >
                <h1 className="text-heading-m font-bold mt-10 mb-5 ml-4">2025 스타트업 프로젝트</h1>
                <article className="bg-white w-full max-w-none py-4 ml-4">
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