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
        <main className="bg-white w-full max-w-250 py-4.5 mb-9 relative mx-auto">
            <div className="px-4 sm:px-6">
                <GoBack />
                <SubmitTitle
                    title={submit.file_name}
                    name={submit.name}
                    team={submit.team}
                    submitTime={submit.submit_time}
                />
                <div className="flex flex-col lg:flex-row gap-14 mt-6 items-center lg:items-start justify-center">
                    <div className="w-full lg:w-112 lg:flex-shrink-0">
                        <SubmitPreview fileUrl={submit.file_url} />
                    </div>
                    <div className="w-full lg:w-112 lg:flex-shrink-0">
                        <SubmitMemo 
                            submitId={submit.submit_id}
                            initialMemo={submit.memo} 
                            onSave={handleMemoUpdate} 
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}