import { USE_MOCK, studentsData } from "@/shared/mock";
import { apiClient, getAuthHeaders } from "@/shared/api/client";
import { ENDPOINTS } from "@/shared/api/endpoints";
import type { Student } from '@/shared/types'
import type { ApiError } from '@/shared/api/types'

export const participationApi = {
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

    getStudentById: async (projectId: string, studentId: string): Promise<Student> => {
        if (USE_MOCK) {
            return (studentsData as Student[]).find(s => s.student_id === parseInt(studentId)) as Student;
        }
        try {
            const res = await apiClient.get(ENDPOINTS.PROJECT.STUDENT(projectId, studentId), {
                headers: getAuthHeaders(),
            });
            return res.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string }; status?: number } };
            throw {
                message: err.response?.data?.message || '학생 상세 조회 실패',
                status: err.response?.status || 500,
            } as ApiError;
        }
    },
};
