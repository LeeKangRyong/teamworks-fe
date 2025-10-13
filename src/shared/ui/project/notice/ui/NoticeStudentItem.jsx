import Image from "next/image";
import user from "@/assets/icons/user.png";

export function NoticeStudentItem({ name, team, badge }) {
    return (
        <div className="flex flex-row items-center gap-2 py-2 px-3 hover:bg-gray-10 cursor-pointer border-b-1 border-gray-10">
            <div className="relative">
                <Image src={user} alt="user" className="w-8 h-8 rounded-full" />
            </div>
            <div className="flex flex-row justify-between items-center flex-1 min-w-0">
                <p className="text-body-s text-secondary-80 truncate">{name}</p>
                {badge > 0 && (
                    <div className="bg-primary-80 rounded-full min-w-4 h-4 flex items-center justify-center px-1">
                        <span className="text-xs text-white">{badge > 99 ? '99+' : badge}</span>
                    </div>
                )}
            </div>
        </div>
    );
}