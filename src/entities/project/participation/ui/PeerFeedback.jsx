"use client";

export function PeerFeedback() {
    const feedbacks = [
        { 
            id: 1, 
            content: "3차 과제 피어 피드백 요청", 
            submittedAt: "2025/10/03"
        },
        { 
            id: 2, 
            content: "2차 과제 피어 피드백 요청", 
            submittedAt: "2025/10/02"
        },
        { 
            id: 3, 
            content: "1차 과제 피어 피드백 요청", 
            submittedAt: "2025/10/01"
        }
    ];

    return (
        <article className="border-1 border-gray-10 rounded-lg w-full lg:w-[50%]">
            <h3 className="text-secondary-80 text-body-l font-bold pl-4 sm:pl-8 pt-6 sm:pt-8">
                피어 피드백
            </h3>
            
            <div className="flex flex-row items-center px-4 sm:px-8 pt-4 pb-2">
                <div className="flex-1">
                    <p className="text-body-s text-secondary-50">내용</p>
                </div>
                <div className="w-24 sm:w-28">
                    <p className="text-body-s text-secondary-50 text-center pl-4">제출 날짜</p>
                </div>
            </div>

            <div className="px-4 sm:px-8 pb-6 space-y-0">
                {feedbacks.map((feedback, index) => (
                    <div 
                        key={feedback.id}
                        className={`flex flex-row items-center py-3 ${
                            index !== feedbacks.length - 1 ? 'border-b-1 border-gray-10' : ''
                        }`}
                    >
                        <div className="flex-1">
                            <p className="text-body-m text-secondary-80">{feedback.content}</p>
                        </div>
                        <div className="w-24 sm:w-28 flex justify-end">
                            <p className="text-body-s text-secondary-50">
                                {feedback.submittedAt}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </article>
    );
}