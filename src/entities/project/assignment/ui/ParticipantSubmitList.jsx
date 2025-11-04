"use client";
import { useRouter, useParams } from "next/navigation";
import { ParticipantSubmitItem } from "@/shared/ui/project/assignment";

export function ParticipantSubmitList({ submitsData, renderActions }) {
    const router = useRouter();
    const params = useParams();
    const projectId = params.id;
    const assignmentId = params.assignmentId;

    const handleSubmit = (submitId) => {
        router.push(`/projects/${projectId}/assignment/${assignmentId}/${submitId}`);
    };

    const renderHeader = () => (
        <div className="flex flex-row items-center px-3 py-2 min-w-[700px]">
            <div className="w-160 flex-shrink-0">
                <p className="text-body-s text-secondary-50">파일명</p>
            </div>
            <div className="w-30 flex-shrink-0">
                <p className="text-body-s text-secondary-50">제출 시간</p>
            </div>
            <div className="w-20 flex-shrink-0">
                <p className="text-body-s text-secondary-50">다운로드</p>
            </div>
            <div className="w-20 flex-shrink-0">
                <p className="text-body-s text-secondary-50">점수</p>
            </div>
        </div>
    );

    return (
        <article className="mt-4">
            <div className="overflow-x-auto scrollbar-thin">
                <div className="min-w-fit">
                    {renderHeader()}

                    <div className="h-62 overflow-y-auto scrollbar-thin">
                        {submitsData && submitsData.length > 0 ? (
                            submitsData.map((submit) => (
                                <ParticipantSubmitItem
                                    key={submit.submit_id}
                                    fileName={submit.file_name}
                                    submitTime={submit.submit_time}
                                    onClick={() => handleSubmit(submit.submit_id)}
                                >
                                    {renderActions && renderActions(submit)}
                                </ParticipantSubmitItem>
                            ))
                        ) : (
                            <div className="flex flex-col justify-center items-center py-16">
                                <p className="text-body-s text-secondary-60 mb-2">제출물 없음</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
}