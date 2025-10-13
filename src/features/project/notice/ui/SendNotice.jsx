import React, { useState, useEffect } from 'react';
import { ENV } from '@/shared/config/env';

export function SendNotice() {
    return (
        <article className="bg-secondary-3 flex items-center justify-center w-180 h-full">
            <p className="text-secondary-50">메시지를 보려면 채널을 선택하세요</p>
        </article>
    );
}