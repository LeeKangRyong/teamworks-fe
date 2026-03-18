import { USE_MOCK, teamsData, studentsData } from "@/shared/mock";
import { apiClient, getAuthHeaders } from "@/shared/api/client";
import { ENDPOINTS } from "@/shared/api/endpoints";
import type { Team, Student } from '@/shared/types'
import type { ApiError } from '@/shared/api/types'
import type { CreateTeamDto, CreateTeamsBulkDto } from '../model/types'

export const teamApi = {
    getTeams: async (projectId: string): Promise<Team[]> => {
        if (USE_MOCK) return teamsData as Team[];
        try {
            const res = await apiClient.get(ENDPOINTS.PROJECT.TEAMS(projectId), {
                headers: getAuthHeaders(),
            });
            return res.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string }; status?: number } };
            throw {
                message: err.response?.data?.message || '팀 조회 실패',
                status: err.response?.status || 500,
            } as ApiError;
        }
    },

    getStudents: async (projectId: string): Promise<Student[]> => {
        if (USE_MOCK) return studentsData as Student[];
        try {
            const res = await apiClient.get(ENDPOINTS.PROJECT.STUDENTS(projectId), {
                headers: getAuthHeaders(),
            });
            return res.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string }; status?: number } };
            throw {
                message: err.response?.data?.message || '학생 조회 실패',
                status: err.response?.status || 500,
            } as ApiError;
        }
    },

    createTeam: async (projectId: string, dto: CreateTeamDto): Promise<Team> => {
        if (USE_MOCK) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        team_id: Date.now(),
                        team: dto.name,
                        num: String(dto.memberIds.length),
                        recent: '',
                        status: '좋음',
                        desc: dto.description || ''
                    } as Team);
                }, 300);
            });
        }
        try {
            const res = await apiClient.post(ENDPOINTS.PROJECT.TEAMS(projectId), dto, {
                headers: getAuthHeaders(),
            });
            return res.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string }; status?: number } };
            throw {
                message: err.response?.data?.message || '팀 생성 실패',
                status: err.response?.status || 500,
            } as ApiError;
        }
    },

    createTeamsBulk: async (projectId: string, dto: CreateTeamsBulkDto): Promise<Team[]> => {
        if (USE_MOCK) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    const teams: Team[] = Array.from({ length: dto.teamCount }, (_, i) => ({
                        team_id: Date.now() + i,
                        team: String(i + 1),
                        num: String(dto.membersPerTeam),
                        recent: '',
                        status: '좋음',
                        desc: ''
                    } as Team));
                    resolve(teams);
                }, 300);
            });
        }
        try {
            const res = await apiClient.post(ENDPOINTS.PROJECT.TEAMS_BULK(projectId), dto, {
                headers: getAuthHeaders(),
            });
            return res.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string }; status?: number } };
            throw {
                message: err.response?.data?.message || '팀 일괄 생성 실패',
                status: err.response?.status || 500,
            } as ApiError;
        }
    },
};
