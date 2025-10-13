import React, { useState, useEffect } from 'react';
import { ENV } from '@/shared/config/env';

export function Chat() {
    return (
        <article className="bg-secondary-3 border-gray-10 border-l-1 flex items-center justify-center w-180 h-full">
            { /* 아무 Item도 선택하지 않았을 때 */ }
            <p className="text-secondary-50">메시지를 보려면 채널을 선택하세요</p>

            { /* TODO: 선택했을 때 메세지 창 뜨게 하기 */ }
        </article>
    );
}