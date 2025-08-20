import React from 'react';
import { Drawer, Box, Typography, TextField, Button as MuiButton, MenuItem, CircularProgress, alpha, useTheme } from '@mui/material';
import Button from '../../../design/components/Button';

export function CustomItemDrawer({ open, onClose, name, price, onNameChange, onPriceChange, onNext }) {
  return (
    <Drawer anchor="bottom" open={open} onClose={onClose} PaperProps={{ sx: { borderTopLeftRadius: 16, p: 3 } }}>
      <Box display="flex" flexDirection="column" gap={2}>
        <Typography variant="h6">Legg til egendefinert vare</Typography>
        <TextField label="Navn" value={name} onChange={onNameChange} fullWidth />
        <TextField label="Pris" type="number" value={price} onChange={onPriceChange} fullWidth />
        <Button variant="primary" onClick={onNext} disabled={!name || !price}>Neste</Button>
      </Box>
    </Drawer>
  );
}

export function QuantityDrawer({ open, onClose, quantity, onPad, title = "Antall", subtitle, itemInfo }: {
  open: boolean;
  onClose: () => void;
  quantity: string;
  onPad: (value: string) => void;
  title?: string;
  subtitle?: string;
  itemInfo?: { name: string; price?: number };
}) {
  const theme = useTheme();

  return (
    <Drawer anchor="bottom" open={open} onClose={onClose} PaperProps={{ sx: { borderTopLeftRadius: 16, p: 3 } }}>
      <Box display="flex" flexDirection="column" gap={2} alignItems="center">
        {itemInfo && (
          <Box textAlign="center" mb={1}>
            <Typography variant="h6">{itemInfo.name}</Typography>
            {itemInfo.price && (
              <Typography variant="body2" color="text.secondary">
                {itemInfo.price.toLocaleString('no-NO')} kr per stk
              </Typography>
            )}
          </Box>
        )}
        <Typography variant="h6">{title}</Typography>
        {subtitle && <Typography variant="body2" color="text.secondary">{subtitle}</Typography>}
        <Typography variant="h4">{quantity || '0'}</Typography>
        <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2} width="100%">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
            <Button
              key={n}
              variant="secondary"
              onClick={() => onPad(n.toString())}
              sx={{
                height: 60,
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: '#131313',
                '&:hover': {
                  color: '#131313',
                }
              }}
            >
              {n}
            </Button>
          ))}
          <Button
            onClick={() => onPad('del')}
            sx={{
              height: 60,
              fontSize: '1rem',
              backgroundColor: alpha(theme.palette.error.main, 0.08),
              color: theme.palette.error.main,
              border: 'none',
              '&:hover': {
                backgroundColor: alpha(theme.palette.error.main, 0.12),
                color: theme.palette.error.main,
              },
              '&:active': {
                backgroundColor: alpha(theme.palette.error.main, 0.16),
              },
            }}
          >
            Slett
          </Button>
          <Button
            variant="secondary"
            onClick={() => onPad('0')}
            sx={{
              height: 60,
              fontSize: '1.25rem',
              fontWeight: 'bold',
              color: '#131313',
              '&:hover': {
                color: '#131313',
              }
            }}
          >
            0
          </Button>
          <Button variant="primary" onClick={() => onPad('ok')} disabled={!quantity || Number(quantity) < 1} sx={{ height: 60, fontSize: '1rem' }}>OK</Button>
        </Box>
      </Box>
    </Drawer>
  );
}

export function AddToListDrawer({ open, onClose, name, categories, selectedCategory, onCategoryChange, newCategoryName, onNewCategoryNameChange, addingToList, creatingCategory, onAdd, addToListSuccess }) {
  return (
    <Drawer anchor="bottom" open={open} onClose={onClose} PaperProps={{ sx: { borderTopLeftRadius: 16, p: 3 } }}>
      {!addToListSuccess ? (
        <Box display="flex" flexDirection="column" gap={2}>
          <Typography variant="h6">Vil du legge til <b>{name}</b> i vareliste?</Typography>
          <Typography variant="body2" color="text.secondary">Da kan du bruke varen igjen senere.</Typography>
          <TextField
            select
            label="Kategori"
            value={selectedCategory ?? ''}
            onChange={onCategoryChange}
            fullWidth
            sx={{ mb: 2 }}
          >
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
            ))}
            <MenuItem value={-1}>Ny kategori...</MenuItem>
          </TextField>
          {selectedCategory === -1 && (
            <TextField label="Navn på ny kategori" value={newCategoryName} onChange={onNewCategoryNameChange} fullWidth />
          )}
          <Box display="flex" gap={1}>
            <Button variant="secondary" fullWidth onClick={onClose}>Nei takk</Button>
            <Button variant="primary" fullWidth disabled={addingToList || (!selectedCategory || (selectedCategory === -1 && !newCategoryName))} onClick={onAdd}>
              {creatingCategory ? <CircularProgress size={20} /> : 'Ja, legg til'}
            </Button>
          </Box>
        </Box>
      ) : (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mt={4}>
          <Typography variant="h6" color="success.main" mb={2}>Lagt til i vareliste!</Typography>
        </Box>
      )}
    </Drawer>
  );
}
