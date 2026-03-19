"use client";
import { useState, useEffect } from "react";
import participantSubmitsData from "@/shared/mock/project/participantSubmitsData.json";
import { ParticipantSubmitList, ParticipantMark } from "@/entities/project/assignment";
import { Download } from "@/features/project/assignment";

interface Props {
    assignmentId: string | number;
}

interface ParticipantSubmit {
    submit_id: number;
    file_name: string;
    submit_time: string;
    file_url?: string;
    [key: string]: unknown;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ParticipantSubmitWidget({ assignmentId }: Props) {
    const [allSubmits, setAllSubmits] = useState<ParticipantSubmit[]>([]);

    useEffect(() => {
        setAllSubmits(participantSubmitsData as ParticipantSubmit[]);
    }, []);

    const handleDownload = (submit: ParticipantSubmit) => {
        if (submit.file_url) {
            window.open(submit.file_url, '_blank');
        }
    };

    const renderActions = (submit: ParticipantSubmit) => (
        <>
            <Download onClick={() => handleDownload(submit)} />
            <ParticipantMark onClick={() => {}} />
        </>
    );

    return (
        <article className="mt-8 px-4 sm:px-8 w-full border-1 border-gray-10 rounded-lg">
            <div className="py-6">
                <h3 className="text-heading-s text-secondary-80 mb-4">제출물</h3>
                <div className="mt-2">
                    <ParticipantSubmitList
                        submitsData={allSubmits}
                        renderActions={renderActions}
                    />
                </div>
            </div>
        </article>
    );
}
