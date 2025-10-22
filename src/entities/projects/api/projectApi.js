import { apiClient } from '@/shared/api/client';
import { ENDPOINTS } from '@/shared/api/endpoints';
import { USE_MOCK } from '@/shared/mock';
import projectsData from '@/shared/mock/project/projectsData.json';
import { tokenStorage } from '@/shared/lib/tokenStorage';

export const projectApi = {
    /**
     * 내 프로젝트 목록 조회
     * GET /api/projects/my
     * Header: X-Manager-ID or X-User-ID
     */
    getMyProjects: async () => {
        if (USE_MOCK) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    // Mock: JSON 파일에서 모든 프로젝트 반환
                    resolve(projectsData);
                }, 300);
            });
        }

        try {
            const user = tokenStorage.getUser();
            
            const response = await apiClient.get(ENDPOINTS.PROJECTS.MY, {
                headers: {
                    'X-Manager-ID': user?.user_id || '',
                    'X-User-ID': user?.user_id || ''
                }
            });
            return response.data;
        } catch (error) {
            throw {
                message: error.response?.data?.message || '프로젝트 목록 조회 실패',
                status: error.response?.status || 500
            };
        }
    },

    /**
     * 프로젝트 상세 조회
     * GET /api/projects/{projectId}
     * Header: X-Manager-ID or X-User-ID
     */
    getProjectDetail: async (projectId) => {
        if (USE_MOCK) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const project = projectsData.find(
                        p => p.project_id === parseInt(projectId)
                    );

                    if (project) {
                        // JSON 데이터를 API 응답 형식으로 변환
                        resolve({
                            id: project.project_id,
                            name: project.name,
                            description: project.description || "프로젝트 설명",
                            type: project.type || "TEAM_PROJECT",
                            status: project.status || "ACTIVE",
                            startDate: project.startDate || "2024-09-01T09:00:00",
                            endDate: project.endDate || "2024-12-15T18:00:00",
                            inviteCode: project.inviteCode || "ABC12345",
                            maxTeamSize: project.maxTeamSize || 4,
                            maxParticipants: project.maxParticipants || 100,
                            participantCount: project.participantCount || parseInt(project.members),
                            teamCount: project.teamCount || 6,
                            daysRemaining: project.daysRemaining || 120,
                            isActive: project.isActive !== undefined ? project.isActive : true,
                            createdAt: project.createdAt || "2024-08-20T10:00:00",
                            updatedAt: project.updatedAt || "2024-08-20T10:00:00"
                        });
                    } else {
                        reject({
                            message: '프로젝트를 찾을 수 없습니다.',
                            status: 404
                        });
                    }
                }, 300);
            });
        }

        try {
            const user = tokenStorage.getUser();
            const response = await apiClient.get(
                ENDPOINTS.PROJECTS.DETAIL(projectId),
                {
                    headers: {
                        'X-Manager-ID': user?.id || '',
                        'X-User-ID': user?.id || ''
                    }
                }
            );
            return response.data;
        } catch (error) {
            throw {
                message: error.response?.data?.message || '프로젝트 조회 실패',
                status: error.response?.status || 500
            };
        }
    },

    /**
     * 참여 중인 프로젝트 목록 조회
     * GET /api/projects/participating
     * Header: X-User-ID
     */
    getParticipatingProjects: async () => {
        if (USE_MOCK) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    // Mock: JSON 파일에서 모든 프로젝트 반환
                    resolve(projectsData);
                }, 300);
            });
        }

        try {
            const user = tokenStorage.getUser();
            const response = await apiClient.get(
                ENDPOINTS.PROJECTS.PARTICIPATING,
                {
                    headers: {
                        'X-User-ID': user?.id || ''
                    }
                }
            );
            return response.data;
        } catch (error) {
            throw {
                message: error.response?.data?.message || '참여 프로젝트 조회 실패',
                status: error.response?.status || 500
            };
        }
    },

    /**
     * 프로젝트 생성
     * POST /api/projects
     * Header: X-Manager-ID
     */
    createProject: async (projectData) => {
        if (USE_MOCK) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    // Mock: 새 프로젝트 생성 시뮬레이션
                    const newProject = {
                        id: Date.now(),
                        project_id: Date.now(),
                        name: projectData.name,
                        description: projectData.description,
                        type: "TEAM_PROJECT",
                        status: "ACTIVE",
                        startDate: projectData.startDate,
                        endDate: projectData.endDate,
                        duration: `${projectData.startDate.split('T')[0]} - ${projectData.endDate.split('T')[0]}`,
                        inviteCode: Math.random().toString(36).substring(2, 10).toUpperCase(),
                        maxTeamSize: projectData.maxTeamSize,
                        maxParticipants: projectData.maxParticipants,
                        members: "0",
                        participantCount: 0,
                        teamCount: 0,
                        daysRemaining: Math.floor((new Date(projectData.endDate) - new Date()) / (1000 * 60 * 60 * 24)),
                        isActive: true,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString()
                    };
                    
                    // 실제로는 JSON 파일에 추가되지 않음 (Mock이므로)
                    // 실제 API 연동 시에는 서버에서 처리
                    resolve(newProject);
                }, 300);
            });
        }

        try {
            const user = tokenStorage.getUser();
            const response = await apiClient.post(
                ENDPOINTS.PROJECTS.CREATE,
                projectData,
                {
                    headers: {
                        'X-Manager-ID': user?.id || ''
                    }
                }
            );
            return response.data;
        } catch (error) {
            throw {
                message: error.response?.data?.message || '프로젝트 생성 실패',
                status: error.response?.status || 500
            };
        }
    },

    /**
     * 프로젝트 수정
     * PUT /api/projects/{projectId}
     * Header: X-Manager-ID
     */
    updateProject: async (projectId, projectData) => {
        if (USE_MOCK) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    // Mock: 프로젝트 수정 시뮬레이션
                    resolve({
                        id: projectId,
                        name: projectData.name,
                        description: projectData.description,
                        startDate: projectData.startDate,
                        endDate: projectData.endDate,
                        maxTeamSize: projectData.maxTeamSize,
                        maxParticipants: projectData.maxParticipants,
                        updatedAt: new Date().toISOString()
                    });
                }, 300);
            });
        }

        try {
            const user = tokenStorage.getUser();
            const response = await apiClient.put(
                ENDPOINTS.PROJECTS.UPDATE(projectId),
                projectData,
                {
                    headers: {
                        'X-Manager-ID': user?.id || ''
                    }
                }
            );
            return response.data;
        } catch (error) {
            throw {
                message: error.response?.data?.message || '프로젝트 수정 실패',
                status: error.response?.status || 500
            };
        }
    },

    /**
     * 프로젝트 삭제
     * DELETE /api/projects/{projectId}
     * Header: X-Manager-ID
     */
    deleteProject: async (projectId) => {
        if (USE_MOCK) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    // Mock: 프로젝트 삭제 시뮬레이션
                    resolve({ 
                        success: true,
                        message: "프로젝트가 성공적으로 삭제되었습니다" 
                    });
                }, 300);
            });
        }

        try {
            const user = tokenStorage.getUser();
            const response = await apiClient.delete(
                ENDPOINTS.PROJECTS.DELETE(projectId),
                {
                    headers: {
                        'X-Manager-ID': user?.id || ''
                    }
                }
            );
            return response.data;
        } catch (error) {
            throw {
                message: error.response?.data?.message || '프로젝트 삭제 실패',
                status: error.response?.status || 500
            };
        }
    }
};