'use client'
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Box, Container, Typography, Button, Paper, TextField, MenuItem, Drawer, Stack, InputBase, IconButton, Menu } from '@mui/material';
import { apiPost, apiPut } from '../../../lib/api';
import { useOfferItems } from '../../hooks/useOfferItems';
import { useItemTemplates } from '../../hooks/useItemTemplates';
import { CirclePlus, Search, X, MoreVertical, Edit, Trash } from 'lucide-react';
import { useCreateItem, useUpdateOfferItem, useDeleteOfferItem, useAddTemplateToOffer } from '../../../items/hooks/useItems'


export default function OfferItemsPage() {
  const { id } = useParams();
  const { data: items = [], isLoading, error, refetch } = useOfferItems(id as string);
  const { categories, templates } = useItemTemplates();

  // Custom item states
  const [customDrawerOpen, setCustomDrawerOpen] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customPrice, setCustomPrice] = useState('');
  const [customQuantityDrawerOpen, setCustomQuantityDrawerOpen] = useState(false);
  const [customQuantity, setCustomQuantity] = useState('');
  const [lastAddedItemId, setLastAddedItemId] = useState<number | null>(null);

  // Add-to-list drawer states
  const [showAddToListDrawer, setShowAddToListDrawer] = useState(false);
  const [selectedListCategory, setSelectedListCategory] = useState<number | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [addingToList, setAddingToList] = useState(false);
  const [addToListSuccess, setAddToListSuccess] = useState(false);

  // Store the item data for vareliste
  const [savedItemName, setSavedItemName] = useState('');
  const [savedItemPrice, setSavedItemPrice] = useState('');

  // Search states
  const [search, setSearch] = useState('');

  // Template quantity states
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [templateQuantityDrawerOpen, setTemplateQuantityDrawerOpen] = useState(false);
  const [templateQuantity, setTemplateQuantity] = useState('');

  const createItemMutation = useCreateItem()
  const updateOfferItemMutation = useUpdateOfferItem()
  const deleteOfferItemMutation = useDeleteOfferItem()
  const addTemplateToOfferMutation = useAddTemplateToOffer()

  // Edit item states
  const [editingItem, setEditingItem] = useState<any>(null)
  const [editQuantityDrawerOpen, setEditQuantityDrawerOpen] = useState(false)
  const [editQuantity, setEditQuantity] = useState('')
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedItemForMenu, setSelectedItemForMenu] = useState<any>(null)

  // Step 1: User enters name/price, opens numpad for quantity
  const handleOpenCustomDrawer = () => {
    setCustomDrawerOpen(true);
  };
  const handleCancelCustom = () => {
    setCustomDrawerOpen(false);
    setCustomName('');
    setCustomPrice('');
  };
  const handleCustomNext = () => {
    if (!customName || !customPrice) return;
    setCustomDrawerOpen(false);
    setCustomQuantityDrawerOpen(true);
  };

  // Step 2: User enters quantity
  const handleCustomQuantityPad = (val: string) => {
    if (val === 'del') {
      setCustomQuantity(q => q.length > 1 ? q.slice(0, -1) : '');
    } else if (val === 'ok') {
      handleAddCustomItem();
    } else {
      setCustomQuantity(q => (q + val).replace(/^0+/, ''));
    }
  };

  // Step 3: Add item to offer (no category yet)
  const handleAddCustomItem = async () => {
    if (!customName || !customPrice || !customQuantity || Number(customQuantity) < 1) return;
    try {
      const res = await apiPost(`/api/offers/${id}/item/custom`, {
        name: customName,
        unitPrice: Number(customPrice),
        quantity: Number(customQuantity),
        categoryId: null, // No category yet
      });
      setLastAddedItemId(res.itemId);

      // Save the item data for later use in vareliste
      setSavedItemName(customName);
      setSavedItemPrice(customPrice);

      setCustomName('');
      setCustomPrice('');
      setCustomQuantity('');
      setCustomQuantityDrawerOpen(false);
      setShowAddToListDrawer(true);
      refetch();
    } catch (error) {
      console.error('Error adding custom item:', error);
    }
  };

  // Step 4: Add to vareliste and update offer item with category
  const handleAddToList = async () => {
    if (!selectedListCategory && selectedListCategory !== 0) return;
    setAddingToList(true);
    let categoryId = selectedListCategory;

    // If new category
    if (selectedListCategory === -1 && newCategoryName) {
      try {
        const catRes = await apiPost('/api/categories', { name: newCategoryName });
        categoryId = catRes.id;
      } catch (err) {
        setAddingToList(false);
        return;
      }
    }

    try {
      // 1. Add to vareliste
      await createItemMutation.mutateAsync({
        name: savedItemName,
        unitPrice: Number(savedItemPrice),
        categoryId,
      });

      // 2. Update offer item with new category
      if (lastAddedItemId) {
        await updateOfferItemMutation.mutateAsync({
          offerId: id as string,
          itemId: lastAddedItemId,
          data: { categoryId }
        });
        refetch();
      }

      setAddToListSuccess(true);
      setTimeout(() => {
        setShowAddToListDrawer(false);
        setAddToListSuccess(false);
        setSelectedListCategory(null);
        setNewCategoryName('');
        setSavedItemName('');
        setSavedItemPrice('');
      }, 1200);
    } catch (error) {
      console.error('Error adding to list or updating offer item:', error);
    } finally {
      setAddingToList(false);
    }
  };

  // Edit item functions
  const handleItemMenuClick = (event: React.MouseEvent<HTMLElement>, item: any) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedItemForMenu(item);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedItemForMenu(null);
  };

  const handleEditQuantity = () => {
    if (selectedItemForMenu) {
      setEditingItem(selectedItemForMenu);
      setEditQuantity(selectedItemForMenu.quantity.toString());
      setEditQuantityDrawerOpen(true);
      handleMenuClose();
    }
  };

  const handleDeleteItem = async () => {
    if (selectedItemForMenu) {
      try {
        await deleteOfferItemMutation.mutateAsync({
          offerId: id as string,
          itemId: selectedItemForMenu.id
        });
        refetch();
        handleMenuClose();
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  const handleEditQuantityPad = (val: string) => {
    if (val === 'del') {
      setEditQuantity(q => q.length > 1 ? q.slice(0, -1) : '');
    } else if (val === 'ok') {
      handleUpdateQuantity();
    } else {
      setEditQuantity(q => (q + val).replace(/^0+/, ''));
    }
  };

  const handleUpdateQuantity = async () => {
    if (!editingItem || !editQuantity || Number(editQuantity) < 1) return;

    try {
      console.log('Updating quantity:', {
        offerId: id as string,
        itemId: editingItem.id,
        data: { quantity: Number(editQuantity) }
      });

      await updateOfferItemMutation.mutateAsync({
        offerId: id as string,
        itemId: editingItem.id,
        data: { quantity: Number(editQuantity) }
      });

      setEditQuantityDrawerOpen(false);
      setEditingItem(null);
      setEditQuantity('');
      refetch();
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert('Feil ved oppdatering av antall: ' + (error as any)?.message);
    }
  };

  const handleAddTemplateToOffer = async (template: any) => {
    // Show quantity selector first
    setSelectedTemplate(template);
    setTemplateQuantity('');
    setTemplateQuantityDrawerOpen(true);
    setSearch(''); // Clear search
  };

  const handleTemplateQuantityPad = (value: string) => {
    if (value === 'del') {
      setTemplateQuantity(prev => prev.slice(0, -1));
    } else if (value === 'ok') {
      if (templateQuantity && Number(templateQuantity) > 0) {
        handleConfirmTemplateAdd();
      }
    } else {
      setTemplateQuantity(prev => prev + value);
    }
  };

  const handleConfirmTemplateAdd = async () => {
    if (!selectedTemplate || !templateQuantity) return;
    
    try {
      await addTemplateToOfferMutation.mutateAsync({
        offerId: id as string,
        templateId: selectedTemplate.id,
        quantity: Number(templateQuantity)
      });
      setTemplateQuantityDrawerOpen(false);
      setSelectedTemplate(null);
      setTemplateQuantity('');
      refetch();
    } catch (error) {
      console.error('Error adding template to offer:', error);
    }
  };

  if (error) return <Typography color="error">Feil ved henting av varer</Typography>;
  if (isLoading) return <Typography>Laster inn...</Typography>;

  return (
    <Container maxWidth="sm" sx={{ p: 0 }}>
      {/* Egendefinert vare */}
      <Box mt={4} mb={2}>
        <Paper
          onClick={handleOpenCustomDrawer}
          sx={{
            borderRadius: 3,
            p: 3,
            mb: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 100,
            border: '1.5px dashed #cfd8dc',
            backgroundColor: 'primary.light',
            cursor: 'pointer',
            boxShadow: 'none',
            transition: 'background 0.2s',
            '&:hover': { backgroundColor: '#f0f4fa' },
          }}
          elevation={0}
        >
          <CirclePlus size={28} style={{ opacity: 0.7, marginBottom: 8 }} />
          <Typography fontWeight={600} align="center">Egendefinert</Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            Legg til egendefinerte varer på stedet
          </Typography>
        </Paper>
      </Box>

      {/* Søkefelt for varer */}
      <Box sx={{ position: 'relative', mb: 2 }}>
        <Paper
          component="form"
          sx={{
            display: 'flex',
            alignItems: 'center',
            px: 2,
            py: 1,
            borderRadius: 2,
            backgroundColor: 'background.paper',
            boxShadow: 0,
            border: '1px solid #ddd',
          }}
          onSubmit={e => e.preventDefault()}
        >
          <Search size={24} style={{ marginRight: 8, color: '#90a4ae' }} />
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Søk etter vare..."
            inputProps={{ 'aria-label': 'søk etter vare' }}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <IconButton
              size="small"
              onClick={() => setSearch('')}
              sx={{ ml: 1 }}
              aria-label="Tøm søk"
            >
              <X size={20} />
            </IconButton>
          )}
        </Paper>

        {/* Søkeresultater overlay */}
        {search.trim() && (
          <Box
            sx={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              zIndex: 10,
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              mt: 1,
              maxHeight: 400,
              overflowY: 'auto',
              border: '1px solid #ddd',
            }}
          >
            <Stack spacing={0.5} p={1}>
              {templates?.filter(tpl => tpl.name.toLowerCase().includes(search.toLowerCase())).length === 0 ? (
                <Typography color="text.secondary" sx={{ pl: 0.5, pt: 1 }}>Ingen varer funnet</Typography>
              ) : (
                templates?.filter(tpl => tpl.name.toLowerCase().includes(search.toLowerCase())).map((tpl) => (
                  <Box
                    key={tpl.id}
                    onClick={() => handleAddTemplateToOffer(tpl)}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer',
                      px: 1,
                      py: 1.2,
                      borderRadius: 1,
                      transition: 'background 0.15s',
                      '&:hover': {
                        backgroundColor: '#f3f7ff',
                      },
                      '&:active': {
                        backgroundColor: '#e3eefd',
                      },
                    }}
                  >
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography fontWeight={500} fontSize={16}>{tpl.name}</Typography>
                      <Typography color="text.secondary" fontSize={15}>
                        {tpl.unitPrice.toLocaleString('no-NO')} kr
                      </Typography>
                      {tpl.categories.length > 0 && (
                        <Typography variant="caption" sx={{ backgroundColor: '#e3f2fd', px: 1, py: 0.2, borderRadius: 1 }}>
                          {tpl.categories[0].name}
                        </Typography>
                      )}
                    </Box>
                    <CirclePlus size={22} style={{ color: '#2979ff', opacity: 0.85, flexShrink: 0 }} />
                  </Box>
                ))
              )}
            </Stack>
          </Box>
        )}
      </Box>

      {/* Valgte varer */}
      <Box mt={4}>
        <Typography variant="h6" mb={2}>Valgte varer</Typography>
        {items.length === 0 ? (
          <Typography color="text.secondary">Ingen varer er lagt til ennå.</Typography>
        ) : (
          <Box display="flex" flexDirection="column" gap={1}>
            {items.map((item, idx) => (
              <Box key={idx} display="flex" justifyContent="space-between" alignItems="center" p={2} borderRadius={2} bgcolor="#f7f7f7" mb={1}>
                <Box flex={1}>
                  <Typography fontWeight={600}>{item.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.quantity} stk x {item.unitPrice.toLocaleString('no-NO')} kr
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography fontWeight={600}>{(item.quantity * item.unitPrice).toLocaleString('no-NO')} kr</Typography>
                  <IconButton
                    size="small"
                    onClick={(e) => handleItemMenuClick(e, item)}
                    sx={{ ml: 1 }}
                  >
                    <MoreVertical size={18} />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {/* Drawer: Step 1 - navn og pris */}
      <Drawer anchor="bottom" open={customDrawerOpen} onClose={handleCancelCustom} PaperProps={{ sx: { borderTopLeftRadius: 16, p: 3 } }}>
        <Box display="flex" flexDirection="column" gap={2}>
          <Typography variant="h6">Legg til egendefinert vare</Typography>
          <TextField label="Navn" value={customName} onChange={e => setCustomName(e.target.value)} fullWidth />
          <TextField label="Pris" type="number" value={customPrice} onChange={e => setCustomPrice(e.target.value)} fullWidth />
          <Button variant="contained" onClick={handleCustomNext} disabled={!customName || !customPrice}>Neste</Button>
        </Box>
      </Drawer>

      {/* Drawer: Step 2 - numpad for antall */}
      <Drawer anchor="bottom" open={customQuantityDrawerOpen} onClose={() => setCustomQuantityDrawerOpen(false)} PaperProps={{ sx: { borderTopLeftRadius: 16, p: 3 } }}>
        <Box display="flex" flexDirection="column" gap={2} alignItems="center">
          <Typography variant="h6">Antall</Typography>
          <Typography variant="h4">{customQuantity || '0'}</Typography>
          <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2} width="100%">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
              <Button key={n} onClick={() => handleCustomQuantityPad(n.toString())}>{n}</Button>
            ))}
            <Button onClick={() => handleCustomQuantityPad('del')}>Slett</Button>
            <Button onClick={() => handleCustomQuantityPad('0')}>0</Button>
            <Button variant="contained" onClick={() => handleCustomQuantityPad('ok')} disabled={!customQuantity || Number(customQuantity) < 1}>OK</Button>
          </Box>
        </Box>
      </Drawer>

      {/* Drawer: Template quantity selector */}
      <Drawer anchor="bottom" open={templateQuantityDrawerOpen} onClose={() => setTemplateQuantityDrawerOpen(false)} PaperProps={{ sx: { borderTopLeftRadius: 16, p: 3 } }}>
        <Box display="flex" flexDirection="column" gap={2} alignItems="center">
          {selectedTemplate && (
            <Box textAlign="center" mb={1}>
              <Typography variant="h6">{selectedTemplate.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedTemplate.unitPrice.toLocaleString('no-NO')} kr per stk
              </Typography>
            </Box>
          )}
          <Typography variant="h6">Antall</Typography>
          <Typography variant="h4">{templateQuantity || '0'}</Typography>
          <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2} width="100%">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
              <Button key={n} onClick={() => handleTemplateQuantityPad(n.toString())}>{n}</Button>
            ))}
            <Button onClick={() => handleTemplateQuantityPad('del')}>Slett</Button>
            <Button onClick={() => handleTemplateQuantityPad('0')}>0</Button>
            <Button variant="contained" onClick={() => handleTemplateQuantityPad('ok')} disabled={!templateQuantity || Number(templateQuantity) < 1}>OK</Button>
          </Box>
        </Box>
      </Drawer>

      {/* Drawer: Step 3 - vareliste og kategori */}
      <Drawer anchor="bottom" open={showAddToListDrawer} onClose={() => setShowAddToListDrawer(false)} PaperProps={{ sx: { borderTopLeftRadius: 16, p: 3 } }}>
        {!addToListSuccess ? (
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="h6">Vil du legge til varen i vareliste?</Typography>
            <Typography variant="body2" color="text.secondary">Da kan du bruke varen igjen senere.</Typography>
            <TextField
              select
              label="Kategori"
              value={selectedListCategory ?? ''}
              onChange={e => setSelectedListCategory(Number(e.target.value))}
              fullWidth
              sx={{ mb: 2 }}
            >
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
              ))}
              <MenuItem value={-1}>Ny kategori...</MenuItem>
            </TextField>
            {selectedListCategory === -1 && (
              <TextField label="Navn på ny kategori" value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)} fullWidth />
            )}
            <Box display="flex" gap={1}>
              <Button variant="outlined" fullWidth onClick={() => setShowAddToListDrawer(false)}>Nei takk</Button>
              <Button variant="contained" fullWidth disabled={addingToList || (!selectedListCategory || (selectedListCategory === -1 && !newCategoryName))} onClick={handleAddToList}>
                Ja, legg til
              </Button>
            </Box>
          </Box>
        ) : (
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mt={4}>
            <Typography variant="h6" color="success.main" mb={2}>Lagt til i vareliste!</Typography>
          </Box>
        )}
      </Drawer>

      {/* Menu for item actions */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleEditQuantity} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Edit size={18} />
          Endre antall
        </MenuItem>
        <MenuItem onClick={handleDeleteItem} sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'error.main' }}>
          <Trash size={18} />
          Fjern vare
        </MenuItem>
      </Menu>

      {/* Drawer: Edit quantity */}
      <Drawer anchor="bottom" open={editQuantityDrawerOpen} onClose={() => setEditQuantityDrawerOpen(false)} PaperProps={{ sx: { borderTopLeftRadius: 16, p: 3 } }}>
        <Box display="flex" flexDirection="column" gap={2} alignItems="center">
          <Typography variant="h6">Endre antall</Typography>
          <Typography variant="body1" color="text.secondary">{editingItem?.name}</Typography>
          <Typography variant="h4">{editQuantity || '0'}</Typography>
          <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2} width="100%">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
              <Button key={n} onClick={() => handleEditQuantityPad(n.toString())}>{n}</Button>
            ))}
            <Button onClick={() => handleEditQuantityPad('del')}>Slett</Button>
            <Button onClick={() => handleEditQuantityPad('0')}>0</Button>
            <Button variant="contained" onClick={() => handleEditQuantityPad('ok')} disabled={!editQuantity || Number(editQuantity) < 1}>OK</Button>
          </Box>
        </Box>
      </Drawer>
    </Container>
  );
}

