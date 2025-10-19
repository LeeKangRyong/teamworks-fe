"use client"
import { useState } from "react";
import Image from "next/image";
import { NoticeStudentItem, NoticeTeamItem } from "@/shared/ui/project/notice";
import { useChat } from "@/entities/project/notice";
import arrow_right from "@/assets/icons/arrow-right.png";
import arrow_down from "@/assets/icons/arrow-down.png";

export function NoticeList({ searchValue = "", onSelectChat, selectedChatId }) {
    const [isManagerOpen, setIsManagerOpen] = useState(true);
    const [isTeamOpen, setIsTeamOpen] = useState(true);
    const [isStudentOpen, setIsStudentOpen] = useState(true);
    
    const {
        chats,
        managers: displayManagers,
        students: displayStudents,
        teams: displayTeams,
        loading
    } = useChat();

    const openSectionsCount = [isManagerOpen, isTeamOpen, isStudentOpen].filter(Boolean).length;
    
    const handleItemClick = (userId, userType) => {
        let chat = chats.find(chat => chat.userId === userId && chat.userType === userType);
        
        if (!chat) {
            const tempChatId = `chat_temp_${userId}_${userType}`;
            if (onSelectChat) {
                onSelectChat(tempChatId);
            }
        } else {
            if (onSelectChat) {
                onSelectChat(chat.id);
            }
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const filteredManagers = searchValue.trim() 
        ? displayManagers.filter(manager => 
            manager.name.toLowerCase().includes(searchValue.toLowerCase())
        )
        : displayManagers;

    const filteredStudents = searchValue.trim()
        ? displayStudents.filter(student => 
            student.name.toLowerCase().includes(searchValue.toLowerCase())
        )
        : displayStudents;

    const filteredTeams = searchValue.trim()
        ? displayTeams.filter(team => 
            team.team.toLowerCase().includes(searchValue.toLowerCase())
        )
        : displayTeams;

    return (
        <div className="bg-white h-full w-full flex flex-col overflow-hidden">
            {/* 관리자 */}
            <div 
                className="flex flex-col flex-shrink-0 transition-all duration-300 ease-in-out overflow-hidden"
                style={{ 
                    flexGrow: isManagerOpen && openSectionsCount > 0 ? 1 : 0,
                    flexBasis: isManagerOpen ? '0' : 'auto'
                }}
            >
                <div 
                    className="flex items-center gap-2 px-3 py-2 flex-shrink-0 cursor-pointer hover:bg-gray-10 transition-colors duration-200"
                    onClick={() => setIsManagerOpen(!isManagerOpen)}
                >
                    <Image 
                        src={isManagerOpen ? arrow_down : arrow_right} 
                        alt="arrow" 
                        className="w-4 h-4 transition-transform duration-300"
                    />
                    <p className="text-body-s text-secondary-50 font-semibold">관리자 ({filteredManagers.length})</p>
                </div>
                {isManagerOpen && (
                    <div className="flex-1 overflow-y-auto scrollbar-thin">
                        {filteredManagers.length > 0 ? (
                            filteredManagers.map((manager) => {
                                const chat = chats.find(c => c.userId === manager.name);
                                const isSelected = chat?.id === selectedChatId;
                                return (
                                    <div 
                                        key={manager.manager_id}
                                        onClick={() => handleItemClick(manager.name, 'manager')}
                                        className={`cursor-pointer transition-colors ${
                                            isSelected ? 'bg-primary-5' : 'hover:bg-gray-5'
                                        }`}
                                    >
                                        <NoticeStudentItem
                                            name={manager.name}
                                            badge={manager.badge}
                                        />
                                    </div>
                                );
                            })
                        ) : (
                            <div className="flex items-center justify-center py-4">
                                <p className="text-body-s text-secondary-50">검색 결과가 없습니다</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* 팀 */}
            <div 
                className="flex flex-col flex-shrink-0 transition-all duration-300 ease-in-out overflow-hidden"
                style={{ 
                    flexGrow: isTeamOpen && openSectionsCount > 0 ? 1 : 0,
                    flexBasis: isTeamOpen ? '0' : 'auto'
                }}
            >
                <div 
                    className="flex items-center gap-2 px-3 py-2 flex-shrink-0 cursor-pointer hover:bg-gray-10 transition-colors duration-200"
                    onClick={() => setIsTeamOpen(!isTeamOpen)}
                >
                    <Image 
                        src={isTeamOpen ? arrow_down : arrow_right} 
                        alt="arrow" 
                        className="w-4 h-4 transition-transform duration-300"
                    />
                    <p className="text-body-s text-secondary-50 font-semibold">팀 ({filteredTeams.length})</p>
                </div>
                {isTeamOpen && (
                    <div className="flex-1 overflow-y-auto scrollbar-thin">
                        {filteredTeams.length > 0 ? (
                            filteredTeams.map((team) => {
                                const chat = chats.find(c => c.userId === team.team);
                                const isSelected = chat?.id === selectedChatId;
                                return (
                                    <div 
                                        key={team.team_id}
                                        onClick={() => handleItemClick(team.team, 'team')}
                                        className={`cursor-pointer transition-colors ${
                                            isSelected ? 'bg-primary-5' : 'hover:bg-gray-5'
                                        }`}
                                    >
                                        <NoticeTeamItem
                                            team={team.team}
                                            memberCount={team.memberCount}
                                            badge={team.badge}
                                        />
                                    </div>
                                );
                            })
                        ) : (
                            <div className="flex items-center justify-center py-4">
                                <p className="text-body-s text-secondary-50">검색 결과가 없습니다</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* 학생 */}
            <div 
                className="flex flex-col transition-all duration-300 ease-in-out overflow-hidden"
                style={{ 
                    flexGrow: isStudentOpen && openSectionsCount > 0 ? 1 : 0,
                    flexBasis: isStudentOpen ? '0' : 'auto'
                }}
            >
                <div 
                    className="flex items-center gap-2 px-3 py-2 flex-shrink-0 cursor-pointer hover:bg-gray-10 transition-colors duration-200"
                    onClick={() => setIsStudentOpen(!isStudentOpen)}
                >
                    <Image 
                        src={isStudentOpen ? arrow_down : arrow_right} 
                        alt="arrow" 
                        className="w-4 h-4 transition-transform duration-300"
                    />
                    <p className="text-body-s text-secondary-50 font-semibold">학생 ({filteredStudents.length})</p>
                </div>
                {isStudentOpen && (
                    <div className="flex-1 overflow-y-auto scrollbar-thin">
                        {filteredStudents.length > 0 ? (
                            filteredStudents.map((student) => {
                                const chat = chats.find(c => c.userId === student.name);
                                const isSelected = chat?.id === selectedChatId;
                                return (
                                    <div 
                                        key={student.student_id}
                                        onClick={() => handleItemClick(student.name, 'student')}
                                        className={`cursor-pointer transition-colors ${
                                            isSelected ? 'bg-primary-5' : 'hover:bg-gray-5'
                                        }`}
                                    >
                                        <NoticeStudentItem
                                            name={student.name}
                                            badge={student.badge}
                                        />
                                    </div>
                                );
                            })
                        ) : (
                            <div className="flex items-center justify-center py-4">
                                <p className="text-body-s text-secondary-50">검색 결과가 없습니다</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}