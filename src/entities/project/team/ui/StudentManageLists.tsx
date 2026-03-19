"use client";
import { useRouter, useParams } from "next/navigation";
import { StudentManageList } from "@/shared/ui/project/team";

interface StudentData {
    student_id: number;
    name: string;
    team: string;
    recent: string;
    status: string;
    contact: string;
    email: string;
}

interface Props {
    studentsData?: StudentData[];
    emptyAction?: React.ReactNode;
}

export function StudentManageLists({ studentsData, emptyAction }: Props) {
    const router = useRouter();
    const params = useParams();
    const projectId = params.id;

    const handleSendMessage = () => {
        router.push(`/projects/${projectId}/notice`);
    };

    return (
        <article className="min-h-80">
            {studentsData && studentsData.length > 0 ? (
                studentsData.map((student) => (
                    <StudentManageList
                        key={student.student_id}
                        name={student.name}
                        team={student.team}
                        recent={student.recent}
                        status={student.status}
                        contact={student.contact}
                        email={student.email}
                        onSendMessage={handleSendMessage}
                    />
                ))
            ) : (
                <div className="flex flex-col justify-center items-center py-16">
                    <p className="text-body-s text-secondary-60 mb-2">등록된 학생이 없습니다</p>
                    <p className="text-body-s text-secondary-60 mb-4">새로운 학생을 추가해보세요</p>
                    {emptyAction}
                </div>
            )}
        </article>
    );
}
