import { useState, useMemo } from "react";
import { StudentParticipationList } from "@/entities/project/participation";
import { studentsData } from "@/shared/mock";
import { filterByStatus } from "@/shared/utils/teamsDataFormat";

export function Students({ selectedStatus }) {
    const filteredData = useMemo(() => {
        return filterByStatus(studentsData, selectedStatus);
    }, [selectedStatus]);

    return (
        <div className="px-8 -mt-2 h-60 overflow-y-auto scrollbar-thin">
            <StudentParticipationList studentsData={filteredData} />
        </div>
    );
}