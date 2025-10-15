"use client";
import { useRouter } from "next/navigation";
import { useToast } from "@/shared/ui/Toast";
import { InviteCode } from "@/entities/projects";
import { CopyCheck } from "@/features/projects";

export function InviteModal({ isOpen, onClose }) {
    const router = useRouter();
    const { showToast } = useToast();
    const inviteCode = "asdasdasdaasdssdsdasda"; // 예시

    if (!isOpen) return null;

    const handleClose = () => {
        router.push("/projects");
        setTimeout(() => {
            showToast("프로젝트가 생성되었습니다");
        }, 200);
    };
    
    const handleCopy = () => {
        showToast("초대 코드가 복사되었습니다");
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="bg-white rounded-lg px-6 relative w-100 h-55 justify-center items-center flex flex-col">
                <button 
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-50 hover:text-gray-60"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                
                <div className="text-center flex flex-col gap-3 mt-2">
                    <h2 className="text-secondary-90 text-body-m text-center font-semibold mb-2">프로젝트 생성이 완료되었습니다</h2>
                    <p className="text-secondary-90 text-body-s text-center mb-4">초대 코드를 공유하고 참여자를 초대해보세요</p>        
                </div>
                <div className="flex flex-row gap-2 mt-4">
                    <InviteCode code={inviteCode} />
                    <CopyCheck code={inviteCode} onClick={handleCopy} />
                </div>
            </div>
        </div>
    );
}