import { useToastStore } from '@/shared/stores/toastStore';

export function useToast() {
    const { isVisible, message, showToast, hideToast } = useToastStore();

    return {
        isVisible,
        message,
        showToast,
        hideToast
    };
}