import React, { useEffect, useRef } from 'react';
import { DownloadChat } from '@/features/project/notice';
import { ChatList, MessageInput } from '@/entities/project/notice';
import { useChatMessages } from '@/entities/project/notice';

export function Chat({ selectedChatId }) {
    const messagesEndRef = useRef(null);
    
    const { messages, loading, sendMessage } = useChatMessages(selectedChatId);
    
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = (content) => {
        sendMessage(content);
    };

    if (!selectedChatId) {
        return (
            <article className="bg-secondary-3 border-gray-10 border-l-1 flex items-center justify-center w-180 h-full">
                <p className="text-secondary-50">메시지를 보려면 채널을 선택하세요</p>
            </article>
        );
    }

    if (loading) {
        return (
            <article className="bg-white border-gray-10 border-l-1 flex items-center justify-center w-180 h-full">
                <p className="text-secondary-50">Loading...</p>
            </article>
        );
    }

    const hasMessages = messages && messages.length > 0;

    return (
        <article className="bg-white border-gray-10 border-l-1 flex flex-col w-180 h-full">
            <div className="flex-1 overflow-y-auto py-4 scrollbar-thin bg-secondary-3">
                {hasMessages ? (
                    <>
                        <ChatList 
                            messages={messages}
                            DownloadButton={DownloadChat}
                        />
                        <div ref={messagesEndRef} />
                    </>
                ) : null}
            </div>

            <MessageInput onSend={handleSendMessage} />
        </article>
    );
}