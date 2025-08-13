import Image from "next/image";
import { AsideList } from "@/features/layout";
import home from "@/assets/icons/home.png";
import search from "@/assets/icons/search.png";
import edit from "@/assets/icons/edit.png";

export function LayoutAside() {
    return (
        <aside className="absolute left-0 border-r-1 border-gray-10 w-[12.5%] h-full z-40 bg-gray-0">
            <div className="flex flex-row justify-between items-center mt-18 px-5">
                <p className="text-body-m text-gray-100">편집</p>
                <Image src={edit} alt="edit" className="h-5 w-5" />
            </div>
            <div className="mt-5 px-5">
                <AsideList icon={home} title="홈" />
                <AsideList icon={search} title="검색" />
            </div>
        </aside>
    );
}