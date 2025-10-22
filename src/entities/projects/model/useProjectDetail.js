import { useState, useEffect } from 'react';
import { projectApi } from '../api/projectApi';

export const useProjectDetail = (projectId) => {
    const [project, setProject] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProjectDetail = async () => {
        if (!projectId) return;

        try {
            setIsLoading(true);
            setError(null);
            const data = await projectApi.getProjectDetail(projectId);
            setProject(data);
        } catch (err) {
            console.error('프로젝트 상세 조회 실패:', err);
            setError(err.message || '프로젝트 정보를 불러올 수 없습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProjectDetail();
    }, [projectId]);

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