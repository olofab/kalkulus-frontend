'use client'
import {
  Box, TextField, Typography, Button, Stack, Stepper, Step, StepLabel, IconButton
} from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import dayjs from 'dayjs'
import { AnimatePresence, motion } from 'framer-motion'

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

  const [form, setForm] = useState({
    customer: '',
    title: '',
    contactPerson: '',
    phone: '',
    email: '',
    address: '',
    description: '',
    validUntil: dayjs().add(30, 'day').format('YYYY-MM-DD'),
    status: 'draft',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const nextStep = () => {
    if (step === 0 && (!form.customer.trim() || !form.title.trim())) return
    setStep((prev) => prev + 1)
  }

  const prevStep = () => setStep((prev) => prev - 1)
  const skipStep = () => setStep((prev) => prev + 1)

  const handleSubmit = async () => {
    const res = await axios.post('/api/offers', form)
    router.push(`/offers/${res.data.id}`)
  }

  const isStepValid = () => {
    if (step === 0) {
      return form.customer.trim() !== '' && form.title.trim() !== ''
    }
    return true
  }

  return (
    <Box p={4}>
      {step > 0 && (
        <IconButton onClick={prevStep} sx={{ mb: 2 }}>
          <ArrowBack />
        </IconButton>
      )}

      <Stepper activeStep={step} alternativeLabel sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

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
                <TextField label="Kundenavn" name="customer" required fullWidth onChange={handleChange} />
                <TextField label="Prosjekttittel" name="title" required fullWidth onChange={handleChange} />
              </>
            )}

            {step === 1 && (
              <>
                <TextField label="Kontaktperson" name="contactPerson" fullWidth onChange={handleChange} />
                <TextField label="Telefon" name="phone" fullWidth onChange={handleChange} />
                <TextField label="E-post" name="email" fullWidth onChange={handleChange} />
                <TextField label="Adresse" name="address" fullWidth onChange={handleChange} />
              </>
            )}

            {step === 2 && (
              <>
                <TextField label="Beskrivelse (valgfritt)" name="description" multiline rows={3} fullWidth onChange={handleChange} />
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
            {step === 0 && (
              <Stack spacing={2} mt={4} width={'100%'}>
                <Button
                  variant="contained"
                  onClick={nextStep}
                  disabled={!isStepValid()}
                  fullWidth
                >
                  Neste
                </Button>

                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => router.push('/dashboard')}
                  fullWidth
                >
                  Avbryt
                </Button>
              </Stack>
            )}

            {step === 1 && (
              <Stack spacing={2} mt={4} width={'100%'}>
                <Button variant="contained" onClick={nextStep} fullWidth>Neste</Button>
                <Button variant="text" onClick={skipStep} fullWidth>Hopp over</Button>
              </Stack>
            )}

            {step === 2 && (
              <Button variant="contained" onClick={handleSubmit}>Opprett tilbud</Button>
            )}
          </Stack>
        </motion.div>
      </AnimatePresence>
    </Box>
  )
}
