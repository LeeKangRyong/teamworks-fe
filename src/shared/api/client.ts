import axios from 'axios';
import { ENV } from '../config/env';
import { tokenStorage } from '../lib/tokenStorage';
import { ENDPOINTS } from './endpoints';
import type { AuthHeaders } from './types';

const apiClient = axios.create({
    baseURL: ENV.BASE_URL,
    timeout: 10000,
});

export const getAuthHeaders = (): AuthHeaders => {
    const user = tokenStorage.getUser();
    const token = tokenStorage.getAccessToken();
    if (!user) return {};
    return {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(user.role === 'MANAGER'
            ? { 'X-Manager-ID': String(user.id) }
            : { 'X-User-ID': String(user.id) })
    };
};

// Track in-flight refresh to avoid concurrent refresh calls
let isRefreshing = false;
let failedQueue: Array<{
    resolve: (token: string) => void;
    reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
    failedQueue.forEach(({ resolve, reject }) => {
        if (error) {
            reject(error);
        } else {
            resolve(token!);
        }
    });
    failedQueue = [];
};

apiClient.interceptors.response.use(
    (response) => response,
    async (error: unknown) => {
        const axiosError = error as {
            response?: { status?: number };
            config?: { _retry?: boolean; headers?: Record<string, string> };
        };
        const originalRequest = axiosError.config;

        if (axiosError.response?.status !== 401 || !originalRequest || originalRequest._retry) {
            return Promise.reject(error);
        }

        const refreshToken = tokenStorage.getRefreshToken();
        if (!refreshToken) {
            tokenStorage.clearTokens();
            return Promise.reject(error);
        }

        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject });
            }).then((token) => {
                if (originalRequest.headers) {
                    originalRequest.headers['Authorization'] = `Bearer ${token}`;
                }
                return apiClient(originalRequest);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
            const res = await axios.post(
                `${ENV.BASE_URL}${ENDPOINTS.AUTH.REFRESH}`,
                { refreshToken }
            );
            const { accessToken, refreshToken: newRefreshToken } = res.data as {
                accessToken: string;
                refreshToken?: string;
            };

            const user = tokenStorage.getUser();
            tokenStorage.setTokens(accessToken, newRefreshToken ?? refreshToken, user);

            processQueue(null, accessToken);

            if (originalRequest.headers) {
                originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
            }
            return apiClient(originalRequest);
        } catch (refreshError) {
            processQueue(refreshError, null);
            tokenStorage.clearTokens();
            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    }
);

export { apiClient };
