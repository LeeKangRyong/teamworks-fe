"use client";
import Image from "next/image";
import { AsideList } from "@/features/layout";
import home from "@/assets/icons/home.png";
import search from "@/assets/icons/search.png";
import homeBlue from "@/assets/icons/home-blue.png";
import searchBlue from "@/assets/icons/search-blue.png";
import edit from "@/assets/icons/edit.png";

export function LayoutAside({ isCollapsed = false, onToggle = () => {} }) {
    return (
        <aside 
            className={`
                absolute left-0 top-0 border-r-1 border-gray-10 h-screen z-40 bg-gray-0
                transition-all duration-300 ease-in-out
                ${isCollapsed ? 'w-6' : 'w-[240px]'}
            `}
        >
            <div className="relative mt-18">
                <div 
                    className={`
                        absolute top-0 left-0 w-full transition-opacity duration-300
                        ${isCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'}
                    `}
                >
                    <AsideList icon={home} blueIcon={homeBlue} title="홈" />
                    <AsideList icon={search} blueIcon={searchBlue} title="검색" />
                </div>
            </div>
            
            <button
                onClick={onToggle}
                className="fixed w-6 h-6 bottom-4 z-50 transition-all duration-300 hover:scale-110"
                style={{
                    left: isCollapsed ? "0px" : "200px",
                }}
            >
                <Image src={edit} alt="edit" className="w-full h-full" />
            </button>
        </aside>
    );
}