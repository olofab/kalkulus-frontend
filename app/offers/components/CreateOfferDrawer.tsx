'use client'

import { useCallback, useState } from 'react'
import { Drawer, Box, TextField, Typography, Stack, Button, IconButton, FormControlLabel, Switch, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { CircleX, X } from 'lucide-react'
import { useCreateOffer } from '../hooks/useCreateOffer'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import ValidUntilPicker from './OfferDatePicker'
import PhoneInput from 'react-phone-input-2'

const initialForm = {
  title: '',
  customer: '',
  contactPerson: '',
  phone: '',
  email: '',
  address: '',
  description: '',
  validUntil: dayjs().add(30, 'day').format('YYYY-MM-DD'),
  includeVat: true,
  status: 'DRAFT'
}

export default function NewOfferDrawer({ open, onClose }: { open: boolean, onClose: () => void }) {
  const router = useRouter()
  const createOffer = useCreateOffer()
  const [form, setForm] = useState(initialForm)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const isDirty = Object.entries(form).some(
    ([key, value]) => key !== 'validUntil' && key !== 'includeVat' && key !== 'status' && value
  )

  // Når drawer lukkes, reset felter
  const handleClose = useCallback(() => {
    if (isDirty) {
      setConfirmOpen(true)
    } else {
      setForm(initialForm)
      onClose()
    }
  }, [isDirty, onClose])

  const handleConfirmDiscard = () => {
    setConfirmOpen(false)
    setForm(initialForm)
    onClose()
  }

  const handleCancelDiscard = () => {
    setConfirmOpen(false)
  }
  const handleSubmit = () => {
    if (!form.title || !form.customer) return
    createOffer.mutate(form)
    setForm(initialForm)
    onClose()
  }

  return (
    <>
      <Drawer anchor="bottom" open={open} onClose={handleClose} // <-- bruk handleClose her!
        PaperProps={{ sx: { borderTopLeftRadius: 16, borderTopRightRadius: 16 } }}>
        <Box px={3} py={2}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h4" fontWeight={600}>Opprett nytt tilbud</Typography>
            <IconButton onClick={handleClose}>
              <CircleX />
            </IconButton>
          </Stack>
          <Stack spacing={2}>
            <TextField
              label="Tittel"
              fullWidth
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <TextField
              label="Kunde"
              fullWidth
              value={form.customer}
              onChange={(e) => setForm({ ...form, customer: e.target.value })}
            />
            <PhoneInput
              country="no" // 🇳🇴 Norway preselected
              value={form.phone}
              onChange={(value) => setForm({ ...form, phone: value })}
              enableSearch
              inputProps={{
                name: 'phone',
                required: true,
                autoFocus: false,
              }}
              containerStyle={{ width: '100%' }}
              inputStyle={{
                width: '100%',
                height: 50,
                borderRadius: 8,
                border: '1px solid #ccc',
                fontSize: 16,
                paddingLeft: 48,
              }}
              buttonStyle={{
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 8,
                borderRight: 'none',
              }}
            />
            <TextField
              label="E-post"
              fullWidth
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, mb: 1 }}>
              <Typography variant="body1" color="text.secondary"
              >
                Gyldig til
              </Typography>
              <ValidUntilPicker
                value={form.validUntil}
                onChange={(date) => setForm({ ...form, validUntil: date })}
              />
            </Box>
          </Stack>
          <Button
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3, borderRadius: 999, py: 1.5 }}
            onClick={handleSubmit}
            disabled={createOffer.isPending}
          >
            Opprett tilbud
          </Button>
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
