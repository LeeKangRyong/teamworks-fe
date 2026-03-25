"use client";
import { LayoutHeader, LayoutAside } from "@/widgets/Layout";
import { ProjectForm } from "@/widgets/Projects";

export function ProjectsAdd() {
    return (
        <div className="bg-secondary-5 w-full min-h-screen">
            <LayoutHeader />
            <LayoutAside />

            <div className="transition-all duration-300 pl-12">
                <div className="flex justify-center mt-20">
                    <div className="w-full max-w-[1040px] px-4 lg:px-4">
                        <h1 className="text-heading-m mt-7 mb-5 text-center mr-90">프로젝트 생성</h1>
                        <div className="flex flex-col items-center">
                            <ProjectForm type="add" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
