import { useMemo } from "react";
import { calculateDashboardStats } from "../lib/processDashboard";

/**
 * Dashboard 통계를 계산하는 Hook
 */
export const useDashboardStats = (teams, assignments) => {
    const stats = useMemo(() => {
        return calculateDashboardStats(teams, assignments);
    }, [teams, assignments]);

    return stats;
};