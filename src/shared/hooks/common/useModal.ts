"use client";
import { useState, useCallback } from 'react';

export const useModal = <T = unknown>(initialState = false) => {
    const [isOpen, setIsOpen] = useState(initialState);
    const [modalData, setModalData] = useState<T | null>(null);

    const openModal = useCallback((data: T | null = null) => {
        setModalData(data);
        setIsOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsOpen(false);
        setModalData(null);
    }, []);

    const toggleModal = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    return {
        isOpen,
        modalData,
        openModal,
        closeModal,
        toggleModal
    };
};
