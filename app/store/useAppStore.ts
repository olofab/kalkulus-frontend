import { create } from 'zustand'

type User = {
  id: number
  name: string
  email: string
  isAdmin: boolean
}

type Company = {
  id: number
  name: string
  organizationNumber: string
  industry: string
  hourlyRate: number
  machineRate: number
  fuelRate: number
  vat: number
}

type AppState = {
  user: User | null
  company: Company | null
  setUser: (user: User) => void
  setCompany: (company: Company) => void
  reset: () => void
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  company: null,
  setUser: (user) => set({ user }),
  setCompany: (company) => set({ company }),
  reset: () => set({ user: null, company: null })
}))
