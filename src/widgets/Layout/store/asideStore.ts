import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AsideState {
    isCollapsed: boolean;
    toggleCollapsed: () => void;
    collapse: () => void;
    expand: () => void;
    setCollapsed: (collapsed: boolean) => void;
}

export const useAsideStore = create<AsideState>()(
    persist(
        (set) => ({
            isCollapsed: false,

            toggleCollapsed: () => {
                set((state) => ({
                    isCollapsed: !state.isCollapsed
                }));
            },

            collapse: () => {
                set({ isCollapsed: true });
            },

            expand: () => {
                set({ isCollapsed: false });
            },

            setCollapsed: (collapsed: boolean) => {
                set({ isCollapsed: collapsed });
            }
        }),
        {
            name: 'aside-storage',
            partialize: (state) => ({ isCollapsed: state.isCollapsed })
        }
    )
);
