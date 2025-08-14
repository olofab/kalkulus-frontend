'use client'

import {
  Drawer,
  Box,
  Typography,
  Stack,
  Button,
  Divider,
  Chip
} from '@mui/material'
import { useState } from 'react'

const STATUS_OPTIONS = [
  'Utkast',
  'Estimat sent',
  'Estimat godkjent',
  'Estimat avslått',
  'Estimat endret',
  'Faktura sent',
  'Faktura betalt',
]

type ChangeStatusDrawerProps = {
  open: boolean
  onClose: () => void
  currentStatus: string
  onChangeStatus: (status: string) => void
}

export default function ChangeStatusDrawer({
  open,
  onClose,
  currentStatus,
  onChangeStatus,
}: ChangeStatusDrawerProps) {
  const [selected, setSelected] = useState(currentStatus)

  const handleSave = () => {
    if (selected !== currentStatus) {
      onChangeStatus(selected)
    }
    onClose()
  }

  return (
    <Drawer anchor="bottom" open={open} onClose={onClose}>
      <Box p={3}>
        <Typography variant="h6" mb={2}>Endre status</Typography>
        <Stack spacing={1} mb={3}>
          {STATUS_OPTIONS.map((status) => (
            <Chip
              key={status}
              label={status}
              variant={selected === status ? 'filled' : 'outlined'}
              color={selected === status ? 'primary' : 'default'}
              onClick={() => setSelected(status)}
              sx={{ width: 'fit-content' }}
            />
          ))}
        </Stack>
        <Divider sx={{ mb: 2 }} />
        <Stack direction="row" spacing={2}>
          <Button fullWidth variant="outlined" onClick={onClose}>
            Avbryt
          </Button>
          <Button fullWidth variant="contained" onClick={handleSave}>
            Lagre
          </Button>
        </Stack>
      </Box>
    </Drawer>
  )
}
