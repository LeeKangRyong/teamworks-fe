import Image from "next/image";

export function AsideList({ icon, title }) {
    return (
        <div className="flex flex-row gap-4 items-center h-8 px-3 py-1 rounded-lg mb-2 -mx-3 hover:bg-secondary-10 ">
            <Image src={icon} alt="icon" className="h-5 w-5"/>
            <p className="text-body-m text-gray-100">{title}</p>
        </div>
    );
}