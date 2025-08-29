import { Box } from "@/entities/project/dashboard";
import { AddButton } from "@/features/common";
import { Sort } from "@/features/project/assignment";
import { StatusSelect } from "@/features/project/team";

export function AssignmentWidget() {

    const handleAdd = () => {
        console.log('add');
    };

    const handleStatusChange = () => {
        console.log('change');
    };

    const renderAssignmentListHeaders = () => (
        <div className="flex flex-row items-center py-2">
            <div className="w-40 flex-shrink-0">
                <p className="text-body-s text-secondary-50 text-left">과제명</p>
            </div>
            <div className="w-20 flex-shrink-0">
                <p className="text-body-s text-secondary-50 text-left">마감일</p>
            </div>
            <div className="w-30 flex-shrink-0">
                <p className="text-body-s text-secondary-50 text-left">제출률</p>
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-body-s text-secondary-50 text-left">채점 완료율</p>
            </div>
            <StatusSelect 
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
                        <Sort />
                        <AddButton onClick={handleAdd} title="과제 추가 +" />
                    </div>
                </div>
                {/* AssignmentListHeader */}
            </article>
        </main>
    );
}

const renderAssignmentListHeaders = () => (
    <div className="flex flex-row items-center py-2">
        <div className="w-40 flex-shrink-0">
            <p className="text-body-s text-secondary-50 text-left">과제명</p>
        </div>
        <div className="w-20 flex-shrink-0">
            <p className="text-body-s text-secondary-50 text-left">마감일</p>
        </div>
        <div className="w-30 flex-shrink-0">
            <p className="text-body-s text-secondary-50 text-left">제출률</p>
        </div>
        <div className="flex-1 min-w-0">
            <p className="text-body-s text-secondary-50 text-left">채점 완료율</p>
        </div>
        <StatusSelect 
            onStatusChange={handleStatusChange} 
            initialStatus={selectedStatus}
        />
    </div>
);
