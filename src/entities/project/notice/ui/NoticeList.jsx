import { useState, useMemo } from "react";
import Image from "next/image";
import { NoticeStudentItem, NoticeTeamItem } from "@/shared/ui/project/notice";
import { studentsData, teamsData, managersData } from "@/shared/mock";
import arrow_right from "@/assets/icons/arrow-right.png";
import arrow_down from "@/assets/icons/arrow-down.png";

export function NoticeList({ searchValue = "" }) {
    const [isManagerOpen, setIsManagerOpen] = useState(true);
    const [isTeamOpen, setIsTeamOpen] = useState(true);
    const [isStudentOpen, setIsStudentOpen] = useState(true);

    const filteredManagers = useMemo(() => {
        if (!searchValue.trim()) {
            return managersData;
        }
        return managersData.filter(manager => 
            manager.name.toLowerCase().includes(searchValue.toLowerCase())
        );
    }, [searchValue]);

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

    const displayManagers = filteredManagers.map(manager => ({
        manager_id: manager.manager_id,
        name: manager.name,
        badge: 0
    }));

    const displayStudents = filteredStudents.map((student, index) => ({
        student_id: student.student_id,
        name: student.name,
        team: student.team,
        badge: student.badge || (index % 3)
    }));

    const displayTeams = filteredTeams.map((team, index) => ({
        team_id: team.team_id,
        team: team.team,
        memberCount: team.num,
        badge: team.badge || (index % 2)
    }));

    const getManagerHeight = () => {
        return "auto";
    };

    const getTeamHeight = () => {
        return "auto";
    };

    const getStudentHeight = () => {
        if (!isTeamOpen && isStudentOpen) return "100%";
        return "auto";
    };

    return (
        <div className="bg-white h-full w-60 flex flex-col overflow-hidden">
            {/* 관리자 */}
            <div 
                className="flex flex-col flex-shrink-0 transition-all duration-500 ease-in-out overflow-hidden"
                style={{ height: getManagerHeight() }}
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
                    <p className="text-body-s text-secondary-50 font-semibold">관리자 ({displayManagers.length})</p>
                </div>
                {isManagerOpen && (
                    <div className="max-h-[52px] overflow-y-auto scrollbar-thin">
                        {displayManagers.length > 0 ? (
                            displayManagers.map((manager) => (
                                <NoticeStudentItem
                                    key={manager.manager_id}
                                    name={manager.name}
                                    badge={manager.badge}
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

            {/* 팀 */}
            <div 
                className="flex flex-col flex-shrink-0 transition-all duration-500 ease-in-out overflow-hidden"
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
                    <div className="max-h-[104px] overflow-y-auto scrollbar-thin">
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
                className="flex flex-col flex-1 min-h-0 transition-all duration-500 ease-in-out overflow-hidden"
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