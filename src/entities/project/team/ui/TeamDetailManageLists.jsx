"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { TeamDetailManageList } from "@/shared/ui/project/team";
import { teamApi } from "@/entities/project/team/api/teamApi";

export function TeamDetailManageLists({ teamId }) {
    const params = useParams();
    const projectId = params.id;
    const [teamInfo, setTeamInfo] = useState(null);
    const [teamMembers, setTeamMembers] = useState([]);

    useEffect(() => {
        Promise.all([
            teamApi.getTeams(projectId),
            teamApi.getStudents(projectId),
        ]).then(([teams, students]) => {
            const team = teams.find(t => t.team_id === parseInt(teamId));
            setTeamInfo(team);
            if (team) {
                setTeamMembers(students.filter(s => s.team === team.team));
            }
        });
    }, [projectId, teamId]);

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
