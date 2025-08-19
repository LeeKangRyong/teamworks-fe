import Image from "next/image";
import message from "@/assets/icons/message.png";

export function SendMessage() {
    return (
        <button className="w-12 flex-shrink-0 flex justify-center">
            <Image src={message} alt="message" className="w-10 h-10 p-2" />
        </button>
    );
}