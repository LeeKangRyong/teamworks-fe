import { TeamSummaryList } from "@/shared/ui/project/dashboard"

export function TeamSummary({ children, num }) {
    return (
        <article className="border-1 border-gray-10 rounded-lg w-[50%] pb-5">
            <div className="flex justify-between -mx-1">
                <h3 className="text-secondary-80 text-body-m p-5"><b>주의 요망 팀</b> (총 {num}팀)</h3>
                {children}
            </div>
            <div>
                <div className="flex flex-row px-2">
                    <div className="w-20 flex-shrink-0">
                        <p className="text-secondary-50 text-body-s py-2 pl-2 text-left">팀명</p>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-secondary-50 text-body-s py-2 pl-11 text-left">내용</p>
                    </div>
                    <div className="flex-shrink-0">
                        <p className="text-secondary-50 text-body-s py-2 text-left pr-13">상태</p>
                    </div>
                </div>
                <div className="px-3">
                    <TeamSummaryList team="노랑통닭" desc="기여도 편차 87%, 파일 미제출" status="무임승차" />
                    <TeamSummaryList team="ㅁㄴㄴ" desc="채팅 10건 미만, 파일 미제출" status="위험" />
                    <TeamSummaryList team="노랑통닭" desc="채팅 20건 미만" status="좋음" />
                </div>
            </div>
        </article>
    );
}