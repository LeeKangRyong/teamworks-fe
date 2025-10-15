import { useToastStore } from "@/shared/ui/Toast";

export function useToast() {
    const { isVisible, message, showToast, hideToast } = useToastStore();

    return {
        isVisible,
        message,
        showToast,
        hideToast
    };
}