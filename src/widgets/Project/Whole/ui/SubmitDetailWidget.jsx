import { GoBack } from "@/features/project/participation";
import { SubmitTitle, SubmitPreview, SubmitMemo } from "@/widgets/Project/Assignment";

export function SubmitDetailWidget({ data }) {
    const handleMemoSave = async (memo) => {
        console.log('Saving memo:', memo);
    };

    return (
        <main className="bg-white w-250 py-4.5 mb-9 relative">
            <GoBack />
            <SubmitTitle
                title={data.file_name}
                name={data.name}
                team={data.team}
                submitTime={data.submit_time}
            />
            <div className="flex flex-row gap-6 ml-6 mt-6" style={{ width: '960px' }}>
                <SubmitPreview fileUrl={data.file_url} />
                <SubmitMemo 
                    initialMemo={data.memo} 
                    onSave={handleMemoSave} 
                />
            </div>
        </main>
    );
}