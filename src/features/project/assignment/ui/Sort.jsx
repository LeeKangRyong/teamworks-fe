"use client";
import Image from "next/image";
import { useState } from "react";
import arrowDown from "@/assets//icons/arrow-down.png"

export function Sort({ onSortDirectionChange, type }) {
    const [selectedDirection, setSelectedDirection] = useState("desc");

    const sortOptions = {
        asc: { value: "asc", label: "최신 순" },
        desc: { value: "desc", label: "최신 순" }
    };

    const handleToggle = () => {
        const newDirection = selectedDirection === "asc" ? "desc" : "asc";
        setSelectedDirection(newDirection);
        
        if (onSortDirectionChange) {
            onSortDirectionChange(newDirection);
        }
        console.log("정렬 방향:", newDirection);
    };

    return (
        <button
            onClick={handleToggle}
            className="bg-secondary-3 flex flex-row rounded items-center px-3 py-2 hover:bg-secondary-10 transition-colors duration-150 min-w-fit mt-3"
        >
            <p className="text-body-s text-secondary-60 text-center whitespace-nowrap">
                {sortOptions[selectedDirection].label}
            </p>
            <Image 
                src={arrowDown} 
                alt="arrowDown" 
                className={`w-5 h-5 ml-10 flex-shrink-0 transition-transform duration-200 ${
                    selectedDirection === "desc" ? '' : 'rotate-180'
                }`} 
            />
        </button>
    );
}
