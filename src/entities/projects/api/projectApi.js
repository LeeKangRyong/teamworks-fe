import { apiClient } from '@/shared/api/client';
import { ENDPOINTS } from '@/shared/api/endpoints';
import { USE_MOCK, projectsData } from '@/shared/mock';
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
                    // Mock: 모든 프로젝트 반환
                    resolve(projectsData);
                }, 300);
            });
        }

        try {
            const token = tokenStorage.getAccessToken();
            const user = tokenStorage.getUser(); // user 정보에서 user_id 가져오기
            
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
                        resolve({
                            id: project.project_id,
                            name: project.title,
                            description: "프로젝트 설명",
                            type: "TEAM_PROJECT",
                            status: "ACTIVE",
                            startDate: "2024-09-01T09:00:00",
                            endDate: "2024-12-15T18:00:00",
                            inviteCode: "ABC12345",
                            maxTeamSize: 4,
                            maxParticipants: 100,
                            participantCount: parseInt(project.members),
                            teamCount: 6,
                            daysRemaining: 120,
                            isActive: true,
                            createdAt: "2024-08-20T10:00:00",
                            updatedAt: "2024-08-20T10:00:00"
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
                        'X-Manager-ID': user?.user_id || '',
                        'X-User-ID': user?.user_id || ''
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
                        'X-User-ID': user?.user_id || ''
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
                    resolve({
                        id: Date.now(),
                        ...projectData,
                        status: "ACTIVE",
                        createdAt: new Date().toISOString()
                    });
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
                        'X-Manager-ID': user?.user_id || ''
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
                    resolve({
                        id: projectId,
                        ...projectData,
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
                        'X-Manager-ID': user?.user_id || ''
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
                    resolve({ success: true });
                }, 300);
            });
        }

        try {
            const user = tokenStorage.getUser();
            const response = await apiClient.delete(
                ENDPOINTS.PROJECTS.DELETE(projectId),
                {
                    headers: {
                        'X-Manager-ID': user?.user_id || ''
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