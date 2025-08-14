import Image from "next/image";
import calendar from "@/assets/icons/calendar.png";
import person from "@/assets/icons/person.png";

export function ProjectCard({ title, duration, members, children }) {
    return (
        <article className="rounded-lg shadow-lg bg-white h-fit hover:scale-102">
            <figure className="bg-support-yellow h-40 rounded-t-lg"/>
            <div className="p-4">
                <div className="flex flex-row justify-between items-start mb-2">
                    <p className="text-body-l">{title}</p>
                    {children}
                </div>
                <div>
                    <div className="flex flex-row gap-0.5 items-center mb-1">
                        <Image src={calendar} alt="calendar" className="h-4 w-4" />
                        <p className="text-caption-regular text-secondary-70">{duration}</p>
                        <p className="text-caption-regular text-secondary-70">-</p>
                        <Image src={calendar} alt="calendar" className="h-4 w-4" />
                        <p className="text-caption-regular text-secondary-70">{duration}</p>
                    </div>
                    <div className="flex fle-row gap-0.5 items-center">
                        <Image src={person} alt="person" className="h-4 w-4"/>
                        <p className="text-caption-regular text-secondary-70">{members}명 참여 중</p>
                    </div>
                </div>
            </div>
        </article>
    );
}
