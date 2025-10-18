"use client";
import { useState, useEffect } from "react";
import { AddButton } from "@/shared/ui/Button";
import { Sort } from "@/features/project/assignment";
import { AssignmentStatusSelect } from "@/features/project/assignment";
import { AssignmentList } from "@/entities/project/assignment";
import { useAssignments } from "@/entities/project/assignment";

const mapAssignmentStatusValue = (statusValue) => {
    const statusMap = {
        "all": "전체",
        "complete": "채점완료", 
        "progress": "진행중",
        "end": "마감"
    };
    return statusMap[statusValue] || statusValue;
};

const reverseMapStatus = (status) => {
    const reverseMap = {
        "전체": "all",
        "채점완료": "complete",
        "진행중": "progress",
        "마감": "end"
    };
    return reverseMap[status] || "all";
};

export function AssignmentWidget({ initialStatus }) {
    const [isMounted, setIsMounted] = useState(false);
    
    const { 
        assignments, 
        loading, 
        statusFilter, 
        setStatusFilter 
    } = useAssignments();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (initialStatus && isMounted) {
            const mappedStatus = mapAssignmentStatusValue(initialStatus);
            setStatusFilter(mappedStatus);
        }
    }, [initialStatus, isMounted, setStatusFilter]);

    const handleAdd = () => {
        console.log('add');
    };

    const handleStatusChange = (status) => {
        const mappedStatus = mapAssignmentStatusValue(status);
        setStatusFilter(mappedStatus);
    };

    const handleSortDirectionChange = (direction) => {
        console.log('sort direction change', direction);
        // 정렬은 현재 useAssignments에서 sortByDeadline으로 고정
        // 추후 필요시 hook에 sortDirection 추가
    };

    const renderAssignmentListHeaders = () => (
        <div className="flex flex-row items-center py-2 mt-1 min-w-[800px]">
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
                initialStatus={reverseMapStatus(statusFilter)}
            />
        </div>
    );

    if (!isMounted || loading) {
        return <div>Loading...</div>;
    }

    return (
        <main className="w-full max-w-[1000px] mx-auto py-4 mb-10 px-4">
            <article className="px-8 border-1 border-gray-10 rounded-lg">
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
                
                <div className="overflow-x-auto scrollbar-thin">
                    <div className="min-w-fit">
                        {renderAssignmentListHeaders()}                    
                        <AssignmentList assignmentsData={assignments} />
                    </div>
                </div>
            </article>
        </main>
    );
}