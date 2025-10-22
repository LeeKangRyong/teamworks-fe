// 일단 관리자만 연결
export const ENDPOINTS = {
    AUTH: {
        LOGIN: '/api/auth/login',
        REGISTER_ADMIN: '/api/auth/register/admin',
        REGISTER_USER: '/api/auth/register/user',
        REFRESH: '/api/auth/refresh',
        LOGOUT: '/api/auth/logout'
    },

    PROJECTS: {
        MY: '/api/projects/my',
        DETAIL: (projectId) => `/api/projects/${projectId}`,
        CREATE: '/api/projects',
        UPDATE: (projectId) => `/api/projects/${projectId}`,
        DELETE: (projectId) => `/api/projects/${projectId}`,
        PARTICIPANTS: (projectId) => `/api/projects/${projectId}/participants`
    },
    PROJECT: {
        
    }
};