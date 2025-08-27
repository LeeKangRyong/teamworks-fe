"use client";
import { useRouter } from "next/navigation";
import { StudentParticipation } from "@/shared/ui/project/participation";
import { Add } from "@/features/project/team";

export function StudentParticipationList({ studentsData }) {
    const router = useRouter();

    const handlePart = () => {
        router.push("/projects/1/part");
    };

    return (
        <article className="min-h-80">
            {studentsData && studentsData.length > 0 ? (
                studentsData.map((student) => (
                    <StudentParticipation
                        key={student.id}
                        name={student.name}
                        team={student.team}
                        recent={student.recent}
                        status={student.status}
                        desc={student.desc}
                        onClick={handlePart}
                    />
                ))
            ) : (
                <div className="flex flex-col justify-center items-center py-16">
                    <p className="text-body-s text-secondary-60 mb-2">등록된 학생이 없습니다</p>
                    <p className="text-body-s text-secondary-60 mb-4">새로운 학생을 추가해보세요</p>
                </div>
            )}
        </article>
    );
}