'use client'

import { useState, useMemo } from 'react'
import {
  Box,
  Chip,
  Stack,
  Typography,
  alpha,
  Fab,
  TextField,
  MenuItem
} from '@mui/material'
import { Plus } from 'lucide-react'
import Card from '../design/components/Card'
import { useItemTemplatesStore } from '../store/useItemTemplatesStore'
import { useRouter } from 'next/navigation'
import ItemActionDrawer from './components/ItemActionDrawer'
import { useEffect } from 'react'

export default function ItemsPage() {
  const router = useRouter()
  const {
    templates: itemTemplates,
    categories,
    loading,
    fetchTemplates,
    fetchCategories,
    refreshAll
  } = useItemTemplatesStore()

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [selectedItem, setSelectedItem] = useState<{
    id: number
    name: string
    unitPrice: number
    categories: { id: number; name: string }[]
  } | null>(null)
  const [actionDrawerOpen, setActionDrawerOpen] = useState(false)

  // Fetch data on mount
  useEffect(() => {
    fetchTemplates()
    fetchCategories()
  }, [fetchTemplates, fetchCategories])

  const filteredItems = useMemo(() => {
    if (!itemTemplates) return []

    let items = selectedCategory === null
      ? itemTemplates
      : itemTemplates.filter(item =>
        item.categories?.some(cat => cat.id === selectedCategory)
      )

    // Sort by category name, then by item name
    return items.sort((a, b) => {
      const aCategoryName = a.categories?.[0]?.name || 'Zzz_Ingen kategori'
      const bCategoryName = b.categories?.[0]?.name || 'Zzz_Ingen kategori'

      if (aCategoryName !== bCategoryName) {
        return aCategoryName.localeCompare(bCategoryName)
      }

      return a.name.localeCompare(b.name)
    })
  }, [itemTemplates, selectedCategory])

  const handleItemClick = (item: any) => {
    setSelectedItem(item)
    setActionDrawerOpen(true)
  }

  const handleUpdatePrice = async (itemId: number, newPrice: number) => {
    // TODO: Implement API call when available
    console.log('Update price:', itemId, newPrice)
    await refreshAll()
  }

  const handleUpdateCategory = async (itemId: number, categoryId: number) => {
    // TODO: Implement API call when available
    console.log('Update category:', itemId, categoryId)
    await refreshAll()
  }

  const handleDeleteItem = async (itemId: number) => {
    // TODO: Implement API call when available
    console.log('Delete item:', itemId)
    await refreshAll()
  }

  const uniqueCategories = useMemo(() => {
    if (!itemTemplates) return []

    const categoryMap = new Map<number, { id: number; name: string; count: number }>()

    itemTemplates.forEach(item => {
      if (item.categories) {
        item.categories.forEach(cat => {
          if (categoryMap.has(cat.id)) {
            categoryMap.get(cat.id)!.count++
          } else {
            categoryMap.set(cat.id, { ...cat, count: 1 })
          }
        })
      }
    })

    return Array.from(categoryMap.values())
  }, [itemTemplates])

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <Typography>Laster...</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ pb: 10 }}>

      <Box sx={{ px: 2, mt: 2 }}>
        {/* Category dropdown */}
        <Box sx={{ mb: 3 }}>
          <TextField
            select
            fullWidth
            value={selectedCategory || 'alle'}
            onChange={(e) => setSelectedCategory(e.target.value === 'alle' ? null : Number(e.target.value))}
            SelectProps={{
              renderValue: (value) => {
                const selectedText = value === 'alle'
                  ? `Alle (${itemTemplates?.length || 0})`
                  : uniqueCategories.find(cat => cat.id === value)?.name + ` (${uniqueCategories.find(cat => cat.id === value)?.count || 0})`
                return (
                  <Box display="flex" alignItems="center">
                    <Box component="span" sx={{ color: '#666', fontSize: '1rem', fontWeight: 400, mr: 1 }}>
                      Kategori
                    </Box>
                    <Box component="span" sx={{ color: '#999', fontSize: '1rem', fontWeight: 300, mr: 1 }}>
                      |
                    </Box>
                    <Box component="span" sx={{ fontSize: '1rem', fontWeight: 500 }}>
                      {selectedText}
                    </Box>
                  </Box>
                )
              }
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1,
                backgroundColor: 'white',
                border: '2px solid #e0e0e0',
                fontSize: '1.1rem',
                fontWeight: 500,
                '& .MuiSelect-select': {
                  py: 2,
                  display: 'flex',
                  alignItems: 'center'
                }
              },
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none'
              },
              '& .MuiSelect-icon': {
                fontSize: '1.5rem',
                color: '#666'
              }
            }}
          >
            <MenuItem value="alle">
              Alle ({itemTemplates?.length || 0})
            </MenuItem>
            {uniqueCategories.map(category => (
              <MenuItem key={category.id} value={category.id}>
                {category.name} ({category.count})
              </MenuItem>
            ))}
          </TextField>
        </Box>        {/* Items */}
        {filteredItems.length === 0 ? (
          <Box
            sx={{
              textAlign: 'center',
              py: 6,
              backgroundColor: theme => alpha(theme.palette.info.main, 0.08),
              border: theme => `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
              borderRadius: 1,
              color: theme => theme.palette.info.dark
            }}
          >
            <Typography variant="h6" fontWeight={500} mb={1}>
              {selectedCategory === null ? "Ingen varemaler" : "Ingen varer i kategori"}
            </Typography>
            <Typography variant="body2">
              {selectedCategory === null ?
                "Du har ikke opprettet noen varemaler ennå. Legg til en ny varemal for å komme i gang." :
                "Det er ingen varer i denne kategorien. Prøv å velge en annen kategori eller legg til en ny vare."
              }
            </Typography>
          </Box>
        ) : (
          <Stack spacing={0.5}>
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                onClick={() => handleItemClick(item)}
                sx={{
                  p: 0.5,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-1px)',
                    boxShadow: theme => theme.shadows[1],
                  }
                }}
              >
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box flex={1}>
                    <Typography variant="body1" fontWeight={500}>
                      {item.name}
                    </Typography>
                    <Typography variant="caption" color="primary" fontWeight={600}>
                      {item.unitPrice?.toLocaleString() || 0} kr
                    </Typography>
                  </Box>
                  {item.categories && item.categories.length > 0 && (
                    <Chip
                      label={item.categories[0].name}
                      size="small"
                      sx={{
                        backgroundColor: theme => alpha(theme.palette.primary.main, 0.08),
                        color: 'primary.main',
                        fontSize: '0.75rem',
                        height: 18,
                        borderRadius: 0.5,
                        '& .MuiChip-label': {
                          px: 0.5
                        }
                      }}
                    />
                  )}
                </Box>
              </Card>
            ))}
          </Stack>
        )}
      </Box>

      {/* Add new item FAB */}
      <Fab
        color="primary"
        aria-label="legg til varemal"
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1000
        }}
        onClick={() => router.push('/items/new')}
      >
        <Plus size={24} />
      </Fab>

      {/* Item Action Drawer */}
      <ItemActionDrawer
        open={actionDrawerOpen}
        onClose={() => {
          setActionDrawerOpen(false)
          setSelectedItem(null)
        }}
        item={selectedItem}
        categories={categories || []}
        onUpdatePrice={handleUpdatePrice}
        onUpdateCategory={handleUpdateCategory}
        onDelete={handleDeleteItem}
      />
    </Box>
  )
}
