"use client"
import { useState, useEffect } from "react";
import { assignmentsData } from "@/shared/mock";
import { AssignmentTitle, SubmitListWidget } from "@/widgets/Project/Assignment";
import { GoBack } from "@/features/project/participation";

export function AssignmentDetailWidget({ assignmentId }) {

    const [assignmentData, setAssignmentData] = useState(null);

    useEffect(() => {
        const found = assignmentsData.find(
            assignment => assignment.assignment_id === parseInt(assignmentId)
        );
        setAssignmentData(found);
    }, [assignmentId]);

    if (!assignmentData) {
        return <div>Loading...</div>;
    }

    return (
        <main className="bg-white w-250 py-4 mb-10 relative">
            <GoBack />
            <AssignmentTitle 
                title={assignmentData.title}
                description="과제 설명입니다"
                duration={assignmentData.deadline}
                point="100점"
                submit={assignmentData.submit}
                mark={assignmentData.mark}
            />
            <SubmitListWidget assignmentId={assignmentId} />
        </main>
    )
}