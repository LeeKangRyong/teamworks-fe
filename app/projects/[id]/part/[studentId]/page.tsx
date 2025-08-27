import { ParticipationDetail } from "@/pages/project";

export default function ParticipationDetailPage({ params }) {
    const projectId = params.id;  
    const studentId = params.studentId;
    
    return <ParticipationDetail projectId={projectId} studentId={studentId} />;
}