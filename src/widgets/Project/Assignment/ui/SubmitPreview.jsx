"use client";
import dynamic from "next/dynamic";

const PDFViewer = dynamic(
    () => import("@/features/project/assignment/ui/PDFViewer"),
    { 
        ssr: false, 
        loading: () => (
            <div className="bg-secondary-3 rounded h-80 w-100 flex items-center justify-center">
                <p className="text-body-s text-secondary-40">로딩 중...</p>
            </div>
        ) 
    }
);

export function SubmitPreview({ fileUrl }) {
    return (
        <div className="flex-1 border-1 border-gray-10 rounded-lg h-110 flex flex-col">
            <h3 className="text-heading-m text-secondary-80 mt-8 ml-8 mb-4 flex-shrink-0">제출물 미리보기</h3>
            <div className="flex-1 overflow-auto scrollbar-thin px-8 pb-8 flex justify-center">
                <PDFViewer fileUrl={fileUrl} />
            </div>
        </div>
    );
}