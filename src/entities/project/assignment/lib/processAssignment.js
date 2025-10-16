/**
 * 과제 상태별로 필터링
 */
export const filterByStatus = (assignments, status) => {
    if (!status || status === "전체") return assignments;
    return assignments.filter(assignment => assignment.status === status);
};

/**
 * 과제 제출률 계산
 */
export const calculateSubmitRate = (submitText) => {
    const match = submitText.match(/(\d+)\/(\d+)팀/);
    if (!match) return 0;
    return Math.round((parseInt(match[1]) / parseInt(match[2])) * 100);
};

/**
 * 과제 채점률 계산
 */
export const calculateMarkRate = (markText) => {
    const match = markText.match(/(\d+)\/(\d+)팀/);
    if (!match) return 0;
    return Math.round((parseInt(match[1]) / parseInt(match[2])) * 100);
};

/**
 * 마감일이 가까운 순서로 정렬
 */
export const sortByDeadline = (assignments) => {
    return [...assignments].sort((a, b) => {
        const dateA = new Date(a.deadline.replace(/\//g, '-'));
        const dateB = new Date(b.deadline.replace(/\//g, '-'));
        return dateA - dateB;
    });
};

/**
 * 제출물 검색 (팀명, 학생명으로)
 */
export const searchSubmits = (submits, searchTerm) => {
    if (!searchTerm.trim()) return submits;
    
    const term = searchTerm.toLowerCase();
    return submits.filter(submit => 
        submit.team.toLowerCase().includes(term) ||
        submit.name.toLowerCase().includes(term)
    );
};

/**
 * 제출물 상태별 필터링
 */
export const filterSubmitsByStatus = (submits, status) => {
    if (!status || status === "전체") return submits;
    return submits.filter(submit => submit.status === status);
};

/**
 * 과제 통계 계산
 */
export const calculateAssignmentStats = (assignments) => {
    const total = assignments.length;
    const inProgress = assignments.filter(a => a.status === "진행중").length;
    const completed = assignments.filter(a => a.status === "채점완료").length;
    const closed = assignments.filter(a => a.status === "마감").length;
    
    return {
        total,
        inProgress,
        completed,
        closed
    };
};