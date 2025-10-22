"use client";
import { Toast, useToast } from "@/shared/ui/Toast";

export function ToastProvider({ children }) {
  const { isVisible, message } = useToast();

  return (
    <>
      {children}
      {isVisible && <Toast message={message} />}
    </>
  );
}