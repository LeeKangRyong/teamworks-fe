"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import filter from "@/assets/icons/filter.png";

export function StatusSelect({ onStatusChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("상태");
    const dropdownRef = useRef(null);

    const statusOptions = [
        { value: "all", label: "상태", textColor: "text-secondary-60" },
        { value: "good", label: "좋음", textColor: "text-secondary-60" },
        { value: "warning", label: "위험", textColor: "text-secondary-60" },
        { value: "freeload", label: "무임승차", textColor: "text-secondary-60" }
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

    const handleStatusSelect = (status) => {
        setSelectedStatus(status.label);
        setIsOpen(false);
        if (onStatusChange) {
            onStatusChange(status.value);
        }
        console.log("Selected status:", status.value);
    };

    const handleMouseLeave = () => {
        setIsOpen(false);
    };

    return (
        <div className="w-30 flex-shrink-0 flex flex-row items-center" ref={dropdownRef} onMouseLeave={handleMouseLeave}>
            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex flex-row gap-1 items-center hover:bg-secondary-3 pl-2 py-3 -ml-2 -my-2 w-27 group"
                >
                    <p className="text-body-s text-secondary-50 text-left">{selectedStatus}</p>
                    <Image 
                        src={filter} 
                        alt="filter" 
                        className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
                    />
                </button>

                {isOpen && (
                    <div className="absolute top-full -left-2 mt-0 w-27 bg-secondary-3 z-50">
                        <div>
                            {statusOptions.map((option, index) => (
                                <button
                                    key={option.value}
                                    onClick={() => handleStatusSelect(option)}
                                    className="w-full px-2 py-2 text-left text-body-s bg-secondary-3 hover:bg-secondary-60 transition-colors duration-150 flex items-center justify-center group"
                                >
                                    {option.value === "all" ? (
                                        <span className="text-secondary-60 group-hover:text-gray-0">{option.label}</span>
                                    ) : (
                                        <div className={`px-2 py-1 ${option.bgColor} rounded-md flex items-center justify-center w-24 min-w-24`}>
                                            <p className={`${option.textColor} text-body-s text-center truncate`}>{option.label}</p>
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
