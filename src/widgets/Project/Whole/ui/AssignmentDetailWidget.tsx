"use client"
import { useAssignmentDetail } from "@/entities/project/assignment";
import { AssignmentTitle, SubmitListWidget } from "@/widgets/Project/Assignment";
import { ParticipantSubmitWidget } from "@/widgets/Project/Assignment";
import { GoBack } from "@/features/project/participation";
import { useAuth } from "@/entities/auth";

interface Props {
    assignmentId: string | number;
}

export function AssignmentDetailWidget({ assignmentId }: Props) {
    const { assignment, loading } = useAssignmentDetail(assignmentId as string);
    const { user } = useAuth();

    if (loading || !assignment) {
        return <div>Loading...</div>;
    }

    return (
        <main className="w-full max-w-[1000px] mx-auto py-4 mb-10 px-4 relative">
            <GoBack />
            <AssignmentTitle
                title={assignment.title}
                description="설명입니다~"
                duration={assignment.deadline}
                point="15점"
                submit={assignment.submit}
                mark={assignment.mark}
            />

            {user?.role === 'PARTICIPANT' ? (
                <ParticipantSubmitWidget assignmentId={assignmentId} />
            ) : (
                <SubmitListWidget assignmentId={assignmentId} />
            )}
        </main>
    )
}
