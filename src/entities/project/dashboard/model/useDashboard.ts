"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { dashboardApi } from "../api/dashboardApi";
import type { Team, ChartItem } from '@/shared/types'
import type { Assignment } from '@/entities/project/assignment'

export const useDashboard = () => {
    const params = useParams();
    const projectId = params?.id as string | undefined;

    const [teams, setTeams] = useState<Team[]>([]);
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [chartData, setChartData] = useState<ChartItem[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!projectId) return;

        const loadData = async () => {
            try {
                const [teamsResult, assignmentsResult, chartResult] = await Promise.all([
                    dashboardApi.getTeams(projectId),
                    dashboardApi.getAssignments(projectId),
                    dashboardApi.getChartData(projectId),
                ]);
                setTeams(teamsResult);
                setAssignments(assignmentsResult);
                setChartData(chartResult);
            } catch (error) {
                console.error("Failed to load dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [projectId]);

    return { teams, assignments, chartData, loading };
};
