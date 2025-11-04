import Image from "next/image";
import search from "@/assets/icons/search.png"

export function ParticipantMark({ onClick }) {
    const handleClick = (e) => {
        e.stopPropagation();
        onClick?.();
    };

    return (
        <button 
            onClick={handleClick}
            className="p-1 cursor-pointer rounded"
            title="점수보기"
        >
            <div className="bg-secondary-3 p-2 rounded">
                <Image src={search} alt="search" className="w-3.5 h-3.5" />
            </div>
        </button>
    );
}