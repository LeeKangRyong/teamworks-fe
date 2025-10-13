import Image from "next/image";
import team_icon from "@/assets/icons/user-team.png";

export function NoticeTeamItem({ team, memberCount, badge }) {
    return (
        <div className="flex flex-row items-center gap-2 py-2 px-3 hover:bg-gray-10 cursor-pointer border-b-1 border-gray-10">
            <div className="relative">
                <div className="w-8 h-8 rounded-full flex items-center justify-center">
                    <Image src={team_icon} alt="team" className="w-8 h-8" />
                </div>
            </div>
            <div className="flex flex-row justify-between items-center flex-1 min-w-0">
                    <p className="text-body-s text-secondary-80 truncate">팀 {team}</p>
                {badge > 0 && (
                    <div className="bg-primary-80 rounded-full min-w-4 h-4 flex items-center justify-center px-1">
                        <span className="text-xs text-white">{badge > 99 ? '99+' : badge}</span>
                    </div>
                )}
            </div>
        </div>
    );
}