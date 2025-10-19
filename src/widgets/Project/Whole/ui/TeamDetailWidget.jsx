"use client";
import { TeamDetailManageLists } from "@/entities/project/team";
import { AITeamAnalysis } from "@/entities/project/team";
import { Timeline } from "@/entities/project/participation";
import { GoBack } from "@/features/project/participation";

export function TeamDetailWidget({ teamId }) {
    return (
        <main className="w-full max-w-[1000px] mx-auto py-4 mb-10 px-4 relative">
            <GoBack />
            
            <div className="mt-2">
                <TeamDetailManageLists teamId={teamId} />
            </div>
            
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-14 mt-6 items-center lg:items-start justify-center">
                <div className="w-full lg:w-112 lg:flex-shrink-0">
                    <AITeamAnalysis />
                </div>
                <div className="w-full lg:w-112 lg:flex-shrink-0">
                    <Timeline />
                </div>
            </div>
        </main>
    );
}