import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.BFF_URL || 'http://localhost:3003',
    timeout: 10000,
});

// 요청 시 토큰 자동 첨부
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export { apiClient };