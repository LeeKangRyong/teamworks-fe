import axios from 'axios';
import { ENV } from '../config/env';
import { tokenStorage } from '../lib/tokenStorage';
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

export { apiClient };
