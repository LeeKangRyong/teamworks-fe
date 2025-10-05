
export const ENV = {
    API: process.env.NEXT_PUBLIC_BFF_URL || 'http://localhost:3003',
    
    SOCKET: {
        URL: process.env.NEXT_PUBLIC_BFF_URL || 'http://localhost:3003',
        OPTIONS: {
            transports: ['websocket', 'polling'],
            timeout: 20000,
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
        }
    },

    BASE_URL : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
}