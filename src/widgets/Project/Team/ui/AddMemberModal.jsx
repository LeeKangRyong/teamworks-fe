"use client";
import { useState, useCallback } from "react";
import { Cancel, Complete } from "@/features/common";
import { ParticipantLists } from "@/features/project/team";

export function AddMemberModal({ onClose, onConfirm }) {
    const [selectedParticipants, setSelectedParticipants] = useState([]);
    const [selectedCount, setSelectedCount] = useState(0);

    // useCallback으로 함수 메모이제이션
    const handleSelectionChange = useCallback((selectedMembers, count) => {
        setSelectedParticipants(selectedMembers);
        setSelectedCount(count);
    }, []);

    const handleComplete = () => {
        onConfirm?.(selectedParticipants);
        onClose?.();
    };

    const isValid = selectedParticipants.length > 0;

    return (
        <div 
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
            <div 
                className="bg-white rounded-md w-100 h-120 p-6 flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-secondary-90 text-body-l font-bold mb-6">
                    참여자 선택
                </h2>
                
                <div className="flex-1 overflow-hidden">
                    <ParticipantLists 
                        onSelectionChange={handleSelectionChange}
                    />
                </div>

                <div className="flex items-center justify-between mt-6">
                    <div className="text-sm text-secondary-50">
                        선택된 인원 {selectedCount}명
                    </div>
                    <div className="flex gap-3">
                        <Cancel onClick={onClose} />
                        <Complete 
                            isValid={isValid}
                            onClick={handleComplete}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}