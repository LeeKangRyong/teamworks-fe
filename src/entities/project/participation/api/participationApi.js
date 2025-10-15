import { studentsData } from "@/shared/mock";

export const participationApi = {
    getStudents: () => studentsData,
    
    getStudentById: (studentId) => {
        return studentsData.find(s => s.student_id === parseInt(studentId));
    },
};