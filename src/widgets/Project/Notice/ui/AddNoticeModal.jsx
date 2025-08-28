import { useState, useEffect } from "react";
import { Input, Cancel } from "@/features/common";
import { SubmitButton, TextEditor } from "@/features/project/notice";
import { useToast } from "@/shared/hooks";
import Image from "next/image";
import warning from "@/assets/icons/warning.png";

export function AddNoticeModal({ onClose }) {
    const [title, setTitle] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);
    const [showTitleWarning, setShowTitleWarning] = useState(false);
    const [titleInputFocused, setTitleInputFocused] = useState(false);

    const { showToast } = useToast();

    useEffect(() => {
        const isTitleFilled = title.trim() !== "";
        setIsFormValid(isTitleFilled);
        
        if (titleInputFocused && isTitleFilled) {
            setShowTitleWarning(false);
        }
    }, [title, titleInputFocused]);

    const handleSubmit = () => {
        const isTitleFilled = title.trim() !== "";
        
        if (!isTitleFilled) {
            setShowTitleWarning(true);
            return;
        }
        
        onClose(); // 나중에 여기에 공지 POST 연결
        setTimeout(() => {
            showToast("공지가 작성되었습니다");
        }, 200);
    };

    const handleTitleFocus = () => {
        setTitleInputFocused(true);
    };

    const handleTitleBlur = () => {
        setTitleInputFocused(false);
    };

    return (
        <main className="bg-white rounded-lg w-200 flex-col justify-center h-120">
            <h3 className="text-body-l text-secondary-90 pl-10 pt-6">공지 작성</h3>
            <div className="flex flex-col px-10 mt-2">
                <div className="relative">
                    <Input 
                        placeholder="제목을 작성해주세요" 
                        value={title}
                        onChange={setTitle}
                        hasError={showTitleWarning}
                        onFocus={handleTitleFocus}
                        onBlur={handleTitleBlur}
                    />
                    {showTitleWarning && (
                        <div className="absolute top-full left-0 flex items-center gap-1 mt-1">
                            <Image src={warning} alt="경고" width={12} height={12} />
                            <p className="text-warning-100 text-caption-regular">제목을 입력해주세요</p>
                        </div>
                    )}
                </div>
                <TextEditor />
            </div>
            <div className="flex flex-row gap-2 justify-end mr-10 -mt-2">
                <Cancel onClick={onClose} />
                <SubmitButton 
                    isValid={isFormValid} 
                    onClick={handleSubmit}
                />
            </div>
        </main>
    );
}