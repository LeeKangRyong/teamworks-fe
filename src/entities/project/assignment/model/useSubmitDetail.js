import { useState, useEffect } from "react";
import { assignmentApi } from "@/entities/project/assignment";

export const useSubmitDetail = (submitId) => {
    const [submit, setSubmit] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!submitId) {
            setSubmit(null);
            setLoading(false);
            return;
        }

        const loadSubmit = () => {
            try {
                const data = assignmentApi.getSubmitById(submitId);
                setSubmit(data);
            } catch (error) {
                console.error("Failed to load submit:", error);
            } finally {
                setLoading(false);
            }
        };

        loadSubmit();
    }, [submitId]);

    const handleMemoUpdate = async (memo) => {
        try {
            await assignmentApi.updateSubmitMemo(submitId, memo);
            setSubmit(prev => prev ? { ...prev, memo } : null);
        } catch (error) {
            console.error("Failed to update memo:", error);
            throw error;
        }
    };

    return {
        submit,
        loading,
        handleMemoUpdate
    };
};