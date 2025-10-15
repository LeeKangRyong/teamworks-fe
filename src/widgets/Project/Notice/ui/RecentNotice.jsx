import { More } from "@/features/project/dashboard";
import { useModal } from "@/shared/hooks";
import { AddNoticeModal } from "@/widgets/Project/Notice";
import { AddButton } from "@/shared/ui/Button";

export function RecentNotice() {
    const { isOpen, openModal, closeModal } = useModal();

    const handleNotice = () => {
        console.log("hi");
    };

    const handleModal = () => {
        openModal();
    };

    const handleCloseModal = (e) => {
        e.stopPropagation();
    };

    return (
        <>
            <article className="w-240 border-gray-10 border-1 rounded-lg flex justify-between h-33 px-10 items-center">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-row gap-4">
                        <h3 className="text-secondary-80 text-body-l">최근 공지</h3>
                        <More onClick={handleNotice} />
                    </div>
                    <p className="text-body-m text-secondary-70">1차 과제 관련 안내</p>
                </div>
                <div className="flex flex-col gap-6">
                    <AddButton onClick={handleModal} title="공지 작성 +" />
                    <p className="text-body-m text-secondary-40 text-right">25/08/21</p>
                </div>
            </article>

            {isOpen && (
                <div 
                    className="fixed inset-0 flex items-center justify-center z-50"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                >
                    <div onClick={handleCloseModal}>
                        <AddNoticeModal 
                            onClose={closeModal}
                        />
                    </div>
                </div>
            )}
        </>
    );
}