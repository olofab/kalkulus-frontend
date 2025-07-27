/*'use client'

import {
  Box,
  Typography,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Card,
  CardContent,
  Button,
  IconButton,
  Divider,
  Paper
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Item } from '../../../types/offer'
import { apiGet, apiPost, apiPut } from '../../../lib/api'
import { ItemTemplate, Category } from '../../../types/itemTemplates'


export default function OfferItemsPage() {
  const { id } = useParams()
  const [items, setItems] = useState<Item[]>([])
  const [templates, setTemplates] = useState<ItemTemplate[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [search, setSearch] = useState('')

  const fetchData = async () => {
    const [itemRes, templateRes, categoryRes] = await Promise.all([
      apiGet(`/api/offers/${id}/items`),
      apiGet('/api/items/templates'),
      apiGet('/api/categories')
    ])
    setItems(itemRes)
    setTemplates(templateRes)
    setCategories(categoryRes)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const addItem = async (template: ItemTemplate) => {
    await apiPost(`/api/offers/${id}/item`, {
      name: template.name,
      unitPrice: template.unitPrice,
      quantity: 1
    })
    fetchData()
  }

  const updateQuantity = async (item: Item, change: number) => {
    const newQty = item.quantity + change
    if (newQty < 1) return
    await apiPut(`/api/offers/${id}/items/${item.id}`, { quantity: newQty })
    fetchData()
  }

  const total = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0)

  return (
    <Box p={3} pb={10}>
      <Typography variant="h6" fontWeight={600} mb={2}>Varer i tilbudet</Typography>

      <Stack spacing={2} mb={4}>
        {items.map((item) => (
          <Card key={item.id} variant="outlined">
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography fontWeight={600}>{item.name}</Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <IconButton onClick={() => updateQuantity(item, -1)}><RemoveIcon /></IconButton>
                  <Typography>{item.quantity}</Typography>
                  <IconButton onClick={() => updateQuantity(item, 1)}><AddIcon /></IconButton>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <Divider sx={{ mb: 2 }} />
      <TextField
        fullWidth
        placeholder="Søk etter vare..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3 }}
      />

      {categories.map((cat) => {
        const filtered = templates.filter(t =>
          t.categories.some(c => c.id === cat.id) &&
          t.name.toLowerCase().includes(search.toLowerCase())
        )
        if (filtered.length === 0) return null

        return (
          <Accordion key={cat.id} defaultExpanded elevation={0} sx={{ border: '1px solid #ddd', mb: 2 }} >
            <AccordionSummary expandIcon={<ExpandMoreIcon />} >
              <Typography fontWeight={600}>{cat.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2}>
                {filtered.map((tpl) => (
                  <Card
                    key={tpl.id}
                    variant="outlined"
                    onClick={() => addItem(tpl)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <CardContent>
                      <Typography fontWeight={600}>{tpl.name}</Typography>
                      <Typography color="text.secondary">{tpl.unitPrice} kr</Typography>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </AccordionDetails>
          </Accordion>
        )
      })}

      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, p: 2, borderTop: '1px solid #ccc', backgroundColor: '#fff' }}>
        <Typography variant="h6">Total: {total.toLocaleString()} kr</Typography>
      </Paper>
    </Box>
  )
}
*/
// app/offer/[id]/items/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Box, Container, Typography, Fab, Tabs, Tab, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { apiDelete, apiGet, apiPost, apiPut } from '../../../lib/api'
import { Item } from '../../../types/offer'
import AddItemDrawer from '../../../components/offer/items/AddItemDrawer'
import FloatingActionMenu from '../../../components/offer/items/FloatingMenu'
import BackButton from '../../../components/BackButton'
import AddNotesDrawer from '../../../components/offer/items/AddNotesDrawer'
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import ItemList from '../../components/ItemList'
import { useItemRefetchStore } from '../../../lib/hooks/useItemRefetchStore'
import { useOfferItems } from '../../hooks/useOfferItems'

export default function OfferItemsPage() {
  const { id } = useParams()

  const { data: items, isLoading, error, refetch } = useOfferItems(id as string)
  const { trigger } = useItemRefetchStore()

  useEffect(() => {
    refetch()
  }, [trigger])


  const handleDeleteItem = async (item: Item) => {
    await apiDelete(`/api/offers/${id}/items/${item.id}`)
    refetch()
  }

  const updateQuantity = async (item: Item, change: number) => {
    const newQty = item.quantity + change
    if (newQty < 1) return
    await apiPut(`/api/offers/${id}/items/${item.id}`, { quantity: newQty })
    refetch()
  }

  //popup for notater
  if (error) return <Typography color="error">Feil ved henting av varer: {error.message}</Typography>
  if (isLoading) return <Typography color="error">Laster inn...</Typography>

  return (
    <Container maxWidth="sm" sx={{ p: 0 }}>
      <Typography variant="h6" gutterBottom>
        Vareliste
      </Typography>
      <ItemList items={items} onQuantityChange={updateQuantity} onRemove={handleDeleteItem} />
    </Container>
  )
}

