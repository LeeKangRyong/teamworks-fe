"use client";
import { GoBack } from "@/features/project/participation";
import { SubmitTitle, SubmitPreview, SubmitMemo } from "@/widgets/Project/Assignment";
import { useSubmitDetail } from "@/entities/project/assignment";

export function SubmitDetailWidget({ submitId }) {
    const { submit, loading, handleMemoUpdate } = useSubmitDetail(submitId);

    if (loading || !submit) {
        return <div>Loading...</div>;
    }

    return (
        <main className="bg-white w-250 py-4.5 mb-9 relative">
            <GoBack />
            <SubmitTitle
                title={submit.file_name}
                name={submit.name}
                team={submit.team}
                submitTime={submit.submit_time}
            />
            <div className="flex flex-row gap-6 ml-6 mt-6" style={{ width: '960px' }}>
                <SubmitPreview fileUrl={submit.file_url} />
                <SubmitMemo 
                    submitId={submit.submit_id}
                    initialMemo={submit.memo} 
                    onSave={handleMemoUpdate} 
                />
            </div>
        </main>
    );
}