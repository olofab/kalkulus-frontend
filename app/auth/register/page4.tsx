'use client'
import { Box, Stack, Typography, TextField } from '@mui/material'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { apiPost, apiPublicPost } from '../../lib/api'
import axios from 'axios'
import { Button } from '../../design'

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
        <TextField label="Firmanavn" name="companyName" onChange={handleChange} variant="outlined" fullWidth />
        <TextField label="Ditt navn" name="name" onChange={handleChange} variant="outlined" fullWidth />
        <TextField label="Organisasjonsnummer" name="organizationNumber" onChange={handleChange} variant="outlined" fullWidth />
        <TextField label="E-post" name="email" onChange={handleChange} variant="outlined" fullWidth />
        <TextField label="Passord" name="password" type="password" onChange={handleChange} variant="outlined" fullWidth />
        <Button variant="primary" onClick={handleRegister}>Opprett firma</Button>
      </Stack>
    </Box>
  )
}