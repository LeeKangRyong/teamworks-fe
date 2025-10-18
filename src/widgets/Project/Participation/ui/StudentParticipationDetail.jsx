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
        <main className="bg-white w-full max-w-250 py-4 mb-10 relative mx-auto">
            <div className="px-4 sm:px-6">
                <div className="space-y-2">
                    <GoBack />
                    <div className="flex flex-col lg:flex-row gap-4 mt-2 items-center lg:items-start justify-center">
                        <div className="flex flex-col gap-2 w-full lg:w-112 lg:flex-shrink-0">
                            <div className="w-full">
                                <Profile 
                                    name={studentData.name} 
                                    team={studentData.team} 
                                    status={studentData.status} 
                                />
                            </div>
                            <div className="w-full">
                                <MessageDistribution />
                            </div>
                        </div>
                        <div className="w-full lg:w-112 lg:flex-shrink-0">
                            <Timeline />
                        </div>
                    </div>
                </div>                
            </div>
        </main>
    );
}