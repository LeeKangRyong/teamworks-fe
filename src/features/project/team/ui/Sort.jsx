"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import arrowDown from "@/assets/icons/arrow-down.png";

export function Sort({ type, selectedList, onSortChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedSort, setSelectedSort] = useState(type);
    const dropdownRef = useRef(null);

    const getSortOptions = () => {
        if (selectedList === "팀 리스트") {
            return [
                { value: "name", label: "팀명 순" },
                { value: "activity", label: "최근 활동일 순" }
            ];
        } else if (selectedList === "학생 리스트") {
            return [
                { value: "name", label: "이름 순" },
                { value: "activity", label: "최근 활동일 순" }
            ];
        }
        return [
            { value: "activity", label: "최근 활동일 순" }
        ];
    };

    const sortOptions = getSortOptions();

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

    const handleSortSelect = (sortOption) => {
        setSelectedSort(sortOption.label);
        setIsOpen(false);
        if (onSortChange) {
            onSortChange(sortOption.value);
        }
        console.log("Selected sort:", sortOption.value);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-secondary-3 flex flex-row rounded-lg items-center px-3 py-3 hover:bg-secondary-10 transition-colors duration-150 w-40"
            >
                <p className="text-body-m text-secondary-60 text-left whitespace-nowrap flex-1">{selectedSort}</p>
                <Image 
                    src={arrowDown}
                    alt="arrow-down" 
                    className={`w-6 h-6 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
                />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-1 w-40 bg-secondary-3 rounded-lg z-50 shadow-lg">
                    <div>
                        {sortOptions.map((option, index) => {
                            const isSelected = selectedSort === option.label;
                            return (
                                <button
                                    key={option.value}
                                    onClick={() => handleSortSelect(option)}
                                    className={`w-full px-3 py-3 text-left text-body-m transition-colors duration-150 group first:rounded-t-lg last:rounded-b-lg whitespace-nowrap ${
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