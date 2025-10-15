import { teamsData, assignmentsData, chartData } from "@/shared/mock";

export const dashboardApi = {
    getTeams: () => teamsData,
    getAssignments: () => assignmentsData,
    getChartData: () => chartData,
};