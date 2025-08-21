"use client";
import Image from "next/image";
import { useState } from "react";
import sort from "@/assets/icons/sort.png";

export function SortUpDown({ onSortDirectionChange }) {
    const [selectedDirection, setSelectedDirection] = useState("asc"); // "asc" 또는 "desc"

    const sortOptions = {
        asc: { value: "asc", label: "오름차순" },
        desc: { value: "desc", label: "내림차순" }
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
            className="bg-secondary-3 flex flex-row rounded-lg items-center px-3 py-3 hover:bg-secondary-10 transition-colors duration-150 min-w-fit mt-3"
        >
            <p className="text-body-s text-secondary-60 text-center whitespace-nowrap">
                {sortOptions[selectedDirection].label}
            </p>
            <Image 
                src={sort} 
                alt="sort" 
                className={`w-4 h-4 ml-2 flex-shrink-0 transition-transform duration-200 ${
                    selectedDirection === "desc" ? 'rotate-180' : ''
                }`} 
            />
        </button>
    );
}
