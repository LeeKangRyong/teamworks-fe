"use client";
import { useState, useMemo, useEffect } from "react";
import { Box } from "@/entities/project/dashboard";
import { AddButton } from "@/features/common";
import { Sort } from "@/features/project/assignment";
import { AssignmentStatusSelect } from "@/features/project/assignment";
import { AssignmentList } from "@/entities/project/assignment";
import { assignmentsData } from "@/shared/mock";
import { parseDate } from "@/shared/utils/teamsDataFormat";

const mapAssignmentStatusValue = (statusValue) => {
    const statusMap = {
        "all": "전체",
        "complete": "채점완료", 
        "progress": "진행중",
        "end": "마감"
    };
    return statusMap[statusValue] || statusValue;
};

export function AssignmentWidget({ initialStatus }) {
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [sortDirection, setSortDirection] = useState("desc");

    useEffect(() => {
        if (initialStatus) {
            setSelectedStatus(initialStatus);
        }
    }, [initialStatus]);

    const handleAdd = () => {
        console.log('add');
    };

    const handleStatusChange = (status) => {
        console.log('change', status);
        setSelectedStatus(status);
    };

    const handleSortDirectionChange = (direction) => {
        console.log('sort direction change', direction);
        setSortDirection(direction);
    };

    // 필터링 및 정렬된 과제 데이터
    const processedAssignments = useMemo(() => {
        // 1. 상태 필터링
        const mappedStatus = mapAssignmentStatusValue(selectedStatus);
        let filtered = mappedStatus === "전체" 
            ? [...assignmentsData] 
            : assignmentsData.filter(assignment => assignment.status === mappedStatus);

        // 2. 마감일 기준 정렬
        filtered.sort((a, b) => {
            const dateA = parseDate(a.deadline);
            const dateB = parseDate(b.deadline);
            const compareResult = dateA - dateB;
            
            // asc: 빠른 순, desc: 늦은 순
            return sortDirection === "asc" ? compareResult : -compareResult;
        });

        return filtered;
    }, [selectedStatus, sortDirection]);

    const renderAssignmentListHeaders = () => (
        <div className="flex flex-row items-center py-2 mt-1">
            <div className="w-100 flex-shrink-0">
                <p className="text-body-s text-secondary-50 text-left">과제명</p>
            </div>
            <div className="w-35 flex-shrink-0">
                <p className="text-body-s text-secondary-50 text-left">마감일</p>
            </div>
            <div className="w-35 flex-shrink-0">
                <p className="text-body-s text-secondary-50 text-left">제출률</p>
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-body-s text-secondary-50 text-left">채점 완료율</p>
            </div>
            <AssignmentStatusSelect 
                onStatusChange={handleStatusChange} 
                initialStatus={selectedStatus}
            />
        </div>
    );

    return (
        <main className="bg-white w-250 py-4 mb-10">
            <article className="ml-6 px-8 w-240 h-140 border-1 border-gray-10 rounded-lg">
                <div className="flex justify-between pt-5">
                    <h3 className="text-body-l text-secondary-80 mt-2">과제 리스트</h3>
                    <div className="flex flex-row gap-3">
                        <Sort 
                            onSortDirectionChange={handleSortDirectionChange}
                            type="deadline"
                        />
                        <AddButton onClick={handleAdd} title="과제 추가 +" />
                    </div>
                </div>
                
                <div className="mx-auto">
                    {renderAssignmentListHeaders()}                    
                    <AssignmentList assignmentsData={processedAssignments} />
                </div>
            </article>
        </main>
    );
}