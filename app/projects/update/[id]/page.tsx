"use client";
import { useParams } from "next/navigation";
import { ProjectsUpdate } from "@/pages/projects";

export default function ProjectsUpdatePage() {
    const params = useParams();
    const projectId = params?.id as string;

    if (!projectId) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-body-m text-secondary-60">프로젝트를 찾을 수 없습니다.</p>
            </div>
        );
    }

    return (
        <ProjectsUpdate projectId={projectId} />
    );
}