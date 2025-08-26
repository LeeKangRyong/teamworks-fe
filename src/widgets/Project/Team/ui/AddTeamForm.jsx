"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Cancel, Complete, Input } from "@/features/common";
import { Search } from "@/features/project/team";
import { useToast } from "@/shared/hooks";
import Image from "next/image";
import warning from "@/assets/icons/warning.png"

export function AddTeamForm() {
    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);
    const [showNameWarning, setShowNameWarning] = useState(false);
    const [nameInputFocused, setNameInputFocused] = useState(false);

    const router = useRouter();
    const { showToast } = useToast();

    useEffect(() => {
        const isProjectNameFilled = projectName.trim() !== "";
        
        // 프로젝트명 경고: focus가 있고 입력이 안 되어 있을 때
        setShowNameWarning(nameInputFocused && !isProjectNameFilled);
                
        setIsFormValid(isProjectNameFilled);
    }, [projectName, nameInputFocused]);

    const handleComplete = async () => {
        const isProjectNameFilled = projectName.trim() !== "";

        if (!isFormValid) {
            if (!isProjectNameFilled) {
                setShowNameWarning(true);
                setNameInputFocused(true);
                return;
            }
        }
        
        router.push('/projects/1');        
        setTimeout(() => {
            showToast("팀이 생성되었습니다");
        }, 100);
    };

    return (
        <main className="w-140 bg-white rounded-md h-135 p-5 flex flex-col">
            <div className="flex flex-col gap-2 mb-8">
                <p className="text-secondary-50 text-body-s">팀명</p>
                <Input 
                    value={projectName} 
                    onChange={setProjectName}
                    hasError={showNameWarning}
                    onFocus={() => setNameInputFocused(true)}
                    onBlur={() => setNameInputFocused(false)}
                />
                <div className="h-1">
                    {showNameWarning && (
                        <div className="flex flex-row items-center gap-1 -mt-1">
                            <Image src={warning} alt="warning" className="w-3 h-3" />
                            <p className="text-warning-100 text-caption-regular">팀명을 입력해주세요</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex flex-col gap-2 mb-8">
                <p className="text-secondary-50 text-body-s">팀 설명</p>
                <Input 
                    value={projectDescription}
                    onChange={setProjectDescription}
                />
            </div>
            <div className="flex flex-col gap-2 mb-8">
                <p className="text-secondary-50 text-body-s">참여자</p>
                <Search 
                    value=""
                    onChange=""
                />
            </div>
            <div className="flex-1"></div>
            <div className="flex gap-3 justify-end">
                <Cancel />
                <Complete 
                    isValid={isFormValid} 
                    onClick={handleComplete}
                />
            </div>
        </main>
    );
}