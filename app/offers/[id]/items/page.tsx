'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Tab,
  Stack,
  Drawer,
  CircularProgress
} from '@mui/material'
import { Search, Clear, Add, Delete, MoreVert } from '@mui/icons-material'
import { useItemTemplates } from '../../hooks/useItemTemplates'
import { useOfferItems } from '../../hooks/useOfferItems'
import { useAddTemplateToOffer, useAddCustomItemToOffer, useUpdateOfferItem, useDeleteOfferItem } from '../../../items/hooks/useItems'
import TopBar from '../../../components/TopBar'
import { QuantityDrawer } from './Drawers'
// Import only Button from design system
import { Button, Tabs } from '../../../design'

export default function ItemsPage() {
  const { id } = useParams()
  const router = useRouter()
  const offerId = id as string

  // Hooks
  const { categories, groupedTemplates } = useItemTemplates()
  const { data: offerItems = [] } = useOfferItems(offerId)
  const addTemplateToOfferMutation = useAddTemplateToOffer()
  const addCustomItemToOfferMutation = useAddCustomItemToOffer()
  const updateOfferItemMutation = useUpdateOfferItem()
  const deleteOfferItemMutation = useDeleteOfferItem()

  // States
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)
  const [quantityDrawerOpen, setQuantityDrawerOpen] = useState(false)
  const [quantity, setQuantity] = useState('')

  // Custom item states
  const [customDrawerOpen, setCustomDrawerOpen] = useState(false)
  const [customName, setCustomName] = useState('')
  const [customPrice, setCustomPrice] = useState('')
  const [customQuantityDrawerOpen, setCustomQuantityDrawerOpen] = useState(false)
  const [customQuantity, setCustomQuantity] = useState('')

  // Edit existing item states
  const [editItemDrawerOpen, setEditItemDrawerOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [editQuantityDrawerOpen, setEditQuantityDrawerOpen] = useState(false)
  const [editQuantity, setEditQuantity] = useState('')

  // Get active templates based on category and search
  const activeTemplates = selectedCategory !== null
    ? groupedTemplates.find(g => g.id === selectedCategory)?.templates || []
    : groupedTemplates.flatMap(g => g.templates)

  const filteredTemplates = search
    ? activeTemplates.filter(t =>
      t.name.toLowerCase().includes(search.toLowerCase())
    )
    : activeTemplates

  // Get tab items for design system tabs
  const tabItems = [
    { label: 'Alle', value: 'all' },
    ...categories.map((category) => ({
      label: `${category.name} (${groupedTemplates.find(g => g.id === category.id)?.templates.length || 0})`,
      value: category.id
    }))
  ]

  const handleCategoryChange = (newValue: string | number) => {
    setSelectedCategory(newValue === 'all' ? null : newValue as number)
  }

  const handleTemplateSelect = (template: any) => {
    setSelectedTemplate(template)
    setQuantity('')
    setQuantityDrawerOpen(true)
  }

  const handleAddTemplate = async () => {
    if (!selectedTemplate || !quantity || Number(quantity) < 1) return

    try {
      await addTemplateToOfferMutation.mutateAsync({
        offerId,
        templateId: selectedTemplate.id,
        quantity: Number(quantity)
      })

      setQuantityDrawerOpen(false)
      setSelectedTemplate(null)
      setQuantity('')

      // Stay on items page to continue adding more items
    } catch (error) {
      console.error('Failed to add template:', error)
    }
  }

  // Custom item handlers
  const handleOpenCustomDrawer = () => {
    setCustomDrawerOpen(true)
  }

  const handleCustomNext = () => {
    if (!customName || !customPrice) return
    setCustomDrawerOpen(false)
    setCustomQuantityDrawerOpen(true)
  }

  const handleAddCustomItem = async () => {
    if (!customName || !customPrice || !customQuantity || Number(customQuantity) < 1) return

    try {
      await addCustomItemToOfferMutation.mutateAsync({
        offerId,
        name: customName,
        unitPrice: Number(customPrice),
        quantity: Number(customQuantity)
      })

      setCustomDrawerOpen(false)
      setCustomQuantityDrawerOpen(false)
      setCustomName('')
      setCustomPrice('')
      setCustomQuantity('')

      // Stay on items page to continue adding more items
    } catch (error) {
      console.error('Failed to add custom item:', error)
    }
  }

  // Edit existing item handlers
  const handleEditItem = (item: any) => {
    setEditingItem(item)
    setEditItemDrawerOpen(true)
  }

  const handleEditQuantity = () => {
    if (!editingItem) return
    setEditQuantity(editingItem.quantity.toString())
    setEditItemDrawerOpen(false)
    setEditQuantityDrawerOpen(true)
  }

  const handleUpdateQuantity = async () => {
    if (!editingItem || !editQuantity || Number(editQuantity) < 1) return

    try {
      await updateOfferItemMutation.mutateAsync({
        offerId,
        itemId: editingItem.id,
        data: { quantity: Number(editQuantity) }
      })

      setEditQuantityDrawerOpen(false)
      setEditingItem(null)
      setEditQuantity('')
    } catch (error) {
      console.error('Failed to update item quantity:', error)
    }
  }

  const handleDeleteItem = async () => {
    if (!editingItem) return

    try {
      await deleteOfferItemMutation.mutateAsync({
        offerId,
        itemId: editingItem.id
      })

      setEditItemDrawerOpen(false)
      setEditingItem(null)
    } catch (error) {
      console.error('Failed to delete item:', error)
    }
  }

  return (
    <>
      <Container maxWidth="sm" sx={{ px: 2, pb: 10 }}>
        {/* Egendefinert vare knapp - øverst */}
        <Box sx={{ pb: 1 }}>
          <Button
            fullWidth
            variant="secondary"
            startIcon={<Add />}
            onClick={handleOpenCustomDrawer}
            sx={{
              py: 1.5,
              borderRadius: 1,
              textTransform: 'none',
              fontWeight: 500,
              borderStyle: 'dashed',
              borderWidth: 2,
              color: 'text.secondary',
              borderColor: 'divider',
              '&:hover': {
                borderColor: 'primary.main',
                color: 'primary.main',
                bgcolor: 'action.hover'
              }
            }}
          >
            Legg til egendefinert vare
          </Button>
        </Box>

        {/* Search */}
        <Box sx={{ pb: 1, position: 'sticky', top: 0, bgcolor: 'background.default', zIndex: 1 }}>
          <TextField
            fullWidth
            placeholder="Søk etter vare"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="action" />
                </InputAdornment>
              ),
              endAdornment: search && (
                <InputAdornment position="end">
                  <IconButton onClick={() => setSearch('')} size="small">
                    <Clear />
                  </IconButton>
                </InputAdornment>
              ),
              sx: { borderRadius: 1 }
            }}
          />
        </Box>

        {/* Category Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2, position: 'sticky', top: 70, bgcolor: 'background.default', zIndex: 1 }}>
          <Tabs
            items={tabItems}
            value={selectedCategory === null ? 'all' : selectedCategory}
            onChange={handleCategoryChange}
            variant="scrollable"
            scrollButtons="auto"
          />
        </Box>

        {/* Templates List - Per Category som i /items */}
        {selectedCategory === null ? (
          // Vis alle kategorier med grupperte varer
          <Stack spacing={3}>
            {groupedTemplates
              .filter(group =>
                search
                  ? group.templates.some(t =>
                    t.name.toLowerCase().includes(search.toLowerCase())
                  )
                  : group.templates.length > 0
              )
              .map((group) => {
                const filteredGroupTemplates = search
                  ? group.templates.filter(t =>
                    t.name.toLowerCase().includes(search.toLowerCase())
                  )
                  : group.templates

                return (
                  <Box key={group.id}>
                    <Typography variant="h6" mb={1} color="text.primary">
                      {group.name}
                    </Typography>
                    <Box
                      sx={{
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 1,
                        overflow: 'hidden',
                        bgcolor: 'background.paper'
                      }}
                    >
                      {filteredGroupTemplates.map((template, index) => (
                        <Box
                          key={template.id}
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            px: 2,
                            py: 1.5,
                            borderTop: index === 0 ? 'none' : '1px solid #eee',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              bgcolor: 'action.hover',
                            }
                          }}
                          onClick={() => handleTemplateSelect(template)}
                        >
                          <Box>
                            <Typography fontWeight={500} variant="body1">
                              {template.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {template.unitPrice.toLocaleString('no-NO')} kr/stk
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              width: 32,
                              height: 32,
                              borderRadius: '50%',
                              bgcolor: 'primary.main',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'white',
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                bgcolor: 'primary.dark',
                                transform: 'scale(1.1)',
                              }
                            }}
                            onClick={(e) => {
                              e.stopPropagation()
                              handleTemplateSelect(template)
                            }}
                          >
                            <Add sx={{ fontSize: 18 }} />
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                )
              })}

            {/* Hvis ingen varer funnet */}
            {groupedTemplates.every(group =>
              search
                ? !group.templates.some(t =>
                  t.name.toLowerCase().includes(search.toLowerCase())
                )
                : group.templates.length === 0
            ) && (
                <Box textAlign="center" py={6}>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    Ingen varer funnet
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {search ? 'Prøv et annet søkeord' : 'Ingen varer tilgjengelig'}
                  </Typography>
                </Box>
              )}
          </Stack>
        ) : (
          // Vis kun valgt kategori
          <Box
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              overflow: 'hidden',
              bgcolor: 'background.paper'
            }}
          >
            {filteredTemplates.length === 0 ? (
              <Box textAlign="center" py={6}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Ingen varer funnet
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {search ? 'Prøv et annet søkeord' : 'Ingen varer i denne kategorien'}
                </Typography>
              </Box>
            ) : (
              filteredTemplates.map((template, index) => (
                <Box
                  key={template.id}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    px: 2,
                    py: 1.5,
                    borderTop: index === 0 ? 'none' : '1px solid #eee',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: 'action.hover',
                    }
                  }}
                  onClick={() => handleTemplateSelect(template)}
                >
                  <Box>
                    <Typography fontWeight={500} variant="body1">
                      {template.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {template.unitPrice.toLocaleString('no-NO')} kr/stk
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        bgcolor: 'primary.dark',
                        transform: 'scale(1.1)',
                      }
                    }}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleTemplateSelect(template)
                    }}
                  >
                    <Add sx={{ fontSize: 18 }} />
                  </Box>
                </Box>
              ))
            )}
          </Box>
        )}

        {/* Divider og varer i tilbudet - til slutt */}
        {offerItems.length > 0 && (
          <>
            <Box sx={{ my: 4 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
                sx={{
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    left: 0,
                    right: 0,
                    height: '1px',
                    backgroundColor: 'divider',
                    zIndex: 0
                  }
                }}
              >
                <Box component="span" sx={{ bgcolor: 'background.default', px: 2, position: 'relative', zIndex: 1 }}>
                  Varer i tilbudet
                </Box>
              </Typography>
            </Box>

            <Box
              sx={{
                borderRadius: 1,
                mb: 2
              }}
            >
              <Stack spacing={1}>
                {offerItems.map((item) => (
                  <Box
                    key={item.id}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                      cursor: 'pointer',
                      p: 2,
                      borderRadius: 1,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        bgcolor: 'action.hover',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                        transform: 'translateY(-1px)'
                      }
                    }}
                    onClick={() => handleEditItem(item)}
                  >
                    <Box>
                      <Typography fontWeight={500}>{item.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.quantity} stk x {item.unitPrice.toLocaleString('no-NO')} kr
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Typography fontWeight={500}>
                        {(item.quantity * item.unitPrice).toLocaleString('no-NO')} kr
                      </Typography>
                      <MoreVert sx={{ color: 'text.secondary', fontSize: 20 }} />
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Box>
          </>
        )}
      </Container>

      {/* Quantity Drawer */}
      <QuantityDrawer
        open={quantityDrawerOpen}
        onClose={() => setQuantityDrawerOpen(false)}
        quantity={quantity}
        onPad={(val) => {
          if (val === 'del') {
            setQuantity(q => q.length > 1 ? q.slice(0, -1) : '')
          } else if (val === 'ok') {
            handleAddTemplate()
          } else {
            setQuantity(q => (q + val).replace(/^0+/, ''))
          }
        }}
        title="Hvor mange varer?"
        itemInfo={selectedTemplate ? {
          name: selectedTemplate.name,
          price: selectedTemplate.unitPrice
        } : undefined}
      />

      {/* Custom Item Drawer - Step 1: Name and Price */}
      <Drawer
        anchor="bottom"
        open={customDrawerOpen}
        onClose={() => setCustomDrawerOpen(false)}
        PaperProps={{
          sx: { borderTopLeftRadius: 16, borderTopRightRadius: 16 }
        }}
      >
        <Box sx={{ p: 3, pb: 6 }}>
          <Typography variant="h6" gutterBottom textAlign="center">
            Legg til egendefinert vare
          </Typography>

          <Stack spacing={3} sx={{ mt: 3 }}>
            <TextField
              fullWidth
              label="Varenavn"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="F.eks. Spesial reparasjon"
            />
            <TextField
              fullWidth
              label="Pris per stykk"
              value={customPrice}
              onChange={(e) => setCustomPrice(e.target.value)}
              placeholder="0"
              type="number"
              InputProps={{
                endAdornment: <Typography variant="body2" color="text.secondary">kr</Typography>
              }}
            />
          </Stack>

          <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
            <Button
              fullWidth
              variant="secondary"
              onClick={() => setCustomDrawerOpen(false)}
            >
              Avbryt
            </Button>
            <Button
              fullWidth
              variant="primary"
              onClick={handleCustomNext}
              disabled={!customName || !customPrice}
            >
              Neste
            </Button>
          </Stack>
        </Box>
      </Drawer>

      {/* Custom Item Quantity Drawer - Step 2: Quantity */}
      <QuantityDrawer
        open={customQuantityDrawerOpen}
        onClose={() => setCustomQuantityDrawerOpen(false)}
        quantity={customQuantity}
        onPad={(val) => {
          if (val === 'del') {
            setCustomQuantity(q => q.length > 1 ? q.slice(0, -1) : '')
          } else if (val === 'ok') {
            handleAddCustomItem()
          } else {
            setCustomQuantity(q => (q + val).replace(/^0+/, ''))
          }
        }}
        title="Hvor mange?"
        itemInfo={customName ? {
          name: customName,
          price: Number(customPrice)
        } : undefined}
      />

      {/* Edit Item Options Drawer */}
      <Drawer
        anchor="bottom"
        open={editItemDrawerOpen}
        onClose={() => setEditItemDrawerOpen(false)}
        PaperProps={{
          sx: {
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            backgroundColor: 'white',
            color: 'text.primary'
          }
        }}
      >
        <Box sx={{ p: 3, pb: 6 }}>
          <Typography variant="h6" gutterBottom textAlign="center" sx={{ color: 'text.primary' }}>
            {editingItem?.name}
          </Typography>

          <Typography variant="body2" textAlign="center" mb={3} sx={{ color: 'text.secondary' }}>
            {editingItem?.quantity} stk x {editingItem?.unitPrice?.toLocaleString('no-NO')} kr
          </Typography>

          <Stack spacing={2}>
            <Button
              fullWidth
              variant="primary"
              onClick={handleEditQuantity}
              sx={{
                py: 1.5,
                textTransform: 'none',
                fontWeight: 500
              }}
            >
              Endre antall
            </Button>

            <Button
              fullWidth
              variant="soft"
              startIcon={<Delete />}
              onClick={handleDeleteItem}
              disabled={deleteOfferItemMutation.isPending}
              sx={{
                py: 1.5,
                textTransform: 'none',
                fontWeight: 500,
                backgroundColor: 'rgba(239, 68, 68, 0.08)',
                color: 'error.main',
                '&:hover': {
                  backgroundColor: 'rgba(239, 68, 68, 0.12)'
                }
              }}
            >
              {deleteOfferItemMutation.isPending ? 'Sletter...' : 'Slett vare'}
            </Button>

            <Button
              fullWidth
              variant="ghost"
              onClick={() => setEditItemDrawerOpen(false)}
              sx={{
                textTransform: 'none',
                color: 'text.secondary'
              }}
            >
              Avbryt
            </Button>
          </Stack>
        </Box>
      </Drawer>

      {/* Edit Quantity Drawer */}
      <QuantityDrawer
        open={editQuantityDrawerOpen}
        onClose={() => setEditQuantityDrawerOpen(false)}
        quantity={editQuantity}
        onPad={(val) => {
          if (val === 'del') {
            setEditQuantity(q => q.length > 1 ? q.slice(0, -1) : '')
          } else if (val === 'ok') {
            handleUpdateQuantity()
          } else {
            setEditQuantity(q => (q + val).replace(/^0+/, ''))
          }
        }}
        title="Endre antall"
        itemInfo={editingItem ? {
          name: editingItem.name,
          price: editingItem.unitPrice
        } : undefined}
      />
    </>
  )
}
