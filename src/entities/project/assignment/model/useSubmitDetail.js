import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { assignmentApi } from "@/entities/project/assignment";

export const useSubmitDetail = (submitId) => {
    const params = useParams();
    const projectId = params?.id;
    const assignmentId = params?.assignmentId;

    const [submit, setSubmit] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!submitId || !projectId || !assignmentId) {
            setSubmit(null);
            setLoading(false);
            return;
        }

        const loadSubmit = async () => {
            try {
                const data = await assignmentApi.getSubmitById(projectId, assignmentId, submitId);
                setSubmit(data);
            } catch (error) {
                console.error("Failed to load submit:", error);
            } finally {
                setLoading(false);
            }
        };

        loadSubmit();
    }, [submitId, projectId, assignmentId]);

    const handleMemoUpdate = async (memo) => {
        try {
            await assignmentApi.updateSubmitMemo(projectId, assignmentId, submitId, memo);
            setSubmit(prev => prev ? { ...prev, memo } : null);
        } catch (error) {
            console.error("Failed to update memo:", error);
            throw error;
        }
    };

    return { submit, loading, handleMemoUpdate };
};
