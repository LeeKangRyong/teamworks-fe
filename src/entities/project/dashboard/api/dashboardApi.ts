import { USE_MOCK, teamsData, assignmentsData, chartData } from "@/shared/mock";
import { apiClient, getAuthHeaders } from "@/shared/api/client";
import { ENDPOINTS } from "@/shared/api/endpoints";
import type { Team, ChartItem } from '@/shared/types'
import type { Assignment } from '@/entities/project/assignment'
import type { ApiError } from '@/shared/api/types'

export const dashboardApi = {
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

    getAssignments: async (projectId: string): Promise<Assignment[]> => {
        if (USE_MOCK) return assignmentsData as Assignment[];
        try {
            const res = await apiClient.get(ENDPOINTS.PROJECT.ASSIGNMENTS(projectId), {
                headers: getAuthHeaders(),
            });
            return res.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string }; status?: number } };
            throw {
                message: err.response?.data?.message || '과제 조회 실패',
                status: err.response?.status || 500,
            } as ApiError;
        }
    },

    getChartData: async (projectId: string): Promise<ChartItem[]> => {
        if (USE_MOCK) return chartData as ChartItem[];
        try {
            const res = await apiClient.get(ENDPOINTS.PROJECT.CHART(projectId), {
                headers: getAuthHeaders(),
            });
            return res.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string }; status?: number } };
            throw {
                message: err.response?.data?.message || '차트 조회 실패',
                status: err.response?.status || 500,
            } as ApiError;
        }
    },
};
