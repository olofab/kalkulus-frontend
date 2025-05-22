'use client'

import {
  Box, Typography, TextField, Button, List, ListItem, ListItemText,
  IconButton, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material'
import { useEffect, useState } from 'react'
import axios from 'axios'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import ItemListHeader from '../components/ItemListHeader'

type ItemTemplate = {
  id: number
  name: string
  unitPrice: number
}

export default function ItemsPage() {
  const [items, setItems] = useState<ItemTemplate[]>([])
  const [newItem, setNewItem] = useState({ name: '', unitPrice: '' })
  const [editing, setEditing] = useState<ItemTemplate | null>(null)
  const [editPrice, setEditPrice] = useState('')
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<number | null>(null)
  const [allItems, setAllItems] = useState<ItemTemplate[]>([])

  const fetchItems = async () => {
    const res = await axios.get('/api/items/templates')
    setAllItems(res.data)
    setItems(res.data)
  }

  useEffect(() => {
    fetchItems()
  }, [])

  const confirmDelete = (id: number) => {
    setItemToDelete(id)
    setDeleteDialogOpen(true)
  }


  const handleConfirmDelete = async () => {
    if (itemToDelete === null) return
    await axios.delete(`/api/items/templates/${itemToDelete}`)
    setDeleteDialogOpen(false)
    setItemToDelete(null)
    fetchItems()
  }

  const handleEdit = async () => {
    if (!editing) return
    const price = parseFloat(editPrice)
    if (isNaN(price) || price <= 0) return
    await axios.put(`/api/items/templates/${editing.id}`, { ...editing, unitPrice: price })
    setEditing(null)
    fetchItems()
  }

  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>Vareliste</Typography>
      <ItemListHeader
        onCreated={fetchItems}
        onSearch={(term) => {
          const searchTerm = term.trim().toLowerCase()
          if (!searchTerm) {
            setItems(allItems) // reset if input is empty
          } else {
            setItems(
              allItems.filter(item =>
                item.name.toLowerCase().includes(searchTerm)
              )
            )
          }
        }}
      />
      <List>
        {items.map((item) => (
          <ListItem
            key={item.id}
            secondaryAction={
              <>
                <IconButton onClick={() => {
                  setEditing(item)
                  setEditPrice(item.unitPrice.toString())
                }}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => confirmDelete(item.id)}>
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText
              primary={item.name}
              secondary={`${item.unitPrice.toFixed(2)} kr/stk`}
            />
          </ListItem>
        ))}
      </List>

      {/* Dialog for redigering */}
      <Dialog open={!!editing} onClose={() => setEditing(null)} fullWidth>
        <DialogTitle>Rediger pris for {editing?.name}</DialogTitle>
        <DialogContent>
          <TextField
            label="Enhetspris"
            fullWidth
            type="number"
            value={editPrice}
            onChange={(e) => setEditPrice(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditing(null)}>Avbryt</Button>
          <Button onClick={handleEdit} variant="contained">Lagre</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Bekreft sletting</DialogTitle>
        <DialogContent>
          <Typography>Er du sikker på at du vil slette denne varen?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Avbryt</Button>
          <Button onClick={handleConfirmDelete} variant="contained" color="error">
            Slett
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
