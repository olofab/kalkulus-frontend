// /app/(auth)/register/page.tsx
'use client'

import {
  Box,
  Button,
  Container,
  MobileStepper,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { apiPublicPost } from '../../lib/api'
import CustomizedSteppers from '../../components/Stepper'

const steps = [
  {
    title: 'Velkommen til Timla – få full kontroll på tilbudene dine',
    description:
      'Fyll ut noen enkle detaljer om bedriften din. Dette bruker vi for å sette opp en løsning som passer akkurat dere. Du er i gang på under ett minutt.',
  },
  {
    title: 'La oss bli litt bedre kjent med bedriften din',
    description:
      'Vi trenger firmanavn, organisasjonsnummer og hvilken bransje dere jobber i. Dette hjelper oss å tilpasse varelister og satser som passer deres behov.',
  },
  {
    title: 'Fortell oss hvem du er',
    description:
      'Vi trenger navn, e-post og passord slik at du kan logge inn som admin for selskapet ditt. Du vil kunne legge til flere brukere senere.'
  }
]

export default function RegisterPage() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    companyName: '',
    organizationNumber: '',
    industry: '',
    hourlyRate: '',
    machineRate: '',
    fuelRate: '',
    name: '',
    email: '',
    password: '',
  })

  const router = useRouter()
  const theme = useTheme()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const next = async () => {
    if (step === 2) {
      try {
        const res = await apiPublicPost('/api/auth/register-company', form)
        localStorage.setItem('token', res.token)
        router.push('/auth/result?status=success')
        return;
      } catch (err: any) {
        const errorMsg = err?.response?.data?.error || 'Ukjent feil'
        router.push(`/auth/result?status=fail&error=${encodeURIComponent(errorMsg)}`)
      }
    } else {
      setStep((s) => s + 1)
    }
  }

  const back = () => {
    if (step > 0) setStep((s) => s - 1)
  }

  const isStepValid = () => {
    if (step === 1) {
      return form.companyName && form.organizationNumber && form.industry
    }
    if (step === 2) {
      return form.name && form.email && form.password
    }
    return true
  }

  const skip = () => {
    setForm({
      ...form,
      hourlyRate: '0',
      machineRate: '0',
      fuelRate: '0',
    })
    setStep((s) => s + 1)
  }

  return (
    <Container maxWidth="xs" sx={{ py: 3, pl: 4, pr: 4 }}>
      <Stack spacing={3} alignItems="center">
        <Image src="/software-engineer-rafiki.svg" alt="Timla logo" width={250} height={250} />



        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" mb={1}>{steps[step].title}</Typography>
          <Typography variant="body2" mb={3} color="text.secondary">
            {steps[step].description}
          </Typography>
          {step !== 0 && (


            <MobileStepper
              variant="dots"
              steps={steps.length - 1}
              position="static"
              activeStep={step - 1}
              sx={{ mt: 6, background: 'transparent', justifyContent: 'center' }}
              nextButton={null}
              backButton={null}
            />

          )}

        </Box>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ width: '100%' }}
          >
            {step === 1 && (
              <Stack spacing={2}>
                <TextField name="companyName" label="Firmanavn" fullWidth value={form.companyName} onChange={handleChange} autoFocus />
                <TextField name="organizationNumber" label="Organisasjonsnummer" fullWidth value={form.organizationNumber} onChange={handleChange} />
                <TextField name="industry" label="Bransje" fullWidth value={form.industry} onChange={handleChange} />
              </Stack>
            )}

            {step === 2 && (
              <Stack spacing={2}>
                <TextField name="name" label="Ditt navn" fullWidth value={form.name} onChange={handleChange} autoFocus />
                <TextField name="email" label="E-post" fullWidth value={form.email} onChange={handleChange} />
                <TextField name="password" label="Passord" fullWidth type="password" value={form.password} onChange={handleChange} />
              </Stack>
            )}
          </motion.div>
        </AnimatePresence>
        <Stack direction="row" spacing={2} sx={{ mt: 4, width: '100%' }}>
          {step > 0 && (
            <Button
              fullWidth
              variant="outlined"
              onClick={back}
            >
              Tilbake
            </Button>
          )}
          <Button
            fullWidth
            variant="contained"
            onClick={next}
            disabled={!isStepValid()}
          >
            {step === 0 ? 'Neste' : step === 2 ? 'Registrer' : 'Neste'}
          </Button>
        </Stack>
      </Stack>
    </Container>
  )
}
