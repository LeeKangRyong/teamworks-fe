import { apiClient } from '@/shared/api/client';
import { ENDPOINTS } from '@/shared/api/endpoints';
import { USE_MOCK, usersData } from '@/shared/mock';

export const authApi = {
    login: async (credentials) => {

        if (USE_MOCK) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const user = usersData.find(
                        u => u.email === credentials.email && u.password === credentials.password
                    );

                    if (user) {
                        resolve({
                            user: {
                                user_id: user.id,
                                email: user.email,
                                name: user.name,
                                role: user.role
                            },
                            accessToken: `mock_access_token_${user.user_id}`,
                            refreshToken: `mock_refresh_token_${user.user_id}`
                        });
                    } else {
                        reject({
                            message: '이메일 또는 비밀번호가 올바르지 않습니다.',
                            status: 401
                        });
                    }
                }, 500);
            });
        }

        try {
            const res = await apiClient.post(ENDPOINTS.AUTH.LOGIN, credentials);
            const user = res.data.user;

            const fakeAccessToken = `fake_access_token_${user.user_id}`;
            const fakeRefreshToken = `fake_refresh_token_${user.user_id}`;

            return {
                user: user,
                accessToken: fakeAccessToken,
                refreshToken: fakeRefreshToken
            };

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