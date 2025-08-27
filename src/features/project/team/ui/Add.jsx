"use client";
import { useRouter, useParams } from "next/navigation";

export function Add({ type }) {
    const router = useRouter();
    const params = useParams();
    const projectId = params.id;

    const handleAdd = () => {
        if (type === "팀") {
            router.push(`/projects/${projectId}/addteam`);        
        }
        // if (type === "학생") {
        //     router.push(`/projects/${projectId}/addstudent`);        
        // }
    };

    return (
        <button
            className="relative bg-primary-5 flex flex-row rounded-lg justify-center items-center px-3 py-3 hover:bg-primary-10 transition-colors duration-150 w-25 mt-3"
            onClick={handleAdd}    
        >
            <span className="text-primary-100 text-body-s text-center">{type} 추가 +</span>
        </button>
    )
}