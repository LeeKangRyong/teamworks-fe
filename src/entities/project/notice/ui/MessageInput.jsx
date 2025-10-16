import { useState } from "react";
import Image from "next/image";
import send from "@/assets/icons/message-blue.png";
import clip from "@/assets/icons/clip.png";

export function MessageInput({ onSend }) {
    const [message, setMessage] = useState("");

    const handleSubmit = () => {
        if (message.trim()) {
            onSend(message);
            setMessage("");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className="border-t border-gray-10 px-4 py-3 bg-white">
            <div className="relative">
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="채팅을 입력해주세요"
                    className="w-full h-24 px-3 pt-3 pb-10 bg-white rounded-lg resize-none outline-none focus:border-white text-body-s text-secondary-80 placeholder:text-secondary-30 transition-colors scrollbar-thin"
                />
                
                <button 
                    className="absolute bottom-2 left-2 p-1.5 hover:bg-gray-10 rounded transition-colors"
                >
                    <Image src={clip} alt="clip" className="w-5 h-5" />
                </button>
                
                <button 
                    onClick={handleSubmit}
                    disabled={!message.trim()}
                    className="absolute bottom-2 right-2 p-1.5 hover:bg-primary-10 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Image src={send} alt="send" className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}