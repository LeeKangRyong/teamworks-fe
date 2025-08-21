import { Box, TeamSummary, NextSubmit, ToDoSummary } from "@/entities/project/dashboard";
import { More } from "@/features/project/dashboard";
import { teamsData, studentsData } from "@/shared/mock";

export function Dashboard() {
    const warningTeams = teamsData.filter(team => team.status !== "좋음").length;

    return (
        <main className="bg-white w-250 py-4 mb-10">
            <article className="flex flex-row gap-6 w-full min-w-full px-12">
                <Box num={teamsData.length} desc="총 참여 팀" />
                <Box num={warningTeams} desc="주의 요망 팀" />
                <Box num="85%" desc="과제 제출률" />
                <Box num="D-8" desc="다음 과제 제출일" />
            </article>
            <div className="justify-between gap-4 flex flex-row mx-10 mt-5">
                <TeamSummary children={<More />} num={warningTeams} />
                <ToDoSummary children={<More />} />
            </div>
            <div className="px-10 mt-3">
                <NextSubmit />
            </div>
        </main>
    );
}