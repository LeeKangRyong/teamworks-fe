"use client";
import { useState, useEffect } from "react";
import { LayoutHeader, LayoutAside } from "@/widgets/Layout";
import { StudentParticipationDetail } from "@/widgets/Project/Participation";
import { Options } from "@/features/project/layout";
import { projectsData } from "@/shared/mock";
import { useAsideStore } from "@/widgets/Layout";

interface Props {
    projectId: string | number;
    studentId: string | number;
}

export function ParticipationDetail({ projectId, studentId }: Props) {
    const [activeTab, setActiveTab] = useState("participation");
    const { isCollapsed } = useAsideStore();
    const [projectTitle, setProjectTitle] = useState("");

    useEffect(() => {
        const fetchProjectData = async () => {
            try {
                const project = projectsData.find(p => p.project_id === parseInt(String(projectId)));
                if (project) {
                    setProjectTitle(project.name);
                } else {
                    setProjectTitle("프로젝트를 찾을 수 없습니다");
                }
            } catch (err) {
                console.error('Error fetching project:', err);
                setProjectTitle("프로젝트 로딩 오류");
            }
        };

        if (projectId) {
            fetchProjectData();
        }
    }, [projectId]);

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
