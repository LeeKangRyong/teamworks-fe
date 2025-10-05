import { PDFViewer } from "@/features/project/assignment";

export function SubmitPreview({ fileUrl }) {
    return (
        <div className="flex-1 border-1 border-gray-10 rounded-lg h-110">
            <h3 className="text-heading-m text-secondary-80 mt-8 ml-8 mb-4">제출물 미리보기</h3>
            <div className="flex items-center justify-center">
                <PDFViewer fileUrl={fileUrl} />
            </div>
        </div>
    );
}