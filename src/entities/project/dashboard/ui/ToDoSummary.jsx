import { ToDoSummaryList } from "@/shared/ui/project/dashboard"

export function ToDoSummary({ children }) {
    return (
        <article className="border-1 border-gray-10 rounded-lg w-[50%] pb-5">
            <div className="flex justify-between -mx-1">
                <h3 className="text-secondary-80 text-body-m p-5"><b>다음 할 일</b> (총 6개)</h3>
                {children}
            </div>
            <div>
                <div className="flex justify-between px-2">
                    <div>
                        <p className="text-secondary-50 text-body-s py-2 pl-2 text-left">내용</p>
                    </div>
                    <div>
                        <p className="text-secondary-50 text-body-s py-2 pr-13 text-left">상태</p>
                    </div>
                </div>
                <div className="px-3">
                    <ToDoSummaryList desc="기여도 편차 87%, 파일 미제출" status="채점" />
                    <ToDoSummaryList desc="채팅 10건 미만, 파일 미제출" status="응답" />
                    <ToDoSummaryList desc="채팅 20건 미만" status="채점" />
                </div>
            </div>
        </article>
    );
}