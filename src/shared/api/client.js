import axios from 'axios';
import { ENV } from '../config/env';
import { tokenStorage } from '../lib/tokenStorage';

const apiClient = axios.create({
    baseURL: ENV.BASE_URL,
    timeout: 10000,
});

export const getAuthHeaders = () => {
    const user = tokenStorage.getUser();
    const token = tokenStorage.getAccessToken();
    if (!user) return {};
    return {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(user.role === 'MANAGER'
            ? { 'X-Manager-ID': user.id }
            : { 'X-User-ID': user.id })
    };
};

export { apiClient };