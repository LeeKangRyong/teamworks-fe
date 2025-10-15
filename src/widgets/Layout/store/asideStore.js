import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAsideStore = create(
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

            setCollapsed: (collapsed) => {
                set({ isCollapsed: collapsed });
            }
        }),
        {
            name: 'aside-storage', // localStorage에 저장될 키 이름
      // 필요시 특정 속성만 persist
            partialize: (state) => ({ isCollapsed: state.isCollapsed }),
        }
    )
);