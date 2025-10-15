"use client";
import { useRouter } from "next/navigation";
import { useToast } from "@/shared/ui/Toast";

export function Delete({ onClick }) {
    const router = useRouter();
    const { showToast } = useToast();

    const handleDelete = () => {
        // prop 있을 때 (우선)
        if (onClick) {
            onClick();
            showToast("프로젝트가 삭제되었습니다");
        } else {
            // prop 없을 때
            router.push("/projects");
        }

    };

    return (
        <button 
            onClick={handleDelete}
            className="bg-white hover:bg-warning-10 rounded-lg px-3 py-1"
        >
            <span className="text-warning-100 text-body-s text-center">
                삭제
            </span>
        </button>
    );
}