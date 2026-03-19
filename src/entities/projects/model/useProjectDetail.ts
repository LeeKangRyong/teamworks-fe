import { useState, useEffect, useCallback } from 'react';
import { projectApi } from '../api/projectApi';
import type { Project } from './types'

export const useProjectDetail = (projectId: string | number | undefined) => {
    const [project, setProject] = useState<Project | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProjectDetail = useCallback(async () => {
        if (!projectId) return;

        try {
            setIsLoading(true);
            setError(null);
            const data = await projectApi.getProjectDetail(projectId);
            setProject(data);
        } catch (err: unknown) {
            const e = err as { message?: string };
            console.error('프로젝트 상세 조회 실패:', err);
            setError(e.message || '프로젝트 정보를 불러올 수 없습니다.');
        } finally {
            setIsLoading(false);
        }
    }, [projectId]);

    useEffect(() => {
        fetchProjectDetail();
    }, [fetchProjectDetail]);

    const refreshProject = () => {
        fetchProjectDetail();
    };

    return {
        project,
        isLoading,
        error,
        refreshProject
    };
};
