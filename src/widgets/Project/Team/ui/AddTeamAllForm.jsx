"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Cancel, Complete } from "@/features/common";
import { AddTeamInput, Search } from "@/features/project/team";
import { useToast } from "@/shared/hooks";
import Image from "next/image";
import warning from "@/assets/icons/warning.png"

export function AddTeamAllForm() {
    const [projectTeam, setprojectTeam] = useState("");
    const [projectMember, setprojectMember] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);
    const [showNameWarning, setShowNameWarning] = useState(false);
    const [nameInputFocused, setNameInputFocused] = useState(false);

    const router = useRouter();
    const { showToast } = useToast();

    useEffect(() => {
        const isprojectTeamFilled = projectTeam.trim() !== "";
        const isprojectMemberFilled = projectMember.trim() !== "";
        
        setShowNameWarning(nameInputFocused && !isprojectTeamFilled && !isprojectMemberFilled);
        
        setIsFormValid(isprojectTeamFilled && isprojectMemberFilled);
    }, [projectTeam, nameInputFocused]);

    const handleComplete = async () => {
        const isprojectTeamFilled = projectTeam.trim() !== "";

        if (!isFormValid) {
            if (!isprojectTeamFilled) {
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
            <div className="flex flex-row gap-10 mb-8">
                <div className="flex flex-col gap-2">
                    <p className="text-secondary-50 text-body-s">팀 수</p>
                    <AddTeamInput 
                        value={projectTeam} 
                        onChange={setprojectTeam}
                        hasError={showNameWarning}
                        onFocus={() => setNameInputFocused(true)}
                        onBlur={() => setNameInputFocused(false)}
                        type="팀"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-secondary-50 text-body-s">팀별 인원</p>
                    <AddTeamInput 
                        value={projectMember} 
                        onChange={setprojectMember}
                        hasError={showNameWarning}
                        onFocus={() => setNameInputFocused(true)}
                        onBlur={() => setNameInputFocused(false)}
                        type="명"
                    />
                </div>
            </div>
            <div className="h-1">
                    {showNameWarning && (
                        <div className="flex flex-row items-center gap-1 -mt-6">
                            <Image src={warning} alt="warning" className="w-3 h-3" />
                            <p className="text-warning-100 text-caption-regular">팀 정보를 입력해주세요</p>
                        </div>
                    )}
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