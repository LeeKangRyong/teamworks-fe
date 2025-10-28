export const tokenStorage = {
    setTokens: (accessToken, refreshToken, user = null) => {
        if (typeof window === 'undefined') return;
        
        try {            
            sessionStorage.setItem('accessToken', accessToken);
            
            if (refreshToken) {
                localStorage.setItem('refreshToken', refreshToken);
            }
            
            if (user) {
                sessionStorage.setItem('user', JSON.stringify(user));
            }
        } catch (error) {
            console.error('Failed to save tokens:', error);
        }
    },

    getAccessToken: () => {
        if (typeof window === 'undefined') return null;
        return sessionStorage.getItem('accessToken');
    },

    getRefreshToken: () => {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem('refreshToken');
    },
    
    getUser: () => {
        if (typeof window === 'undefined') return null;
        try {
            const userStr = sessionStorage.getItem('user');
            if (!userStr) return null;
            return JSON.parse(userStr);
        } catch (error) {
            console.error('Failed to parse user data:', error);
            sessionStorage.removeItem('user');
            return null;
        }
    },

    clearTokens: () => {
        if (typeof window === 'undefined') return;
        
        try {
            sessionStorage.removeItem('accessToken');
            sessionStorage.removeItem('user');
            localStorage.removeItem('refreshToken');
        } catch (error) {
            console.error('Failed to clear tokens:', error);
        }
    },

    hasValidToken: () => {
        if (typeof window === 'undefined') return false;
        return !!sessionStorage.getItem('accessToken');
    }
};