
import { Assignment } from "@/views/project/assignment"

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <Assignment id={id} />;
}