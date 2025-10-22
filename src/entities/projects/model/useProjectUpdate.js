import { useState } from 'react';
import { projectApi } from '../api/projectApi';

/**
 * 프로젝트 수정 Hook
 * @returns {Object} { updateProject, isUpdating, error }
 */

export const useProjectUpdate = () => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState(null);

    const updateProject = async (projectId, projectData) => {
        setIsUpdating(true);
        setError(null);
        
        try {
            const result = await projectApi.updateProject(projectId, projectData);
            return result;
        } catch (err) {
            console.error('프로젝트 수정 실패:', err);
            setError(err.message || '프로젝트 수정에 실패했습니다.');
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