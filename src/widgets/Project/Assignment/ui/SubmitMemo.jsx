import { useState } from 'react';
import { MemoInput, Save } from "@/features/project/assignment";
import { useToast } from '@/shared/hooks';

export function SubmitMemo({ initialMemo = "", onSave }) {
    const [memo, setMemo] = useState(initialMemo);
    const [isSaving, setIsSaving] = useState(false);
    const { showToast } = useToast();

    const handleSave = async () => {
        setIsSaving(true);
        showToast('메모가 저장되었습니다');
    };

    return (
        <div className="flex-1 border-1 border-gray-10 rounded-lg h-110">
            <h3 className="text-heading-m text-secondary-80 mt-8 ml-8 mb-4">메모</h3>
            <div className="flex items-center justify-center">
                <MemoInput value={memo} onChange={setMemo} />
            </div>
            <div className="flex justify-end mt-3">
                <Save onClick={handleSave} />
            </div>
        </div>
    );
}