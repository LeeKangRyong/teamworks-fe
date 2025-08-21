"use client";
import { useRouter } from "next/navigation";

export function SelectStudents({ href = "/projects" }) {
    const router = useRouter();

    const handleClick = () => {
        router.push(href);
    };

    return (
        <button 
            onClick={handleClick}
            className="text-secondary-40 text-body-s underline hover:text-secondary-40 transition-colors duration-150 cursor-pointer mt-10"
        >
            팀 직접 지정하기
        </button>
    );
}