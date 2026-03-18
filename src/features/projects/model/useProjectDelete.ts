import { useState } from 'react';
import { projectApi } from '@/entities/projects';

export const useProjectDelete = () => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deleteProject = async (projectId: string | number) => {
        setIsDeleting(true);
        setError(null);

        try {
            const result = await projectApi.deleteProject(projectId);
            return result;
        } catch (err: unknown) {
            const e = err as { message?: string };
            console.error('프로젝트 삭제 실패:', err);
            setError(e.message || '프로젝트 삭제에 실패했습니다.');
            throw err;
        } finally {
            setIsDeleting(false);
        }
    };

    return {
        deleteProject,
        isDeleting,
        error
    };
};
