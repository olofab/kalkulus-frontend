import { useEffect, useMemo } from 'react'
import { useItemTemplatesStore } from '../../store/useItemTemplatesStore'
import { ItemTemplate } from '../../types/itemTemplates'

export const useItemTemplates = () => {
  const {
    templates,
    categories,
    fetchTemplates,
    fetchCategories,
  } = useItemTemplatesStore()

  // 🔁 Fetch data once when hook is used
  useEffect(() => {
    if (templates.length === 0) {
      fetchTemplates()
    }
    if (categories.length === 0) {
      fetchCategories()
    }
  }, [])

  // ✅ Group templates by category, and fall back to "Annet"
  const groupedTemplates = useMemo(() => {
    const otherCategory = { id: -1, name: 'Annet' }

    const categoryMap = new Map<number, { id: number; name: string; templates: ItemTemplate[] }>()

    categories.forEach((cat) => {
      categoryMap.set(cat.id, { ...cat, templates: [] })
    })

    templates.forEach((tpl) => {
      if (!tpl.categories || tpl.categories.length === 0) {
        if (!categoryMap.has(otherCategory.id)) {
          categoryMap.set(otherCategory.id, { ...otherCategory, templates: [] })
        }
        categoryMap.get(otherCategory.id)!.templates.push(tpl)
      } else {
        tpl.categories.forEach((cat) => {
          if (!categoryMap.has(cat.id)) {
            categoryMap.set(cat.id, { ...cat, templates: [] })
          }
          categoryMap.get(cat.id)!.templates.push(tpl)
        })
      }
    })

    return Array.from(categoryMap.values()).filter((cat) => cat.templates.length > 0)
  }, [templates, categories])

  return {
    groupedTemplates,
    categories,
    templates, // All templates as flat array for search
    fetchTemplates,
    fetchCategories,
  }
}
