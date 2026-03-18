import { USE_MOCK, teamsData, assignmentsData, chartData } from "@/shared/mock";
import { apiClient, getAuthHeaders } from "@/shared/api/client";
import { ENDPOINTS } from "@/shared/api/endpoints";

export const dashboardApi = {
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

    getAssignments: async (projectId) => {
        if (USE_MOCK) return assignmentsData;
        try {
            const res = await apiClient.get(ENDPOINTS.PROJECT.ASSIGNMENTS(projectId), {
                headers: getAuthHeaders(),
            });
            return res.data;
        } catch (error) {
            throw {
                message: error.response?.data?.message || '과제 조회 실패',
                status: error.response?.status || 500,
            };
        }
    },

    getChartData: async (projectId) => {
        if (USE_MOCK) return chartData;
        try {
            const res = await apiClient.get(ENDPOINTS.PROJECT.CHART(projectId), {
                headers: getAuthHeaders(),
            });
            return res.data;
        } catch (error) {
            throw {
                message: error.response?.data?.message || '차트 조회 실패',
                status: error.response?.status || 500,
            };
        }
    },
};
