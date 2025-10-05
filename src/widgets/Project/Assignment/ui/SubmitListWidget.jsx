"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { submitsData } from "@/shared/mock";
import { SubmitList } from "@/entities/project/assignment";
import { Download, Mark } from "@/features/project/assignment";

export function SubmitListWidget({ assignmentId }) {
    const router = useRouter();
    const params = useParams();
    const projectId = params.id;
    const [filteredSubmits, setFilteredSubmits] = useState([]);

    useEffect(() => {
        const submits = submitsData.filter(
            submit => submit.assignment_id === parseInt(assignmentId)
        );
        setFilteredSubmits(submits);
    }, [assignmentId]);

    const handleDownload = (submitId) => {
        console.log('download:', submitId);
    };

    const handleMark = (submitId, studentId) => {
        console.log('mark:', submitId);
    };

    const renderActions = (submit) => (
        <>
            <Download onClick={() => handleDownload(submit.submit_id)} />
            <Mark onClick={() => handleMark(submit.submit_id, submit.student_id)} />
        </>
    );

    return (
        <article className="mt-8 -mb-8 ml-6 px-8 w-240 border-1 border-gray-10 rounded-lg">
            <div className="py-6">
                <h3 className="text-heading-m text-secondary-80 mb-4">제출물 리스트</h3>
                <div className="mt-2">
                    <SubmitList 
                        submitsData={filteredSubmits}
                        renderActions={renderActions}
                    />
                </div>
            </div>
        </article>
    );
}