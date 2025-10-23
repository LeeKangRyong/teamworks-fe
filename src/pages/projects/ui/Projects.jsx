// src/pages/projects/ui/Projects.jsx
"use client";
import { useEffect } from "react";
import { LayoutHeader, LayoutAside, useAsideStore } from "@/widgets/Layout";
import { ProjectCards } from "@/widgets/Projects";
import { Add } from "@/features/projects";
import { useProjects } from "@/entities/projects";
import { useAuth } from "@/entities/auth";
import { tokenStorage } from "@/shared/lib/tokenStorage";

export function Projects() {
    const { user, isLoading: isAuthLoading } = useAuth();
    const { isCollapsed } = useAsideStore();
    const { projects, setProjects, isLoading: isProjectsLoading, error } = useProjects();

    // 디버깅 로그 추가
    useEffect(() => {
        console.log('[Projects] Component mounted/updated');
        console.log('[Projects] User from useAuth:', user);
        console.log('[Projects] User role:', user?.role);
        console.log('[Projects] Cookie user:', tokenStorage.getUser());
        console.log('[Projects] Projects length:', projects.length);
        console.log('[Projects] Should show Add button:', Boolean(projects.length > 0 && user?.role));
    }, [user, projects]);

    if (isAuthLoading || isProjectsLoading) {
        return (
            <div className="bg-secondary-5 w-full min-h-screen">
                <LayoutHeader />
                <LayoutAside />
                <div 
                    className="transition-all duration-300 flex justify-center items-center min-h-screen"
                    style={{
                        paddingLeft: isCollapsed ? '48px' : '200px'
                    }}
                >
                    <p className="text-body-m text-secondary-60">로딩 중...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-secondary-5 w-full min-h-screen">
                <LayoutHeader />
                <LayoutAside />
                <div 
                    className="transition-all duration-300 flex justify-center items-center min-h-screen"
                    style={{
                        paddingLeft: isCollapsed ? '48px' : '200px'
                    }}
                >
                    <p className="text-body-m text-error-50">에러: {error}</p>
                </div>
            </div>
        );
    }

    // user와 role 체크를 명확하게
    const showAddButton = Boolean(projects.length > 0 && user && user.role);

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
                        {projects.length > 0 && (
                            <h1 className="text-heading-l mt-10 mb-5 font-bold">내 프로젝트</h1>
                        )}
                        <ProjectCards projects={projects} setProjects={setProjects} />
                    </div>
                </div>
            </div>
            {showAddButton && <Add role={user.role} />}
        </div>
    );
}