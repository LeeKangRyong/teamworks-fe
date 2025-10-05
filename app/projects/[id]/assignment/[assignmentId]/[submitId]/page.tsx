import { SubmitDetail } from "@/pages/project/assignment";

export default async function SubmitDetailPage({ params }) {
    const { id: projectId, assignmentId, submitId } = await params;
    
    return <SubmitDetail projectId={projectId} assignmentId={assignmentId} submitId={submitId} />;
}