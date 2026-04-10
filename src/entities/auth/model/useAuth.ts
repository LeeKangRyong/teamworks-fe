import { useState } from 'react';
import { tokenStorage } from '@/shared/lib/tokenStorage';
import type { User } from './types'

export const useAuth = () => {
    const [user] = useState<User | null>(() => {
        if (typeof window === 'undefined') return null;
        const hasToken = tokenStorage.hasValidToken();
        const storedUser = tokenStorage.getUser();
        if (hasToken && storedUser) return storedUser;
        tokenStorage.clearTokens();
        return null;
    });

    return { user };
};
