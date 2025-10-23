// src/shared/lib/tokenStorage.js

export const tokenStorage = {
    setTokens: (accessToken, refreshToken, user = null) => {
        if (typeof window === 'undefined') return;
        
        try {
            console.log('[TokenStorage] 💾 Saving tokens...');
            
            // 1. sessionStorage에 저장
            sessionStorage.setItem('accessToken', accessToken);
            
            // 2. 쿠키에 저장 (배포 환경용 - HTTPS에서는 Secure 필요)
            const isProduction = window.location.protocol === 'https:';
            const cookieOptions = [
                `accessToken=${accessToken}`,
                'path=/',
                'SameSite=Lax',  // CSRF 보호
                isProduction ? 'Secure' : '',  // HTTPS에서만 Secure 추가
                'max-age=86400'  // 24시간 (초 단위)
            ].filter(Boolean).join('; ');
            
            document.cookie = cookieOptions;
            console.log('[TokenStorage] Cookie set:', cookieOptions);
            
            // 3. refreshToken은 localStorage에
            if (refreshToken) {
                localStorage.setItem('refreshToken', refreshToken);
            }
            
            // 4. user 정보는 sessionStorage에
            if (user) {
                sessionStorage.setItem('user', JSON.stringify(user));
                console.log('[TokenStorage] ✅ User saved:', user.role);
            }
            
            // 5. 검증
            console.log('[TokenStorage] Verification:', {
                sessionToken: !!sessionStorage.getItem('accessToken'),
                cookie: document.cookie.includes('accessToken'),
                user: !!sessionStorage.getItem('user')
            });
        } catch (error) {
            console.error('[TokenStorage] ❌ Save failed:', error);
        }
    },

    getAccessToken: () => {
        if (typeof window === 'undefined') return null;
        
        // sessionStorage 우선 확인
        let token = sessionStorage.getItem('accessToken');
        
        // sessionStorage에 없으면 쿠키에서 읽기
        if (!token) {
            const cookies = document.cookie.split(';');
            const tokenCookie = cookies.find(c => c.trim().startsWith('accessToken='));
            if (tokenCookie) {
                token = tokenCookie.split('=')[1];
                // sessionStorage에 복구
                sessionStorage.setItem('accessToken', token);
                console.log('[TokenStorage] Token restored from cookie');
            }
        }
        
        return token;
    },

    getRefreshToken: () => {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem('refreshToken');
    },
    
    getUser: () => {
        if (typeof window === 'undefined') return null;
        try {
            const userStr = sessionStorage.getItem('user');
            if (!userStr) {
                console.warn('[TokenStorage] ⚠️ No user in sessionStorage');
                return null;
            }
            const user = JSON.parse(userStr);
            console.log('[TokenStorage] User retrieved:', user.role);
            return user;
        } catch (error) {
            console.error('[TokenStorage] ❌ Parse user failed:', error);
            sessionStorage.removeItem('user');
            return null;
        }
    },

    clearTokens: () => {
        if (typeof window === 'undefined') return;
        
        try {
            console.log('[TokenStorage] 🧹 Clearing tokens...');
            
            // 1. sessionStorage 제거
            sessionStorage.removeItem('accessToken');
            sessionStorage.removeItem('user');
            
            // 2. localStorage 제거
            localStorage.removeItem('refreshToken');
            
            // 3. 쿠키 제거 (여러 방법으로 시도)
            const isProduction = window.location.protocol === 'https:';
            
            // 방법 1: 과거 날짜로 만료
            document.cookie = `accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax${isProduction ? '; Secure' : ''}`;
            
            // 방법 2: max-age=0
            document.cookie = `accessToken=; path=/; max-age=0; SameSite=Lax${isProduction ? '; Secure' : ''}`;
            
            // 4. 검증
            console.log('[TokenStorage] After clear:', {
                sessionToken: sessionStorage.getItem('accessToken'),
                cookie: document.cookie,
                localStorage: localStorage.getItem('refreshToken')
            });
            
            console.log('[TokenStorage] ✅ Tokens cleared');
        } catch (error) {
            console.error('[TokenStorage] ❌ Clear failed:', error);
        }
    },

    hasValidToken: () => {
        if (typeof window === 'undefined') return false;
        
        // sessionStorage 또는 쿠키에 토큰이 있는지 확인
        const sessionToken = sessionStorage.getItem('accessToken');
        const cookieHasToken = document.cookie.includes('accessToken=');
        
        const isValid = !!(sessionToken || cookieHasToken);
        console.log('[TokenStorage] hasValidToken:', isValid);
        
        return isValid;
    }
};