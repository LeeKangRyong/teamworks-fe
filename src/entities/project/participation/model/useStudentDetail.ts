import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { participationApi } from "@/entities/project/participation";
import type { Student } from '@/shared/types'

export const useStudentDetail = (studentId: string | undefined) => {
    const params = useParams();
    const projectId = params?.id as string | undefined;

    const [studentData, setStudentData] = useState<Student | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!studentId || !projectId) return;

        const fetchStudentData = async () => {
            setIsLoading(true);
            try {
                const student = await participationApi.getStudentById(projectId, studentId);
                setStudentData(student);
            } catch (err) {
                console.error('Error fetching student:', err);
                setStudentData(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStudentData();
    }, [studentId, projectId]);

    return { studentData, isLoading };
};
