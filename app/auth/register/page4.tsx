'use client'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { apiPost, apiPublicPost } from '../../lib/api'
import axios from 'axios'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    companyName: '',
    organizationNumber: '',
    email: '',
    password: '',
    industry: 'Ukjent',
    name: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleRegister = async () => {
    const res = await apiPublicPost('/api/auth/register-company', form) // ← IKKE bruk apiPost
    console.log(res)
    localStorage.setItem('token', res.token)
    router.push('/onboarding')
  }

  return (
    <Box p={4}>
      <Typography variant="h5" mb={2}>Opprett firma</Typography>
      <Stack spacing={2}>
        <TextField label="Firmanavn" name="companyName" fullWidth onChange={handleChange} />
        <TextField label="Ditt navn" name="name" fullWidth onChange={handleChange} />
        <TextField label="Organisasjonsnummer" name="organizationNumber" fullWidth onChange={handleChange} />
        <TextField label="E-post" name="email" fullWidth onChange={handleChange} />
        <TextField label="Passord" name="password" type="password" fullWidth onChange={handleChange} />
        <Button variant="contained" onClick={handleRegister}>Opprett firma</Button>
      </Stack>
    </Box>
  )
}