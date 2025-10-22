import axios from 'axios';
import { tokenStorage } from '@/shared/lib/tokenStorage';
import { ENV } from '../config/env';

const apiClient = axios.create({
    baseURL: ENV.BASE_URL,
    timeout: 10000,
});

// apiClient.interceptors.request.use((config) => {
//     if (typeof window !== 'undefined') {
//         const token = tokenStorage.getAccessToken();
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//     }
//     return config;
// });

// apiClient.interceptors.response.use(
//     (response) => response,
//     async (e) => {
//         const originalRequest = e.config;
        
//         if (e.response?.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;
            
//             const refreshToken = tokenStorage.getRefreshToken();
//             if (refreshToken) {
//                 try {
//                     const response = await axios.post(
//                         `${baseURL}/api/auth/refresh`,
//                         { refreshToken }
//                     );
                    
//                     const { accessToken, refreshToken: newRefreshToken } = response.data;
//                     tokenStorage.setTokens(accessToken, newRefreshToken);
                    
//                     originalRequest.headers.Authorization = `Bearer ${accessToken}`;
//                     return apiClient(originalRequest);
//                 } catch (e) {
//                     console.log(e);
//                     tokenStorage.clearTokens();
//                     window.location.href = '/login';
//                 }
//             } else {
//                 window.location.href = '/login';
//             }
//         }
        
//         return Promise.reject(e);
//     }
// );

export { apiClient };