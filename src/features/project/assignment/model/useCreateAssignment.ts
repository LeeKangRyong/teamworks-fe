import { useState } from 'react';
import { assignmentApi } from '@/entities/project/assignment';
import type { CreateAssignmentDto } from '@/entities/project/assignment';

export const useCreateAssignment = () => {
    const [isCreating, setIsCreating] = useState(false);

    const createAssignment = async (projectId: string, dto: CreateAssignmentDto) => {
        setIsCreating(true);
        try {
            return await assignmentApi.createAssignment(projectId, dto);
        } catch (err) {
            throw err;
        } finally {
            setIsCreating(false);
        }
    };

    return { createAssignment, isCreating };
};
