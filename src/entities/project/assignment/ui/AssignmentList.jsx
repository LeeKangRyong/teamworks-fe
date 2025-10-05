"use client";
import { useRouter, useParams } from "next/navigation";
import { AssignmentItem } from "@/shared/ui/project/assignment";

export function AssignmentList({ assignmentsData }) {
    const router = useRouter();
    const params = useParams();
    const projectId = params.id;

    const handlePart = (assignmentId) => {
        router.push(`/projects/${projectId}/assignment/${assignmentId}`);
    };
    
    return (
        <article className="h-106 mt-1 overflow-y-auto scrollbar-thin">
            {assignmentsData && assignmentsData.length > 0 ? (
                assignmentsData.map((assignment) => (
                    <AssignmentItem
                        key={assignment.assignment_id}
                        title={assignment.title}
                        deadline={assignment.deadline}
                        submit={assignment.submit}
                        mark={assignment.mark}
                        status={assignment.status}
                        onClick={() => handlePart(assignment.assignment_id)} 
                    />
                ))
            ) : (
                <div className="flex flex-col justify-center items-center py-16">
                    <p className="text-body-s text-secondary-60 mb-2">등록된 과제가 없습니다</p>
                    <p className="text-body-s text-secondary-60 mb-4">새로운 과제를 추가해보세요</p>
                </div>
            )}
        </article>
    );
}