"use client";
import { useState, useEffect } from "react";

export function usePDFViewer(fileUrl) {
    const [numPages, setNumPages] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isFullView, setIsFullView] = useState(false);

    useEffect(() => {
        setCurrentPage(1);
    }, [fileUrl]);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const nextPage = () => setNumPages && setCurrentPage(prev => Math.min(prev + 1, numPages));
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