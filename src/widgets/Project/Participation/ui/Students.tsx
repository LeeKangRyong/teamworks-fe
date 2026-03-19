import {
    StudentParticipationList,
    useParticipation,
    useFilteredStudents
} from "@/entities/project/participation";

interface Props {
    selectedStatus?: string;
}

export function Students({ selectedStatus }: Props) {
    const { students } = useParticipation();

    const filteredData = useFilteredStudents(students, selectedStatus as string);

    return (
        <div className="px-8 -mt-2 h-60 overflow-y-auto scrollbar-thin">
            <StudentParticipationList studentsData={filteredData} />
        </div>
    );
}
