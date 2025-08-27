
import { Dashboard } from "@/pages/project/dashboard"

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <Dashboard id={id} />;
}