"use client"
import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { noticeApi, searchChats, mapChatsToDisplay, filterChatsByType } from "@/entities/project/notice";

export const useChat = () => {
    const params = useParams();
    const projectId = params?.id;

    const [chats, setChats] = useState([]);
    const [managers, setManagers] = useState([]);
    const [students, setStudents] = useState([]);
    const [teams, setTeams] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [chatType, setChatType] = useState("all");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!projectId) return;

        const loadData = async () => {
            try {
                const [chatData, managerData, studentData, teamData] = await Promise.all([
                    noticeApi.getChats(projectId),
                    noticeApi.getManagers(projectId),
                    noticeApi.getStudents(projectId),
                    noticeApi.getTeams(projectId),
                ]);
                setChats(chatData);
                setManagers(managerData);
                setStudents(studentData);
                setTeams(teamData);
            } catch (error) {
                console.error("Failed to load chat data:", error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [projectId]);

    const displayManagers = useMemo(() => {
        const mapped = mapChatsToDisplay(managers, chats);
        return searchChats(mapped, searchTerm);
    }, [managers, chats, searchTerm]);

    const displayStudents = useMemo(() => {
        const mapped = mapChatsToDisplay(students, chats);
        return searchChats(mapped, searchTerm);
    }, [students, chats, searchTerm]);

    const displayTeams = useMemo(() => {
        const mapped = mapChatsToDisplay(teams, chats);
        return searchChats(mapped, searchTerm);
    }, [teams, chats, searchTerm]);

    const allUsers = useMemo(() => {
        return [...displayManagers, ...displayStudents, ...displayTeams];
    }, [displayManagers, displayStudents, displayTeams]);

    const filteredUsers = useMemo(() => {
        return filterChatsByType(allUsers, chatType);
    }, [allUsers, chatType]);

    return {
        chats,
        managers: displayManagers,
        students: displayStudents,
        teams: displayTeams,
        allUsers: filteredUsers,
        searchTerm,
        setSearchTerm,
        chatType,
        setChatType,
        loading
    };
};
