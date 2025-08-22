'use client'

import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Stack,
  alpha,
  TextField,
  MenuItem
} from '@mui/material'
import { X, Save, Archive } from 'lucide-react'
import Button from '../../../design/components/Button'
import { useState, useEffect } from 'react'
import { apiPost } from '../../../lib/api'
import { useItemTemplates } from '../../hooks/useItemTemplates'
import { useItemTemplatesStore } from '../../../store/useItemTemplatesStore'

interface SaveAsTemplateDrawerProps {
  open: boolean
  onClose: () => void
  itemName: string
  itemPrice: number
  onSave?: () => void
}

export default function SaveAsTemplateDrawer({
  open,
  onClose,
  itemName,
  itemPrice,
  onSave
}: SaveAsTemplateDrawerProps) {
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | ''>('')

  const { categories } = useItemTemplates()
  const { refreshAll } = useItemTemplatesStore()

  // Reset form when drawer opens/closes
  useEffect(() => {
    if (!open) {
      setSelectedCategoryId('')
      setError('')
      setSuccess(false)
    }
  }, [open])

  const handleSaveAsTemplate = async () => {
    setSaving(true)
    setError('')

    try {
      const payload: any = {
        name: itemName,
        unitPrice: itemPrice
      }

      // Add category if selected
      if (selectedCategoryId) {
        payload.categoryIds = [selectedCategoryId]
      }

      await apiPost('/api/items/templates', payload)

      // Refresh templates and categories to show the new template immediately
      await refreshAll()

      setSuccess(true)
      onSave?.()

      // Auto-close after a short delay to show success
      setTimeout(() => {
        onClose()
      }, 1500)
    } catch (err: any) {
      setError('Kunne ikke lagre som mal')
      console.error('Failed to save template:', err)
    } finally {
      setSaving(false)
    }
  }

  const handleSkip = () => {
    onClose()
  }

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
          minHeight: 360 // Økt høyde for kategori-valg
        }
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h6" fontWeight={600}>
          Lagre som varemal?
        </Typography>
        <IconButton onClick={onClose} size="small">
          <X size={20} />
        </IconButton>
      </Box>

      <Stack spacing={3}>
        {/* Item info */}
        <Box
          sx={{
            backgroundColor: theme => alpha(theme.palette.primary.main, 0.05),
            border: theme => `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            borderRadius: 1,
            p: 2
          }}
        >
          <Typography variant="body2" color="text.secondary" mb={0.5}>
            Vare som ble lagt til:
          </Typography>
          <Typography variant="body1" fontWeight={500}>
            {itemName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {itemPrice.toLocaleString()} kr
          </Typography>
        </Box>

        {/* Explanation */}
        <Box>
          <Typography variant="body2" color="text.secondary" mb={1}>
            Du kan lagre denne varen som en mal for raskere tilgang senere.
            Maler vises øverst når du legger til nye varer.
          </Typography>
        </Box>

        {/* Category selection */}
        <Box>
          <Typography variant="body2" fontWeight={500} mb={1}>
            Velg kategori (valgfritt)
          </Typography>
          <TextField
            select
            fullWidth
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value as number | '')}
            placeholder="Velg kategori"
            size="small"
            disabled={saving || success}
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
          <Typography variant="caption" color="text.secondary" mt={0.5} display="block">
            Varer uten kategori havner under "Annet"
          </Typography>
        </Box>

        {/* Success message */}
        {success && (
          <Box
            sx={{
              backgroundColor: theme => alpha(theme.palette.success.main, 0.08),
              color: theme => theme.palette.success.dark,
              border: theme => `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
              borderRadius: 1,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <Archive size={18} />
            <Typography variant="body2">
              Varemal lagret! Listen oppdateres automatisk.
            </Typography>
          </Box>
        )}

        {/* Error message */}
        {error && (
          <Box
            sx={{
              backgroundColor: theme => alpha(theme.palette.error.main, 0.08),
              color: theme => theme.palette.error.dark,
              border: theme => `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
              borderRadius: 1,
              p: 2
            }}
          >
            <Typography variant="body2">
              {error}
            </Typography>
          </Box>
        )}

        {/* Action buttons */}
        <Stack spacing={2}>
          <Button
            variant="primary"
            fullWidth
            onClick={handleSaveAsTemplate}
            disabled={saving || success}
            startIcon={saving ? undefined : success ? <Archive size={18} /> : <Archive size={18} />}
          >
            {saving ? 'Lagrer...' : success ? 'Lagret!' : 'Lagre som varemal'}
          </Button>

          <Button
            variant="secondary"
            fullWidth
            onClick={handleSkip}
            disabled={saving || success}
          >
            {success ? 'Lukker automatisk...' : 'Hopp over'}
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  )
}
