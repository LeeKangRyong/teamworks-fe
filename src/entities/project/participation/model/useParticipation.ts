import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { participationApi } from "@/entities/project/participation";
import type { Student } from '@/shared/types'

export const useParticipation = () => {
    const params = useParams();
    const projectId = params?.id as string | undefined;

    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!projectId) return;

        const loadStudents = async () => {
            try {
                const data = await participationApi.getStudents(projectId);
                setStudents(data);
            } catch (error) {
                console.error("Failed to load students:", error);
            } finally {
                setLoading(false);
            }
        };

        loadStudents();
    }, [projectId]);

    return { students, loading };
};
