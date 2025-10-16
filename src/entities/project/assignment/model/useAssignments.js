import { useState, useEffect, useMemo } from "react";
import { assignmentApi, filterByStatus, sortByDeadline, calculateAssignmentStats } from "@/entities/project/assignment";

export const useAssignments = () => {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState("전체");

    useEffect(() => {
        const loadAssignments = () => {
            try {
                const data = assignmentApi.getAssignments();
                setAssignments(data);
            } catch (error) {
                console.error("Failed to load assignments:", error);
            } finally {
                setLoading(false);
            }
        };

        loadAssignments();
    }, []);

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