"use client";
import { useRouter, useParams } from "next/navigation";
import { useSubmits, SubmitList, Mark } from "@/entities/project/assignment";
import { Download } from "@/features/project/assignment";

export function SubmitListWidget({ assignmentId }) {
    const router = useRouter();
    const params = useParams();
    const projectId = params.id;
    const { submits } = useSubmits(assignmentId);

    const handleDownload = (submit) => {
        if (submit.file_url) {
            window.open(submit.file_url, '_blank');
        }
    };

    const handleMark = (submitId) => {
        router.push(`/projects/${projectId}/assignment/${assignmentId}/submit/${submitId}`);
    };

    const renderActions = (submit) => (
        <>
            <Download onClick={() => handleDownload(submit)} />
            <Mark onClick={() => handleMark(submit.submit_id)} />
        </>
    );

    return (
        <article className="mt-8 px-4 sm:px-8 w-full border-1 border-gray-10 rounded-lg">
            <div className="py-6">
                <h3 className="text-heading-m text-secondary-80 mb-4">제출물 리스트</h3>
                <div className="mt-2">
                    <SubmitList
                        submitsData={submits}
                        renderActions={renderActions}
                    />
                </div>
            </div>
        </article>
    );
}
