import { SubmitDetail } from "@/views/project/assignment";

export default async function SubmitDetailPage({ params }: { params: Promise<{ id: string; assignmentId: string; submitId: string }> }) {
    const { id: projectId, assignmentId, submitId } = await params;
    
    return <SubmitDetail projectId={projectId} assignmentId={assignmentId} submitId={submitId} />;
}