import { create } from 'zustand';

interface ToastState {
    isVisible: boolean;
    message: string;
    showToast: (message?: string, duration?: number) => void;
    hideToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
    isVisible: false,
    message: '',

    showToast: (message = "토스트 메세지입니다", duration = 3000) => {
        set({
            isVisible: true,
            message: message
        });

        setTimeout(() => {
            set({
                isVisible: false,
                message: ''
            });
        }, duration);
    },

    hideToast: () => {
        set({
            isVisible: false,
            message: ''
        });
    }
}));
