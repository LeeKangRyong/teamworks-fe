import { USE_MOCK } from '@/shared/mock';
import { usersData } from '@/shared/mock';
import { apiClient } from '@/shared/api/apiClient';
import { ENDPOINTS } from '@/shared/config/endpoints';
export const authApi = {
    login: async (email, password) => {
        if (USE_MOCK) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const user = usersData.find(
                        u => u.email === email && u.password === password
                    );

                    if (!user) {
                        reject({ message: '이메일 또는 비밀번호가 잘못되었습니다.' });
                        return;
                    }

                    resolve({
                        data: {
                            id: user.user_id,
                            email: user.email,
                            name: user.name,
                            role: user.role
                        }
                    });
                }, 500);
            });
        }
        
        // 실제 API 호출
        try {
            const response = await apiClient.post(ENDPOINTS.AUTH.LOGIN, {
                email,
                password
            });
            return response;
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