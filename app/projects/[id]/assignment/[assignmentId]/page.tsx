import { AssignmentDetail } from "@/views/project/assignment";

export default async function AssignmentDetailPage({ params }: { params: Promise<{ id: string; assignmentId: string }> }) {
    const { id: projectId, assignmentId } = await params;
    
    return <AssignmentDetail projectId={projectId} assignmentId={assignmentId} />;
}