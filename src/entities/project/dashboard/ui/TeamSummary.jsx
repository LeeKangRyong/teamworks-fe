import { TeamSummaryList } from "@/shared/ui/project/dashboard"
import { teamsData } from "@/shared/mock";
import { useState, useEffect } from "react";

export function TeamSummary({ children, num }) {
    const [randomWarningTeams, setRandomWarningTeams] = useState([]);

    useEffect(() => {
        const warningTeams = teamsData.filter(team => 
            team.status === "무임승차" && team.team.length <= 4
        );
        
        const shuffled = [...warningTeams].sort(() => 0.5 - Math.random());
        setRandomWarningTeams(shuffled.slice(0, 3));
    }, []);

    return (
        <article className="border-1 border-gray-10 rounded-lg w-[50%] pb-5">
            <div className="flex justify-between -mx-1">
                <h3 className="text-secondary-80 text-body-m p-5"><b>주의 요망 팀</b> (총 {num}팀)</h3>
                {children}
            </div>
            <div>
                <div className="flex flex-row px-2">
                    <div className="w-20 flex-shrink-0">
                        <p className="text-secondary-50 text-body-s py-2 pl-2 text-left">팀명</p>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-secondary-50 text-body-s py-2 pl-11 text-left">내용</p>
                    </div>
                    <div className="flex-shrink-0">
                        <p className="text-secondary-50 text-body-s py-2 text-left pr-13">상태</p>
                    </div>
                </div>
                <div className="px-3">
                    {randomWarningTeams.map((team, index) => (
                        <TeamSummaryList 
                            key={team.team_id}
                            team={team.team} 
                            desc={team.desc} 
                            status={team.status} 
                        />
                    ))}
                </div>
            </div>
        </article>
    );
}