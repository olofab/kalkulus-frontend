'use client'
import {
  Box, Button, Typography, List, ListItem, ListItemText,
  TextField, Dialog, DialogTitle, DialogContent, DialogActions, Grid
} from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { JSX, useEffect, useState } from 'react'
import axios from 'axios'
import ConstructionIcon from '@mui/icons-material/Construction'
import NumericPad from './NumericPad'
import { ItemInput } from './types/item'

type ItemTemplate = {
  id?: number
  name: string
  unitPrice: number
  icon?: JSX.Element
}


export default function AddItemFromList() {
  const { id } = useParams()
  const router = useRouter()

  const [items, setItems] = useState<ItemTemplate[]>([])
  const [selected, setSelected] = useState<ItemTemplate | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [quantityStr, setQuantityStr] = useState('')
  const [newItemName, setNewItemName] = useState('')
  const [newItemPrice, setNewItemPrice] = useState('')

  useEffect(() => {
    axios.get('/api/items/templates').then(res => {
      const fetched = res.data.map((item: ItemTemplate) => ({
        ...item,
        icon: <ConstructionIcon fontSize="large" />
      }))
      setItems(fetched)
    })
  }, [])

  const selectItem = (item: ItemTemplate) => {
    setSelected(item)
    setQuantityStr('')
    setDialogOpen(true)
  }

  const confirmAdd = async () => {
    const quantity = parseInt(quantityStr)
    if (!selected || !quantity || quantity <= 0) return

    const payload: ItemInput = {
      name: selected.name,
      unitPrice: selected.unitPrice,
      quantity: Number(quantityStr),
    }

    await axios.post(`/api/offers/${id}/item`, payload)


    setDialogOpen(false)
    router.push(`/offers/${id}`)
  }

  const handleAddCustomItem = async () => {
    const name = newItemName.trim()
    const price = parseFloat(newItemPrice)

    if (!name || isNaN(price) || price < 0) return

    const res = await axios.post('/api/items/templates', { name, unitPrice: price })

    setItems(prev => [...prev, {
      ...res.data,
      icon: <ConstructionIcon fontSize="large" />
    }])
    setNewItemName('')
    setNewItemPrice('')
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Velg vare</Typography>

      <List>
        {items.map((item, i) => (
          <ListItem
            key={i}
            button
            onClick={() => selectItem(item)}
            sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
          >
            {item.icon}
            <ListItemText
              primary={item.name}
              secondary={`${item.unitPrice} kr/stk`}
            />
          </ListItem>
        ))}
      </List>

      <Box mt={2}>
        <TextField
          label="Varenavn"
          variant="outlined"
          fullWidth
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          sx={{ mb: 1 }}
        />
        <TextField
          label="Enhetspris"
          variant="outlined"
          fullWidth
          type="number"
          value={newItemPrice}
          onChange={(e) => setNewItemPrice(e.target.value)}
          sx={{ mb: 1 }}
        />
        <Button
          variant="outlined"
          fullWidth
          onClick={handleAddCustomItem}
        >
          Legg til vare
        </Button>
      </Box>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth>
        <DialogTitle>{selected?.name}</DialogTitle>
        <DialogContent>
          <Typography variant="h5" align="center">{quantityStr || '0'}</Typography>
          <NumericPad value={quantityStr} onChange={setQuantityStr} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Avbryt</Button>
          <Button variant="contained" onClick={confirmAdd}>OK</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
