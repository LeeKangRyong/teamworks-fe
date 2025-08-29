"use client";
import { useRouter, useParams } from "next/navigation";
import { Box, TeamSummary, NextSubmit, ToDoSummary } from "@/entities/project/dashboard";
import { More } from "@/features/project/dashboard";
import { teamsData, studentsData } from "@/shared/mock";

export function DashboardWidget() {
    const router = useRouter();
    const params = useParams();
    const projectId = params.id;
    
    const warningTeams = teamsData.filter(team => team.status === "무임승차").length;

    const handleTotalTeamsClick = () => {
        router.push(`/projects/${projectId}/team`);
    };

    const handleWarningTeamsClick = () => {
        router.push(`/projects/${projectId}/team?status=freeload`);
    };

    const handleAssignmentClick = () => {
        router.push(`/projects/${projectId}/assignment`);
    };

    const handleQuestionsClick = () => {
        router.push(`/projects/${projectId}/notice`);
    };

    return (
        <main className="bg-white w-250 py-4 mb-10">
            <article className="flex flex-row gap-6 w-full min-w-full px-12">
                <Box 
                    num={teamsData.length} 
                    desc="총 참여 팀" 
                    onClick={handleTotalTeamsClick}
                />
                <Box 
                    num={warningTeams} 
                    desc="주의 요망 팀" 
                    onClick={handleWarningTeamsClick}
                />
                <Box 
                    num="85%" 
                    desc="과제 제출률" 
                    onClick={handleAssignmentClick}
                />
                <Box 
                    num="2" 
                    desc="미확인 질문" 
                    onClick={handleQuestionsClick}
                />
            </article>
            <div className="justify-between gap-4 flex flex-row mx-10 mt-5">
                <TeamSummary children={<More onClick={handleWarningTeamsClick} />} num={warningTeams} />
                <ToDoSummary children={<More />} /> {/* TODO: More 클릭 시, projects/{projectId}/assignment?status=progress로 이동 */}
            </div>
            <div className="px-10 mt-3">
                <NextSubmit />
            </div>
        </main>
    );
}