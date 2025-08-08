import { apiClient } from '@/shared/api/client';
import { ENDPOINTS } from '@/shared/api/endpoints';

export const authApi = {
    login: async (credentials) => {
        const res = await apiClient.post(ENDPOINTS.AUTH.LOGIN, credentials);
        return res.data;
    },

    logout: async () => {
        const res = await apiClient.post(ENDPOINTS.AUTH.LOGOUT);
        return res.data;
    },

    refreshToken: async (refreshToken) => {
        const res = await apiClient.post(ENDPOINTS.AUTH.REFRESH, { refreshToken });
        return res.data;
    }
};