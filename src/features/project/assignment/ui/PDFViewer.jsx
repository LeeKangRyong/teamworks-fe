"use client";
import { useState, useEffect } from "react";

function PDFViewer({ fileUrl }) {
    const [Document, setDocument] = useState(null);
    const [Page, setPage] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [isFullView, setIsFullView] = useState(false);

    useEffect(() => {
        // 클라이언트에서만 react-pdf 로드
        import("react-pdf").then((module) => {
            setDocument(() => module.Document);
            setPage(() => module.Page);
            
            const pdfjs = module.pdfjs;
            pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
        });
    }, []);

    if (!fileUrl) {
        return (
            <div className="bg-secondary-3 rounded h-80 w-full flex items-center justify-center">
                <p className="text-body-m text-secondary-40">PDF 파일이 없습니다</p>
            </div>
        );
    }

    if (!Document || !Page) {
        return (
            <div className="bg-secondary-3 rounded h-80 w-full flex items-center justify-center">
                <p className="text-body-s text-secondary-40">로딩 중...</p>
            </div>
        );
    }

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const toggleFullView = () => setIsFullView(prev => !prev);

    return (
        <>
            <div 
                className="bg-secondary-3 rounded w-full h-80 overflow-auto scrollbar-thin cursor-pointer hover:bg-secondary-5 transition-colors border-1 border-gray-5"
                onClick={toggleFullView}
            >
                <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
                    {Array.from(new Array(numPages || 1), (el, index) => (
                        <Page 
                            key={`page_${index + 1}`} 
                            pageNumber={index + 1} 
                            width={360} 
                            renderTextLayer={false} 
                            renderAnnotationLayer={false} 
                            className="mb-2" 
                        />
                    ))}
                </Document>
            </div>

            {isFullView && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={toggleFullView}>
                    <div className="bg-white rounded-lg w-[80%] max-w-full max-h-screen overflow-auto p-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-heading-m">전체 PDF</h3>
                            <div className="flex items-center gap-2">
                                <a 
                                    href={fileUrl} 
                                    download 
                                    className="p-2 hover:bg-secondary-5 rounded"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                </a>
                                <button onClick={toggleFullView} className="p-2 hover:bg-secondary-5 rounded">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
                                {Array.from(new Array(numPages), (el, index) => (
                                    <Page key={`page_${index + 1}`} pageNumber={index + 1} width={window.innerWidth * 0.7} renderTextLayer={false} renderAnnotationLayer={false} className="mb-4" />
                                ))}
                            </Document>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default PDFViewer;