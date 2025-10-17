"use client";
import { useState, useEffect } from "react";
import { LayoutHeader, LayoutAside } from "@/widgets/Layout";
import { StudentParticipationDetail } from "@/widgets/Project/Participation";
import { Options } from "@/features/project/layout";
import { projectsData } from "@/shared/mock";
import { useAsideStore } from "@/widgets/Layout";

export function ParticipationDetail({ projectId, studentId }) {
    const [activeTab, setActiveTab] = useState("participation");
    const { isCollapsed } = useAsideStore();
    const [isMounted, setIsMounted] = useState(false);
    const [projectTitle, setProjectTitle] = useState("");

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const fetchProjectData = async () => {
            try {
                // API 호출 (주석 처리)
                // const projectResponse = await fetch(`/api/projects/${projectId}`);
                // if (!projectResponse.ok) {
                //     throw new Error('Failed to fetch project');
                // }
                // const project = await projectResponse.json();
                // setProjectTitle(project.title);

                const project = projectsData.find(p => p.project_id === parseInt(projectId));
                if (project) {
                    setProjectTitle(project.title);
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