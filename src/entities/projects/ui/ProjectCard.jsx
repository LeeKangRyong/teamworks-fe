import Image from "next/image";
import calendar from "@/assets/icons/calendar.png";

export function ProjectCard({ title, duration, members, children }) {
    return (
        <article className="rounded-lg shadow-lg bg-white h-fit hover:scale-102">
            <figure className="bg-secondary-5 h-40 rounded-t-lg"/>
            <div className="p-4">
                <div className="flex flex-row justify-between items-start mb-3">
                    <p className="text-heading-m">{title}</p>
                    {children}
                </div>
                <div>
                    <div className="flex flex-row gap-1 items-center mb-2">
                        <Image src={calendar} alt="calendar" className="h-4 w-4" />
                        <p className="text-caption-regular text-gray-60">{duration}</p>
                        <p className="text-caption-regular text-gray-60">-</p>
                        <Image src={calendar} alt="calendar" className="h-4 w-4" />
                        <p className="text-caption-regular text-gray-60">{duration}</p>
                    </div>
                    <p className="text-body-s text-gray-80">{members} 명 참여 중</p>
                </div>
            </div>
        </article>
    );
}
