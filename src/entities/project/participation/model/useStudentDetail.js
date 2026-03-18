import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { participationApi } from "@/entities/project/participation";

export const useStudentDetail = (studentId) => {
    const params = useParams();
    const projectId = params?.id;

    const [studentData, setStudentData] = useState(null);
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
