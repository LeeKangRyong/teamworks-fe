import { useEffect, useState } from "react";
import { TeamDetailManageList } from "@/shared/ui/project/team";
import { teamsData, studentsData } from "@/shared/mock";

export function TeamDetailManageLists({ teamId }) {
    const [teamInfo, setTeamInfo] = useState(null);
    const [teamMembers, setTeamMembers] = useState([]);

    useEffect(() => {
        const team = teamsData.find(t => t.team_id === parseInt(teamId));
        setTeamInfo(team);

        if (team) {
            const members = studentsData.filter(student => student.team === team.team);
            setTeamMembers(members);
        }
    }, [teamId]);

    if (!teamInfo) {
        return <div>Loading...</div>;
    }

    return (
        <section className="px-8 border-1 border-gray-10 rounded-lg scrollbar-thin">
            <h2 className="text-secondary-80 text-body-m py-4 mt-2">
                팀 {teamInfo.team} (총 {teamMembers.length}명)
            </h2>
            
            <article className="mx-auto overflow-x-auto">
                <div className="min-w-[900px]">
                    <div className="flex flex-row items-center py-2">
                        <div className="w-28 flex-shrink-0">
                            <p className="text-body-s text-secondary-50 text-left">이름</p>
                        </div>
                        <div className="w-28 flex-shrink-0">
                            <p className="text-body-s text-secondary-50 text-left">최근 활동일</p>
                        </div>
                        <div className="w-30 flex-shrink-0">
                            <p className="text-body-s text-secondary-50 text-left">상태</p>
                        </div>
                        <div className="w-32 flex-shrink-0">
                            <p className="text-body-s text-secondary-50 text-left">연락처</p>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-body-s text-secondary-50 text-left">이메일</p>
                        </div>
                        <div className="w-12 flex-shrink-0">
                            <p className="text-body-s text-secondary-50 text-left">메시지</p>
                        </div>
                    </div>
                
                    <div className="h-63 overflow-y-auto scrollbar-thin">
                        {teamMembers.map((member) => (
                            <TeamDetailManageList
                                key={member.student_id}
                                name={member.name}
                                recent={member.recent}
                                status={member.status}
                                contact={member.contact}
                                email={member.email}
                            />
                        ))}
                </div>
                </div>
            </article>
        </section>
    );
}