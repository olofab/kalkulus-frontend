// components/FloatingActionMenu.tsx
'use client'
import { Box, Button, Paper, Typography } from '@mui/material'
import { Item } from './ItemList'
import { ExistingItem } from './AddItemDrawer'

export default function FloatingActionMenu({
  totalPrice,
  onAddItem,
}: {
  totalPrice: number
  onAddItem: (item: ExistingItem & { quantity: number }) => void
}) {
  return (
    <Paper
      elevation={6}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        p: 2,
        m: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1300,
        backgroundColor: '#fff',
        borderTop: '1px solid #ccc',
      }}
    >
      <Typography variant="h6">Total: {totalPrice.toLocaleString()} kr</Typography>
      <Button variant="contained" onClick={() => onAddItem}>
        Legg til vare
      </Button>
    </Paper>
  )
}
