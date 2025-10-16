/**
 * 채팅방 검색 (이름, 팀명으로)
 */
export const searchChats = (users, searchTerm) => {
    if (!searchTerm.trim()) return users;
    
    const term = searchTerm.toLowerCase();
    return users.filter(user => 
        user.name?.toLowerCase().includes(term) ||
        user.team?.toLowerCase().includes(term)
    );
};

/**
 * 채팅 배지 수 가져오기
 */
export const getChatBadge = (chats, userId) => {
    const chat = chats.find(chat => chat.userId === userId);
    return chat?.badge || 0;
};

/**
 * 읽지 않은 메시지 개수 계산
 */
export const getUnreadCount = (messages) => {
    if (!messages || messages.length === 0) return 0;
    return messages.filter(msg => !msg.isRead && !msg.isMine).length;
};

/**
 * 최근 메시지 가져오기
 */
export const getLastMessage = (messages) => {
    if (!messages || messages.length === 0) return null;
    return messages[messages.length - 1];
};

/**
 * 새 메시지 생성
 */
export const createNewMessage = (content) => {
    return {
        id: `msg_${Date.now()}`,
        sender: "교수",
        content: content,
        timestamp: new Date().toLocaleTimeString('ko-KR', { 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: false 
        }),
        date: new Date().toLocaleDateString('ko-KR', { 
            year: '2-digit', 
            month: '2-digit', 
            day: '2-digit' 
        }).replace(/\. /g, '/').replace('.', ''),
        isRead: false,
        isMine: true
    };
};

/**
 * 채팅방 타입별 필터링
 */
export const filterChatsByType = (users, chatType) => {
    if (chatType === "all") return users;
    return users.filter(user => user.userType === chatType);
};

/**
 * 채팅방 목록을 표시용 데이터로 변환
 */
export const mapChatsToDisplay = (users, chats) => {
    return users.map(user => ({
        ...user,
        badge: getChatBadge(chats, user.name || user.team || user.userId)
    }));
};