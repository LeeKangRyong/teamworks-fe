import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { teamApi } from "../api/teamApi";

export const useTeams = () => {
    const params = useParams();
    const projectId = params?.id;

    const [teams, setTeams] = useState([]);
    const [students, setStudents] = useState([]);
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
