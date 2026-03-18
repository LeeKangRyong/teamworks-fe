import { ParticipationDetail } from "@/views/project/participation";

export default async function ParticipationDetailPage({ params }) {
    const { id: projectId, studentId } = await params;
    
    return <ParticipationDetail projectId={projectId} studentId={studentId} />;
}