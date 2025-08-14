import Image from "next/image";
import { AsideList } from "@/features/layout";
import home from "@/assets/icons/home.png";
import search from "@/assets/icons/search.png";
import homeBlue from "@/assets/icons/home-blue.png";
import searchBlue from "@/assets/icons/search-blue.png";
import edit from "@/assets/icons/edit.png";

export function LayoutAside() {
    return (
        <aside className="absolute left-0 top-0 border-r-1 border-gray-10 w-[240px] h-screen z-40 bg-gray-0">
            <div className="relative mt-18">
                <div className="absolute top-0 left-0 w-full">
                    <AsideList icon={home} blueIcon={homeBlue} title="홈" />
                    <AsideList icon={search} blueIcon={searchBlue} title="검색" />
                </div>
            </div>
        </aside>
    );
}