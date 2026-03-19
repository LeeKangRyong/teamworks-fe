"use client";
import { Toast, useToast } from "@/shared/ui/Toast";

interface Props {
    children: React.ReactNode;
}

export function ToastProvider({ children }: Props) {
    const { isVisible, message } = useToast();

    return (
        <>
            {children}
            {isVisible && <Toast message={message} />}
        </>
    );
}
