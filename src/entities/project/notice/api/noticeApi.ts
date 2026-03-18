import { USE_MOCK, chatData, managersData, studentsData, teamsData } from "@/shared/mock";
import { apiClient, getAuthHeaders } from "@/shared/api/client";
import { ENDPOINTS } from "@/shared/api/endpoints";
import type { Chat, Message } from '../model/types'
import type { ApiError } from '@/shared/api/types'

export const noticeApi = {
    getChats: async (projectId: string): Promise<Chat[]> => {
        if (USE_MOCK) return chatData.chats as Chat[];
        try {
            const res = await apiClient.get(ENDPOINTS.PROJECT.CHATS(projectId), {
                headers: getAuthHeaders(),
            });
            return res.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string }; status?: number } };
            throw {
                message: err.response?.data?.message || '채팅 조회 실패',
                status: err.response?.status || 500,
            } as ApiError;
        }
    },

    getChatById: async (projectId: string, chatId: string): Promise<Chat | undefined> => {
        if (USE_MOCK) return (chatData.chats as Chat[]).find(chat => chat.id === chatId);
        try {
            const res = await apiClient.get(ENDPOINTS.PROJECT.CHAT(projectId, chatId), {
                headers: getAuthHeaders(),
            });
            return res.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string }; status?: number } };
            throw {
                message: err.response?.data?.message || '채팅 상세 조회 실패',
                status: err.response?.status || 500,
            } as ApiError;
        }
    },

    getManagers: async (projectId: string): Promise<unknown[]> => {
        if (USE_MOCK) return managersData;
        try {
            const res = await apiClient.get(ENDPOINTS.PROJECT.MANAGERS(projectId), {
                headers: getAuthHeaders(),
            });
            return res.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string }; status?: number } };
            throw {
                message: err.response?.data?.message || '관리자 조회 실패',
                status: err.response?.status || 500,
            } as ApiError;
        }
    },

    getStudents: async (projectId: string): Promise<unknown[]> => {
        if (USE_MOCK) return studentsData;
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

    getTeams: async (projectId: string): Promise<unknown[]> => {
        if (USE_MOCK) return teamsData;
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

    getChatByUserId: async (projectId: string, userId: string): Promise<Chat | undefined> => {
        if (USE_MOCK) return (chatData.chats as Chat[]).find(chat => chat.userId === userId);
        try {
            const res = await apiClient.get(ENDPOINTS.PROJECT.CHATS(projectId), {
                headers: getAuthHeaders(),
            });
            return res.data.find((chat: Chat) => chat.userId === userId);
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string }; status?: number } };
            throw {
                message: err.response?.data?.message || '채팅 조회 실패',
                status: err.response?.status || 500,
            } as ApiError;
        }
    },

    sendMessage: async (projectId: string, chatId: string, message: Message): Promise<void> => {
        if (USE_MOCK) return;
        try {
            const res = await apiClient.post(
                ENDPOINTS.PROJECT.MESSAGES(projectId, chatId),
                message,
                { headers: getAuthHeaders() }
            );
            return res.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string }; status?: number } };
            throw {
                message: err.response?.data?.message || '메시지 전송 실패',
                status: err.response?.status || 500,
            } as ApiError;
        }
    },

    markAsRead: async (projectId: string, chatId: string): Promise<void> => {
        if (USE_MOCK) return;
        try {
            const res = await apiClient.put(
                ENDPOINTS.PROJECT.CHAT_READ(projectId, chatId),
                {},
                { headers: getAuthHeaders() }
            );
            return res.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string }; status?: number } };
            throw {
                message: err.response?.data?.message || '읽음 처리 실패',
                status: err.response?.status || 500,
            } as ApiError;
        }
    },
};
