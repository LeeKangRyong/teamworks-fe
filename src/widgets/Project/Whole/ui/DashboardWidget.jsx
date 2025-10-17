"use client";
import { useRouter, useParams } from "next/navigation";
import { 
    Box, 
    TeamSummary, 
    NextSubmit, 
    ToDoSummary,
    useDashboard,
    useDashboardStats
} from "@/entities/project/dashboard";
import { More } from "@/features/project/dashboard";

export function DashboardWidget() {
    const router = useRouter();
    const params = useParams();
    const projectId = params.id;
    
    const { teams, assignments, chartData } = useDashboard();
    
    const { 
        totalTeams, 
        warningTeams, 
        submitRate, 
        unreadQuestions,
        progressAssignments 
    } = useDashboardStats(teams, assignments);

    const handleTotalTeamsClick = () => {
        router.push(`/projects/${projectId}/team`);
    };

    const handleWarningTeamsClick = () => {
        router.push(`/projects/${projectId}/team?status=freeload`);
    };

    const handleAssignmentClick = () => {
        router.push(`/projects/${projectId}/assignment?status=progress`);
    };

    const handleQuestionsClick = () => {
        router.push(`/projects/${projectId}/notice`);
    };

    return (
        <main className="bg-white w-full max-w-[1000px] mx-auto py-4 mb-10 px-4 md:px-8 lg:px-12 overflow-hidden">
            <article className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 w-full mb-6 max-w-full">
                <Box 
                    num={totalTeams} 
                    desc="총 참여 팀" 
                    onClick={handleTotalTeamsClick}
                />
                <Box 
                    num={warningTeams} 
                    desc="주의 요망 팀" 
                    onClick={handleWarningTeamsClick}
                />
                <Box 
                    num={submitRate} 
                    desc="과제 제출률" 
                    onClick={handleAssignmentClick}
                />
                <Box 
                    num={unreadQuestions} 
                    desc="미확인 질문" 
                    onClick={handleQuestionsClick}
                />
            </article>
            
            <div className="flex flex-col lg:flex-row gap-4 mb-6 px-0 md:px-2 lg:px-0 max-w-full">
                <TeamSummary 
                    children={<More onClick={handleWarningTeamsClick} />} 
                    num={warningTeams} 
                />
                <ToDoSummary 
                    children={<More onClick={handleAssignmentClick} />} 
                    num={progressAssignments} 
                />
            </div>
            
            <NextSubmit chartData={chartData} />
        </main>
    );
}
