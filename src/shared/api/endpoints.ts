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
        DETAIL:         (id: string | number) => `/api/projects/${id}`,
        UPDATE:         (id: string | number) => `/api/projects/${id}`,
        DELETE:         (id: string | number) => `/api/projects/${id}`,
        PARTICIPANTS:   (id: string | number) => `/api/projects/${id}/participants`,
    },

    PROJECT: {
        DASHBOARD:      (pId: string | number) => `/api/projects/${pId}/dashboard`,

        ASSIGNMENTS:    (pId: string | number) => `/api/projects/${pId}/assignments`,
        ASSIGNMENT:     (pId: string | number, aId: string | number) => `/api/projects/${pId}/assignments/${aId}`,
        SUBMITS:        (pId: string | number, aId: string | number) => `/api/projects/${pId}/assignments/${aId}/submits`,
        SUBMIT:         (pId: string | number, aId: string | number, sId: string | number) => `/api/projects/${pId}/assignments/${aId}/submits/${sId}`,
        MY_SUBMIT:      (pId: string | number, aId: string | number) => `/api/projects/${pId}/assignments/${aId}/my-submit`,
        SUBMIT_MEMO:    (pId: string | number, aId: string | number, sId: string | number) => `/api/projects/${pId}/assignments/${aId}/submits/${sId}/memo`,
        CHART:          (pId: string | number) => `/api/projects/${pId}/chart`,

        TEAMS:          (pId: string | number) => `/api/projects/${pId}/teams`,
        TEAM:           (pId: string | number, tId: string | number) => `/api/projects/${pId}/teams/${tId}`,

        STUDENTS:       (pId: string | number) => `/api/projects/${pId}/students`,
        STUDENT:        (pId: string | number, sId: string | number) => `/api/projects/${pId}/students/${sId}`,

        CHATS:          (pId: string | number) => `/api/projects/${pId}/chats`,
        CHAT:           (pId: string | number, cId: string | number) => `/api/projects/${pId}/chats/${cId}`,
        CHAT_READ:      (pId: string | number, cId: string | number) => `/api/projects/${pId}/chats/${cId}/read`,
        MESSAGES:       (pId: string | number, cId: string | number) => `/api/projects/${pId}/chats/${cId}/messages`,

        MANAGERS:       (pId: string | number) => `/api/projects/${pId}/managers`,
    },
};
