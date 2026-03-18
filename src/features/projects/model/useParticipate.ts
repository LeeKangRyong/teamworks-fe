import { useState } from 'react';
import { projectApi } from '@/entities/projects';
import type { ParticipateProjectDto } from '@/entities/projects';

export const useParticipate = () => {
    const [isParticipating, setIsParticipating] = useState(false);

    const participate = async (dto: ParticipateProjectDto) => {
        setIsParticipating(true);
        try {
            return await projectApi.participateProject(dto);
        } catch (err) {
            throw err;
        } finally {
            setIsParticipating(false);
        }
    };

    return { participate, isParticipating };
};
