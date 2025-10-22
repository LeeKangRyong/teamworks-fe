import { useState } from 'react';
import { projectApi } from '../api/projectApi';

/**
 * 프로젝트 삭제 Hook
 * @returns {Object} { deleteProject, isDeleting, error }
 */

export const useProjectDelete = () => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState(null);

    const deleteProject = async (projectId) => {
        setIsDeleting(true);
        setError(null);
        
        try {
            const result = await projectApi.deleteProject(projectId);
            return result;
        } catch (err) {
            console.error('프로젝트 삭제 실패:', err);
            setError(err.message || '프로젝트 삭제에 실패했습니다.');
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