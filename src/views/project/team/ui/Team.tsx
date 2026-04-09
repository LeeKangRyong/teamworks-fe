"use client";
import { useParams } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { LayoutHeader, LayoutAside } from "@/widgets/Layout";
import { TeamWidget } from "@/widgets/Project/Whole";
import { Options } from "@/features/project/layout";
import { projectsData } from "@/shared/mock";
import type { Project } from "@/entities/projects";

interface Props {
    id?: string;
}

export function Team({ id }: Props) {
    const [activeTab, setActiveTab] = useState("team");
    const [initialStatus, setInitialStatus] = useState<string | null>(null);

    const params = useParams();
    const projectId = params.id || id;

    const searchParams = useSearchParams();

    useEffect(() => {
        const statusParam = searchParams.get('status');
        if (statusParam) {
            setInitialStatus(statusParam);
        }
    }, [searchParams]);

    const projectData = useMemo(() =>
        projectsData.find(project =>
            project.project_id === parseInt(String(projectId))
        ) as Project ?? null,
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
                            {projectData?.name || "과목"}
                        </h1>
                        <article className="bg-white w-full py-4 mb-10 rounded-md">
                            <Options activeTab={activeTab} setActiveTab={setActiveTab} />
                            <div className="border-b-1 border-gray-20 w-full"/>
                            <div className="mt-8 bg-transparent">
                                <TeamWidget initialStatus={initialStatus ?? undefined} />
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </div>
    );
}
