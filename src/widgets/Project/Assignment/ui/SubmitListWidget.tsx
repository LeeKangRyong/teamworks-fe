"use client";
import { useRouter, useParams } from "next/navigation";
import { useSubmits, SubmitList, Mark } from "@/entities/project/assignment";
import type { SubmitData } from "@/entities/project/assignment";
import { Download } from "@/features/project/assignment";

interface Props {
    assignmentId: string | number;
}

export function SubmitListWidget({ assignmentId }: Props) {
    const router = useRouter();
    const params = useParams();
    const projectId = params.id;
    const { submits } = useSubmits(String(assignmentId));

    const handleDownload = (submit: SubmitData) => {
        if (submit.file_url) {
            window.open(submit.file_url, '_blank');
        }
    };

    const handleMark = (submitId: string | number) => {
        router.push(`/projects/${projectId}/assignment/${assignmentId}/${submitId}`);
    };

    const renderActions = (submit: SubmitData) => (
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
