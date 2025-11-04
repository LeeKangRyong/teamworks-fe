"use client";

import { TeamStatus } from "@/shared/ui/project/base";

export function HighActivityTeam() {
    const teams = [
        { id: 1, type: "노랑통닭", name: "팀 노랑통닭", status: "좋음" },
        { id: 2, type: "팀 행정", name: "팀 행정통닭", status: "좋음" },
        { id: 3, type: "팀 검정", name: "팀 검정통닭", status: "좋음" }
    ];

    return (
        <article className="border-1 border-gray-10 rounded-lg w-full lg:w-[50%]">
            <h3 className="text-secondary-80 text-body-l font-bold pl-4 sm:pl-8 pt-6 sm:pt-8">
                활동률 높은 팀
            </h3>
            
            <div className="flex flex-row items-center px-4 sm:px-8 pt-4 pb-2">
                <div className="flex-1">
                    <p className="text-body-s text-secondary-50">팀명</p>
                </div>
                <div className="w-20">
                    <p className="text-body-s text-secondary-50 text-center pr-6">상태</p>
                </div>
            </div>

            <div className="px-4 sm:px-8 pb-6 space-y-0">
                {teams.map((team, index) => (
                    <div 
                        key={team.id}
                        className={`flex flex-row items-center py-3 ${
                            index !== teams.length - 1 ? 'border-b-1 border-gray-10' : ''
                        }`}
                    >
                        <div className="flex-1">
                            <p className="text-body-m text-secondary-80">{team.name}</p>
                        </div>
                        <div className="w-20 flex justify-end">
                            <TeamStatus status={team.status} />
                        </div>
                    </div>
                ))}
            </div>
        </article>
    );
}