import { useMemo } from "react";
import { calculateDashboardStats } from "../lib/processDashboard";
import type { Team } from '@/shared/types'
import type { Assignment } from '@/entities/project/assignment'

export const useDashboardStats = (teams: Team[], assignments: Assignment[]) => {
    const stats = useMemo(() => {
        return calculateDashboardStats(teams, assignments);
    }, [teams, assignments]);

    return stats;
};
