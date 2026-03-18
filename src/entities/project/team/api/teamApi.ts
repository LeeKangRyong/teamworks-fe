import { USE_MOCK, teamsData, studentsData } from "@/shared/mock";
import { apiClient, getAuthHeaders } from "@/shared/api/client";
import { ENDPOINTS } from "@/shared/api/endpoints";
import type { Team, Student } from '@/shared/types'
import type { ApiError } from '@/shared/api/types'

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
};
