import { USE_MOCK, usersData } from '@/shared/mock';
import { apiClient } from '@/shared/api/client';
import { ENDPOINTS } from '@/shared/api/endpoints';
import type { User, LoginCredentials, AuthTokens } from '../model/types'
import type { ApiError } from '@/shared/api/types'

interface LoginResponse {
    user: User
    accessToken: string
    refreshToken: string
}

export const authApi = {
    login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
        if (USE_MOCK) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const user = usersData.find(
                        u => u.email === credentials.email && u.password === credentials.password
                    );

                    if (!user) {
                        reject({
                            message: '이메일 또는 비밀번호가 올바르지 않습니다.',
                            status: 401
                        } as ApiError);
                        return;
                    }

                    resolve({
                        user: {
                            id: user.user_id,
                            email: user.email,
                            name: user.name,
                            role: user.role
                        } as User,
                        accessToken: `mock_access_token_${user.user_id}`,
                        refreshToken: `mock_refresh_token_${user.user_id}`
                    });
                }, 500);
            });
        }

        try {
            const res = await apiClient.post(ENDPOINTS.AUTH.LOGIN, credentials);
            const user = res.data.user;

            return {
                user: {
                    id: user.user_id,
                    email: user.email,
                    name: user.name,
                    role: user.role
                } as User,
                accessToken: res.data.accessToken || `fake_access_token_${user.user_id}`,
                refreshToken: res.data.refreshToken || `fake_refresh_token_${user.user_id}`
            };
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string }; status?: number } };
            throw {
                message: err.response?.data?.message || 'Login failed',
                status: err.response?.status || 500
            } as ApiError;
        }
    },

    logout: async (): Promise<void> => {
        if (USE_MOCK) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 300);
            });
        }

        try {
            const res = await apiClient.post(ENDPOINTS.AUTH.LOGOUT);
            return res.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string }; status?: number } };
            throw {
                message: err.response?.data?.message || 'Logout failed',
                status: err.response?.status || 500
            } as ApiError;
        }
    },

    refreshToken: async (refreshToken: string): Promise<AuthTokens> => {
        if (USE_MOCK) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        accessToken: `mock_new_access_token_${Date.now()}`,
                        refreshToken: refreshToken
                    });
                }, 300);
            });
        }

        try {
            const res = await apiClient.post(ENDPOINTS.AUTH.REFRESH, { refreshToken });
            return res.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string }; status?: number } };
            throw {
                message: err.response?.data?.message || 'Token refresh failed',
                status: err.response?.status || 500
            } as ApiError;
        }
    }
};
