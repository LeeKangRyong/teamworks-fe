"use client";
import { useState, useEffect } from "react";
import { LayoutHeader, LayoutAside } from "@/widgets/Layout";
import { AddTeamAllForm } from "@/widgets/Project/Team";

export function ParticipationDetail({ projectId, studentId }) {
    const [isAsideCollapsed, setIsAsideCollapsed] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <div className="bg-secondary-5 flex justify-center w-full min-h-screen relative">
            <LayoutHeader />
            <LayoutAside 
                isCollapsed={isMounted ? isAsideCollapsed : false} 
                onToggle={() => setIsAsideCollapsed(!isAsideCollapsed)} 
            />
            
            <div className="mt-20 ml-[208px]">
                <h1 className="text-heading-m mt-7 mb-5 font-bold">팀 생성</h1>
                <AddTeamAllForm />
            </div>
        </div>
    );
}