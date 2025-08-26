import { StudentManageList } from "@/shared/ui/project/team";
import { Add } from "@/features/project/team";

export function StudentManageLists({ studentsData }) {
    return (
        <article className="min-h-80">
            {studentsData && studentsData.length > 0 ? (
                studentsData.map((student) => (
                    <StudentManageList
                        key={student.id}
                        name={student.name}
                        team={student.team}
                        recent={student.recent}
                        status={student.status}
                        contact={student.contact}
                        email={student.email}
                    />
                ))
            ) : (
                <div className="flex flex-col justify-center items-center py-16">
                    <p className="text-body-s text-secondary-60 mb-2">등록된 학생이 없습니다</p>
                    <p className="text-body-s text-secondary-60 mb-4">새로운 학생을 추가해보세요</p>
                    <Add type="학생" />
                </div>
            )}
        </article>
    );
}