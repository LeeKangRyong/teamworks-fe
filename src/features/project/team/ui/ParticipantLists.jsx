"use client";
import { useState, useEffect } from "react";
import { ParticipantList } from "@/entities/project/team";
import { CheckBox } from "@/shared/ui/Button";
import { studentsData } from "@/shared/mock";

export function ParticipantLists({ onSelectionChange }) {
    const [selectedIds, setSelectedIds] = useState([]);

    const handleCheck = (participantId) => {
        setSelectedIds(prev => {
            const newSelection = prev.includes(participantId)
                ? prev.filter(id => id !== participantId)
                : [...prev, participantId];
            return newSelection;
        });
    };

    const allIds = studentsData.map(student => student.student_id);
    const isAllSelected = allIds.length > 0 && allIds.every(id => selectedIds.includes(id));
    const isIndeterminate = selectedIds.length > 0 && !isAllSelected;

    const handleSelectAllChange = (newChecked) => {
        if (isIndeterminate) {
            // 부분 선택 상태 → 전체 해제
            setSelectedIds([]);
        } else if (selectedIds.length === 0) {
            // 아무것도 선택 안된 상태 → 전체 선택
            setSelectedIds(allIds);
        } else if (isAllSelected) {
            // 전체 선택 상태 → 전체 해제
            setSelectedIds([]);
        }
    };

    // useEffect로 선택 변경사항을 상위 컴포넌트에 전달
    useEffect(() => {
        const selectedMembers = studentsData.filter(p => 
            selectedIds.includes(p.student_id)
        );
        onSelectionChange?.(selectedMembers, selectedIds.length);
    }, [selectedIds, onSelectionChange]);

    return (
        <div className="h-full flex flex-col">
            <div className="flex flex-row items-center p-3">
                <div className="flex items-center">
                    <CheckBox 
                        checked={isAllSelected}
                        indeterminate={isIndeterminate}
                        onChange={handleSelectAllChange}
                    />
                    <div className="flex flex-row gap-13 ml-3">
                        <p className="text-body-s text-secondary-50">이름</p>
                        <p className="text-body-s text-secondary-50">이메일</p>
                    </div>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto">
                <ParticipantList 
                    participants={studentsData}
                    selectedIds={selectedIds}
                    onCheck={handleCheck}
                />
            </div>
        </div>
    );
}