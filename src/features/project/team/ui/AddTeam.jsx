"use client";
import { useRouter } from "next/navigation";

export function AddTeam() {
    const router = useRouter();

    const handleAdd = () => {
        router.push("/projects/1/addteamall");
    };

    return (
        <button
            className="relative bg-primary-5 flex flex-row rounded-lg justify-center items-center px-3 py-3 hover:bg-primary-10 transition-colors duration-150 w-35"
            onClick={handleAdd}
        >
            <span className="text-primary-100 text-body-s text-center">팀 일괄 생성하기 +</span>
        </button>
    )
}