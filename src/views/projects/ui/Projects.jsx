// src/pages/projects/ui/Projects.jsx

"use client";
import { useEffect, useState } from "react";
import { LayoutHeader, LayoutAside, useAsideStore } from "@/widgets/Layout";
import { ProjectCards } from "@/widgets/Projects";
import { Add } from "@/features/projects";
import { useProjects } from "@/entities/projects";
import { useAuth } from "@/entities/auth";
import { tokenStorage } from "@/shared/lib/tokenStorage";

export function Projects() {
    const { user, isLoading: isAuthLoading, setUser } = useAuth();
    const { isCollapsed } = useAsideStore();
    const { projects, setProjects, isLoading: isProjectsLoading, error } = useProjects();
    const [isInitialized, setIsInitialized] = useState(false);

    // user 정보 복구 (최초 마운트 시)
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
        
        // 초기화 완료 마크
        setIsInitialized(true);
    }, [user, isAuthLoading, setUser]);

    // 디버깅용
    // useEffect(() => {
    //     if (isInitialized) {
    //         console.log('[Projects] 📊 Current state:', {
    //             hasUser: !!user,
    //             userEmail: user?.email,
    //             userRole: user?.role,
    //             projectCount: projects.length,
    //             isAuthLoading,
    //             isProjectsLoading
    //         });
    //     }
    // }, [user, isAuthLoading, isProjectsLoading, projects, isInitialized]);

    // 로딩 상태
    if (!isInitialized || isAuthLoading || isProjectsLoading) {
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

    // 에러 상태
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

    const showAddButton = Boolean(
        projects.length > 0 && 
        user && 
        user.role && 
        (user.role === 'MANAGER' || user.role === 'PARTICIPANT')
    );

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
            
            {/* {process.env.NODE_ENV === 'development' && (
                <div className="fixed bottom-20 right-4 bg-white p-3 rounded shadow-lg text-xs space-y-1">
                    <div>User: {user?.email || 'none'}</div>
                    <div>Role: {user?.role || 'none'}</div>
                    <div>Projects: {projects.length}</div>
                    <div>Show Add: {showAddButton ? 'YES' : 'NO'}</div>
                </div>
            )} */}

            
        </div>
    );
}