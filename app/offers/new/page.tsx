// app/offers/new/page.tsx
'use client'

import {
  Box, TextField, Typography, Button, Stack, Stepper, Step, StepLabel, IconButton,
  useTheme
} from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import dayjs from 'dayjs'
import CustomizedSteppers from '../../components/Stepper'
import Image from 'next/image'
import { useCreateOffer } from '../hooks/useCreateOffer'
import { ClipboardList, PackagePlus } from 'lucide-react'

const steps = ['Prosjektinfo', 'Kundedetaljer', 'Beskrivelse']

const variants = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
  transition: { duration: 0.3 }
}

export default function NewOfferForm() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const theme = useTheme();

  const [form, setForm] = useState({
    title: '',
    customer: '',
    contactPerson: '',
    phone: '',
    email: '',
    address: '',
    description: '',
    validUntil: dayjs().add(30, 'day').format('YYYY-MM-DD'),
    includeVat: true,
    status: 'draft'
  })

  const createOffer = useCreateOffer()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const nextStep = () => {
    if (step === 0 && (!form.title.trim() || !form.customer.trim())) return
    setStep((prev) => prev + 1)
  }

  const prevStep = () => setStep((prev) => prev - 1)
  const skipStep = () => setStep((prev) => prev + 1)

  const handleSubmit = async () => {
    createOffer.mutate(form, {
      onSuccess: (data) => {
        router.push(`/offers/${data.id}`)
      },
      onError: (err) => {
        console.error('Feil ved opprettelse av tilbud', err)
      }
    })
  }

  const isStepValid = () => {
    if (step === 0) {
      return form.title.trim() !== '' && form.customer.trim() !== ''
    }
    return true
  }

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="center" mb={4}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            width: 100,
            height: 100,
            bgcolor: theme.palette.primary.light,
            mb: 2,
          }}
        >
          <PackagePlus size={40} color={theme.palette.primary.main} strokeWidth={2} />
        </Box>
      </Box>

      {step > 0 && (
        <IconButton onClick={prevStep} sx={{ mb: 2 }}>
          <ArrowBack />
        </IconButton>
      )}

      <CustomizedSteppers steps={steps} active={step} />

      <Typography variant="h5" mb={2}>{steps[step]}</Typography>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={variants.transition}
          variants={variants}
        >
          <Stack spacing={2}>
            {step === 0 && (
              <>
                <TextField
                  label="Prosjekttittel"
                  name="title"
                  required
                  fullWidth
                  value={form.title}
                  onChange={handleChange}
                />
                <TextField
                  label="Kundenavn"
                  name="customer"
                  required
                  fullWidth
                  value={form.customer}
                  onChange={handleChange}
                />
              </>
            )}

            {step === 1 && (
              <>
                <TextField label="Kontaktperson" name="contactPerson" fullWidth value={form.contactPerson} onChange={handleChange} />
                <TextField label="Telefon" name="phone" fullWidth value={form.phone} onChange={handleChange} />
                <TextField label="E-post" name="email" fullWidth value={form.email} onChange={handleChange} />
                <TextField label="Adresse" name="address" fullWidth value={form.address} onChange={handleChange} />
              </>
            )}

            {step === 2 && (
              <>
                <TextField
                  label="Beskrivelse (valgfritt)"
                  name="description"
                  multiline
                  rows={3}
                  fullWidth
                  value={form.description}
                  onChange={handleChange}
                />
                <TextField
                  label="Gyldig til"
                  name="validUntil"
                  type="date"
                  fullWidth
                  value={form.validUntil}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </>
            )}
          </Stack>

          <Stack direction="row" spacing={2} mt={4}>
            {step < steps.length - 1 && (
              <Stack spacing={2} width="100%">
                <Button
                  variant="contained"
                  fullWidth
                  onClick={nextStep}
                  disabled={!isStepValid()}
                >
                  Neste
                </Button>
                {step > 0 && (
                  <Button variant="text" onClick={skipStep} fullWidth>
                    Hopp over
                  </Button>
                )}
              </Stack>
            )}

            {step === steps.length - 1 && (
              <Box display={'flex'} width={'100%'}>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  fullWidth
                  disabled={createOffer.isPending}
                >
                  {createOffer.isPending ? 'Lagrer...' : 'Opprett prosjekt'}
                </Button>
              </Box>
            )}
          </Stack>
        </motion.div>
      </AnimatePresence>
    </Box>
  )
}
