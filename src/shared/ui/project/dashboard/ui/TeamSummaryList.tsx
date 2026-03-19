import { TeamStatus } from "@/shared/ui/project/base";

interface Props {
    team: string;
    desc: string;
    status: string;
}

export function TeamSummaryList({ team, desc, status }: Props) {
    return (
        <div className="flex flex-row hover:bg-gray-10 px-2">
            <div className="w-25 flex-shrink-0">
                <p className="text-secondary-70 text-body-s py-2 text-left">팀 {team}</p>
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-secondary-70 text-body-s py-2 pl-8 text-left truncate">{desc}</p>
            </div>
            <div className="flex-shrink-0 ml-3">
                <TeamStatus status={status} />
            </div>
        </div>
    );
}
