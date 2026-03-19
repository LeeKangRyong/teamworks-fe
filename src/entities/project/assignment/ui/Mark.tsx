import Image from "next/image";
import mark from "@/assets/icons/marker.png"

interface Props {
    onClick?: () => void;
}

export function Mark({ onClick }: Props) {
    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onClick?.();
    };

    return (
        <button
            onClick={handleClick}
            className="p-1 cursor-pointer rounded"
            title="채점하기"
        >
            <div className="bg-secondary-3 p-2 rounded">
                <Image src={mark} alt="mark" className="w-4 h-4" />
            </div>
        </button>
    );
}
