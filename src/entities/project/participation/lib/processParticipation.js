import { filterByStatus } from "@/shared/lib/dateUtils";

export const filterStudents = (students, selectedStatus) => {
    return filterByStatus(students, selectedStatus);
};

export const calculateParticipationStats = (students) => {
    const totalStudents = students.length;
    const activeStudents = students.filter(s => s.status === "좋음").length;
    const warningStudents = students.filter(s => s.status === "위험").length;
    const freeloadStudents = students.filter(s => s.status === "무임승차").length;
    
    return {
        totalStudents,
        activeStudents,
        warningStudents,
        freeloadStudents,
        averageActivityRate: 75, // 실제로는 계산 필요
        recentActivityRate: 50    // 실제로는 계산 필요
    };
};