import { create } from 'zustand'

type ItemRefetchStore = {
  trigger: number
  refetch: () => void
}

export const useItemRefetchStore = create<ItemRefetchStore>((set) => ({
  trigger: 0,
  refetch: () => set((state) => ({ trigger: state.trigger + 1 })),
}))
