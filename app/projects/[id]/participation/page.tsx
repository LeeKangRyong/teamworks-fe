
import { Participation } from "@/views/project/participation"

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <Participation id={id} />;
}