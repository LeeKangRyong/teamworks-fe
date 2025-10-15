"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Cancel, Complete } from "@/shared/ui/Button";
import { Input, InputDate } from "@/shared/ui/Input";
import { InviteModal } from "./InviteModal";
import { useToast } from "@/shared/ui/Toast";
import Image from "next/image";
import warning from "@/assets/icons/warning.png"

export function ProjectForm({ type }) {
    const [projectName, setProjectName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);
    const [showDateWarning, setShowDateWarning] = useState(false);
    const [showNameWarning, setShowNameWarning] = useState(false);
    const [nameInputFocused, setNameInputFocused] = useState(false);
    const [dateInputFocused, setDateInputFocused] = useState(false);
    const [showInviteModal, setShowInviteModal] = useState(false);

    const router = useRouter();
    const { showToast } = useToast();

    useEffect(() => {
        const isProjectNameFilled = projectName.trim() !== "";
        const isStartDateFilled = startDate.replace(/\D/g, "").length === 8;
        const isEndDateFilled = endDate.replace(/\D/g, "").length === 8;
        
        // 프로젝트명 경고: focus가 있고 입력이 안 되어 있을 때
        setShowNameWarning(nameInputFocused && !isProjectNameFilled);
        
        // 프로젝트 기간 경고: focus가 있고 둘 중 하나라도 완성되지 않았을 때
        setShowDateWarning(dateInputFocused && (!isStartDateFilled || !isEndDateFilled));
        
        setIsFormValid(isProjectNameFilled && isStartDateFilled && isEndDateFilled);
    }, [projectName, startDate, endDate, nameInputFocused, dateInputFocused]);

    const handleComplete = async () => {
        const isProjectNameFilled = projectName.trim() !== "";
        const isStartDateFilled = startDate.replace(/\D/g, "").length === 8;
        const isEndDateFilled = endDate.replace(/\D/g, "").length === 8;

        if (!isFormValid) {
            // 프로젝트명 -> 프로젝트 기간
            if (!isProjectNameFilled) {
                setShowNameWarning(true);
                setNameInputFocused(true);
                return;
            }
            
            if (!isStartDateFilled || !isEndDateFilled) {
                setShowDateWarning(true);
                setDateInputFocused(true);
                return;
            }
        }
        
        console.log("프로젝트 처리:", {
            type,
            name: projectName,
            startDate,
            endDate,
            description: projectDescription
        });
        
        if (type === "update") {
            router.push('/projects');        
            setTimeout(() => {
                showToast("프로젝트가 수정되었습니다");
            }, 100);
        } else if (type === "add") {
            setShowInviteModal(true);
        }
    };

    return (
        <>
            <main className="max-w-140 bg-white rounded-md h-135 p-5 flex flex-col">
                <div className="flex flex-col gap-2 mb-8">
                    <p className="text-secondary-50 text-body-s">프로젝트명</p>
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
                                <p className="text-warning-100 text-caption-regular">프로젝트명을 입력해주세요</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-2 mb-8">
                    <p className="text-secondary-50 text-body-s">프로젝트 기간</p>
                    <InputDate 
                        startDate={startDate} 
                        endDate={endDate}
                        onStartDateChange={setStartDate}
                        onEndDateChange={setEndDate}
                        hasError={showDateWarning}
                        onFocus={() => setDateInputFocused(true)}
                        onBlur={() => setDateInputFocused(false)}
                    />
                    <div className="h-1">
                        {showDateWarning && (
                            <div className="flex flex-row items-center gap-1 -mt-1">
                                <Image src={warning} alt="warning" className="w-3 h-3" />
                                <p className="text-warning-100 text-caption-regular">
                                    프로젝트 기간을 입력해주세요
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-2 mb-8">
                    <p className="text-secondary-50 text-body-s">프로젝트 설명</p>
                    <Input 
                        value={projectDescription}
                        onChange={setProjectDescription}
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

            <InviteModal 
                isOpen={showInviteModal} 
                onClose={() => setShowInviteModal(false)}
            />
        </>
    );
}