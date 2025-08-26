"use client";
import { useRouter } from "next/navigation";

export function MakeProject() {
    const router = useRouter();
    const handleMake = () => {
        router.push("/projects/add");
    };

    return (
        <button
            className="bg-secondary-70 text-body-m text-gray-0 rounded-3xl w-32 h-10 hover:bg-secondary-60"
            onClick={handleMake}
        >
            + 생성하기
        </button>
    );
}