"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function AsideList({ icon, blueIcon, title }) {
    const router = useRouter();
    const [isHovered, setIsHovered] = useState(false);

    // 작동 안되는 중
    const handleHome = () => {
        if (title === "홈") {
            router.push("/projects");
        }
        // TODO: 검색 기능 추가
    };

    return (
        <div 
            className="flex flex-row gap-4 items-center h-12 px-5 py-3 hover:bg-primary-10 cursor-pointer transition-colors duration-200"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleHome}
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