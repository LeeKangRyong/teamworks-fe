import { USE_MOCK, assignmentsData, submitsData, chartData } from "@/shared/mock";
import participantSubmitsData from "@/shared/mock/project/participantSubmitsData.json";
import { apiClient, getAuthHeaders } from "@/shared/api/client";
import { ENDPOINTS } from "@/shared/api/endpoints";

export const assignmentApi = {
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

    getAssignmentById: async (projectId, assignmentId) => {
        if (USE_MOCK) {
            return assignmentsData.find(
                assignment => assignment.assignment_id === parseInt(assignmentId)
            );
        }
        try {
            const res = await apiClient.get(ENDPOINTS.PROJECT.ASSIGNMENT(projectId, assignmentId), {
                headers: getAuthHeaders(),
            });
            return res.data;
        } catch (error) {
            throw {
                message: error.response?.data?.message || '과제 상세 조회 실패',
                status: error.response?.status || 500,
            };
        }
    },

    getSubmits: async (projectId, assignmentId) => {
        if (USE_MOCK) {
            return submitsData.filter(
                submit => submit.assignment_id === parseInt(assignmentId)
            );
        }
        try {
            const res = await apiClient.get(ENDPOINTS.PROJECT.SUBMITS(projectId, assignmentId), {
                headers: getAuthHeaders(),
            });
            return res.data;
        } catch (error) {
            throw {
                message: error.response?.data?.message || '제출물 조회 실패',
                status: error.response?.status || 500,
            };
        }
    },

    getSubmitById: async (projectId, assignmentId, submitId) => {
        if (USE_MOCK) {
            return (
                submitsData.find(submit => submit.submit_id === parseInt(submitId)) ||
                participantSubmitsData.find(submit => submit.submit_id === parseInt(submitId))
            );
        }
        try {
            const res = await apiClient.get(ENDPOINTS.PROJECT.SUBMIT(projectId, assignmentId, submitId), {
                headers: getAuthHeaders(),
            });
            return res.data;
        } catch (error) {
            throw {
                message: error.response?.data?.message || '제출물 상세 조회 실패',
                status: error.response?.status || 500,
            };
        }
    },

    getMySubmitByAssignment: async (projectId, assignmentId) => {
        if (USE_MOCK) {
            return participantSubmitsData.find(
                submit => submit.assignment_id === parseInt(assignmentId)
            );
        }
        try {
            const res = await apiClient.get(ENDPOINTS.PROJECT.MY_SUBMIT(projectId, assignmentId), {
                headers: getAuthHeaders(),
            });
            return res.data;
        } catch (error) {
            throw {
                message: error.response?.data?.message || '내 제출물 조회 실패',
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

    updateSubmitMemo: async (projectId, assignmentId, submitId, memo) => {
        if (USE_MOCK) {
            return { success: true };
        }
        try {
            const res = await apiClient.put(
                ENDPOINTS.PROJECT.SUBMIT_MEMO(projectId, assignmentId, submitId),
                { memo },
                { headers: getAuthHeaders() }
            );
            return res.data;
        } catch (error) {
            throw {
                message: error.response?.data?.message || '메모 수정 실패',
                status: error.response?.status || 500,
            };
        }
    },
};
