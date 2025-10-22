import { USE_MOCK, usersData } from '@/shared/mock';
import { apiClient } from '@/shared/api/client';
import { ENDPOINTS } from '@/shared/api/endpoints';

export const authApi = {
    login: async (credentials) => {
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
                        });
                        return;
                    }

                    resolve({
                        user: {
                            id: user.user_id,
                            email: user.email,
                            name: user.name,
                            role: user.role
                        },
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
                },
                accessToken: res.data.accessToken || `fake_access_token_${user.user_id}`,
                refreshToken: res.data.refreshToken || `fake_refresh_token_${user.user_id}`
            };
        } catch (error) {
            throw {
                message: error.response?.data?.message || 'Login failed',
                status: error.response?.status || 500
            };
        }
    },

    logout: async () => {
        if (USE_MOCK) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({ message: '로그아웃 성공' });
                }, 300);
            });
        }

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
        } catch (error) {
            throw {
                message: error.response?.data?.message || 'Token refresh failed',
                status: error.response?.status || 500
            };
        }
    }
};