import { GoBack } from "@/features/project/participation";
import { SubmitTitle } from "@/widgets/Project/Assignment";

export function SubmitDetailWidget({ data }) {
    return (
        <main className="bg-white w-250 py-4.5 mb-10 relative">
            <GoBack />
            <SubmitTitle
                title={data.file_name}
                name={data.name}
                team={data.team}
                submitTime={data.submit_time}
            />
            <div className="flex flex-row gap-2">
                {/* TODO : <SubmitPreview /> */}
                {/* TODO : <SubmitMemo /> */}
            </div>
        </main>
    );
}