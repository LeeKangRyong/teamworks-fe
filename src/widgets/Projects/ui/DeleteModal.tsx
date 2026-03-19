"use client";
import { Delete } from "@/features/projects";
import { Cancel } from "@/shared/ui/Button";
import { useProjectDelete } from "@/features/projects";
import { useToast } from "@/shared/ui/Toast";

interface Props {
    projectId?: string | number;
    projectName?: string;
    onClose?: () => void;
    onConfirm?: (projectId?: string | number) => void;
}

export function DeleteModal({ projectId, projectName, onClose, onConfirm }: Props) {
    const { showToast } = useToast();
    const { deleteProject, isDeleting } = useProjectDelete();

    const handleBackdropClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const handleDelete = async () => {
        if (isDeleting) return;

        try {
            await deleteProject(projectId!);
            showToast("프로젝트가 삭제되었습니다");
            onConfirm?.(projectId);
            onClose?.();
        } catch (error: any) {
            showToast(error.message || "프로젝트 삭제에 실패했습니다");
        }
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
                    &quot;{projectName}&quot;
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
                    <Delete onClick={handleDelete} />
                </div>
            </div>
        </div>
    );
}
