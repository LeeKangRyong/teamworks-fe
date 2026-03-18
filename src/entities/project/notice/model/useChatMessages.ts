"use client"
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { noticeApi, createNewMessage } from "@/entities/project/notice";
import type { Message } from './types'

export const useChatMessages = (chatId: string | undefined) => {
    const params = useParams();
    const projectId = params?.id as string | undefined;

    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!chatId || !projectId) {
            setMessages([]);
            setLoading(false);
            return;
        }

        const loadMessages = async () => {
            try {
                const chat = await noticeApi.getChatById(projectId, chatId);
                setMessages(chat?.messages || []);
            } catch (error) {
                console.error("Failed to load messages:", error);
            } finally {
                setLoading(false);
            }
        };

        loadMessages();
    }, [chatId, projectId]);

    const sendMessage = async (content: string) => {
        if (!content.trim() || !projectId || !chatId) return;

        const newMessage = createNewMessage(content) as Message;

        try {
            await noticeApi.sendMessage(projectId, chatId, newMessage);
            setMessages(prev => [...prev, newMessage]);
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    };

    const markAsRead = async () => {
        if (!projectId || !chatId) return;
        try {
            await noticeApi.markAsRead(projectId, chatId);
            setMessages(prev =>
                prev.map(msg => ({ ...msg, isRead: true }))
            );
        } catch (error) {
            console.error("Failed to mark as read:", error);
        }
    };

    return { messages, loading, sendMessage, markAsRead };
};
