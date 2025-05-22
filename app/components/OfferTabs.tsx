// /app/components/OfferTabs.tsx
'use client'
import { Avatar, Box, Button, Divider, List, ListItem, ListItemAvatar, ListItemText, Paper, Stack, Typography, useTheme } from '@mui/material'
import { useState } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import BuildIcon from '@mui/icons-material/Build'
import ConstructionIcon from '@mui/icons-material/Construction'
import FormatPaintIcon from '@mui/icons-material/FormatPaint'
import { Offer } from '../types/offer'
import CategoryIcon from '@mui/icons-material/Category'
import OfferItemList from './OfferItemList'

const icons = [
  <ShoppingCartIcon />, <BuildIcon />, <ConstructionIcon />, <FormatPaintIcon />
]
export default function OfferTabs({
  offer,
  items,
  onAddClick,
  onUpdated

}: {
  offer: Offer
  items: { name: string; unitPrice: number; quantity: number }[]
  onAddClick: () => void,
  onUpdated: () => void

}) {
  const [selectedTab, setSelectedTab] = useState<'items' | 'summary'>('items')
  const theme = useTheme();

  return (
    <Box>
      <Box sx={{
        display: 'flex',
        borderRadius: '8px',
        overflow: 'hidden',
        my: 2,
      }}>
        <Button
          fullWidth
          onClick={() => setSelectedTab('items')}
          disableElevation
          variant={selectedTab === 'items' ? 'contained' : 'text'}
          sx={{
            borderRadius: 0,
            bgcolor: selectedTab === 'items' ? theme.palette.primary.main : '#fff',
            color: selectedTab === 'items' ? '#fff' : theme.palette.primary.main,
            '&:hover': {
              bgcolor: selectedTab === 'items' ? theme.palette.primary.dark : '#f0f0f0'
            }
          }}
        >
          Items
        </Button>

        <Button
          fullWidth
          onClick={() => setSelectedTab('summary')}
          disableElevation
          variant={selectedTab === 'summary' ? 'contained' : 'text'}
          sx={{
            borderRadius: 0,
            bgcolor: selectedTab === 'summary' ? theme.palette.primary.main : '#fff',
            color: selectedTab === 'summary' ? '#fff' : theme.palette.primary.main,
            '&:hover': {
              bgcolor: selectedTab === 'summary' ? theme.palette.primary.dark : '#f0f0f0'
            }
          }}
        >
          Summering
        </Button>
      </Box>

      {
        selectedTab === 'items' && (
          <Box>
            <Button variant="contained" fullWidth onClick={onAddClick} sx={{ mb: 2 }}>
              Legg til vare
            </Button>
            {items.map((item, i) => (
              <Box key={i} sx={{ mb: 1, p: 1, border: '1px solid #eee', borderRadius: 1, backgroundColor: theme.palette.background.paper }}>
                <Typography variant="body1" fontWeight={'bold'}>{item.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.quantity} stk à {item.unitPrice} kr
                </Typography>
              </Box>
            ))}
          </Box>
        )
      }

      {
        selectedTab === 'summary' && (
          <Paper sx={{ p: 2, borderRadius: '8px', backgroundColor: 'background.paper' }} elevation={0}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                Oversikt
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                {offer.totalSum.toFixed(2)} kr</Typography>
            </Stack>
            <Divider sx={{ my: 1 }} />
            <OfferItemList items={offer.items} onUpdated={onUpdated} />

          </Paper>
        )
      }
    </Box >
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