'use client'

import { Box, Typography, Stack, IconButton, Paper, Divider, Grid } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { Item } from '../../types/offer'
import { useState } from 'react'
import ConfirmDeleteDrawer from '../../components/offer/items/DeleteDrawer'
import EmptyState from '../../components/common/EmptyState'
import { useItemRefetchStore } from '../../lib/hooks/useItemRefetchStore'

export default function ItemList({
  items,
  onQuantityChange,
  onRemove
}: {
  items: Item[]
  onQuantityChange: (item: Item, change: number) => void
  onRemove: (item: Item) => void
}) {
  const [itemToDelete, setItemToDelete] = useState<Item | null>(null)

  const handleDecrease = (item: Item) => {
    if (item.quantity <= 1) {
      setItemToDelete(item)
    } else {
      onQuantityChange(item, -1)
    }
  }

  if (items.length === 0) {
    return (
      <EmptyState
        title="Ingen varer lagt til"
        description="Alle varer for dette tilbudet ser du her"
        imageSrc="/illustrations/empty_state_timla.png"
      />
    )
  }

  return (
    <Box>
      <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden', mb: 2 }}>
        {items.map((item, index) => (
          <Box key={item.id} sx={{ borderTop: index === 0 ? 'none' : '1px solid #eee' }}>
            <Grid container alignItems="center" spacing={2} px={2} py={1.5}>
              {/* Item details */}
              <Grid item xs={6}>
                <Box>
                  <Typography fontWeight={600} noWrap sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
                    {item.name}
                  </Typography>
                  <Typography fontSize={12} color="text.secondary">
                    {item.unitPrice.toLocaleString()} kr/stk
                  </Typography>
                </Box>
              </Grid>

              {/* Quantity controls */}
              <Grid item xs={3}>
                <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
                  <IconButton size="small" onClick={() => handleDecrease(item)}>
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  <Typography>{item.quantity}</Typography>
                  <IconButton size="small" onClick={() => onQuantityChange(item, 1)}>
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </Grid>

              {/* Total price */}
              <Grid item xs={3}>
                <Typography textAlign="right" fontSize={14} color="text.secondary">
                  {(item.unitPrice * item.quantity).toLocaleString()} kr
                </Typography>
              </Grid>
            </Grid>
          </Box>
        ))}
      </Paper>

      <ConfirmDeleteDrawer
        open={!!itemToDelete}
        itemName={itemToDelete?.name || ''}
        onClose={() => setItemToDelete(null)}
        onConfirm={() => {
          if (itemToDelete) {
            onRemove(itemToDelete)
            useItemRefetchStore.getState().refetch() // 🔁 trigger offer refetch

          }
          setItemToDelete(null)
        }}
      />
    </Box>
  )
}
