"use client";
import { 
    Profile, 
    MessageDistribution, 
    Timeline,
    useStudentDetail
} from "@/entities/project/participation";
import { GoBack } from "@/features/project/participation";

export function StudentParticipationDetail({ studentId }) {
    const { studentData, isLoading } = useStudentDetail(studentId);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!studentData) {
        return <div>학생 정보를 찾을 수 없습니다.</div>;
    }

    return (
        <main className="bg-white w-250 py-4 mb-10 relative">
            <div className="px-6">
                <div className="space-y-2">
                    <GoBack />
                    <div className="flex flex-row gap-4 mt-2">
                        <div className="flex flex-col gap-2">
                            <Profile 
                                name={studentData.name} 
                                team={studentData.team} 
                                status={studentData.status} 
                            />
                            <MessageDistribution />
                        </div>
                        <Timeline />
                    </div>
                </div>                
            </div>
        </main>
    );
}