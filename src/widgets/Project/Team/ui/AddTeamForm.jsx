"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Cancel, Complete } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { Search } from "@/features/project/team";
import { AddMemberModal } from "./AddMemberModal";
import { useToast } from "@/shared/ui/Toast";
import Image from "next/image";
import warning from "@/assets/icons/warning.png"

export function AddTeamForm() {
    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [showNameWarning, setShowNameWarning] = useState(false);
    const [showMemberWarning, setShowMemberWarning] = useState(false);
    const [nameInputFocused, setNameInputFocused] = useState(false);

    const router = useRouter();
    const params = useParams();
    const projectId = params.id;
    const { showToast } = useToast();

    useEffect(() => {
        const isProjectNameFilled = projectName.trim() !== "";
        const hasSelectedMembers = selectedMembers.length > 0;
        
        setShowNameWarning(nameInputFocused && !isProjectNameFilled);
        
        setIsFormValid(isProjectNameFilled && hasSelectedMembers);
    }, [projectName, selectedMembers, nameInputFocused]);

    const handleComplete = async () => {
        const isProjectNameFilled = projectName.trim() !== "";
        const hasSelectedMembers = selectedMembers.length > 0;

        if (!isProjectNameFilled) {
            setShowNameWarning(true);
            setNameInputFocused(true);
            return;
        }

        if (!hasSelectedMembers) {
            setShowMemberWarning(true);
            return;
        }
        
        router.push(`/projects/${projectId}/team`);        
        setTimeout(() => {
            showToast("팀이 생성되었습니다");
        }, 100);
    };

    const handleSearchClick = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleMemberSelect = (members) => {
        setSelectedMembers(members);
        setShowMemberWarning(false);
    };

    const searchDisplayValue = selectedMembers.length > 0 
        ? selectedMembers.length === 1 ? selectedMembers[0].name
        : `${selectedMembers[0].name} 외 ${selectedMembers.length - 1}명`
        : "";

    return (
        <>
            <main className="w-full max-w-140 bg-white rounded-md min-h-135 p-5 flex flex-col">
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
                        value={searchDisplayValue}
                        placeholder="팀 참여자를 선택해주세요"
                        onClick={handleSearchClick}
                        hasError={showMemberWarning}
                        readOnly
                    />
                </div>
                <div className="h-1">
                    {showMemberWarning && (
                        <div className="flex flex-row items-center gap-1 -mt-6">
                            <Image src={warning} alt="warning" className="w-3 h-3" />
                            <p className="text-warning-100 text-caption-regular">팀 참여자를 선택해주세요</p>
                        </div>
                    )}
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

            {isModalOpen && (
                <AddMemberModal 
                    onClose={handleModalClose}
                    onConfirm={handleMemberSelect}
                />
            )}
        </>
    );
}