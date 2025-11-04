"use client";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/entities/auth";
import { useProjectDetail } from "@/entities/projects";
import { 
    Box, 
    TeamSummary, 
    NextSubmit, 
    ToDoSummary,
    useDashboard,
    useDashboardStats,
    ProjectInfoBox,
    StatBox,
    MyTeamStatus,
    NotificationCenter
} from "@/entities/project/dashboard";
import { More, ActionButton } from "@/features/project/dashboard";

export function DashboardWidget() {
    const router = useRouter();
    const params = useParams();
    const projectId = params.id;
    const { user } = useAuth();
    
    const { project, isLoading: isProjectLoading } = useProjectDetail(projectId);
    
    const { teams, assignments, chartData } = useDashboard();
    
    const { 
        totalTeams, 
        warningTeams, 
        submitRate, 
        unreadQuestions,
        progressAssignments 
    } = useDashboardStats(teams, assignments);

    // MANAGER용 핸들러
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

    // PARTICIPANT용 핸들러
    const handleTeamChatClick = () => {
        router.push(`/projects/${projectId}/notice`);
    };

    const handleSubmitAssignmentClick = () => {
        router.push(`/projects/${projectId}/assignment`);
    };

    // PARTICIPANT용 모킹 데이터
    const teamActivities = [
        { content: "팀원의 활동 내용", date: "25/09/27" },
        { content: "팀원의 메시지 내용", date: "25/09/20" },
        { content: "팀원의 활동 내용", date: "25/09/18" }
    ];

    const notifications = [
        { content: "1차 과제 제출이 필요합니다.", status: "제출" },
        { content: "피어 피드백 요청이 있습니다.", status: "응답" },
        { content: "읽지 않은 메시지/공지가 3개 있습니다.", status: "응답" }
    ];

    // 날짜 포맷팅 임시로 넣기
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        const year = date.getFullYear().toString().slice(2);
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}/${month}/${day} ${hours}:${minutes}`;
    };

    // 로딩
    if (isProjectLoading) {
        return (
            <main className="bg-white w-full max-w-[1000px] mx-auto py-4 mb-10 px-4 md:px-8 lg:px-12 overflow-hidden">
                <p className="text-body-m text-secondary-60">로딩 중...</p>
            </main>
        );
    }

    // MANAGER 대시보드
    if (user?.role === 'MANAGER') {
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

    // PARTICIPANT 대시보드
    return (
        <main className="bg-white w-full max-w-[1000px] mx-auto py-4 mb-10 px-4 md:px-8 lg:px-12 overflow-hidden">
            <article className="flex flex-col lg:flex-row gap-4 md:gap-6 w-full mb-6">
                <ProjectInfoBox 
                    title={project?.name || "프로젝트"}
                    description={project?.description || "프로젝트 설명"}
                    startDate={formatDate(project?.startDate)}
                    endDate={formatDate(project?.endDate)}
                />
                <StatBox value="85%" label="진행률" />
                <StatBox value="2" label="마감 임박 과제" />
            </article>

            <div className="flex flex-col lg:flex-row gap-4 mb-6">
                <MyTeamStatus 
                    teamName="팀 노랑통닭" 
                    activities={teamActivities}
                />
                <NotificationCenter notifications={notifications} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ActionButton 
                    label="팀 채팅방 열기" 
                    onClick={handleTeamChatClick}
                />
                <ActionButton 
                    label="과제 제출하기" 
                    onClick={handleSubmitAssignmentClick}
                />
            </div>
        </main>
    );
}