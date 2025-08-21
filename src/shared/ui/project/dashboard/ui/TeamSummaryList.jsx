import { TeamStatus } from "@/shared/ui/project/base";

export function TeamSummaryList({ team, desc, status }) {
    return (
        <div className="flex flex-row hover:bg-gray-10 px-2">
            <div className="w-20 flex-shrink-0">
                <p className="text-secondary-70 text-body-s py-2 text-left">팀 {team}</p>
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-secondary-70 text-body-s py-2 pl-8 text-left">{desc}</p>
            </div>
            <div className="flex-shrink-0 ml-3">
                <TeamStatus status={status} />
            </div>
        </div>
    );
}