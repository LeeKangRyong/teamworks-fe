import { USE_MOCK, teamsData, studentsData } from "@/shared/mock";
import { apiClient, getAuthHeaders } from "@/shared/api/client";
import { ENDPOINTS } from "@/shared/api/endpoints";

export const teamApi = {
    getTeams: async (projectId) => {
        if (USE_MOCK) return teamsData;
        try {
            const res = await apiClient.get(ENDPOINTS.PROJECT.TEAMS(projectId), {
                headers: getAuthHeaders(),
            });
            return res.data;
        } catch (error) {
            throw {
                message: error.response?.data?.message || '팀 조회 실패',
                status: error.response?.status || 500,
            };
        }
    },

    getStudents: async (projectId) => {
        if (USE_MOCK) return studentsData;
        try {
            const res = await apiClient.get(ENDPOINTS.PROJECT.STUDENTS(projectId), {
                headers: getAuthHeaders(),
            });
            return res.data;
        } catch (error) {
            throw {
                message: error.response?.data?.message || '학생 조회 실패',
                status: error.response?.status || 500,
            };
        }
    },
};
