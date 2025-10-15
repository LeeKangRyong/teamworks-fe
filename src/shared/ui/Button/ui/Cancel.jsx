"use client";
import { useRouter } from "next/navigation";

export function Cancel({ onClick }) {
    const router = useRouter();

    const handleCancel = () => {
        // prop 있을 때 (우선)
        if (onClick) {
            onClick();
        } else {
            // prop 없을 때
            router.back();
        }
    };

    return (
        <button 
            onClick={handleCancel}
            className="bg-white rounded-lg px-3 py-1 group hover:bg-gray-5"
        >
            <span className="text-secondary-60 text-body-s text-center group-hover:text-secondary-60">
                취소
            </span>
        </button>
    );
}