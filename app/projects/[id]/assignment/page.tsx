
import { Assignment } from "@/pages/project/assignment"

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <Assignment id={id} />;
}