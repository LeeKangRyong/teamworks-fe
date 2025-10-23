import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/entities/auth';
import { tokenStorage } from '@/shared/lib/tokenStorage';

export const useAuth = () => {
    const [user, setUser] = useState(() => {
        if (typeof window !== 'undefined') {
            const storedUser = tokenStorage.getUser();
            console.log('[useAuth] Initial user from storage:', storedUser);
            return storedUser;
        }
        return null;
    });
    
    const [isLoading, setIsLoading] = useState(true); // 초기값을 true로 변경
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const initAuth = () => {
            console.log('[useAuth] Initializing auth...');
            
            if (typeof window !== 'undefined') {
                const hasToken = tokenStorage.hasValidToken();
                const storedUser = tokenStorage.getUser();
                
                console.log('[useAuth] Has valid token:', hasToken);
                console.log('[useAuth] Stored user:', storedUser);
                
                if (hasToken && storedUser) {
                    setUser(storedUser);
                } else if (!hasToken) {
                    setUser(null);
                }
            }
            
            setIsLoading(false);
        };

        initAuth();
    }, []); 

    const clearError = useCallback(() => setError(null), []);

    const login = useCallback(async (credentials) => {
        setIsLoading(true);
        setError(null);

        try {
            console.log('[useAuth] Login attempt...');
            const data = await authApi.login(credentials);
            const { user, accessToken, refreshToken } = data;
            
            console.log('[useAuth] Login success, saving tokens and user:', user);
            tokenStorage.setTokens(accessToken, refreshToken, user);            
            setUser(user);
            
            // 저장 확인 (디버깅용)
            setTimeout(() => {
                const savedUser = tokenStorage.getUser();
                console.log('[useAuth] Verification after login - saved user:', savedUser);
            }, 100);
                        
            return data;
        } catch (e) {
            const message = e.message || 'Login failed.';
            console.error('[useAuth] Login error:', message);
            setError(message);
            throw e;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const logout = useCallback(async () => {
        setIsLoading(true);
        
        try {
            console.log('[useAuth] Logout attempt...');
            await authApi.logout();
        } catch (error) {
            console.warn('[useAuth] Logout API failed (continuing anyway):', error);
        } finally {
            console.log('[useAuth] Clearing tokens and user');
            tokenStorage.clearTokens();
            setUser(null);
            setIsLoading(false);
            
            router.push('/');
        }
    }, [router]);

    const checkAuth = useCallback(() => {
        const hasToken = tokenStorage.hasValidToken();
        const hasUser = !!user;
        console.log('[useAuth] Check auth - hasToken:', hasToken, 'hasUser:', hasUser);
        return hasToken && hasUser;
    }, [user]);

    return {
        user,
        isLoading,
        error,
        login,
        logout,
        checkAuth,
        clearError,
        setUser
    };
};