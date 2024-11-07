import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { mmkvStorage } from './storage';
interface authstore {
  user: Record<string, any> | null;
  setUser: (user: any) => void;
  setCurrentOrder: (order: any) => void;
  currentOrder: Record<string, any> | null;
  logout: () => void;
}

export const useAuthStore = create<authstore>()(
  persist(
    (set, _get) => ({
      user: null,
      currentOrder: null,
      setCurrentOrder: (order) => set({ currentOrder: order }),
      setUser: (data) => set({ user: data }),
      logout: () => set({ user: null, currentOrder: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);
