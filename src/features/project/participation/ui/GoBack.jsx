"use client";
import Image from "next/image";
import arrowLeft from "@/assets/icons/arrow-left.png";
import { useRouter } from "next/navigation";

export function GoBack() {
    const router = useRouter();

    const handdleGoBack = () => {
        router.back();
    };

    return (
        <div role="button" className="flex flex-row gap-1 items-center cursor-pointer mb-4" onClick={handdleGoBack}>
            <Image src={arrowLeft} alt="arrowLeft" className="w-6 h-6" />
            <p className="text-secondary-60 text-body-s">목록으로 돌아가기</p>
        </div>
    )
}