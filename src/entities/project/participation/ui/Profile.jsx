import Image from "next/image";
import profile from "@/assets/icons/profile-blue.png";
import { TeamStatus } from "@/shared/ui/project/base";
import { Team } from "@/widgets/Project/Whole";


export function Profile({ name, team, status }) {
    return (
        <article className="flex flex-row gap-2 border-gray-10 border-1 rounded-lg w-118 px-3 py-4 items-center">
            <Image src={profile} alt="profile" className="w-18 h-18" />
            <div className="flex flex-col">
                <div className="flex flex-row gap-4 items-center">
                    <h3 className="text-secondary-80 text-body-l font-bold">{name}</h3>
                    <TeamStatus status={status} />
                </div>
                <div className="flex flex-row gap-4 items-center mt-2">
                    <p className="text-secondary-60 text-body-s">팀 {team}</p>
                    <p className="text-secondary-60 text-body-s">기여도 점수 하위 5%</p>
                </div>
            </div>
        </article>
    );
}