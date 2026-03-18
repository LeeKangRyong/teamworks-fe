import { useState } from 'react';
import { teamApi } from '@/entities/project/team';
import type { CreateTeamDto, CreateTeamsBulkDto } from '@/entities/project/team';

export const useCreateTeam = () => {
    const [isCreating, setIsCreating] = useState(false);

    const createTeam = async (projectId: string, dto: CreateTeamDto) => {
        setIsCreating(true);
        try {
            return await teamApi.createTeam(projectId, dto);
        } catch (err) {
            throw err;
        } finally {
            setIsCreating(false);
        }
    };

    const createTeamsBulk = async (projectId: string, dto: CreateTeamsBulkDto) => {
        setIsCreating(true);
        try {
            return await teamApi.createTeamsBulk(projectId, dto);
        } catch (err) {
            throw err;
        } finally {
            setIsCreating(false);
        }
    };

    return { createTeam, createTeamsBulk, isCreating };
};
