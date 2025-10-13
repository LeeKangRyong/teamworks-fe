import { useState, useMemo } from "react";
import Image from "next/image";
import { NoticeStudentItem, NoticeTeamItem } from "@/shared/ui/project/notice";
import { studentsData, teamsData } from "@/shared/mock";
import arrow_right from "@/assets/icons/arrow-right.png";
import arrow_down from "@/assets/icons/arrow-down.png";

export function NoticeList({ searchValue = "" }) {
    const [isTeamOpen, setIsTeamOpen] = useState(true);
    const [isStudentOpen, setIsStudentOpen] = useState(true);

    const filteredStudents = useMemo(() => {
        if (!searchValue.trim()) {
            return studentsData;
        }
        return studentsData.filter(student => 
            student.name.toLowerCase().includes(searchValue.toLowerCase())
        );
    }, [searchValue]);

    const filteredTeams = useMemo(() => {
        if (!searchValue.trim()) {
            return teamsData;
        }
        return teamsData.filter(team => 
            team.team.toLowerCase().includes(searchValue.toLowerCase())
        );
    }, [searchValue]);

    const displayStudents = filteredStudents.map(student => ({
        student_id: student.student_id,
        name: student.name,
        team: student.team,
        badge: Math.floor(Math.random() * 5)
    }));

    const displayTeams = filteredTeams.map(team => ({
        team_id: team.team_id,
        team: team.team,
        memberCount: team.num,
        badge: Math.floor(Math.random() * 3)
    }));

    const getTeamHeight = () => {
        if (isTeamOpen && isStudentOpen) return "40%";
        if (isTeamOpen && !isStudentOpen) return "100%";
        return "auto";
    };

    const getStudentHeight = () => {
        if (isTeamOpen && isStudentOpen) return "60%";
        if (!isTeamOpen && isStudentOpen) return "100%";
        return "auto";
    };

    return (
        <div className="bg-white h-full w-60 flex flex-col overflow-hidden">
            {/* 팀 */}
            <div 
                className="border-b-1 border-gray-10 flex flex-col min-h-0 transition-all duration-500 ease-in-out overflow-hidden"
                style={{ height: getTeamHeight() }}
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
                    <p className="text-body-s text-secondary-50 font-semibold">팀 ({displayTeams.length})</p>
                </div>
                {isTeamOpen && (
                    <div className="flex-1 overflow-y-auto scrollbar-thin min-h-0">
                        {displayTeams.length > 0 ? (
                            displayTeams.map((team) => (
                                <NoticeTeamItem
                                    key={team.team_id}
                                    team={team.team}
                                    memberCount={team.memberCount}
                                    badge={team.badge}
                                />
                            ))
                        ) : (
                            <div className="flex items-center justify-center py-4">
                                <p className="text-body-s text-secondary-50">검색 결과가 없습니다</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* 개인 */}
            <div 
                className="flex flex-col min-h-0 transition-all duration-500 ease-in-out overflow-hidden"
                style={{ height: getStudentHeight() }}
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
                    <p className="text-body-s text-secondary-50 font-semibold">개인 ({displayStudents.length})</p>
                </div>
                {isStudentOpen && (
                    <div className="flex-1 overflow-y-auto scrollbar-thin min-h-0">
                        {displayStudents.length > 0 ? (
                            displayStudents.map((student) => (
                                <NoticeStudentItem
                                    key={student.student_id}
                                    name={student.name}
                                    badge={student.badge}
                                />
                            ))
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