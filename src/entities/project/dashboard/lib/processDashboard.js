/**
/ * 무임승차 팀 필터링 
 */
export const getWarningTeams = (teams) => {
    return teams.filter(team => team.status === "무임승차");
};

/**
 * 진행중인 과제 필터링
 */
export const getProgressAssignments = (assignments) => {
    return assignments.filter(assign => assign.status === "진행중");
};

/**
 * 대시보드 통계 계산
 */
export const calculateDashboardStats = (teams, assignments) => {
    const totalTeams = teams.length;
    const warningTeams = getWarningTeams(teams).length;
    const progressAssignments = getProgressAssignments(assignments).length;
    
    // 과제 제출률 계산 (실제로는 API에서 받아올 데이터)
    const submitRate = "85%";
    
    // 미확인 질문 수 (실제로는 API에서 받아올 데이터)
    const unreadQuestions = 2;
    
    return {
        totalTeams,
        warningTeams,
        submitRate,
        unreadQuestions,
        progressAssignments
    };
};