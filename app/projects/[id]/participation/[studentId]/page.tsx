import { ParticipationDetail } from "@/views/project/participation";

export default async function ParticipationDetailPage({ params }: { params: Promise<{ id: string; studentId: string }> }) {
    const { id: projectId, studentId } = await params;
    
    return <ParticipationDetail projectId={projectId} studentId={studentId} />;
}