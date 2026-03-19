import Image from "next/image";
import message from "@/assets/icons/message.png";

interface Props {
    onClick?: () => void;
}

export function SendMessage({ onClick }: Props) {
    const handleSend = (e: React.MouseEvent) => {
        e.stopPropagation();
        onClick?.();
    };

    return (
        <button className="w-12 flex-shrink-0 flex justify-center cursor-pointer" onClick={handleSend}>
            <Image src={message} alt="message" className="w-10 h-10 p-2" />
        </button>
    );
}
