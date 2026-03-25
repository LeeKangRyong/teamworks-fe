"use client";
import { useEffect, useState } from "react";
import { LayoutHeader, LayoutAside } from "@/widgets/Layout";
import { ProjectCards } from "@/widgets/Projects";
import { Add } from "@/features/projects";
import { useProjects } from "@/entities/projects";
import { useAuth } from "@/entities/auth";
import { tokenStorage } from "@/shared/lib/tokenStorage";

export function Projects() {
    const { user, isLoading: isAuthLoading, setUser } = useAuth();
    const { projects, isLoading: isProjectsLoading, error } = useProjects();
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        if (!user && !isAuthLoading) {
            const storedUser = tokenStorage.getUser();
            console.log('[Projects] Stored user from sessionStorage:', storedUser);

            if (storedUser) {
                console.log('[Projects] 🔄 Restoring user from storage');
                setUser(storedUser);
            } else {
                console.warn('[Projects] ⚠️ No user found in storage');
            }
        }

        setIsInitialized(true);
    }, [user, isAuthLoading, setUser]);

    if (!isInitialized || isAuthLoading || isProjectsLoading) {
        return (
            <div className="bg-secondary-5 w-full min-h-screen">
                <LayoutHeader />
                <LayoutAside />
                <div className="flex justify-center items-center min-h-screen pl-12">
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
                <div className="transition-all duration-300 flex justify-center items-center min-h-screen pl-12">
                    <p className="text-body-m text-error-50">에러: {error}</p>
                </div>
            </div>
        );
    }

    const showAddButton = Boolean(
        projects.length > 0 &&
        user &&
        user.role &&
        (user.role === 'MANAGER' || user.role === 'PARTICIPANT')
    );

    return (
        <div className="bg-secondary-5 w-full min-h-screen relative">
            <LayoutHeader />
            <LayoutAside />

            <div className="transition-all duration-300 pl-12">
                <div className="flex justify-center mt-20">
                    <div className="w-full max-w-[1040px] px-4 lg:px-4">
                        {projects.length > 0 && (
                            <h1 className="text-heading-l mt-10 mb-5 font-bold">내 프로젝트</h1>
                        )}
                        <ProjectCards projects={projects} />
                    </div>
                </div>
            </div>

            {showAddButton && <Add role={user!.role} />}
        </div>
    );
}
