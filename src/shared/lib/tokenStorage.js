export const tokenStorage = {
    setTokens: (accessToken, refreshToken) => {
        if (typeof window === 'undefined') return;
        
        localStorage.setItem('accessToken', accessToken);
        if (refreshToken) {
            localStorage.setItem('refreshToken', refreshToken);
        }
    },

    getAccessToken: () => {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem('accessToken');
    },

    getRefreshToken: () => {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem('refreshToken');
    },

    clearTokens: () => {
        if (typeof window === 'undefined') return;
        
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    },

    hasValidToken: () => {
        if (typeof window === 'undefined') return false;
        
        const token = localStorage.getItem('accessToken');
        return !!token;
    }
};