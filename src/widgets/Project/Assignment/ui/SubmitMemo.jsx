import { useState } from 'react';
import { Save } from "@/features/project/assignment";
import { MemoInput } from "@/entities/project/assignment";
import { useToast } from '@/shared/ui/Toast';

export function SubmitMemo({ initialMemo = "", onSave }) {
    const [memo, setMemo] = useState(initialMemo);
    const [isSaving, setIsSaving] = useState(false);
    const { showToast } = useToast();

    const handleSave = async () => {
        setIsSaving(true);
        showToast('메모가 저장되었습니다');
    };

    return (
        <div className="w-full border-1 border-gray-10 rounded-lg h-110 flex flex-col">
            <h3 className="text-heading-m text-secondary-80 mt-8 ml-4 sm:ml-8 mb-4">메모</h3>
            <div className="flex-1 px-4 sm:px-8">
                <div className="w-full h-full flex flex-col items-center">
                    <MemoInput value={memo} onChange={setMemo} />
                    <div className="w-full flex mt-3 pb-4 justify-end">
                        <Save onClick={handleSave} />
                    </div>
                </div>
            </div>
        </div>
    );
}