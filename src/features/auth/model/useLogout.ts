import { authApi } from '@/entities/auth';
import { tokenStorage } from '@/shared/lib/tokenStorage';

export const useLogout = () => {
    const logout = async () => {
        try { await authApi.logout(); } catch {}
        tokenStorage.clearTokens();
        window.location.href = '/';
    };
    return { logout };
};
