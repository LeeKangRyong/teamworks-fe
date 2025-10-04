import { AssignmentDetail } from "@/pages/project/assignment";

export default async function AssignmentDetailPage({ params }) {
    const { id: projectId, assignmentId } = await params;
    
    return <AssignmentDetail projectId={projectId} assignmentId={assignmentId} />;
}