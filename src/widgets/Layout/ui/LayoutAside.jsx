import Image from "next/image";
import { AsideList } from "@/features/layout";
import { useAsideStore } from "@/shared/stores/asideStore";
import home from "@/assets/icons/home.png";
import search from "@/assets/icons/search.png";
import homeBlue from "@/assets/icons/home-blue.png";
import searchBlue from "@/assets/icons/search-blue.png";
import editLeft from "@/assets/icons/edit-left.png";
import editRight from "@/assets/icons/edit-right.png";

export function LayoutAside() {
    const { isCollapsed, toggleCollapsed } = useAsideStore();

    return (
        <aside 
            className={`
                absolute left-0 top-0 border-r-1 border-gray-10 z-40 bg-gray-0
                transition-all duration-300 ease-in-out
                h-full min-h-screen
                ${isCollapsed ? 'w-[48px]' : 'w-[200px]'}
            `}
        >
            <div className="relative mt-18">
                {/* 펼쳐진 상태 */}
                <div 
                    className={`
                        absolute top-0 left-0 w-full transition-opacity duration-300
                        ${isCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'}
                    `}
                >
                    <AsideList icon={home} blueIcon={homeBlue} title="홈" />
                    <AsideList icon={search} blueIcon={searchBlue} title="검색" />
                </div>
                
                {/* 접힌 상태 */}
                {isCollapsed && (
                    <div className="w-full">
                        <div
                            className="flex flex-row gap-4 items-center h-12 px-2 py-3 hover:bg-primary-10 cursor-pointer transition-colors duration-200 justify-center group"
                            role="button"
                        >
                            <Image 
                                src={home} 
                                alt="icon" 
                                className="h-5 w-5 group-hover:hidden"
                            />
                            <Image 
                                src={homeBlue} 
                                alt="icon" 
                                className="h-5 w-5 hidden group-hover:block"
                            />
                        </div>
                        
                        <div 
                            className="flex flex-row gap-4 items-center h-12 px-2 py-3 hover:bg-primary-10 cursor-pointer transition-colors duration-200 justify-center group"
                            role="button"
                            >
                            <Image 
                                src={search} 
                                alt="icon" 
                                className="h-5 w-5 group-hover:hidden"
                            />
                            <Image 
                                src={searchBlue} 
                                alt="icon" 
                                className="h-5 w-5 hidden group-hover:block"
                            />
                        </div>
                    </div>
                )}
            </div>
            
            <button
                onClick={toggleCollapsed}
                className="sticky w-10 h-10 z-50 transition-all duration-300 hover:scale-110"
                style={{
                    left: isCollapsed ? "5px" : "150px",
                    top: "calc(100vh - 50px)", // 화면 하단에서 64px 위
                }}
                aria-label="사이드바"
            >
                <Image 
                    src={isCollapsed ? editRight : editLeft} 
                    alt={isCollapsed ? "edit-right" : "edit-left"} 
                    className="w-full h-full" 
                />
            </button>
        </aside>
    );
}