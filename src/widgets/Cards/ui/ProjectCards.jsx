import { ProjectCard } from "@/entities/projects"
import { More } from "@/features/projects";
import { Add } from "@/features/projects";

export function ProjectCards() {
    return (
        <section>
            <section className="grid grid-cols-3 gap-x-6 gap-y-12 w-full h-full">
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
            <Add />
        </section>

    );
}