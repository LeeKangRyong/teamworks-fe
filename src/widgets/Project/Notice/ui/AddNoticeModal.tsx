"use client"
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Cancel } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { SubmitButton, TextEditor } from "@/features/project/notice";
import { useCreateNotice } from "@/features/project/notice";
import { useToast } from "@/shared/ui/Toast";
import Image from "next/image";
import warning from "@/assets/icons/warning.png";

interface Props {
    onClose?: () => void;
}

export function AddNoticeModal({ onClose }: Props) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);
    const [showTitleWarning, setShowTitleWarning] = useState(false);
    const [titleInputFocused, setTitleInputFocused] = useState(false);

    const params = useParams();
    const projectId = params?.id;
    const { showToast } = useToast();
    const { createNotice, isCreating } = useCreateNotice();

    useEffect(() => {
        const isTitleFilled = title.trim() !== "";
        setIsFormValid(isTitleFilled);

        if (titleInputFocused && isTitleFilled) {
            setShowTitleWarning(false);
        }
    }, [title, titleInputFocused]);

    const handleSubmit = async () => {
        const isTitleFilled = title.trim() !== "";

        if (!isTitleFilled) {
            setShowTitleWarning(true);
            return;
        }

        try {
            await createNotice(projectId as string, { title, content });
            onClose?.();
            setTimeout(() => {
                showToast("공지가 작성되었습니다");
            }, 200);
        } catch (error: unknown) {
            const err = error as { message?: string };
            showToast(err.message || "공지 작성에 실패했습니다");
        }
    };

    const handleTitleFocus = () => { setTitleInputFocused(true); };
    const handleTitleBlur = () => { setTitleInputFocused(false); };

    return (
        <main className="bg-white rounded-lg w-200 max-w-[calc(100vw-2rem)] flex-col justify-center h-137">
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
                <TextEditor onChange={setContent} />
            </div>
            <div className="flex flex-row gap-2 justify-end mr-10 -mt-2">
                <Cancel onClick={onClose} />
                <SubmitButton
                    isValid={isFormValid && !isCreating}
                    onClick={handleSubmit}
                />
            </div>
        </main>
    );
}
