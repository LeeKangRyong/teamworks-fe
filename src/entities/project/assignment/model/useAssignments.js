import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { assignmentApi, filterByStatus, sortByDeadline, calculateAssignmentStats } from "@/entities/project/assignment";

export const useAssignments = () => {
    const params = useParams();
    const projectId = params?.id;

    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState("전체");

    useEffect(() => {
        if (!projectId) return;

        const loadAssignments = async () => {
            try {
                const data = await assignmentApi.getAssignments(projectId);
                setAssignments(data);
            } catch (error) {
                console.error("Failed to load assignments:", error);
            } finally {
                setLoading(false);
            }
        };

        loadAssignments();
    }, [projectId]);

    const filteredAssignments = useMemo(() => {
        const filtered = filterByStatus(assignments, statusFilter);
        return sortByDeadline(filtered);
    }, [assignments, statusFilter]);

    const stats = useMemo(() => {
        return calculateAssignmentStats(assignments);
    }, [assignments]);

    return {
        assignments: filteredAssignments,
        loading,
        statusFilter,
        setStatusFilter,
        stats
    };
};
