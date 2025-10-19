"use client";
import { useRouter, useParams } from "next/navigation";
import { TeamManageList } from "@/shared/ui/project/team";
import { AddTeam, SelectStudents } from "@/features/project/team";

export function TeamManageLists({ teamsData }) {
    const router = useRouter();
    const params = useParams();
    const projectId = params.id;

    const handleTeamClick = (teamId) => {
        router.push(`/projects/${projectId}/team/${teamId}`);
    };

    return (
        <article className="min-h-80">
            {teamsData && teamsData.length > 0 ? (
                teamsData.map((team) => (
                    <TeamManageList
                        key={team.team_id}
                        team={team.team}
                        num={team.num}
                        recent={team.recent}
                        status={team.status}
                        desc={team.desc}
                        onClick={() => handleTeamClick(team.team_id)}
                    />
                ))
            ) : (
                <div className="flex flex-col justify-center items-center py-15">
                    <p className="text-body-s text-secondary-60 mb-2">현재 생성된 팀이 없습니다</p>
                    <p className="text-body-s text-secondary-60 mb-6">팀을 어쩌구저쩌구 해서 새로운 팀을 추가해보세요</p>
                    <AddTeam />
                    <SelectStudents />
                </div>
            )}
        </article>
    );
}