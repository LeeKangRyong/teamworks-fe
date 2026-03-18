import { USE_MOCK, chatData, managersData, studentsData, teamsData } from "@/shared/mock";
import { apiClient, getAuthHeaders } from "@/shared/api/client";
import { ENDPOINTS } from "@/shared/api/endpoints";

export const noticeApi = {
    getChats: async (projectId) => {
        if (USE_MOCK) return chatData.chats;
        try {
            const res = await apiClient.get(ENDPOINTS.PROJECT.CHATS(projectId), {
                headers: getAuthHeaders(),
            });
            return res.data;
        } catch (error) {
            throw {
                message: error.response?.data?.message || '채팅 조회 실패',
                status: error.response?.status || 500,
            };
        }
    },

    getChatById: async (projectId, chatId) => {
        if (USE_MOCK) return chatData.chats.find(chat => chat.id === chatId);
        try {
            const res = await apiClient.get(ENDPOINTS.PROJECT.CHAT(projectId, chatId), {
                headers: getAuthHeaders(),
            });
            return res.data;
        } catch (error) {
            throw {
                message: error.response?.data?.message || '채팅 상세 조회 실패',
                status: error.response?.status || 500,
            };
        }
    },

    getManagers: async (projectId) => {
        if (USE_MOCK) return managersData;
        try {
            const res = await apiClient.get(ENDPOINTS.PROJECT.MANAGERS(projectId), {
                headers: getAuthHeaders(),
            });
            return res.data;
        } catch (error) {
            throw {
                message: error.response?.data?.message || '관리자 조회 실패',
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

    getChatByUserId: async (projectId, userId) => {
        if (USE_MOCK) return chatData.chats.find(chat => chat.userId === userId);
        try {
            const res = await apiClient.get(ENDPOINTS.PROJECT.CHATS(projectId), {
                headers: getAuthHeaders(),
            });
            return res.data.find(chat => chat.userId === userId);
        } catch (error) {
            throw {
                message: error.response?.data?.message || '채팅 조회 실패',
                status: error.response?.status || 500,
            };
        }
    },

    sendMessage: async (projectId, chatId, message) => {
        if (USE_MOCK) return { success: true, message };
        try {
            const res = await apiClient.post(
                ENDPOINTS.PROJECT.MESSAGES(projectId, chatId),
                message,
                { headers: getAuthHeaders() }
            );
            return res.data;
        } catch (error) {
            throw {
                message: error.response?.data?.message || '메시지 전송 실패',
                status: error.response?.status || 500,
            };
        }
    },

    markAsRead: async (projectId, chatId) => {
        if (USE_MOCK) return { success: true };
        try {
            const res = await apiClient.put(
                ENDPOINTS.PROJECT.CHAT_READ(projectId, chatId),
                {},
                { headers: getAuthHeaders() }
            );
            return res.data;
        } catch (error) {
            throw {
                message: error.response?.data?.message || '읽음 처리 실패',
                status: error.response?.status || 500,
            };
        }
    },
};
