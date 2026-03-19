"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ParticipantList } from "@/entities/project/team";
import { CheckBox } from "@/shared/ui/Button";
import { teamApi } from "@/entities/project/team/api/teamApi";

interface Props {
    onSelectionChange?: (selectedMembers: unknown[], count: number) => void;
}

export function ParticipantLists({ onSelectionChange }: Props) {
    const params = useParams();
    const projectId = params.id;
    const [students, setStudents] = useState<any[]>([]);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    useEffect(() => {
        teamApi.getStudents(projectId as string).then(setStudents);
    }, [projectId]);

    const handleCheck = (participantId: number) => {
        setSelectedIds(prev => {
            const newSelection = prev.includes(participantId)
                ? prev.filter(id => id !== participantId)
                : [...prev, participantId];
            return newSelection;
        });
    };

    const allIds = students.map(student => student.student_id);
    const isAllSelected = allIds.length > 0 && allIds.every(id => selectedIds.includes(id));
    const isIndeterminate = selectedIds.length > 0 && !isAllSelected;

    const handleSelectAllChange = (_newChecked: boolean) => {
        if (isIndeterminate) {
            setSelectedIds([]);
        } else if (selectedIds.length === 0) {
            setSelectedIds(allIds);
        } else if (isAllSelected) {
            setSelectedIds([]);
        }
    };

    useEffect(() => {
        const selectedMembers = students.filter(p =>
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
                    participants={students}
                    selectedIds={selectedIds}
                    onCheck={handleCheck}
                />
            </div>
        </div>
    );
}
