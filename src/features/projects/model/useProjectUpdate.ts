import { useState } from 'react';
import { projectApi } from '@/entities/projects';
import type { CreateProjectDto } from '@/entities/projects';

export const useProjectUpdate = () => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateProject = async (projectId: string | number, projectData: Partial<CreateProjectDto>) => {
        setIsUpdating(true);
        setError(null);

        try {
            const result = await projectApi.updateProject(projectId, projectData);
            return result;
        } catch (err: unknown) {
            const e = err as { message?: string };
            console.error('프로젝트 수정 실패:', err);
            setError(e.message || '프로젝트 수정에 실패했습니다.');
            throw err;
        } finally {
            setIsUpdating(false);
        }
    };

    return {
        updateProject,
        isUpdating,
        error
    };
};
