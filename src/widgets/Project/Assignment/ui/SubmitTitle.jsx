import { TeamMessage } from "@/features/project/assignment";

export function SubmitTitle({ title, team, name, submitTime}) {
    const handleTeamMessage = () => {
        console.log("Team Message");
    }

    return (
        <article className="w-full px-4 sm:px-8 py-6 border-1 border-gray-10 rounded-lg">
            <div className="flex flex-row justify-between items-start">
                <h3 className="text-heading-m text-secondary-80">{title}</h3>
                <TeamMessage onClick={handleTeamMessage} />
            </div>
            <div className="flex flex-row flex-wrap gap-1 mt-4">
                <p className="text-body-m text-secondary-60">{team}</p>
                <p className="text-body-m text-secondary-60">ㆍ</p>
                <p className="text-body-m text-secondary-60">{name}</p>
                <p className="text-body-m text-secondary-60">ㆍ</p>
                <p className="text-body-m text-secondary-60">{submitTime}</p>
            </div>
        </article>
    );
}