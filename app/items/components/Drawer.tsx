import {
  Drawer,
  Typography,
  Stack,
  TextField,
  Button,
  Box,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material'
import { useCallback, useState } from 'react'
import CategorySelect from './CategorySelect'
import { CircleX } from 'lucide-react'

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
  const [confirmOpen, setConfirmOpen] = useState(false)

  // Sjekk om noen felt er fylt ut
  const isDirty = form.name || form.unitPrice || form.categoryIds.length > 0

  const handleClose = useCallback(() => {
    if (isDirty) {
      setConfirmOpen(true)
    } else {
      setForm({ name: '', unitPrice: '', categoryIds: [] })
      onClose()
    }
  }, [isDirty, onClose])

  const handleConfirmDiscard = () => {
    setConfirmOpen(false)
    setForm({ name: '', unitPrice: '', categoryIds: [] })
    onClose()
  }

  const handleCancelDiscard = () => {
    setConfirmOpen(false)
  }
  const handleSubmit = () => {
    if (!form.name || !form.unitPrice || form.categoryIds.length === 0) return

    onSubmit(form)
    setForm({ name: '', unitPrice: '', categoryIds: [] })
    onClose()
  }

  return (
    <>
      <Drawer anchor="bottom" open={open} onClose={handleClose} PaperProps={{ sx: { borderTopLeftRadius: 16, borderTopRightRadius: 16 } }}>

        <Box p={3}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h4" fontWeight={600}>Legg til ny vare</Typography>
            <IconButton onClick={handleClose}>
              <CircleX />
            </IconButton>
          </Stack>
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
            <Button variant="contained" onClick={handleSubmit} sx={{ mt: 3, borderRadius: 999, py: 1.5 }}
            >
              Legg til
            </Button>
          </Stack>
        </Box>
      </Drawer>
      <Dialog open={confirmOpen} onClose={handleCancelDiscard}>
        <DialogTitle>Vil du kaste det du har gjort?</DialogTitle>
        <DialogContent>
          <Typography>Du har fylt ut informasjon. Hvis du går ut nå, mister du det du har skrevet.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDiscard}>Nei, fortsett</Button>
          <Button color="error" onClick={handleConfirmDiscard}>Ja, kast</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
