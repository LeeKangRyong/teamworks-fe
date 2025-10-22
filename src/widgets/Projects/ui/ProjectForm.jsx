"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Cancel, Complete } from "@/shared/ui/Button";
import { Input, InputDate } from "@/shared/ui/Input";
import { InviteModal } from "./InviteModal";
import { useToast } from "@/shared/ui/Toast";
import { useProjectCreate, useProjectUpdate, useProjectDetail } from "@/entities/projects";
import Image from "next/image";
import warning from "@/assets/icons/warning.png";

export function ProjectForm({ type, projectId }) {
    const [projectName, setProjectName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [maxTeamSize, setMaxTeamSize] = useState(4);
    const [maxParticipants, setMaxParticipants] = useState(100);
    const [isFormValid, setIsFormValid] = useState(false);
    const [showDateWarning, setShowDateWarning] = useState(false);
    const [showNameWarning, setShowNameWarning] = useState(false);
    const [nameInputFocused, setNameInputFocused] = useState(false);
    const [dateInputFocused, setDateInputFocused] = useState(false);
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [createdProjectId, setCreatedProjectId] = useState(null);

    const router = useRouter();
    const { showToast } = useToast();
    
    // Model Hooks 사용
    const { createProject, isCreating } = useProjectCreate();
    const { updateProject, isUpdating } = useProjectUpdate();
    const { project, isLoading: isLoadingProject } = useProjectDetail(type === "update" ? projectId : null);

    useEffect(() => {
        const isProjectNameFilled = projectName.trim() !== "";
        const isStartDateFilled = startDate.replace(/\D/g, "").length === 8;
        const isEndDateFilled = endDate.replace(/\D/g, "").length === 8;
        
        setShowNameWarning(nameInputFocused && !isProjectNameFilled);
        setShowDateWarning(dateInputFocused && (!isStartDateFilled || !isEndDateFilled));
        
        setIsFormValid(isProjectNameFilled && isStartDateFilled && isEndDateFilled);
    }, [projectName, startDate, endDate, nameInputFocused, dateInputFocused]);

    // YYYY/MM/DD 형식을 ISO 8601 형식으로 변환
    const formatDateToISO = (dateStr) => {
        if (!dateStr) return "";
        const [year, month, day] = dateStr.split('/');
        return `${year}-${month}-${day}T09:00:00`;
    };

    const handleComplete = async () => {
        const isProjectNameFilled = projectName.trim() !== "";
        const isStartDateFilled = startDate.replace(/\D/g, "").length === 8;
        const isEndDateFilled = endDate.replace(/\D/g, "").length === 8;

        if (!isFormValid) {
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

        try {
            const projectData = {
                name: projectName,
                description: projectDescription,
                startDate: formatDateToISO(startDate),
                endDate: formatDateToISO(endDate),
                maxTeamSize: maxTeamSize,
                maxParticipants: maxParticipants
            };

            if (type === "update") {
                await updateProject(projectId, projectData);
                router.push('/projects');        
                setTimeout(() => {
                    showToast("프로젝트가 수정되었습니다");
                }, 100);

            } else if (type === "add") {
                const result = await createProject(projectData);
                setCreatedProjectId(result.id);
                setShowInviteModal(true);
            }
        } catch (error) {
            showToast(error.message || "프로젝트 처리에 실패했습니다");
        }
    };

    const handleInviteModalClose = () => {
        setShowInviteModal(false);
        router.push('/projects');
        setTimeout(() => {
            showToast("프로젝트가 생성되었습니다");
        }, 100);
    };

    const isLoading = isCreating || isUpdating || isLoadingProject;

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
                        disabled={isLoading}
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
                        disabled={isLoading}
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
                        disabled={isLoading}
                    />
                </div>
                <div className="flex-1"></div>
                <div className="flex gap-3 justify-end">
                    <Cancel onClick={() => router.push('/projects')} />
                    <Complete 
                        isValid={isFormValid && !isLoading} 
                        onClick={handleComplete}
                    />
                </div>
            </main>

            {showInviteModal && (
                <InviteModal 
                    isOpen={showInviteModal} 
                    onClose={handleInviteModalClose}
                    projectId={createdProjectId}
                />
            )}
        </>
    );
}