import { Delete } from "@/features/projects";
import { Cancel } from "@/shared/ui/Button";

export function DeleteModal({ projectTitle, onClose, onConfirm }) {
    const handleBackdropClick = (e) => {
        e.stopPropagation(); // 모달 밖 배경 클릭 시 모달 안꺼지게
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
                    "{projectTitle}"
                </h3>
                <div className="mb-6">
                    <p className="text-secondary-80 text-body-m text-center mb-1">
                        해당 프로젝트를 삭제하시겠습니까?
                    </p>
                    <p className="text-secondary-80 text-body-m text-center">
                        삭제한 정보는 복구할 수 없습니다
                    </p>
                </div>
                <div className="flex gap-1 justify-end">
                    <Cancel onClick={onClose} />
                    <Delete onClick={onConfirm} />
                </div>
            </div>
        </div>
    );
}