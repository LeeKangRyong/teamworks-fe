import { Logout } from "@/features/auth";
import { Cancel } from "@/shared/ui/Button";

export function LogoutModal({ onClose, onConfirm }) {
    const handleBackdropClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div 
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            onClick={handleBackdropClick}
        >
            <div 
                className="bg-white rounded-md w-100 p-6 items-center justify-center mt-20"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="text-secondary-90 text-body-l font-bold text-center mt-6 mb-4">
                    로그아웃
                </h3>
                <div className="mb-6">
                    <p className="text-secondary-80 text-body-m text-center mb-1">
                        정말 로그아웃 하시겠습니까?
                    </p>
                </div>
                <div className="flex gap-1 justify-end">
                    <Cancel onClick={onClose} />
                    <Logout onClick={onConfirm} />
                </div>
            </div>
        </div>
    );
}