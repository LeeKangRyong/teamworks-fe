import { participationApi } from "@/entities/project/participation";

export const useParticipation = () => {
    const students = participationApi.getStudents();

    return {
        students
    };
};