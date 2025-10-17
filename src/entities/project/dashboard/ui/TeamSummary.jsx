import { TeamSummaryList } from "@/shared/ui/project/dashboard"
import { useDashboard, getWarningTeams } from "@/entities/project/dashboard";
import { useState, useEffect, useMemo } from "react";

export function TeamSummary({ children, num }) {
    const { teams } = useDashboard();
    const [randomWarningTeams, setRandomWarningTeams] = useState([]);
    
    const warningTeams = useMemo(() => {
        return getWarningTeams(teams);
    }, [teams]);

    useEffect(() => {
        const shuffled = [...warningTeams].sort(() => 0.5 - Math.random());
        setRandomWarningTeams(shuffled.slice(0, 3));
    }, [warningTeams]);

    return (
        <article className="border-1 border-gray-10 rounded-lg w-full lg:w-[50%] pb-5">
            <div className="flex justify-between -mx-1">
                <h3 className="text-secondary-80 text-body-m p-5"><b>주의 요망 팀</b> (총 {num}개)</h3>
                {children}
            </div>
            <div className="px-3">
                <div className="flex flex-row px-2">
                    <div className="w-20 flex-shrink-0">
                        <p className="text-secondary-50 text-body-s py-2 text-left">팀명</p>
                    </div>
                    <div className="flex-1 min-w-0 pl-8">
                        <p className="text-secondary-50 text-body-s py-2 text-left">내용</p>
                    </div>
                    <div className="flex-shrink-0 ml-3 w-16">
                        <p className="text-secondary-50 text-body-s py-2 text-left">상태</p>
                    </div>
                </div>
                {randomWarningTeams.map((team) => (
                    <TeamSummaryList 
                        key={team.team_id}
                        team={team.team}
                        desc={team.desc}
                        status={team.status} 
                    />
                ))}
            </div>
        </article>
    );
}