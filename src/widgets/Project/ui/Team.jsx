"use client";
import { useState } from "react";
import { ListButtons } from "@/features/project/team";
import { TeamManageLists, StudentManageLists } from "@/entities/project/team";
import { StatusSelect, Sort, SortUpDown, SearchName, Add } from "@/features/project/team";
import { studentsData, teamsData } from "@/shared/mock";

// const studentsData = [];
// const teamsData = [];

export function Team() {
    const [selectedList, setSelectedList] = useState("팀 리스트");

    const handleStatusChange = (selectedStatus) => {
    };

    const handleListChange = (listType) => {
        setSelectedList(listType);
    };

    const handleSortChange = (sortValue) => {
    };

    const currentData = selectedList === "팀 리스트" ? teamsData : studentsData;
    const hasData = currentData && currentData.length > 0;

    const renderTeamListHeaders = () => (
        <div className="flex flex-row items-center py-2">
            <div className="w-40 flex-shrink-0">
                <p className="text-body-s text-secondary-50 text-left">팀명</p>
            </div>
            <div className="w-20 flex-shrink-0">
                <p className="text-body-s text-secondary-50 text-left">팀원 수</p>
            </div>
            <div className="w-30 flex-shrink-0">
                <p className="text-body-s text-secondary-50 text-left">최근 활동일</p>
            </div>
            <StatusSelect onStatusChange={handleStatusChange} />
            <div className="flex-1 min-w-0">
                <p className="text-body-s text-secondary-50 text-left">내용</p>
            </div>
            <div className="w-12 flex-shrink-0">
                <p className="text-body-s text-secondary-50 text-left">메시지</p>
            </div>
        </div>
    );

    const renderStudentListHeaders = () => (
        <div className="flex flex-row items-center py-2">
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
            <div className="w-32 flex-shrink-0">
                <p className="text-body-s text-secondary-50 text-left">연락처</p>
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-body-s text-secondary-50 text-left">이메일</p>
            </div>
            <div className="w-12 flex-shrink-0">
                <p className="text-body-s text-secondary-50 text-left">메시지</p>
            </div>
        </div>
    );

    return (
        <main className="w-250">
            <nav className="px-6 mb-8 -mt-2" aria-label="팀 관리 탭">
                <ListButtons onListChange={handleListChange} />
            </nav>            
            <section className="ml-6 px-8 w-240 -mt-2 border-1 border-gray-10 rounded-lg">
                <div className="flex justify-between items-center">
                    <h1 className="text-secondary-80 text-body-m py-4 mt-2 font-semibold">
                        {selectedList === "팀 리스트" ? `팀 리스트 (총 ${teamsData?.length || 0}개)` : `학생 리스트 (총 ${studentsData?.length || 0}명)`}
                    </h1>
                    <div className="flex flex-row gap-2 items-center">
                        {hasData && (
                            <>
                                {selectedList === "학생 리스트" && <SearchName />}
                                <Sort 
                                    type="최근 활동일 순" 
                                    selectedList={selectedList}
                                    onSortChange={handleSortChange}
                                />
                                <SortUpDown type="오름차순" />
                                <Add type={selectedList === "팀 리스트" ? "팀" : "학생"} />
                            </>
                        )}
                    </div>
                </div>
                <article className="mx-auto">
                    {hasData && (selectedList === "팀 리스트" ? renderTeamListHeaders() : renderStudentListHeaders())}
                    {selectedList === "팀 리스트" ? 
                        <TeamManageLists teamsData={teamsData} /> : 
                        <StudentManageLists studentsData={studentsData} />
                    }
                </article>
            </section>
        </main>
    );
}