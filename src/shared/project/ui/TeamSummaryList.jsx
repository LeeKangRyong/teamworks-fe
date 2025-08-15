export function TeamStatus({ status }) {
    return (
        <div className="px-2 py-1 my-1 ml-10 bg-support-red-10 rounded-md flex items-center justify-center">
            <p className="text-support-red-100 text-body-s text-center">{status}</p>
        </div>
    );
}

export function TeamSummaryList() {
    return (
        <div className="flex flex-row hover:bg-gray-10 px-2">
            <p className="text-secondary-70 text-body-s py-2">팀 노랑통닭</p>
            <p  className="text-secondary-70 text-body-s pl-8 py-2">기여도 편차 87%, 파일 미제출</p>
            <TeamStatus status="무임승차" />
        </div>
    );
}