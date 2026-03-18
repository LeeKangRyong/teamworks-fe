import { Team } from "@/views/project/team";

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <Team id={id} />;
}