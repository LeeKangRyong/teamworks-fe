import { TeamStatus } from "@/shared/project/base";
import { SendMessage } from "@/features/project/team";

export function StudentManageList({ name, team, recent, status, contact, email }) {
    return (
        <div className="flex flex-row items-center py-1 hover:bg-gray-10 pl-2 -ml-2 border-b-1 border-gray-10">
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
            <div className="w-32 flex-shrink-0 pr-2">
                <p className="text-body-s text-secondary-70 text-left">{contact}</p>
            </div>
            <div className="flex-1 min-w-0 pr-2">
                <p className="text-body-s text-secondary-70 text-left">{email}</p>
            </div>
            <SendMessage />
        </div>
    );
}