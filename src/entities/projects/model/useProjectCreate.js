import { useState } from 'react';
import { projectApi } from '../api/projectApi';

/**
 * 프로젝트 생성 Hook
 * @returns {Object} { createProject, isCreating, error, createdProject }
 */

export const useProjectCreate = () => {
    const [isCreating, setIsCreating] = useState(false);
    const [error, setError] = useState(null);
    const [createdProject, setCreatedProject] = useState(null);

    const createProject = async (projectData) => {
        setIsCreating(true);
        setError(null);
        
        try {
            const result = await projectApi.createProject(projectData);
            setCreatedProject(result);
            return result;
        } catch (err) {
            console.error('프로젝트 생성 실패:', err);
            setError(err.message || '프로젝트 생성에 실패했습니다.');
            throw err;
        } finally {
            setIsCreating(false);
        }
    };

    return {
        createProject,
        isCreating,
        error,
        createdProject
    };
};