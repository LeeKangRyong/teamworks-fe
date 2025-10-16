import { chatData, managersData, studentsData, teamsData } from "@/shared/mock";

export const noticeApi = {
    getChats: () => {
        return chatData.chats;
    },
    
    getChatById: (chatId) => {
        return chatData.chats.find(chat => chat.id === chatId);
    },
    
    getManagers: () => {
        return managersData;
    },
    
    getStudents: () => {
        return studentsData;
    },
    
    getTeams: () => {
        return teamsData;
    },
    
    getChatByUserId: (userId) => {
        return chatData.chats.find(chat => chat.userId === userId);
    },
    
    sendMessage: async (chatId, message) => {
        // 나중에 실제 API로 전환
        console.log('Sending message:', { chatId, message });
        return { success: true, message };
    },
    
    markAsRead: async (chatId) => {
        // 나중에 실제 API로 전환
        console.log('Marking as read:', chatId);
        return { success: true };
    }
    
    // 나중에 실제 API로 전환
    // getChats: async () => {
    //     const response = await apiClient.get('/api/chats');
    //     return response.data;
    // }
};