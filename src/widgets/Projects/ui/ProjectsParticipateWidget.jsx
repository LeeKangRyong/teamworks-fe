"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/shared/ui/Input";
import { Cancel, Complete } from "@/shared/ui/Button";
import { useToast } from "@/shared/ui/Toast";
import Image from "next/image";
import warning from "@/assets/icons/warning.png";

export function ProjectsParticipateWidget() {
    const [projectCode, setProjectCode] = useState("");
    const [name, setName] = useState("");
    const [codeInputFocused, setCodeInputFocused] = useState(false);
    const [nameInputFocused, setNameInputFocused] = useState(false);
    const [showCodeWarning, setShowCodeWarning] = useState(false);
    const [showNameWarning, setShowNameWarning] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    const router = useRouter();
    const { showToast } = useToast();

    useEffect(() => {
        const isCodeFilled = projectCode.trim() !== "";
        const isNameFilled = name.trim() !== "";
        
        setShowCodeWarning(codeInputFocused && !isCodeFilled);
        setShowNameWarning(nameInputFocused && !isNameFilled);
        
        setIsFormValid(isCodeFilled && isNameFilled);
    }, [projectCode, name, codeInputFocused, nameInputFocused]);

    const handleCodeFocus = () => {
        setCodeInputFocused(true);
    };

    const handleCodeBlur = () => {
        setCodeInputFocused(false);
    };

    const handleNameFocus = () => {
        setNameInputFocused(true);
    };

    const handleNameBlur = () => {
        setNameInputFocused(false);
    };

    const handleComplete = () => {
        const isCodeFilled = projectCode.trim() !== "";
        const isNameFilled = name.trim() !== "";

        if (!isFormValid) {
            if (!isCodeFilled) {
                setShowCodeWarning(true);
                setCodeInputFocused(true);
                return;
            }
            
            if (!isNameFilled) {
                setShowNameWarning(true);
                setNameInputFocused(true);
                return;
            }
        }

        router.push("/projects");
        setTimeout(() => {
            showToast("프로젝트에 참가하였습니다");
        }, 300);
    };

    return (
        <main className="w-full max-w-110 bg-white rounded-md p-4 sm:p-5 flex flex-col mx-auto" style={{ minHeight: '400px' }}>
            <div className="flex flex-col gap-2 mb-6 sm:mb-8">
                <p className="text-secondary-50 text-body-s">프로젝트 코드</p>
                <Input
                    value={projectCode}
                    onChange={setProjectCode}
                    placeholder="프로젝트 참여 코드를 작성해주세요"
                    hasError={showCodeWarning}
                    onFocus={handleCodeFocus}
                    onBlur={handleCodeBlur}
                />
                <div className="h-1">
                    {showCodeWarning && (
                        <div className="flex flex-row items-center gap-1 -mt-1">
                            <Image src={warning} alt="warning" className="w-3 h-3" />
                            <p className="text-warning-100 text-caption-regular">프로젝트 코드를 입력해주세요</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-2 mb-6 sm:mb-8">
                <p className="text-secondary-50 text-body-s">이름 입력</p>
                <Input
                    value={name}
                    onChange={setName}
                    placeholder="30자 이내로 작성해주세요"
                    hasError={showNameWarning}
                    onFocus={handleNameFocus}
                    onBlur={handleNameBlur}
                />
                <div className="h-1">
                    {showNameWarning && (
                        <div className="flex flex-row items-center gap-1 -mt-1">
                            <Image src={warning} alt="warning" className="w-3 h-3" />
                            <p className="text-warning-100 text-caption-regular">이름을 입력해주세요</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex-1"></div>
            <div className="flex gap-2 sm:gap-3 justify-end">
                <Cancel onClick={() => router.push('/projects')} />
                <Complete 
                    isValid={isFormValid} 
                    onClick={handleComplete}
                />
            </div>
        </main>
    );
}