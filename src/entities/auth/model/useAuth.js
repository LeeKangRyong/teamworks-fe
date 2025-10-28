import { useState, useCallback, useEffect } from 'react';
import { authApi } from '@/entities/auth';
import { tokenStorage } from '@/shared/lib/tokenStorage';

export const useAuth = () => {
    const [user, setUser] = useState(() => {
        if (typeof window !== 'undefined') {
            const storedUser = tokenStorage.getUser();
            return storedUser;
        }
        return null;
    });
    
    const [isLoading, setIsLoading] = useState(true); // 초기값을 true로 변경
    const [error, setError] = useState(null);

    useEffect(() => {
        const initAuth = () => {
            
            if (typeof window !== 'undefined') {
                const hasToken = tokenStorage.hasValidToken();
                const storedUser = tokenStorage.getUser();

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
            const data = await authApi.login(credentials);
            const { user, accessToken, refreshToken } = data;
            
            tokenStorage.setTokens(accessToken, refreshToken, user);            
            setUser(user);
            
            // 저장 확인 (디버깅용)
            // setTimeout(() => {
            //     const savedUser = tokenStorage.getUser();
            //     console.log('[useAuth] Verification after login - saved user:', savedUser);
            // }, 100);
                        
            return data;
        } catch (e) {
            const message = e.message || 'Login failed.';
            setError(message);
            throw e;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const logout = useCallback(async () => {
        console.log('[useAuth] 🚪 Starting logout...');
        setIsLoading(true);
        
        try {
            // 1. API 호출 (실패해도 계속)
            try {
                await authApi.logout();
            } catch (error) {
                console.warn('API failed (continuing):', error);
            }
            
            // 2. 상태 클리어
            setUser(null);
            setError(null);
            
            // 3. 토큰 클리어
            tokenStorage.clearTokens();
            
            // 4. 완료 대기
            await new Promise(resolve => setTimeout(resolve, 200));
                        
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setIsLoading(false);
            // window.location.href를 사용하면 페이지를 완전히 새로고침
            // 이렇게 하면 모든 상태가 확실히 초기화됨
            window.location.href = '/';
        }
    }, []);

    const checkAuth = useCallback(() => {
        const hasToken = tokenStorage.hasValidToken();
        const hasUser = !!user;
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