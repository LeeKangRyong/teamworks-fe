"use client";
import { useState, useEffect } from "react";
import { LayoutHeader, LayoutAside } from "@/widgets/Layout";
import projectsData from "@/shared/mock/project/projectsData.json";
import { StudentParticipationDetail } from "@/widgets/Project/Participation";

export function ParticipationDetail({ projectId, studentId }) {
    const [isAsideCollapsed, setIsAsideCollapsed] = useState(false);
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
        <div className="bg-secondary-5 flex justify-center w-full min-h-screen relative">
            <LayoutHeader />
            <LayoutAside 
                isCollapsed={isMounted ? isAsideCollapsed : false} 
                onToggle={() => setIsAsideCollapsed(!isAsideCollapsed)} 
            />
            
            <div className="mt-20 ml-[208px]">
                <h1 className="text-heading-m mt-7 mb-5 font-bold">{projectTitle}</h1>
                <StudentParticipationDetail studentId={studentId} />
            </div>
        </div>
    );
}