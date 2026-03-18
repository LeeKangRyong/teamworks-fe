import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { teamApi } from "../api/teamApi";
import type { Team, Student } from '@/shared/types'

export const useTeams = () => {
    const params = useParams();
    const projectId = params?.id as string | undefined;

    const [teams, setTeams] = useState<Team[]>([]);
    const [students, setStudents] = useState<Student[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!projectId) return;

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [teamsData, studentsData] = await Promise.all([
                    teamApi.getTeams(projectId),
                    teamApi.getStudents(projectId),
                ]);
                setTeams(teamsData);
                setStudents(studentsData);
            } catch (error) {
                console.error("Failed to load team data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [projectId]);

    return { teams, students, isLoading };
};
