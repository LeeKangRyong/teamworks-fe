import { ListButtons } from "@/features/project/team";
import { TeamManageLists } from "@/entities/project/team";
import { StatusSelect } from "@/features/project/team";

export function Team() {
    const handleStatusChange = (selectedStatus) => {
        console.log("팀 목록 필터링:", selectedStatus);
    };

    return (
        <main className="w-250">
            <nav className="px-6 mb-8 -mt-2" aria-label="팀 관리 탭">
                <ListButtons />
            </nav>            
            <section className="ml-6 px-8 w-220 -mt-2 border-1 border-gray-10 rounded-lg">
                <div className="flex flex-row">
                    <h1 className="text-secondary-80 text-body-m py-4 mt-2 font-semibold">팀 리스트 (총 25명)</h1>
                </div>
                <article className="mx-auto">
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
                    <TeamManageLists />
                </article>
            </section>
        </main>
    );
}