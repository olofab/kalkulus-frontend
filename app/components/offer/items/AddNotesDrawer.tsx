'use client'
import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography
} from '@mui/material'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { apiGet } from '../../../lib/api'
import { useItemTemplatesStore } from '../../../store/useItemTemplatesStore'
import { Item } from './ItemList'

export type ExistingItem = {
  id: number
  name: string
  unitPrice: number
}

type Props = {
  open: boolean
  onClose: () => void
  onAddItem: (item: Item) => void
}

export default function AddItemDrawer({ open, onClose, onAddItem }: Props) {
  const [items, setItems] = useState<ExistingItem[]>([])
  const [customName, setCustomName] = useState('')
  const [customPrice, setCustomPrice] = useState('')
  const { templates, fetchTemplates, loading, error } = useItemTemplatesStore()

  useEffect(() => {
    if (templates.length === 0 && !loading) {
      fetchTemplates()
    }
  }, [])

  useEffect(() => {
    if (open) {
      apiGet('/api/items/templates').then(res => setItems(res))
    }
  }, [open])

  return (
    <Drawer anchor="bottom" open={open} onClose={onClose} PaperProps={{ sx: { height: '80%' } }}>
      <Box p={2}>

        <Typography variant="h6" mb={1}>Dine notater</Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Notater"
            minRows={6}
            type="text"
            multiline
            value={customPrice}
            onChange={(e) => setCustomPrice(e.target.value)}
            fullWidth
          />

        </Box>
      </Box>
    </Drawer>
  )
}
