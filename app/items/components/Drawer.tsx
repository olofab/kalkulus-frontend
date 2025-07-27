import {
  Drawer,
  Typography,
  Stack,
  TextField,
  Button,
  Box
} from '@mui/material'
import { useState } from 'react'
import CategorySelect from './CategorySelect'

type NewItemDrawerProps = {
  open: boolean
  onClose: () => void
  onSubmit: (form: { name: string; unitPrice: string; categoryIds: number[] }) => void
}

export default function NewItemDrawer({ open, onClose, onSubmit }: NewItemDrawerProps) {
  const [form, setForm] = useState({
    name: '',
    unitPrice: '',
    categoryIds: [] as number[],
  })

  const handleSubmit = () => {
    if (!form.name || !form.unitPrice || form.categoryIds.length === 0) return

    onSubmit(form)
    setForm({ name: '', unitPrice: '', categoryIds: [] })
    onClose()
  }

  return (
    <Drawer anchor="bottom" open={open} onClose={onClose}>
      <Box p={3}>
        <Typography variant="h6" gutterBottom>
          Legg til ny vare
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="Navn"
            fullWidth
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <TextField
            label="Enhetspris"
            type="number"
            fullWidth
            value={form.unitPrice}
            onChange={(e) => setForm({ ...form, unitPrice: e.target.value })}
          />
          <CategorySelect
            value={form.categoryIds}
            onChange={(ids) => setForm({ ...form, categoryIds: ids })}
          />
          <Button variant="contained" onClick={handleSubmit}>
            Legg til
          </Button>
        </Stack>
      </Box>
    </Drawer>
  )
}
