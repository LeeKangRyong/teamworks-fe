// ProjectCards.jsx
"use client";
import Image from "next/image";
import { ProjectCard } from "@/entities/projects"
import { More, Add, MakeProject } from "@/features/projects";
import noProject from "@/assets/icons/no-project.png";

export function ProjectCards({ projects, setProjects }) {
    return (
        <section className="grid gap-x-6 gap-y-12 w-full h-full pb-20" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(max(280px, calc((100% - 48px) / 3)), 1fr))'}}>
            {projects.length > 0 ? (
                projects.map((project) => (
                    <ProjectCard 
                        key={project.id}
                        title={project.title} 
                        duration={project.duration} 
                        members={project.members}
                    >
                        <More />
                    </ProjectCard>
                ))
            ) : (
                <div className="col-span-full flex flex-col items-center justify-center min-h-[90vh]">
                    <Image src={noProject} alt="noProject" className="w-24 h-24 mb-5"/>
                    <p className="text-secondary-50 text-body-m text-center p-0.5">현재 생성된 프로젝트가 없습니다</p>
                    <p className="text-secondary-50 text-body-m text-center p-0.5 mb-8">새 프로젝트를 만들어 시작해보세요</p>
                    <MakeProject />
                </div>
            )}
        </section>
    );
}