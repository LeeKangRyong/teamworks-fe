import { useMemo } from "react";
import { filterStudents } from "@/entities/project/participation";
import type { Student } from '@/shared/types'

export const useFilteredStudents = (students: Student[], selectedStatus: string) => {
    const filteredData = useMemo(() => {
        return filterStudents(students, selectedStatus);
    }, [students, selectedStatus]);

    return filteredData;
};
