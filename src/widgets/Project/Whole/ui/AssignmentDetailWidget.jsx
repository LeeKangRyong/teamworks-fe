"use client"
import { useAssignmentDetail } from "@/entities/project/assignment";
import { AssignmentTitle, SubmitListWidget } from "@/widgets/Project/Assignment";
import { GoBack } from "@/features/project/participation";

export function AssignmentDetailWidget({ assignmentId }) {
    const { assignment, loading } = useAssignmentDetail(assignmentId);

    if (loading || !assignment) {
        return <div>Loading...</div>;
    }

    return (
        <main className="bg-white w-250 py-4 mb-10 relative">
            <GoBack />
            <AssignmentTitle 
                title={assignment.title}
                description="과제 설명입니다"
                duration={assignment.deadline}
                point="100점"
                submit={assignment.submit}
                mark={assignment.mark}
            />
            <SubmitListWidget assignmentId={assignmentId} />
        </main>
    )
}