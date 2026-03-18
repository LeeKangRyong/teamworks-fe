import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { assignmentApi } from "@/entities/project/assignment";
import type { Submit } from './types'

export const useSubmitDetail = (submitId: string | undefined) => {
    const params = useParams();
    const projectId = params?.id as string | undefined;
    const assignmentId = params?.assignmentId as string | undefined;

    const [submit, setSubmit] = useState<Submit | null>(null);
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

    const handleMemoUpdate = async (memo: string) => {
        if (!projectId || !assignmentId || !submitId) return;
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
