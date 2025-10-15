import { useMemo } from "react";
import { processTeamData } from "@/entities/project/team";

export const useTeamFilters = ({
    teams,
    students,
    listType,
    selectedStatus,
    sortType,
    sortOrder,
    searchName
}) => {
    const processedData = useMemo(() => {
        const rawData = listType === "팀 리스트" ? teams : students;
        
        return processTeamData({
            rawData,
            listType,
            selectedStatus,
            sortType,
            sortOrder,
            searchName
        });
    }, [teams, students, listType, selectedStatus, sortType, sortOrder, searchName]);

    return processedData;
};