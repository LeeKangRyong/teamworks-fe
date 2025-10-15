import { useMemo } from "react";
import { filterStudents } from "@/entities/project/participation";

export const useFilteredStudents = (students, selectedStatus) => {
    const filteredData = useMemo(() => {
        return filterStudents(students, selectedStatus);
    }, [students, selectedStatus]);

    return filteredData;
};