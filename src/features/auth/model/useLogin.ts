import { useState } from 'react';
import { authApi } from '@/entities/auth';
import { tokenStorage } from '@/shared/lib/tokenStorage';
import type { LoginCredentials } from '@/entities/auth';

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (credentials: LoginCredentials) => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await authApi.login(credentials);
            tokenStorage.setTokens(data.accessToken, data.refreshToken, data.user);
            return data;
        } catch (e: unknown) {
            const err = e as { message?: string };
            setError(err.message || '로그인에 실패했습니다');
            throw e;
        } finally {
            setIsLoading(false);
        }
    };

    return { login, isLoading, error };
};
