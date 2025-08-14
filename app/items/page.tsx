'use client'

import {
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Paper,
  Drawer,
  Stack
} from '@mui/material'
import { Plus, Trash2, Pencil, X } from 'lucide-react'
import { useState } from 'react'
import {
  useItems,
  useCategories,
  useCreateItem,
  useUpdateItem,
  useDeleteItem
} from './hooks/useItems'
import NewItemDrawer from './components/Drawer'
import EmptyState from '../components/common/EmptyState'

type Item = {
  id: number
  name: string
  unitPrice: number
  categories: { id: number; name: string }[]
}

type Category = {
  id: number
  name: string
}

export default function ItemsPage() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editItem, setEditItem] = useState<Item | null>(null)
  const [editPrice, setEditPrice] = useState('')
  const [itemToDelete, setItemToDelete] = useState<Item | null>(null)

  const { data: items = [] } = useItems()
  const { data: categories = [] } = useCategories()
  const createItem = useCreateItem()
  const updateItem = useUpdateItem()
  const deleteItem = useDeleteItem()

  const groupedItems = categories.reduce((acc: Record<string, Item[]>, cat) => {
    acc[cat.name] = items.filter(item =>
      item.categories.some((c) => c.id === cat.id)
    )
    return acc
  }, {})

  const uncategorizedItems = items.filter(item => item.categories.length === 0)
  if (uncategorizedItems.length > 0) {
    groupedItems['Annet'] = uncategorizedItems
  }

  const handleEdit = () => {
    if (!editItem || !editPrice) return
    const parsedPrice = parseFloat(editPrice)
    if (isNaN(parsedPrice)) return
    updateItem.mutate({ id: editItem.id, data: { ...editItem, unitPrice: parsedPrice } })
    setEditItem(null)
  }

  return (
    <Box p={2} pt={0}>
      {items.length === 0 ?
        <EmptyState
          title="Ingen lagrede varer"
          description="Alle lagrede varer og kategorier vil vises her"
          imageSrc="/illustrations/empty-box.png"

        />
        :
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4" color={'primary'}>Vareliste</Typography>
        </Box>
      }


      {Object.entries(groupedItems).map(([catName, items]) => (
        <Box key={catName} mb={4}>
          <Typography variant="h6" mb={1}>{catName}</Typography>
          <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden', mb: 2 }}>
            {items.length > 0 ? (
              <List>
                {items.map((item, index) => (
                  <ListItem
                    key={item.id}
                    sx={{
                      borderTop: index === 0 ? 'none' : '1px solid #eee',
                    }}
                    secondaryAction={
                      <Box display="flex" gap={1}>
                        <IconButton onClick={() => {
                          setEditItem(item)
                          setEditPrice(item.unitPrice.toString())
                        }}>
                          <Pencil size={18} />
                        </IconButton>
                        <IconButton onClick={() => setItemToDelete(item)}>
                          <Trash2 size={18} />
                        </IconButton>
                      </Box>
                    }
                  >
                    <ListItemText
                      primary={item.name}
                      secondary={`${item.unitPrice.toFixed(2)} kr/stk`}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (

              <Typography variant="body2" px={2} py={2} textAlign="center" color="text.secondary">
                Ingen varer i denne kategorien
              </Typography>

            )}
          </Paper>
        </Box>
      ))
      }

      {/* Drawer for å legge til ny vare */}
      <NewItemDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSubmit={(form) => {
          createItem.mutate({
            name: form.name,
            unitPrice: parseFloat(form.unitPrice),
            categoryId: form.categoryIds[0] // Assuming you want to use the first selected category
          })
          setDrawerOpen(false)
        }}
      />

      {/* Rediger-dialog */}
      <Drawer
        anchor="bottom"
        open={!!editItem}
        onClose={() => setEditItem(null)}
        PaperProps={{ sx: { borderTopLeftRadius: 16, borderTopRightRadius: 16 } }}>
        {/* Header */}
        <Box display="flex" alignItems="center" px={3} py={2}>
          <Typography variant="h6" flexGrow={1}>
            Rediger {editItem?.name}
          </Typography>
          <IconButton edge="end" onClick={() => setEditItem(null)}>
            <X size={18} />
          </IconButton>
        </Box>

        {/* Body */}
        <Box px={3} py={2} flex="1 1 auto" overflow="auto">
          <TextField
            label="Enhetspris"
            fullWidth
            type="number"
            value={editPrice}
            onChange={(e) => setEditPrice(e.target.value)}
            sx={{ mt: 1 }}
          />
        </Box>

        {/* Actions */}
        <Box px={3} py={2}>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button onClick={() => setEditItem(null)}>Avbryt</Button>
            <Button variant="contained" onClick={handleEdit}>Lagre</Button>
          </Stack>
        </Box>
      </Drawer>

      {/* Slett-dialog */}
      <Drawer
        anchor="bottom"
        open={!!itemToDelete}
        onClose={() => setItemToDelete(null)}
        PaperProps={{ sx: { borderTopLeftRadius: 16, borderTopRightRadius: 16 } }}>

        {/* Header */}
        <Box display="flex" alignItems="center" px={3} py={2}>
          <Typography variant="h6" flexGrow={1}>
            Vil du slette {itemToDelete?.name}?
          </Typography>
          <IconButton edge="end" onClick={() => setEditItem(null)}>
            <X size={18} />
          </IconButton>
        </Box>
        <Box px={3} py={2}>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button onClick={() => setItemToDelete(null)}>Avbryt</Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                deleteItem.mutate(itemToDelete!.id)
                setItemToDelete(null)
              }}
            >
              Slett
            </Button>
          </Stack>
        </Box>
      </Drawer>
      <Box
        position="fixed"
        bottom={48}
        left="50%"
        sx={{ transform: 'translateX(-50%)', zIndex: 1000 }}
      >
        <Button
          onClick={() => setDrawerOpen(true)}
          variant="contained"
          color="primary"
          sx={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            minWidth: 0,
            boxShadow: 4,
            p: 0,
          }}
        >
          <Plus size={24} />
        </Button>
      </Box>
    </Box >
  )
}
