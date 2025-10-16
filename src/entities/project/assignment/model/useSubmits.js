import { useState, useEffect, useMemo } from "react"
import { assignmentApi, searchSubmits, filterSubmitsByStatus } from "@/entities/project/assignment";

export const useSubmits = (assignmentId) => {
    const [submits, setSubmits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("전체");

    useEffect(() => {
        const loadSubmits = () => {
            try {
                const data = assignmentId 
                    ? assignmentApi.getSubmitsByAssignment(assignmentId)
                    : assignmentApi.getSubmits();
                setSubmits(data);
            } catch (error) {
                console.error("Failed to load submits:", error);
            } finally {
                setLoading(false);
            }
        };

        loadSubmits();
    }, [assignmentId]);

    const filteredSubmits = useMemo(() => {
        let result = submits;
        result = searchSubmits(result, searchTerm);
        result = filterSubmitsByStatus(result, statusFilter);
        return result;
    }, [submits, searchTerm, statusFilter]);

    const handleMemoUpdate = async (submitId, memo) => {
        try {
            await assignmentApi.updateSubmitMemo(submitId, memo);
            setSubmits(prev => 
                prev.map(submit => 
                    submit.submit_id === submitId 
                        ? { ...submit, memo }
                        : submit
                )
            );
        } catch (error) {
            console.error("Failed to update memo:", error);
        }
    };

    return {
        submits: filteredSubmits,
        loading,
        searchTerm,
        setSearchTerm,
        statusFilter,
        setStatusFilter,
        handleMemoUpdate
    };
};