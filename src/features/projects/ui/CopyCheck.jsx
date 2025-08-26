"use client";
import { useState } from "react";
import Image from "next/image";
import copy from "@/assets/icons/copy-blue.png";
import check from "@/assets/icons/check-blue.png";

export function CopyCheck({ code = "asdasdasdaasdsdasda" }) {
    const [isChecked, setIsChecked] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setIsChecked(true);
            
            setTimeout(() => {
                setIsChecked(false);
            }, 2000);

        } catch (err) {
            console.error('복사에 실패했습니다:', err);
            const textArea = document.createElement('textarea');
            textArea.value = code;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
                setIsChecked(true);
                setTimeout(() => {
                    setIsChecked(false);
                }, 2000);
            } catch (fallbackErr) {
                console.error('Fallback 복사도 실패했습니다:', fallbackErr);
            }
            document.body.removeChild(textArea);
        }
    };

    return (
        <div 
            role="button" 
            className="flex bg-primary-10 w-10 h-10 rounded items-center justify-center cursor-pointer hover:bg-primary-20 transition-colors duration-200" 
            onClick={handleCopy}
        >
            <Image 
                src={isChecked ? check : copy} 
                alt={isChecked ? "check" : "copy"} 
                className="w-5 h-auto" 
            />
        </div>
    );
}