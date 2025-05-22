'use client'

import {
  List, ListItem, ListItemAvatar, Avatar, ListItemText,
  Typography, Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Box
} from '@mui/material'
import { useState } from 'react'
import CategoryIcon from '@mui/icons-material/Category'
import axios from 'axios'
import { Item } from '../types/offer'

export default function OfferItemList({ items, onUpdated }: {
  items: Item[],
  onUpdated: () => void
}) {
  const [open, setOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const [quantityStr, setQuantityStr] = useState('')

  const handleClick = (item: Item) => {
    setSelectedItem(item)
    setQuantityStr(item.quantity.toString())
    setOpen(true)
  }

  const handleSave = async () => {
    if (!selectedItem) return
    const quantity = parseInt(quantityStr)
    if (isNaN(quantity) || quantity <= 0) return

    await axios.put(`/api/items/${selectedItem.id}`, { quantity })
    setOpen(false)
    setSelectedItem(null)
    onUpdated()
  }

  const handleDelete = async () => {
    if (!selectedItem) return

    const confirmDelete = window.confirm('Er du sikker på at du vil slette denne varen?')
    if (!confirmDelete) return

    await axios.delete(`/api/items/${selectedItem.id}`)
    setOpen(false)
    setSelectedItem(null)
    onUpdated()
  }

  return (
    <>
      <List disablePadding>
        {items.map((item, index) => (
          <ListItem
            key={index}
            sx={{ px: 0, alignItems: 'flex-start', cursor: 'pointer' }}
            onClick={() => handleClick(item)}
          >
            <ListItemAvatar sx={{ mr: 2 }}>
              <Avatar
                variant="square"
                sx={{ width: 50, height: 50, bgcolor: '#f3f3f3' }}
              >
                <CategoryIcon fontSize="small" color="secondary" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={<Typography fontWeight={500}>{item.name}</Typography>}
              secondary={
                <Typography variant="caption" color="text.secondary">
                  {item.quantity} stk × {formatPrice(item.unitPrice)} |{' '}
                  {formatPrice(item.unitPrice * item.quantity)}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Endre antall</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" gutterBottom>
            Antall
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={2}
            sx={{ mt: 2 }}
          >
            <Button
              variant="outlined"
              onClick={() => {
                const num = parseInt(quantityStr)
                if (num > 1) setQuantityStr((num - 1).toString())
              }}
            >
              -
            </Button>

            <Typography variant="h6" minWidth={40} textAlign="center">
              {quantityStr}
            </Typography>

            <Button
              variant="outlined"
              onClick={() => {
                const num = parseInt(quantityStr)
                setQuantityStr((num + 1).toString())
              }}
            >
              +
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} color="error">
            Slett
          </Button>
          <Button onClick={() => setOpen(false)}>Avbryt</Button>
          <Button variant="contained" onClick={handleSave}>Lagre</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

function formatPrice(amount: number) {
  const formatter = new Intl.NumberFormat('no-NO', {
    style: 'currency',
    currency: 'NOK',
    minimumFractionDigits: 2,
  })
  return formatter.format(amount)
}
