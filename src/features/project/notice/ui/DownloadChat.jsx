"use client";
import Image from "next/image";
import download from "@/assets/icons/download.png";
import { useToast } from "@/shared/hooks";

export function DownloadChat({ fileName, fileUrl }) {
    const { showToast } = useToast();

    const handleDownload = async (e) => {
        e.stopPropagation();
        
        try {
            const response = await fetch(fileUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            window.URL.revokeObjectURL(url);
            
            showToast('다운로드가 완료되었습니다');
        } catch (error) {
            showToast('다운로드에 실패했습니다');
            console.error('Download error:', error);
        }
    };

    return (
        <button 
            onClick={handleDownload}
            className="p-1.5 rounded-full flex-shrink-0 bg-secondary-3 hover:bg-gray-10"
        >
            <Image src={download} alt="download" className="w-4 h-4" />
        </button>
    );
}