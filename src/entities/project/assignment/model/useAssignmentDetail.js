import { useState, useEffect } from "react";
import { assignmentApi } from "@/entities/project/assignment";

/**
 * 특정 과제 상세 정보 조회 Hook
 */
export const useAssignmentDetail = (assignmentId) => {
    const [assignment, setAssignment] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!assignmentId) {
            setAssignment(null);
            setLoading(false);
            return;
        }

        const loadAssignment = () => {
            try {
                const data = assignmentApi.getAssignmentById(assignmentId);
                setAssignment(data);
            } catch (error) {
                console.error("Failed to load assignment:", error);
            } finally {
                setLoading(false);
            }
        };

        loadAssignment();
    }, [assignmentId]);

    return {
        assignment,
        loading
    };
};