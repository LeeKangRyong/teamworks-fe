import { useState } from 'react';
import { assignmentApi } from '@/entities/project/assignment';

export const useSaveMemo = (projectId: string, assignmentId: string, submitId: string) => {
    const [isSaving, setIsSaving] = useState(false);

    const saveMemo = async (memo: string) => {
        setIsSaving(true);
        try {
            await assignmentApi.updateSubmitMemo(projectId, assignmentId, submitId, memo);
        } finally {
            setIsSaving(false);
        }
    };

    return { saveMemo, isSaving };
};
