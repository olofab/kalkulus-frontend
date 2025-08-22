'use client'

import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Stack,
  alpha,
  TextField,
  MenuItem,
  Divider
} from '@mui/material'
import { X, Edit, Trash2, Tag, DollarSign } from 'lucide-react'
import Button from '../../design/components/Button'
import { useState, useEffect } from 'react'

interface ItemActionDrawerProps {
  open: boolean
  onClose: () => void
  item: {
    id: number
    name: string
    unitPrice: number
    categories: { id: number; name: string }[]
  } | null
  categories: { id: number; name: string }[]
  onUpdatePrice: (itemId: number, newPrice: number) => void
  onUpdateCategory: (itemId: number, categoryId: number) => void
  onDelete: (itemId: number) => void
}

export default function ItemActionDrawer({
  open,
  onClose,
  item,
  categories,
  onUpdatePrice,
  onUpdateCategory,
  onDelete
}: ItemActionDrawerProps) {
  const [action, setAction] = useState<'menu' | 'edit-price' | 'edit-category' | 'delete'>('menu')
  const [newPrice, setNewPrice] = useState('')
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | ''>('')
  const [loading, setLoading] = useState(false)

  // Reset state when drawer opens/closes
  useEffect(() => {
    if (open && item) {
      setAction('menu')
      setNewPrice(item.unitPrice.toString())
      setSelectedCategoryId(item.categories[0]?.id || '')
    } else if (!open) {
      setAction('menu')
      setNewPrice('')
      setSelectedCategoryId('')
      setLoading(false)
    }
  }, [open, item])

  const handleUpdatePrice = async () => {
    if (!item || !newPrice || isNaN(Number(newPrice))) return

    setLoading(true)
    try {
      await onUpdatePrice(item.id, Number(newPrice))
      onClose()
    } catch (error) {
      console.error('Failed to update price:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateCategory = async () => {
    if (!item || !selectedCategoryId) return

    setLoading(true)
    try {
      await onUpdateCategory(item.id, Number(selectedCategoryId))
      onClose()
    } catch (error) {
      console.error('Failed to update category:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!item) return

    setLoading(true)
    try {
      await onDelete(item.id)
      onClose()
    } catch (error) {
      console.error('Failed to delete item:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!item) return null

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          p: 3,
          minHeight: action === 'menu' ? 280 : 320
        }
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h6" fontWeight={600}>
          {action === 'menu' ? item.name :
            action === 'edit-price' ? 'Endre pris' :
              action === 'edit-category' ? 'Endre kategori' :
                'Slett vare'}
        </Typography>
        <IconButton onClick={onClose} size="small">
          <X size={20} />
        </IconButton>
      </Box>

      {action === 'menu' && (
        <Stack spacing={2}>
          {/* Item info */}
          <Box
            sx={{
              backgroundColor: theme => alpha(theme.palette.primary.main, 0.05),
              border: theme => `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              borderRadius: 1,
              p: 2
            }}
          >
            <Typography variant="body1" fontWeight={500} mb={0.5}>
              {item.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={0.5}>
              {item.unitPrice.toLocaleString()} kr
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Kategori: {item.categories[0]?.name || 'Ingen kategori'}
            </Typography>
          </Box>

          {/* Actions */}
          <Stack spacing={1}>
            <Button
              variant="secondary"
              fullWidth
              startIcon={<DollarSign size={18} />}
              onClick={() => setAction('edit-price')}
            >
              Endre pris
            </Button>

            <Button
              variant="secondary"
              fullWidth
              startIcon={<Tag size={18} />}
              onClick={() => setAction('edit-category')}
            >
              Endre kategori
            </Button>

            <Divider sx={{ my: 1 }} />

            <Button
              variant="secondary"
              fullWidth
              startIcon={<Trash2 size={18} />}
              onClick={() => setAction('delete')}
              sx={{
                color: theme => theme.palette.error.main,
                borderColor: theme => alpha(theme.palette.error.main, 0.2),
                '&:hover': {
                  backgroundColor: theme => alpha(theme.palette.error.main, 0.08),
                  borderColor: theme => alpha(theme.palette.error.main, 0.3),
                }
              }}
            >
              Slett vare
            </Button>
          </Stack>
        </Stack>
      )}

      {action === 'edit-price' && (
        <Stack spacing={3}>
          <Typography variant="body2" color="text.secondary">
            Oppdater enhetsprisen for denne varen.
          </Typography>

          <TextField
            label="Ny pris (kr)"
            type="number"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            fullWidth
            disabled={loading}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1,
              }
            }}
          />

          <Stack direction="row" spacing={2}>
            <Button
              variant="secondary"
              fullWidth
              onClick={() => setAction('menu')}
              disabled={loading}
            >
              Tilbake
            </Button>
            <Button
              variant="primary"
              fullWidth
              onClick={handleUpdatePrice}
              disabled={loading || !newPrice || isNaN(Number(newPrice))}
            >
              {loading ? 'Lagrer...' : 'Oppdater pris'}
            </Button>
          </Stack>
        </Stack>
      )}

      {action === 'edit-category' && (
        <Stack spacing={3}>
          <Typography variant="body2" color="text.secondary">
            Velg en ny kategori for denne varen.
          </Typography>

          <TextField
            select
            label="Kategori"
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value as number | '')}
            fullWidth
            disabled={loading}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1,
              }
            }}
          >
            <MenuItem value="">
              <em>Ingen kategori</em>
            </MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>

          <Stack direction="row" spacing={2}>
            <Button
              variant="secondary"
              fullWidth
              onClick={() => setAction('menu')}
              disabled={loading}
            >
              Tilbake
            </Button>
            <Button
              variant="primary"
              fullWidth
              onClick={handleUpdateCategory}
              disabled={loading || !selectedCategoryId}
            >
              {loading ? 'Lagrer...' : 'Oppdater kategori'}
            </Button>
          </Stack>
        </Stack>
      )}

      {action === 'delete' && (
        <Stack spacing={3}>
          <Box
            sx={{
              backgroundColor: theme => alpha(theme.palette.error.main, 0.08),
              color: theme => theme.palette.error.dark,
              border: theme => `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
              borderRadius: 1,
              p: 2
            }}
          >
            <Typography variant="body2" fontWeight={500} mb={0.5}>
              ⚠️ Advarsel
            </Typography>
            <Typography variant="body2">
              Dette vil permanent slette varen "{item.name}" og kan ikke angres.
            </Typography>
          </Box>

          <Stack direction="row" spacing={2}>
            <Button
              variant="secondary"
              fullWidth
              onClick={() => setAction('menu')}
              disabled={loading}
            >
              Tilbake
            </Button>
            <Button
              variant="primary"
              fullWidth
              onClick={handleDelete}
              disabled={loading}
              sx={{
                backgroundColor: theme => theme.palette.error.main,
                '&:hover': {
                  backgroundColor: theme => theme.palette.error.dark,
                }
              }}
            >
              {loading ? 'Sletter...' : 'Slett vare'}
            </Button>
          </Stack>
        </Stack>
      )}
    </Drawer>
  )
}
