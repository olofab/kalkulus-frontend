'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box, Button, List, ListItem, ListItemText, TextField, Typography
} from '@mui/material'
import axios from 'axios'

export default function CreateOfferPage() {
  const [title, setTitle] = useState('')
  const [customer, setCustomer] = useState('')
  const [items, setItems] = useState<any[]>([])
  const [newItem, setNewItem] = useState({ name: '', unitPrice: 0, quantity: 1 })
  const router = useRouter()

  const addItem = () => {
    if (!newItem.name) return
    setItems([...items, newItem])
    setNewItem({ name: '', unitPrice: 0, quantity: 1 })
  }

  const saveOffer = async () => {
    await axios.post('/api/offers', { title, status: 'draft', customer, items })
    router.push('/offers')
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6">Nytt tilbud</Typography>
      <TextField label="Tittel" fullWidth value={title} onChange={e => setTitle(e.target.value)} sx={{ my: 1 }} />
      <TextField
        label="Kunde"
        fullWidth
        value={customer}
        onChange={e => setCustomer(e.target.value)}
        sx={{ my: 1 }}
      />
      <List>
        {items.map((item, i) => (
          <ListItem key={i}>
            <ListItemText primary={`${item.name} x${item.quantity} à ${item.unitPrice} kr`} />
          </ListItem>
        ))}
      </List>
      <Button variant="contained" sx={{ mt: 2 }} onClick={saveOffer}>Lagre tilbud</Button>
    </Box>
  )
}
