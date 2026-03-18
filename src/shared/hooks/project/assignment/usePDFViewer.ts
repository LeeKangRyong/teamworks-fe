"use client";
import { useState, useEffect } from "react";

export function usePDFViewer(fileUrl: string) {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isFullView, setIsFullView] = useState<boolean>(false);

    useEffect(() => {
        setCurrentPage(1);
    }, [fileUrl]);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
        setNumPages(numPages);
    };

    const nextPage = () => numPages && setCurrentPage(prev => Math.min(prev + 1, numPages));
    const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
    const toggleFullView = () => setIsFullView(prev => !prev);

    return {
        numPages,
        currentPage,
        isFullView,
        onDocumentLoadSuccess,
        nextPage,
        prevPage,
        toggleFullView
    };
}
