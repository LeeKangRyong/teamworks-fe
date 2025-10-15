import { dashboardApi } from "../api/dashboardApi";

export const useDashboard = () => {
    const teams = dashboardApi.getTeams();
    const assignments = dashboardApi.getAssignments();
    const chartData = dashboardApi.getChartData();

    return {
        teams,
        assignments,
        chartData
    };
};