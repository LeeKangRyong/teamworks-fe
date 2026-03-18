
export const ENV = {
    API: process.env.NEXT_PUBLIC_BFF_URL || 'http://localhost:3003',
    BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
};

export const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';