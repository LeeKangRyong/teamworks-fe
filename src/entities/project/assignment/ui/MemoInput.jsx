import { useState } from 'react';

export function MemoInput({ value, onChange }) {
    return (
        <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="메모를 입력하세요"
            className="bg-white rounded-lg h-70 w-full p-3 resize-none outline-none border border-transparent focus:border-secondary-50 transition-colors placeholder:text-secondary-30"
        />
    );
}