"use client";
import { useState, useEffect } from "react";
import { LayoutHeader, LayoutAside } from "@/widgets/Layout";
import { AddTeamAllForm } from "@/widgets/Project/Team";

export function AddTeamAll({ id }) {
    const [isAsideCollapsed, setIsAsideCollapsed] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

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
                <h1 className="text-heading-m mt-7 mb-5 font-bold">팀 생성</h1>
                <AddTeamAllForm />
            </div>
        </div>
    );
}