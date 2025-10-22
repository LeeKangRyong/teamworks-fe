import { useState, useEffect } from 'react';
import { projectApi } from '../api/projectApi';

export const useProjects = () => {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProjects = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await projectApi.getMyProjects();
            setProjects(data);
        } catch (err) {
            console.error('프로젝트 목록 조회 실패:', err);
            setError(err.message || '프로젝트를 불러올 수 없습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const refreshProjects = () => {
        fetchProjects();
    };

    return {
        projects,
        setProjects,
        isLoading,
        error,
        refreshProjects
    };
};