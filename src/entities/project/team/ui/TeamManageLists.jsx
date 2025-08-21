import { TeamManageList } from "@/shared/ui/project/team";
import { AddTeam, SelectStudents } from "@/features/project/team";

export function TeamManageLists({ teamsData }) {
    return (
        <article className="min-h-80">
            {teamsData && teamsData.length > 0 ? (
                teamsData.map((team) => (
                    <TeamManageList
                        key={team.id}
                        team={team.team}
                        num={team.num}
                        recent={team.recent}
                        status={team.status}
                        desc={team.desc}
                    />
                ))
            ) : (
                <div className="flex flex-col justify-center items-center py-16">
                    <p className="text-body-m text-secondary-60 mb-2">현재 생성된 팀이 없습니다</p>
                    <p className="text-body-m text-secondary-60 mb-4">팀을 어쩌구저쩌구 해서 새로운 팀을 추가해보세요</p>
                    <AddTeam />
                    <SelectStudents />
                </div>
            )}
        </article>
    );
}