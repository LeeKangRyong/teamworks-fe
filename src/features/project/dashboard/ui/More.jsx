import Image from "next/image";
import arrow_right from "@/assets/icons/arrow-right.png";

export function More({ onClick }) {
    return (
        <div 
            role="button"
            className="flex flex-row gap-1 items-center pr-5 cursor-pointer" 
            onClick={onClick}
        >
            <p className="text-secondary-60 text-body-s">더보기</p>
            <Image src={arrow_right} alt="arrow_right" className="w-4 h-4" />
        </div>
    );
}