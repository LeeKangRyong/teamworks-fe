"use client";
import { useState, useEffect } from "react";
import { ListButtons } from "@/features/project/team";
import { 
    TeamManageLists, 
    StudentManageLists,
    useTeams,
    useTeamFilters,
    validateData
} from "@/entities/project/team";
import { StatusSelect, Sort, SortUpDown, SearchName, Add } from "@/features/project/team";
import { SearchEmptyState } from "@/widgets/Project/Team";

export function TeamWidget({ initialStatus }) {
    const [selectedList, setSelectedList] = useState("팀 리스트");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [sortType, setSortType] = useState("activity");
    const [sortOrder, setSortOrder] = useState("desc");
    const [searchName, setSearchName] = useState("");

    const { teams, students } = useTeams();

    const processedData = useTeamFilters({
        teams,
        students,
        listType: selectedList,
        selectedStatus,
        sortType,
        sortOrder,
        searchName
    });

    const currentData = processedData;
    const hasData = validateData(currentData);
    const isSearching = selectedList === "학생 리스트" && searchName.trim() !== "";
    const originalData = selectedList === "팀 리스트" ? teams : students;
    const hasOriginalData = validateData(originalData);

    useEffect(() => {
        if (initialStatus) {
            setSelectedStatus(initialStatus);
        }
    }, [initialStatus]);

    const handleStatusChange = (status) => {
        setSelectedStatus(status);
    };

    const handleListChange = (listType) => {
        setSelectedList(listType);
        setSearchName("");
    };

    const handleSortChange = (sortValue) => {
        setSortType(sortValue);
    };

    const handleSortOrderChange = (order) => {
        setSortOrder(order);
    };

    const handleSearchChange = (searchTerm) => {
        setSearchName(searchTerm);
    };

    const renderTeamListHeaders = () => (
        <div className="flex flex-row items-center py-2 min-w-[800px]">
            <div className="w-40 flex-shrink-0">
                <p className="text-body-s text-secondary-50 text-left">팀명</p>
            </div>
            <div className="w-20 flex-shrink-0">
                <p className="text-body-s text-secondary-50 text-left">팀원 수</p>
            </div>
            <div className="w-30 flex-shrink-0">
                <p className="text-body-s text-secondary-50 text-left">최근 활동일</p>
            </div>
            <StatusSelect 
                onStatusChange={handleStatusChange} 
                initialStatus={selectedStatus}
            />
            <div className="flex-1 min-w-0">
                <p className="text-body-s text-secondary-50 text-left">내용</p>
            </div>
            <div className="w-12 flex-shrink-0">
                <p className="text-body-s text-secondary-50 text-left">메시지</p>
            </div>
        </div>
    );

    const renderStudentListHeaders = () => (
        <div className="flex flex-row items-center py-2 min-w-[900px]">
            <div className="w-28 flex-shrink-0">
                <p className="text-body-s text-secondary-50 text-left">이름</p>
            </div>
            <div className="w-28 flex-shrink-0">
                <p className="text-body-s text-secondary-50 text-left">팀명</p>
            </div>
            <div className="w-30 flex-shrink-0">
                <p className="text-body-s text-secondary-50 text-left">최근 활동일</p>
            </div>
            <StatusSelect 
                onStatusChange={handleStatusChange} 
                initialStatus={selectedStatus}
            />
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
        <main className="w-full max-w-[1000px] mx-auto py-4 mb-10 px-4">
            <nav className="mb-8 -mt-2" aria-label="팀 관리 탭">
                <ListButtons onListChange={handleListChange} />
            </nav>
            
            <section className="px-8 -mt-2 border-1 border-gray-10 rounded-lg">
                <div className="flex justify-between items-center flex-wrap gap-4">
                    <h1 className="text-secondary-80 text-body-m py-4 mt-2 font-semibold">
                        {selectedList === "팀 리스트" 
                            ? `팀 리스트 (총 ${currentData?.length || 0}개)` 
                            : `학생 리스트 (총 ${currentData?.length || 0}명)`
                        }
                    </h1>
                    <div className="flex flex-row gap-2 items-center flex-wrap">
                        {hasOriginalData && (
                            <>
                                {selectedList === "학생 리스트" && (
                                    <SearchName 
                                        onSearchChange={handleSearchChange}
                                        searchValue={searchName}
                                    />
                                )}
                                <Sort 
                                    type="activity" 
                                    selectedList={selectedList}
                                    onSortChange={handleSortChange}
                                    initialSortType={sortType}
                                />
                                <SortUpDown 
                                    onSortDirectionChange={handleSortOrderChange}
                                />
                                <Add type={selectedList === "팀 리스트" ? "팀" : "학생"} />
                            </>
                        )}
                    </div>
                </div>
                
                <article className="mx-auto overflow-x-auto">
                    <div className="min-w-fit">
                        {hasData && (
                            selectedList === "팀 리스트" 
                                ? renderTeamListHeaders() 
                                : renderStudentListHeaders()
                        )}
                        
                        <div className="h-104 overflow-y-auto scrollbar-thin">
                            {hasData ? (
                                selectedList === "팀 리스트" ? 
                                <TeamManageLists teamsData={currentData} /> : 
                                <StudentManageLists studentsData={currentData} />
                            ) : (
                                <div className="flex flex-col justify-center items-center py-16">
                                    {!hasOriginalData ? (
                                        <>
                                            <p className="text-body-m text-secondary-60 mb-2">
                                                {selectedList === "팀 리스트" 
                                                    ? "현재 생성된 팀이 없습니다" 
                                                    : "등록된 학생이 없습니다"
                                                }
                                            </p>
                                            <p className="text-body-m text-secondary-60 mb-4">
                                                {selectedList === "팀 리스트" 
                                                    ? "새로운 팀을 추가해보세요" 
                                                    : "새로운 학생을 추가해보세요"
                                                }
                                            </p>
                                            <Add type={selectedList === "팀 리스트" ? "팀" : "학생"} />
                                        </>
                                    ) : isSearching ? (
                                        <SearchEmptyState searchTerm={searchName} />
                                    ) : (
                                        <p className="text-body-m text-secondary-60">
                                            {selectedStatus === "all" 
                                                ? "데이터가 없습니다" 
                                                : "해당 상태의 데이터가 없습니다"
                                            }
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </article>
            </section>
        </main>
    );
}