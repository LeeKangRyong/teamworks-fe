import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { assignmentApi } from "@/entities/project/assignment";
import type { Assignment } from './types'

export const useAssignmentDetail = (assignmentId: string | undefined) => {
    const params = useParams();
    const projectId = params?.id as string | undefined;

    const [assignment, setAssignment] = useState<Assignment | null>(null);
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
