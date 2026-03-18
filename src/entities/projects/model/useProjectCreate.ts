import { useState } from 'react';
import { projectApi } from '../api/projectApi';
import type { Project, CreateProjectDto } from './types'

export const useProjectCreate = () => {
    const [isCreating, setIsCreating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [createdProject, setCreatedProject] = useState<Project | null>(null);

    const createProject = async (projectData: CreateProjectDto) => {
        setIsCreating(true);
        setError(null);

        try {
            const result = await projectApi.createProject(projectData);
            setCreatedProject(result);
            return result;
        } catch (err: unknown) {
            const e = err as { message?: string };
            console.error('프로젝트 생성 실패:', err);
            setError(e.message || '프로젝트 생성에 실패했습니다.');
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
