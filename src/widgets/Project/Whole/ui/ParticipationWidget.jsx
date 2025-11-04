"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/entities/auth";
import { PercentageWidget, Students } from "@/widgets/Project/Participation";
import { 
    AssignmentHistory, 
    HighActivityTeam,
    PeerFeedback 
} from "@/entities/project/participation";
import { TimelineShort } from "@/entities/project/participation";
import { StatusSelect } from "@/features/project/team";

export function ParticipationWidget() {
    const { user } = useAuth();
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleStatusChange = (status) => {
        setSelectedStatus(status);
    };

    const renderStudentListHeaders = () => (
        <div className="flex flex-row items-center py-2 px-8 mb-3 mt-4 min-w-[800px]">
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

    // 클라이언트에서만 렌더링되도록 보장
    if (!isMounted) {
        return (
            <main className="w-full max-w-[1000px] mx-auto py-4 mb-10 px-4">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 mb-8">
                    <PercentageWidget />
                    <PercentageWidget />
                </div>
            </main>
        );
    }

    // PARTICIPANT 화면
    if (user?.role === 'PARTICIPANT') {
        return (
            <main className="w-full max-w-[1000px] mx-auto py-4 mb-10 px-4">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 mb-8">
                    <PercentageWidget />
                    <PeerFeedback />
                </div>
                
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 mt-8">
                    <div className="w-full lg:w-1/2">
                        <AssignmentHistory />
                    </div>
                    
                    <div className="w-full lg:w-1/2">
                        <TimelineShort />
                    </div>
                </div>
            </main>
        );
    }

    // MANAGER 화면
    return (
        <main className="w-full max-w-[1000px] mx-auto py-4 mb-10 px-4">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 mb-8">
                <PercentageWidget />
                <HighActivityTeam />
            </div>
            
            <div className="border-1 border-gray-10 rounded-lg overflow-hidden">
                <div className="overflow-x-auto scrollbar-thin">
                    <div className="min-w-fit">
                        {renderStudentListHeaders()}
                        <Students selectedStatus={selectedStatus} />
                    </div>
                </div>
            </div>
        </main>
    );
}