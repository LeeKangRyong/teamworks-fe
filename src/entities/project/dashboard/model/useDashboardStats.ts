import { useMemo } from "react";
import { calculateDashboardStats } from "../lib/processDashboard";
import type { Team, Assignment } from '@/shared/types'

export const useDashboardStats = (teams: Team[], assignments: Assignment[]) => {
    const stats = useMemo(() => {
        return calculateDashboardStats(teams, assignments);
    }, [teams, assignments]);

    return stats;
};
