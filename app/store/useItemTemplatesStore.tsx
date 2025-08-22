import { create } from 'zustand'
import { apiGet } from '../lib/api'
import { ItemTemplate, Category } from '../types/itemTemplates'



type ItemTemplatesStore = {
  templates: ItemTemplate[]
  categories: Category[]
  loading: boolean
  error: string | null
  fetchTemplates: () => Promise<void>
  fetchCategories: () => Promise<void>
  refreshAll: () => Promise<void>
}

export const useItemTemplatesStore = create<ItemTemplatesStore>((set) => ({
  templates: [],
  categories: [],
  loading: false,
  error: null,

  fetchTemplates: async () => {
    set({ loading: true, error: null })
    try {
      const res = await apiGet('/api/items/templates')
      set({ templates: res, loading: false })
    } catch (err: any) {
      set({ error: 'Klarte ikke hente varer', loading: false })
      console.error(err)
    }
  },

  fetchCategories: async () => {
    set({ loading: true, error: null })
    try {
      const res = await apiGet('/api/categories')
      console.log(res)
      set({ categories: res, loading: false })
    } catch (err: any) {
      set({ error: 'Klarte ikke hente kategorier', loading: false })
      console.error(err)
    }
  },

  refreshAll: async () => {
    set({ loading: true, error: null })
    try {
      // Fetch both templates and categories in parallel
      const [templatesRes, categoriesRes] = await Promise.all([
        apiGet('/api/items/templates'),
        apiGet('/api/categories')
      ])

      set({
        templates: templatesRes,
        categories: categoriesRes,
        loading: false
      })
    } catch (err: any) {
      set({ error: 'Klarte ikke oppdatere data', loading: false })
      console.error(err)
    }
  }
}))
