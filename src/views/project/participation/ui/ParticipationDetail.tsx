"use client";
import { useState, useMemo } from "react";
import { LayoutHeader, LayoutAside } from "@/widgets/Layout";
import { StudentParticipationDetail } from "@/widgets/Project/Participation";
import { Options } from "@/features/project/layout";
import { projectsData } from "@/shared/mock";

interface Props {
    projectId: string | number;
    studentId: string | number;
}

export function ParticipationDetail({ projectId, studentId }: Props) {
    const [activeTab, setActiveTab] = useState("participation");

    const projectTitle = useMemo(() =>
        projectsData.find(p => p.project_id === parseInt(String(projectId)))?.name
        ?? "프로젝트를 찾을 수 없습니다",
        [projectId]
    );

    return (
        <div className="bg-secondary-5 w-full min-h-screen">
            <LayoutHeader />
            <LayoutAside />
            <div className="transition-all duration-300 pl-12">
                <div className="flex justify-center mt-20">
                    <div className="w-full max-w-[1040px] px-4 lg:px-4">
                        <h1 className="text-heading-m font-bold mt-10 mb-5">
                            {projectTitle}
                        </h1>
                        <article className="bg-white w-full py-4 mb-10 rounded-md">
                            <Options activeTab={activeTab} setActiveTab={setActiveTab} />
                            <div className="border-b-1 border-gray-20 w-full"/>
                            <div className="mt-8 bg-transparent">
                                <StudentParticipationDetail studentId={studentId} />
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </div>
    );
}
