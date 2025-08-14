"use client";
import { useState } from "react";
import { LayoutHeader, LayoutAside } from "@/widgets/Layout";
import { Dashboard, Team, Participation, Notice } from "@/widgets/Project";
import { Options } from "@/features/project";

export function Project({ id }) {
    const [activeTab, setActiveTab] = useState("dashboard");

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
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="bg-secondary-5 flex justify-center w-full min-h-screen relative">
            <LayoutHeader />
            <LayoutAside />
            <div className="mt-20 ml-25">
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