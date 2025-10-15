import { teamsData, studentsData } from "@/shared/mock";

export const teamApi = {
    getTeams: () => {
        return teamsData;
    },
    
    getStudents: () => {
        return studentsData;
    },
    
    // 나중에 실제 API로 전환
    // getTeams: async () => {
    //     const response = await apiClient.get('/api/teams');
    //     return response.data;
    // }
};