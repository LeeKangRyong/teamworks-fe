import { TeamSummaryList } from "@/shared/project";

export function TeamSummary() {
    return (
        <article className="border-1 border-gray-10 rounded-lg w-[50%] pb-5">
            <h3 className="text-secondary-80 text-body-m p-5">주의 요망 팀</h3>
            <div>
                <div className="flex flex-row pl-5">
                    <p className="text-secondary-50 text-body-s pr-20">팀명</p>
                    <p className="text-secondary-50 text-body-s pr-40">내용</p>
                    <p className="text-secondary-50 text-body-s pr-2 pl-10">000</p>
                </div>
                <div className="px-3">
                    <TeamSummaryList />
                    <TeamSummaryList />
                    <TeamSummaryList />
                </div>
            </div>
        </article>
    );
}