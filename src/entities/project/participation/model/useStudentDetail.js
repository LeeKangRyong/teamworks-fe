import { useState, useEffect } from "react";
import { participationApi } from "@/entities/project/participation";

export const useStudentDetail = (studentId) => {
    const [studentData, setStudentData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStudentData = async () => {
            setIsLoading(true);
            try {
                const student = participationApi.getStudentById(studentId);
                setStudentData(student);
            } catch (err) {
                console.error('Error fetching student:', err);
                setStudentData(null);
            } finally {
                setIsLoading(false);
            }
        };

        if (studentId) {
            fetchStudentData();
        }
    }, [studentId]);

    return {
        studentData,
        isLoading
    };
};