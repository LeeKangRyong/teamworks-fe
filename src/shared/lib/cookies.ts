export const cookies = {
    set: (name: string, value: string, days: number = 7) => {
        if (typeof window === 'undefined') return;
        
        const expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        
        const isSecure = window.location.protocol === 'https:';
        const secureAttr = isSecure ? '; Secure' : '';
        
        document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax${secureAttr}`;
        
        console.log(`[Cookie] Set ${name} (secure: ${isSecure})`);
    },

    get: (name: string): string | null => {
        if (typeof window === 'undefined') return null;
        
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? match[2] : null;
    },

    remove: (name: string) => {
        if (typeof window === 'undefined') return;
        
        const isSecure = window.location.protocol === 'https:';
        const secureAttr = isSecure ? '; Secure' : '';
        
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax${secureAttr}`;
        
        console.log(`[Cookie] Removed ${name}`);
    }
};