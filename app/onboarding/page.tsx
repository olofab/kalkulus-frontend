'use client'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import axios from 'axios'
import { apiPut } from '../lib/api'

export default function OnboardingPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    hourlyRate: '',
    fuelRate: '',
    machineRate: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    await apiPut('/api/company/configure', form)
    router.push('/dashboard')
  }

  return (
    <Box p={4}>
      <Typography variant="h5" mb={2}>Konfigurer firma</Typography>
      <Stack spacing={2}>
        <TextField label="Timesats" name="hourlyRate" fullWidth onChange={handleChange} />
        <TextField label="Maskinleie (per time)" name="machineRate" fullWidth onChange={handleChange} />
        <TextField label="Drivstoffsats (per time)" name="fuelRate" fullWidth onChange={handleChange} />
        <Button variant="contained" onClick={handleSubmit}>Fullfør onboarding</Button>
      </Stack>
    </Box>
  )
}