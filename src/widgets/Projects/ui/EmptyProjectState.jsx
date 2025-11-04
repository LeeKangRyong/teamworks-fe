"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import noProject from "@/assets/icons/no-project.png";

export function EmptyProjectState({ role }) {
    const router = useRouter();
    
    const handleAction = () => {
        if (role === 'MANAGER') {
            router.push("/projects/add");
        } else {
            router.push("/projects/participate");
        }
    };

    const isManager = role === 'MANAGER';
    
    return (
        <div className="col-span-full flex flex-col items-center justify-center min-h-[90vh]">
            <Image src={noProject} alt="noProject" className="w-24 h-24 mb-5"/>
            <p className="text-secondary-50 text-body-m text-center p-0.5">
                {isManager ? "현재 생성된 프로젝트가 없습니다" : "현재 참여중인 프로젝트가 없습니다"}
            </p>
            <p className="text-secondary-50 text-body-m text-center p-0.5 mb-8">
                {isManager ? "새 프로젝트를 만들어 시작해보세요" : "새 프로젝트에 참여해보세요"}
            </p>
            <button
                className="bg-secondary-70 text-body-m text-gray-0 rounded-3xl w-32 h-10 hover:bg-secondary-60 transition-colors"
                onClick={handleAction}
            >
                {isManager ? "+ 생성하기" : "+ 참여하기"}
            </button>
        </div>
    );
}