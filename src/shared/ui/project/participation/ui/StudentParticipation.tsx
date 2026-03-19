import { TeamStatus } from "@/shared/ui/project/base";
import { SendMessage } from "@/features/project/team";

interface Props {
    name: string;
    team: string;
    recent: string;
    status: string;
    desc: string;
    onClick?: () => void;
    student_id: number;
}

export function StudentParticipation({ name, team, recent, status, desc, onClick }: Props) {

    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <div
            className="flex flex-row items-center py-1 hover:bg-gray-10 pl-2 -ml-2 -mr-4 border-b-1 border-gray-10 cursor-pointer"
            onClick={handleClick}
        >
            <div className="w-28 flex-shrink-0">
                <p className="text-body-s text-secondary-70 text-left">{name}</p>
            </div>
            <div className="w-28 flex-shrink-0">
                <p className="text-body-s text-secondary-70 text-left">팀 {team}</p>
            </div>
            <div className="w-30 flex-shrink-0">
                <p className="text-body-s text-secondary-70 text-left">{recent}</p>
            </div>
            <div className="w-30 flex-shrink-0">
                <TeamStatus status={status} />
            </div>
            <div className="w-95 flex-shrink-0 pr-2">
                <p className="text-body-s text-secondary-70 text-left">{desc}</p>
            </div>
            <SendMessage />
        </div>
    );
}
