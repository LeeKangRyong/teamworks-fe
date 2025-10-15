import { 
    StudentParticipationList,
    useParticipation,
    useFilteredStudents
} from "@/entities/project/participation";

export function Students({ selectedStatus }) {
    const { students } = useParticipation();
    
    const filteredData = useFilteredStudents(students, selectedStatus);

    return (
        <div className="px-8 -mt-2 h-60 overflow-y-auto scrollbar-thin">
            <StudentParticipationList studentsData={filteredData} />
        </div>
    );
}