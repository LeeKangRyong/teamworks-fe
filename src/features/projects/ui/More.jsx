"use client";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import more from "@/assets/icons/more.png";
import edit from "@/assets/icons/edit.png";
import deleteIcon from "@/assets/icons/delete.png";

export function More({ projectId, onDeleteClick }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const router = useRouter();

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

    const handleMoreClick = (e) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    const handleEdit = (e) => {
        e.stopPropagation();
        router.push(`/projects/update/${projectId}`);
        setIsOpen(false);
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        if (onDeleteClick) {
            onDeleteClick();
        }
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={handleMoreClick}
                className="hover:bg-secondary-10 p-1 rounded transition-colors duration-150"
            >
                <Image src={more} alt="more" className="h-5 w-5" />
            </button>

            {isOpen && (
                <div className="absolute top-full right-0 w-28 z-50">
                    <div>
                        <button
                            onClick={handleEdit}
                            className="w-full px-3 py-2 text-left bg-secondary-3 hover:bg-secondary-10 transition-colors duration-150 flex flex-row items-center gap-2 group first:rounded-t-lg"
                        >
                            <Image src={edit} alt="edit" className="w-4 h-4" />
                            <span className="text-secondary-60 text-body-s">수정</span>
                        </button>
                        <button
                            onClick={handleDelete}
                            className="w-full px-3 py-2 text-left bg-secondary-3 hover:bg-secondary-10 transition-colors duration-150 flex flex-row items-center gap-2 group last:rounded-b-lg"
                        >
                            <Image src={deleteIcon} alt="delete" className="w-4 h-4" />
                            <span className="text-warning-100 text-body-s">삭제</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}