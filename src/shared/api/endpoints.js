export const ENDPOINTS = {
    AUTH: {
        LOGIN:          '/api/auth/login',
        REGISTER_ADMIN: '/api/auth/register/admin',
        REGISTER_USER:  '/api/auth/register/user',
        REFRESH:        '/api/auth/refresh',
        LOGOUT:         '/api/auth/logout',
    },

    PROJECTS: {
        MY:             '/api/projects/my',
        PARTICIPATING:  '/api/projects/participating',
        CREATE:         '/api/projects',
        DETAIL:         (id) => `/api/projects/${id}`,
        UPDATE:         (id) => `/api/projects/${id}`,
        DELETE:         (id) => `/api/projects/${id}`,
        PARTICIPANTS:   (id) => `/api/projects/${id}/participants`,
    },

    PROJECT: {
        DASHBOARD:      (pId) => `/api/projects/${pId}/dashboard`,

        ASSIGNMENTS:    (pId) => `/api/projects/${pId}/assignments`,
        ASSIGNMENT:     (pId, aId) => `/api/projects/${pId}/assignments/${aId}`,
        SUBMITS:        (pId, aId) => `/api/projects/${pId}/assignments/${aId}/submits`,
        SUBMIT:         (pId, aId, sId) => `/api/projects/${pId}/assignments/${aId}/submits/${sId}`,
        MY_SUBMIT:      (pId, aId) => `/api/projects/${pId}/assignments/${aId}/my-submit`,
        SUBMIT_MEMO:    (pId, aId, sId) => `/api/projects/${pId}/assignments/${aId}/submits/${sId}/memo`,
        CHART:          (pId) => `/api/projects/${pId}/chart`,

        TEAMS:          (pId) => `/api/projects/${pId}/teams`,
        TEAM:           (pId, tId) => `/api/projects/${pId}/teams/${tId}`,

        STUDENTS:       (pId) => `/api/projects/${pId}/students`,
        STUDENT:        (pId, sId) => `/api/projects/${pId}/students/${sId}`,

        CHATS:          (pId) => `/api/projects/${pId}/chats`,
        CHAT:           (pId, cId) => `/api/projects/${pId}/chats/${cId}`,
        MESSAGES:       (pId, cId) => `/api/projects/${pId}/chats/${cId}/messages`,

        MANAGERS:       (pId) => `/api/projects/${pId}/managers`,
    },
};