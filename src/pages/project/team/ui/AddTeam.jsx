"use client";
import { useState, useEffect } from "react";
import { LayoutHeader, LayoutAside, useAsideStore } from "@/widgets/Layout";
import { AddTeamForm } from "@/widgets/Project/Team";

export function AddTeam({ id }) {
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
                    <div className="w-full max-w-[1040px] px-4 lg:px-4">
                        <h1 className="text-heading-m mt-7 mb-5 text-center mr-125">팀 생성</h1>
                        <div className="flex flex-col items-center">
                            <AddTeamForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}