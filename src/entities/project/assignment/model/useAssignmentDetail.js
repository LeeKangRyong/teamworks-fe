import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { assignmentApi } from "@/entities/project/assignment";

export const useAssignmentDetail = (assignmentId) => {
    const params = useParams();
    const projectId = params?.id;

    const [assignment, setAssignment] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!assignmentId || !projectId) {
            setAssignment(null);
            setLoading(false);
            return;
        }

        const loadAssignment = async () => {
            try {
                const data = await assignmentApi.getAssignmentById(projectId, assignmentId);
                setAssignment(data);
            } catch (error) {
                console.error("Failed to load assignment:", error);
            } finally {
                setLoading(false);
            }
        };

        loadAssignment();
    }, [assignmentId, projectId]);

    return { assignment, loading };
};
