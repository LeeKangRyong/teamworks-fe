"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import participantSubmitsData from "@/shared/mock/project/participantSubmitsData.json";
import { ParticipantSubmitList, ParticipantMark } from "@/entities/project/assignment";
import { Download } from "@/features/project/assignment";

export function ParticipantSubmitWidget({ assignmentId }) {
    const router = useRouter();
    const params = useParams();
    const projectId = params.id;
    const [allSubmits, setAllSubmits] = useState([]);

    useEffect(() => {
        setAllSubmits(participantSubmitsData);
    }, []);

    const handleDownload = (submitId) => {
        console.log('download:', submitId);
    };

    const handleSearch = (submitId) => {
        console.log('search:', submitId);
    };

    const renderActions = (submit) => (
        <>
            <Download onClick={() => handleDownload(submit.submit_id)} />
            <ParticipantMark onClick={() => handleMark(submit.submit_id, submit.student_id)} />
            
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