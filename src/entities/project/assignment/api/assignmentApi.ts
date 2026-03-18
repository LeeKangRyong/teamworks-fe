import { USE_MOCK, assignmentsData, submitsData, chartData } from "@/shared/mock";
import participantSubmitsData from "@/shared/mock/project/participantSubmitsData.json";
import { apiClient, getAuthHeaders } from "@/shared/api/client";
import { ENDPOINTS } from "@/shared/api/endpoints";
import type { Assignment, Submit, CreateAssignmentDto, CreateSubmitDto } from '../model/types'
import type { ChartItem } from '@/shared/types'
import type { ApiError } from '@/shared/api/types'

export const assignmentApi = {
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

    getAssignmentById: async (projectId: string, assignmentId: string): Promise<Assignment> => {
        if (USE_MOCK) {
            return (assignmentsData as Assignment[]).find(
                assignment => assignment.assignment_id === parseInt(assignmentId)
            ) as Assignment;
        }
        try {
            const res = await apiClient.get(ENDPOINTS.PROJECT.ASSIGNMENT(projectId, assignmentId), {
                headers: getAuthHeaders(),
            });
            return res.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string }; status?: number } };
            throw {
                message: err.response?.data?.message || '과제 상세 조회 실패',
                status: err.response?.status || 500,
            } as ApiError;
        }
    },

    getSubmits: async (projectId: string, assignmentId: string): Promise<Submit[]> => {
        if (USE_MOCK) {
            return (submitsData as Submit[]).filter(
                submit => submit.assignment_id === parseInt(assignmentId)
            );
        }
        try {
            const res = await apiClient.get(ENDPOINTS.PROJECT.SUBMITS(projectId, assignmentId), {
                headers: getAuthHeaders(),
            });
            return res.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string }; status?: number } };
            throw {
                message: err.response?.data?.message || '제출물 조회 실패',
                status: err.response?.status || 500,
            } as ApiError;
        }
    },

    getSubmitById: async (projectId: string, assignmentId: string, submitId: string): Promise<Submit> => {
        if (USE_MOCK) {
            return (
                submitsData.find(submit => submit.submit_id === parseInt(submitId)) ||
                (participantSubmitsData as Submit[]).find(submit => submit.submit_id === parseInt(submitId))
            ) as Submit;
        }
        try {
            const res = await apiClient.get(ENDPOINTS.PROJECT.SUBMIT(projectId, assignmentId, submitId), {
                headers: getAuthHeaders(),
            });
            return res.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string }; status?: number } };
            throw {
                message: err.response?.data?.message || '제출물 상세 조회 실패',
                status: err.response?.status || 500,
            } as ApiError;
        }
    },

    getMySubmitByAssignment: async (projectId: string, assignmentId: string): Promise<Submit> => {
        if (USE_MOCK) {
            return (participantSubmitsData as Submit[]).find(
                submit => submit.assignment_id === parseInt(assignmentId)
            ) as Submit;
        }
        try {
            const res = await apiClient.get(ENDPOINTS.PROJECT.MY_SUBMIT(projectId, assignmentId), {
                headers: getAuthHeaders(),
            });
            return res.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string }; status?: number } };
            throw {
                message: err.response?.data?.message || '내 제출물 조회 실패',
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

    updateSubmitMemo: async (projectId: string, assignmentId: string, submitId: string, memo: string): Promise<void> => {
        if (USE_MOCK) {
            return;
        }
        try {
            const res = await apiClient.put(
                ENDPOINTS.PROJECT.SUBMIT_MEMO(projectId, assignmentId, submitId),
                { memo },
                { headers: getAuthHeaders() }
            );
            return res.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string }; status?: number } };
            throw {
                message: err.response?.data?.message || '메모 수정 실패',
                status: err.response?.status || 500,
            } as ApiError;
        }
    },

    createAssignment: async (projectId: string, dto: CreateAssignmentDto): Promise<Assignment> => {
        if (USE_MOCK) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        assignment_id: Date.now(),
                        title: dto.title,
                        deadline: dto.deadline,
                        submit: '0',
                        mark: '0',
                        status: '진행중'
                    } as Assignment);
                }, 300);
            });
        }
        try {
            const res = await apiClient.post(
                ENDPOINTS.PROJECT.ASSIGNMENTS(projectId),
                dto,
                { headers: getAuthHeaders() }
            );
            return res.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string }; status?: number } };
            throw {
                message: err.response?.data?.message || '과제 생성 실패',
                status: err.response?.status || 500,
            } as ApiError;
        }
    },

    createSubmit: async (projectId: string, assignmentId: string, dto: CreateSubmitDto): Promise<Submit> => {
        if (USE_MOCK) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        submit_id: Date.now(),
                        assignment_id: parseInt(assignmentId),
                        student_id: 0,
                        file_name: dto.file.name,
                        name: '',
                        team: '',
                        submit_time: new Date().toISOString(),
                        score: null,
                        file_url: '',
                    } as Submit);
                }, 300);
            });
        }
        try {
            const formData = new FormData();
            formData.append('file', dto.file);
            const res = await apiClient.post(
                ENDPOINTS.PROJECT.SUBMITS(projectId, assignmentId),
                formData,
                { headers: { ...getAuthHeaders(), 'Content-Type': 'multipart/form-data' } }
            );
            return res.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string }; status?: number } };
            throw {
                message: err.response?.data?.message || '과제 제출 실패',
                status: err.response?.status || 500,
            } as ApiError;
        }
    },
};
