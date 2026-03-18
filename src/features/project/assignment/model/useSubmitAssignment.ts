import { useState } from 'react';
import { assignmentApi } from '@/entities/project/assignment';
import type { CreateSubmitDto } from '@/entities/project/assignment';

export const useSubmitAssignment = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submitAssignment = async (projectId: string, assignmentId: string, dto: CreateSubmitDto) => {
        setIsSubmitting(true);
        try {
            return await assignmentApi.createSubmit(projectId, assignmentId, dto);
        } catch (err) {
            throw err;
        } finally {
            setIsSubmitting(false);
        }
    };

    return { submitAssignment, isSubmitting };
};
