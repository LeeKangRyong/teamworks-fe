"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import filter from "@/assets/icons/filter.png";

export function StatusSelect({ onStatusChange, initialStatus }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("상태");
    const dropdownRef = useRef(null);

    const statusOptions = [
        { value: "all", label: "상태", textColor: "text-secondary-60" },
        { value: "good", label: "좋음", textColor: "text-secondary-60" },
        { value: "warning", label: "위험", textColor: "text-secondary-60" },
        { value: "freeload", label: "무임승차", textColor: "text-secondary-60" }
    ];

    // initialStatus가 변경될 때 상태 업데이트
    useEffect(() => {
        if (initialStatus) {
            const matchedOption = statusOptions.find(option => option.value === initialStatus);
            if (matchedOption) {
                setSelectedStatus(matchedOption.label);
            }
        }
    }, [initialStatus]);

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

    return (
        <div className="w-30 flex-shrink-0 flex flex-row items-center" ref={dropdownRef}>
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
                    <div className="absolute top-full -left-2 mt-1 w-27 bg-secondary-3 rounded-lg z-50 shadow-lg">
                        <div>
                            {statusOptions.map((option, index) => {
                                const isSelected = selectedStatus === option.label;
                                return (
                                    <button
                                        key={option.value}
                                        onClick={() => handleStatusSelect(option)}
                                        className={`w-full px-2 py-2 text-left text-body-s transition-colors duration-150 flex items-center justify-center group first:rounded-t-lg last:rounded-b-lg ${
                                            isSelected 
                                                ? 'bg-primary-10 text-primary-100 font-medium' 
                                                : 'hover:bg-secondary-10 text-secondary-60'
                                        }`}
                                    >
                                        {option.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}