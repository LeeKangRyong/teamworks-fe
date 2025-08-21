import { create } from 'zustand';

export const useToastStore = create((set) => ({
    isVisible: false,
    message: '',
    
    showToast: (message="토스트 메세지입니다", duration=3000) => {
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