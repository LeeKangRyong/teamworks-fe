"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import sort from "@/assets/icons/sort.png";

export function SortUpDown({ onSortDirectionChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDirection, setSelectedDirection] = useState("오름차순");
    const dropdownRef = useRef(null);

    const sortOptions = [
        { value: "asc", label: "오름차순" },
        { value: "desc", label: "내림차순" }
    ];

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleDirectionSelect = (option) => {
        setSelectedDirection(option.label);
        setIsOpen(false);
        if (onSortDirectionChange) {
            onSortDirectionChange(option.value);
        }
        console.log("정렬 방향:", option.value);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-secondary-3 flex flex-row rounded-lg items-center px-3 py-3 hover:bg-secondary-10 transition-colors duration-150 min-w-fit"
            >
                <p className="text-body-m text-secondary-60 text-center whitespace-nowrap">{selectedDirection}</p>
                <Image src={sort} alt="sort" className={`w-4 h-4 ml-2 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-1 min-w-full bg-secondary-3 rounded-lg z-50 shadow-lg">
                    <div>
                        {sortOptions.map((option, index) => {
                            const isSelected = selectedDirection === option.label;
                            return (
                                <button
                                    key={option.value}
                                    onClick={() => handleDirectionSelect(option)}
                                    className={`w-full px-3 py-3 text-left text-body-m transition-colors duration-150 flex items-center justify-center group first:rounded-t-lg last:rounded-b-lg whitespace-nowrap ${
                                        isSelected 
                                            ? 'bg-secondary-60' 
                                            : 'bg-secondary-3 hover:bg-secondary-10'
                                    }`}
                                >
                                    <span className={`${
                                        isSelected 
                                            ? 'text-gray-0' 
                                            : 'text-secondary-60'
                                    }`}>
                                        {option.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}