import { apiClient } from '@/shared/api/client';
import { ENDPOINTS } from '@/shared/api/endpoints';

export const authApi = {
    login: async (credentials) => {
        try {
            const res = await apiClient.post(ENDPOINTS.AUTH.LOGIN, credentials);
            return res.data;
        } catch (error) {
            throw {
                message: error.response?.data?.message || 'Login failed',
                status: error.response?.status || 500
            };
        }
    },

    logout: async () => {
        try {
            const res = await apiClient.post(ENDPOINTS.AUTH.LOGOUT);
            return res.data;
        } catch (error) {
            throw {
                message: error.response?.data?.message || 'Logout failed',
                status: error.response?.status || 500
            };
        }
    },

    refreshToken: async (refreshToken) => {
        try {
            const res = await apiClient.post(ENDPOINTS.AUTH.REFRESH, { refreshToken });
            return res.data;
        } catch (error) {
            throw {
                message: error.response?.data?.message || 'Token refresh failed',
                status: error.response?.status || 500
            };
        }
    }
};