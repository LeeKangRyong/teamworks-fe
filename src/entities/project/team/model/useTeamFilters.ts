import { useMemo } from "react";
import { processTeamData } from "@/entities/project/team";
import type { Team, Student } from '@/shared/types'

interface UseTeamFiltersProps {
    teams: Team[]
    students: Student[]
    listType: string
    selectedStatus: string
    sortType: string
    sortOrder: string
    searchName: string
}

export const useTeamFilters = ({
    teams,
    students,
    listType,
    selectedStatus,
    sortType,
    sortOrder,
    searchName
}: UseTeamFiltersProps) => {
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
