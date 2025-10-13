import React, { useState, useEffect, useRef } from 'react';
import { MessageInput } from '@/features/project/notice';
import { ChatList } from '@/entities/project/notice';
import { chatData as initialChatData } from '@/shared/mock';

export function Chat({ selectedChatId }) {
    const [chats, setChats] = useState(initialChatData.chats);
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);
    
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (selectedChatId) {
            const selectedChat = chats.find(chat => chat.id === selectedChatId);
            if (selectedChat) {
                setMessages(selectedChat.messages || []);
            } else {
                // chatData에 없는 임시 채팅방인 경우 빈 배열
                setMessages([]);
            }
        } else {
            setMessages([]);
        }
    }, [selectedChatId, chats]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = (content) => {
        const newMessage = {
            id: `msg_${Date.now()}`,
            sender: "교수",
            content: content,
            timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false }),
            date: new Date().toLocaleDateString('ko-KR', { year: '2-digit', month: '2-digit', day: '2-digit' }).replace(/\. /g, '/').replace('.', ''),
            isRead: false,
            isMine: true
        };

        setChats(prevChats => {
            const existingChat = prevChats.find(chat => chat.id === selectedChatId);
            
            if (existingChat) {
                return prevChats.map(chat => 
                    chat.id === selectedChatId 
                        ? { ...chat, messages: [...(chat.messages || []), newMessage] }
                        : chat
                );
            } else {
                // chatData에 없는 임시 채팅방인 경우 새로 추가
                return [...prevChats, {
                    id: selectedChatId,
                    messages: [newMessage]
                }];
            }
        });
    };

    if (!selectedChatId) {
        return (
            <article className="bg-secondary-3 border-gray-10 border-l-1 flex items-center justify-center w-180 h-full">
                <p className="text-secondary-50">메시지를 보려면 채널을 선택하세요</p>
            </article>
        );
    }

    const selectedChat = chats.find(chat => chat.id === selectedChatId);
    const hasMessages = selectedChat && selectedChat.messages && selectedChat.messages.length > 0;

    return (
        <article className="bg-white border-gray-10 border-l-1 flex flex-col w-180 h-full">
            <div className="flex-1 overflow-y-auto py-4 scrollbar-thin bg-secondary-3">
                {hasMessages ? (
                    <>
                        <ChatList messages={messages} />
                        <div ref={messagesEndRef} />
                    </>
                ) : null}
            </div>

            <MessageInput onSend={handleSendMessage} />
        </article>
    );
}