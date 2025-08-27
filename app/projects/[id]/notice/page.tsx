
import { Notice } from "@/pages/project/notice"

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <Notice id={id} />;
}