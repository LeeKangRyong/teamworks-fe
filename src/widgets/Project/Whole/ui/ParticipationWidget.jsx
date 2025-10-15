"use client";
import { useState } from "react";
import { Box } from "@/entities/project/dashboard";
import { PercentageWidget, Students } from "@/widgets/Project/Participation";
import { StatusSelect } from "@/features/project/team";

export function ParticipationWidget() {
    const [selectedStatus, setSelectedStatus] = useState("all");

    const handleStatusChange = (status) => {
        setSelectedStatus(status);
    };

    const renderStudentListHeaders = () => (
        <div className="flex flex-row items-center py-2 px-8 mb-3 mt-4">
            <div className="w-28 flex-shrink-0">
                <p className="text-body-s text-secondary-50 text-left">이름</p>
            </div>
            <div className="w-28 flex-shrink-0">
                <p className="text-body-s text-secondary-50 text-left">팀명</p>
            </div>
            <div className="w-30 flex-shrink-0">
                <p className="text-body-s text-secondary-50 text-left">최근 활동일</p>
            </div>
            <StatusSelect onStatusChange={handleStatusChange} />
            <div className="flex-1 min-w-0">
                <p className="text-body-s text-secondary-50 text-left">내용</p>
            </div>
            <div className="w-16 flex-shrink-0 pl-6">
                <p className="text-body-s text-secondary-50 text-right">메시지</p>
            </div>
        </div>
    );

    return (
        <main className="bg-white w-250 py-4.5 mb-10">
            <div className="justify-between gap-10 flex flex-row mx-5 mb-8 h-60">
                <PercentageWidget />
                <PercentageWidget />
            </div>
            <div className="ml-6 w-240 border-1 border-gray-10 rounded-lg">
                {renderStudentListHeaders()}
                <Students selectedStatus={selectedStatus} />
            </div>            
        </main>
    );
}