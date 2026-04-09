"use client";
import { LayoutHeader, LayoutAside } from "@/widgets/Layout";
import { ProjectCards } from "@/widgets/Projects";
import { Add } from "@/features/projects";
import { useProjects } from "@/entities/projects";
import { useAuth } from "@/entities/auth";

export function Projects() {
    const { user } = useAuth();
    const { projects, isLoading: isProjectsLoading, error } = useProjects();

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
                        {isProjectsLoading ? (
                            <div className="flex justify-center items-center min-h-[200px]">
                                <p className="text-body-m text-secondary-60">로딩 중...</p>
                            </div>
                        ) : error ? (
                            <p className="text-body-m text-error-50">에러: {error}</p>
                        ) : (
                            <>
                                {projects.length > 0 && (
                                    <h1 className="text-heading-l mt-10 mb-5 font-bold">내 프로젝트</h1>
                                )}
                                <ProjectCards projects={projects} />
                            </>
                        )}
                    </div>
                </div>
            </div>

            {showAddButton && <Add role={user!.role} />}
        </div>
    );
}
