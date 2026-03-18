import { apiClient } from '@/shared/api/client';
import { ENDPOINTS } from '@/shared/api/endpoints';
import { USE_MOCK } from '@/shared/mock';
import projectsData from '@/shared/mock/project/projectsData.json';
import { tokenStorage } from '@/shared/lib/tokenStorage';
import type { Project, CreateProjectDto } from '../model/types'
import type { ApiError } from '@/shared/api/types'

export const projectApi = {
    /**
     * 내 프로젝트 목록 조회
     * GET /api/projects/my
     * Header: X-Manager-ID or X-User-ID
     */
    getMyProjects: async (): Promise<Project[]> => {
        if (USE_MOCK) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(projectsData as Project[]);
                }, 300);
            });
        }

        try {
            const user = tokenStorage.getUser();

            const response = await apiClient.get(ENDPOINTS.PROJECTS.MY, {
                headers: {
                    'X-Manager-ID': String(user?.id || ''),
                    'X-User-ID': String(user?.id || '')
                }
            });
            return response.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string }; status?: number } };
            throw {
                message: err.response?.data?.message || '프로젝트 목록 조회 실패',
                status: err.response?.status || 500
            } as ApiError;
        }
    },

    /**
     * 프로젝트 상세 조회
     * GET /api/projects/{projectId}
     * Header: X-Manager-ID or X-User-ID
     */
    getProjectDetail: async (projectId: string | number): Promise<Project> => {
        if (USE_MOCK) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const project = (projectsData as Project[]).find(
                        p => p.project_id === parseInt(String(projectId))
                    );

                    if (project) {
                        resolve({
                            ...project,
                            description: project.description || "프로젝트 설명",
                            type: project.type || "TEAM_PROJECT",
                            status: project.status || "ACTIVE",
                            startDate: project.startDate || "2024-09-01T09:00:00",
                            endDate: project.endDate || "2024-12-15T18:00:00",
                            inviteCode: project.inviteCode || "ABC12345",
                            maxTeamSize: project.maxTeamSize || 4,
                            maxParticipants: project.maxParticipants || 100,
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
                        } as ApiError);
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
                        'X-Manager-ID': String(user?.id || ''),
                        'X-User-ID': String(user?.id || '')
                    }
                }
            );
            return response.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string }; status?: number } };
            throw {
                message: err.response?.data?.message || '프로젝트 조회 실패',
                status: err.response?.status || 500
            } as ApiError;
        }
    },

    /**
     * 참여 중인 프로젝트 목록 조회
     * GET /api/projects/participating
     * Header: X-User-ID
     */
    getParticipatingProjects: async (): Promise<Project[]> => {
        if (USE_MOCK) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(projectsData as Project[]);
                }, 300);
            });
        }

        try {
            const user = tokenStorage.getUser();
            const response = await apiClient.get(
                ENDPOINTS.PROJECTS.PARTICIPATING,
                {
                    headers: {
                        'X-User-ID': String(user?.id || '')
                    }
                }
            );
            return response.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string }; status?: number } };
            throw {
                message: err.response?.data?.message || '참여 프로젝트 조회 실패',
                status: err.response?.status || 500
            } as ApiError;
        }
    },

    /**
     * 프로젝트 생성
     * POST /api/projects
     * Header: X-Manager-ID
     */
    createProject: async (projectData: CreateProjectDto): Promise<Project> => {
        if (USE_MOCK) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    const newProject: Project = {
                        project_id: Date.now(),
                        name: projectData.name,
                        description: projectData.description,
                        type: "TEAM_PROJECT",
                        status: "ACTIVE",
                        startDate: projectData.startDate,
                        endDate: projectData.endDate,
                        inviteCode: Math.random().toString(36).substring(2, 10).toUpperCase(),
                        maxTeamSize: projectData.maxTeamSize,
                        maxParticipants: projectData.maxParticipants,
                        participantCount: 0,
                        teamCount: 0,
                        daysRemaining: Math.floor((new Date(projectData.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
                        isActive: true,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString()
                    };
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
                        'X-Manager-ID': String(user?.id || '')
                    }
                }
            );
            return response.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string }; status?: number } };
            throw {
                message: err.response?.data?.message || '프로젝트 생성 실패',
                status: err.response?.status || 500
            } as ApiError;
        }
    },

    /**
     * 프로젝트 수정
     * PUT /api/projects/{projectId}
     * Header: X-Manager-ID
     */
    updateProject: async (projectId: string | number, projectData: Partial<CreateProjectDto>): Promise<Project> => {
        if (USE_MOCK) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        project_id: Number(projectId),
                        name: projectData.name || '',
                        description: projectData.description || '',
                        type: 'TEAM_PROJECT',
                        status: 'ACTIVE',
                        startDate: projectData.startDate || '',
                        endDate: projectData.endDate || '',
                        inviteCode: '',
                        maxTeamSize: projectData.maxTeamSize || 0,
                        maxParticipants: projectData.maxParticipants || 0,
                        participantCount: 0,
                        teamCount: 0,
                        daysRemaining: 0,
                        isActive: true,
                        createdAt: '',
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
                        'X-Manager-ID': String(user?.id || '')
                    }
                }
            );
            return response.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string }; status?: number } };
            throw {
                message: err.response?.data?.message || '프로젝트 수정 실패',
                status: err.response?.status || 500
            } as ApiError;
        }
    },

    /**
     * 프로젝트 삭제
     * DELETE /api/projects/{projectId}
     * Header: X-Manager-ID
     */
    deleteProject: async (projectId: string | number): Promise<{ success: boolean; message: string }> => {
        if (USE_MOCK) {
            return new Promise((resolve) => {
                setTimeout(() => {
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
                        'X-Manager-ID': String(user?.id || '')
                    }
                }
            );
            return response.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string }; status?: number } };
            throw {
                message: err.response?.data?.message || '프로젝트 삭제 실패',
                status: err.response?.status || 500
            } as ApiError;
        }
    }
};
