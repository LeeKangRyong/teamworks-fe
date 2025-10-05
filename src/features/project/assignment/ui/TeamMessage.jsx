import Image from "next/image";
import message_blue from "@/assets/icons/message-blue.png";

export function TeamMessage({ onClick }) {
    return (
        <button
            className="w-22 bg-primary-5 rounded flex flex-row gap-1 items-center justify-center p-2 hover:bg-primary-10"
            onClick={onClick}
        >
            <span className="text-body-s text-primary-100 text-center">팀 메세지</span>
            <Image src={message_blue} alt="message-blue" className="w-4 h-4" />
        </button>
    );
}
