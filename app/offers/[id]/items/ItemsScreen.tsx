'use client'

import { useState, useCallback, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Container,
  Typography,
  Alert,
  Skeleton,
  Snackbar,
  Button,
  useTheme
} from '@mui/material'
import { Search, Clear, Add as AddIcon } from '@mui/icons-material'

// Simple debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
import { useItemCategories, useItemsByCategory, useAddOfferItem, AddItemPayload } from '../../../hooks/items'
import CategoryTabs from './components/CategoryTabs'
import ItemRow from './components/ItemRow'

export interface ItemsScreenProps {
  offerId: number
  onAdded?: (payload: AddItemPayload) => void
}

export default function ItemsScreen({ offerId, onAdded }: ItemsScreenProps) {
  const theme = useTheme()
  const router = useRouter()
  const searchParams = useSearchParams()

  // States
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)
  const [activeCategory, setActiveCategory] = useState<number | null>(null)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [addedItemName, setAddedItemName] = useState('')

  // Initialize active category from URL
  useEffect(() => {
    const catParam = searchParams.get('cat')
    if (catParam && catParam !== 'null') {
      setActiveCategory(parseInt(catParam))
    } else {
      setActiveCategory(null)
    }
  }, [searchParams])

  // Hooks
  const { data: categories = [], isLoading: categoriesLoading } = useItemCategories()
  const {
    data: items,
    isLoading: itemsLoading,
    isError,
    error,
    refetch
  } = useItemsByCategory({
    categoryId: activeCategory || undefined,
    search: debouncedSearch || undefined
  })

  const addItemMutation = useAddOfferItem(offerId)

  // Handlers
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const handleSearchClear = () => {
    setSearch('')
  }

  const handleCategoryChange = useCallback((categoryId: number | null) => {
    setActiveCategory(categoryId)

    // Update URL
    const params = new URLSearchParams(searchParams.toString())
    if (categoryId !== null) {
      params.set('cat', categoryId.toString())
    } else {
      params.delete('cat')
    }

    router.replace(`?${params.toString()}`, { scroll: false })

    // Scroll to top of items list
    const itemsContainer = document.getElementById('items-container')
    if (itemsContainer) {
      itemsContainer.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [router, searchParams])

  const handleAddItem = async (itemId: number, quantity: number) => {
    try {
      await addItemMutation.mutateAsync({ itemId, quantity })

      // Find item name for snackbar
      const item = items.find(i => i.id === itemId)
      setAddedItemName(item?.name || 'Vare')
      setSnackbarOpen(true)

      // Call optional callback
      if (onAdded) {
        onAdded({ offerId, itemId, quantity })
      }
    } catch (error) {
      console.error('Failed to add item:', error)
    }
  }

  const handleCreateNewItem = () => {
    // Navigate to create item page or open modal
    router.push(`/offers/${offerId}/items/new`)
  }

  const handleRetry = () => {
    refetch()
  }

  // Loading skeleton
  const renderSkeleton = () => (
    <>
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton
          key={index}
          variant="rectangular"
          height={120}
          sx={{ borderRadius: 2, mb: 1 }}
        />
      ))}
    </>
  )

  return (
    <Container maxWidth="sm" sx={{ px: 2, pb: 10 }}>
      {/* Search Field - Sticky */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: theme.zIndex.appBar,
          backgroundColor: 'background.paper',
          pt: 2,
          pb: 1,
          mb: 1
        }}
      >
        <TextField
          fullWidth
          placeholder="Søk etter vare"
          value={search}
          onChange={handleSearchChange}
          aria-label="Søk etter vare"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search color="action" />
              </InputAdornment>
            ),
            endAdornment: search && (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleSearchClear}
                  edge="end"
                  size="small"
                  aria-label="Tøm søk"
                >
                  <Clear />
                </IconButton>
              </InputAdornment>
            ),
            sx: {
              borderRadius: 1.5,
              '& .MuiOutlinedInput-notchedOutline': {
                borderRadius: 1.5
              }
            }
          }}
        />
      </Box>

      {/* Category Tabs - Sticky */}
      <CategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        isLoading={categoriesLoading}
      />

      {/* Items List */}
      <Box
        id="items-container"
        sx={{
          mt: 2,
          maxHeight: 'calc(100vh - 200px)',
          overflowY: 'auto'
        }}
      >
        {/* Error State */}
        {isError && (
          <Alert
            severity="error"
            action={
              <Button
                color="inherit"
                size="small"
                onClick={handleRetry}
              >
                Prøv igjen
              </Button>
            }
            sx={{ mb: 2 }}
          >
            Kunne ikke laste varer. {error?.message}
          </Alert>
        )}

        {/* Loading State */}
        {itemsLoading && renderSkeleton()}

        {/* Empty State */}
        {!itemsLoading && !isError && items.length === 0 && (
          <Box
            textAlign="center"
            py={4}
            sx={{
              border: `2px dashed ${theme.palette.divider}`,
              borderRadius: 2,
              backgroundColor: 'action.hover'
            }}
          >
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Ingen varer funnet
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              {search || activeCategory
                ? 'Ingen varer matcher dine søkekriterier'
                : 'Ingen varer funnet i denne kategorien'
              }
            </Typography>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={handleCreateNewItem}
              sx={{ borderRadius: 1.5 }}
            >
              Opprett ny vare
            </Button>
          </Box>
        )}

        {/* Items */}
        {!itemsLoading && !isError && items.length > 0 && (
          <>
            {items.map((item) => (
              <ItemRow
                key={item.id}
                item={item}
                onAdd={handleAddItem}
                isLoading={addItemMutation.isPending}
              />
            ))}
          </>
        )}
      </Box>

      {/* Success Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={`${addedItemName} lagt til`}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Container>
  )
}
