// components/offer/items/ConfirmDeleteDrawer.tsx
'use client'

import { Drawer, Box, Typography, Button, Stack } from '@mui/material'

export default function ConfirmDeleteDrawer({
  open,
  onClose,
  onConfirm,
  itemName
}: {
  open: boolean,
  onClose: () => void,
  onConfirm: () => void,
  itemName: string
}) {
  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { borderTopLeftRadius: 16, borderTopRightRadius: 16, p: 3 } }}
    >
      <Box>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Fjern vare?
        </Typography>
        <Typography gutterBottom>
          Ønsker du å fjerne <strong>{itemName}</strong> fra tilbudet?
        </Typography>

        <Stack direction="row" spacing={2} mt={3}>
          <Button variant="outlined" fullWidth onClick={onClose}>
            Avbryt
          </Button>
          <Button variant="contained" color="error" fullWidth onClick={onConfirm}>
            Fjern
          </Button>
        </Stack>
      </Box>
    </Drawer>
  )
}
