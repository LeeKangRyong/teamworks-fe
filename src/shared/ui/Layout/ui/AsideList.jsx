"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function AsideList({ icon, blueIcon, title, onLogoutClick }) {
    const router = useRouter();
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = () => {
        if (title === "홈") {
            router.push("/projects");
        } else if (title === "로그아웃") {
            onLogoutClick?.();
        }
        // TODO: 검색 기능 추가
    };

    return (
        <div 
            className="flex flex-row gap-4 items-center h-12 px-5 py-3 hover:bg-primary-10 cursor-pointer transition-colors duration-200"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
        >
            <Image 
                src={isHovered ? blueIcon : icon} 
                alt={icon} 
                className="h-5 w-5"
            />
            <p className={`text-body-m transition-colors duration-200 ${
                isHovered ? 'text-primary-100' : 'text-gray-100'
            }`}>
                {title}
            </p>
        </div>
    );
}