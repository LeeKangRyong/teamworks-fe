import { useState } from 'react';
import { noticeApi } from '@/entities/project/notice';
import type { CreateNoticeDto } from '@/entities/project/notice';

export const useCreateNotice = () => {
    const [isCreating, setIsCreating] = useState(false);

    const createNotice = async (projectId: string, dto: CreateNoticeDto) => {
        setIsCreating(true);
        try {
            return await noticeApi.createNotice(projectId, dto);
        } catch (err) {
            throw err;
        } finally {
            setIsCreating(false);
        }
    };

    return { createNotice, isCreating };
};
