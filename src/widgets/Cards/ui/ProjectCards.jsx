import { ProjectCard } from "@/entities/projects"
import { More } from "@/features/projects";
import { Add } from "@/features/projects";

export function ProjectCards() {
    return (
        <section className="grid gap-x-6 gap-y-12 w-full h-full pb-20" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(max(280px, calc((100% - 48px) / 3)), 1fr))'}}>
            <ProjectCard title="2025 스타트업 프로젝트" duration="7월 24일" members="32">
                <More />
            </ProjectCard>
            <ProjectCard title="프랑스어기초" duration="7월 24일" members="32">
                <More />
            </ProjectCard>
            <ProjectCard title="자료구조및실습" duration="7월 24일" members="32">
                <More />
            </ProjectCard>
            <ProjectCard title="프랑스어기초" duration="7월 24일" members="32">
                <More />
            </ProjectCard>
            <ProjectCard title="프랑스어기초" duration="7월 24일" members="32">
                <More />
            </ProjectCard>
            <ProjectCard title="프랑스어기초" duration="7월 24일" members="32">
                <More />
            </ProjectCard>
            <ProjectCard title="프랑스어기초" duration="7월 24일" members="32">
                <More />
            </ProjectCard>
            <ProjectCard title="프랑스어기초" duration="7월 24일" members="32">
                <More />
            </ProjectCard>
            <ProjectCard title="프랑스어기초" duration="7월 24일" members="32">
                <More />
            </ProjectCard>
            <ProjectCard title="프랑스어기초" duration="7월 24일" members="32">
                <More />
            </ProjectCard>
        </section>
    );
}