'use client'

import { Box, Button, TextField, Typography, Paper, Stack } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('isLoggedIn', 'true')
      router.push('/dashboard')
    } else {
      alert('Feil brukernavn eller passord')
    }
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100dvh"
      sx={{ backgroundColor: '#f5f5f5', px: 2, overflow: 'hidden' }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 400,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" mb={5}>
          <Image src="/logo_green.svg" alt="Timla logo" width={60} height={60} priority />
          <Typography variant="h4" fontWeight={600} sx={{ fontFamily: 'Funnel Display, sans-serif' }}>
            Timla
          </Typography>
        </Stack>

        <form onSubmit={handleLogin}>
          <Typography textAlign="center" mb={2}>
            Logg inn på din konto
          </Typography>
          <TextField
            label="Brukernavn"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ borderRadius: 0 }}
          />
          <TextField
            label="Passord"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, bgcolor: 'primary.main' }}
          >
            Logg inn
          </Button>
        </form>
      </Box>
    </Box>
  )
}
