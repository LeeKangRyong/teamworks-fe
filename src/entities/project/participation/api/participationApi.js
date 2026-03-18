import { USE_MOCK, studentsData } from "@/shared/mock";
import { apiClient, getAuthHeaders } from "@/shared/api/client";
import { ENDPOINTS } from "@/shared/api/endpoints";

export const participationApi = {
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

    getStudentById: async (projectId, studentId) => {
        if (USE_MOCK) {
            return studentsData.find(s => s.student_id === parseInt(studentId));
        }
        try {
            const res = await apiClient.get(ENDPOINTS.PROJECT.STUDENT(projectId, studentId), {
                headers: getAuthHeaders(),
            });
            return res.data;
        } catch (error) {
            throw {
                message: error.response?.data?.message || '학생 상세 조회 실패',
                status: error.response?.status || 500,
            };
        }
    },
};
