import Image from "next/image";
import download from "@/assets/icons/download.png"

export function Download({ onClick }) {
    const handleClick = (e) => {
        e.stopPropagation();
        onClick?.();
    };

    return (
        <button 
            onClick={handleClick}
            className="p-1 cursor-pointer rounded"
            title="다운로드"
        >
            <div className="bg-secondary-3 p-2 rounded">
                <Image src={download} alt="download" className="w-4 h-4" />
            </div>
        </button>
    );
}