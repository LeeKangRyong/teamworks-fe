import { Project } from "@/pages/project";

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <Project id={id} />;
}