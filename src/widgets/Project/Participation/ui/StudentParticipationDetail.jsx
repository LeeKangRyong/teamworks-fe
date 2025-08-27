"use client";
import { useState, useEffect } from "react";
import { studentsData } from "@/shared/mock";
import { Profile, MessageDistribution, Timeline } from "@/entities/project/participation";
import { GoBack } from "@/features/project/participation";

export function StudentParticipationDetail({ studentId }) {
    const [studentData, setStudentData] = useState(null);

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                // API 호출 (주석 처리)
                // const studentResponse = await fetch(`/api/students/${studentId}`);
                // if (!studentResponse.ok) {
                //     throw new Error('Failed to fetch student');
                // }
                // const student = await studentResponse.json();
                // setStudentData(student);

                const student = studentsData.find(s => s.student_id === parseInt(studentId));
                if (student) {
                    setStudentData(student);
                } else {
                    setStudentData(null);
                }
            } catch (err) {
                console.error('Error fetching student:', err);
                setStudentData(null);
            }
        };

        if (studentId) {
            fetchStudentData();
        }
    }, [studentId]);

    return (
        <main className="bg-white w-250 py-4 mb-10">
            <div className="px-6">
                <div className="space-y-2">
                    <GoBack />
                    <div className="flex flex-row gap-4">
                        <div className="flex flex-col gap-2">
                            <Profile name={studentData?.name} team={studentData?.team} status={studentData?.status} />
                            <MessageDistribution />
                        </div>
                        <Timeline />
                    </div>
                </div>                
            </div>
        </main>
    );
}
