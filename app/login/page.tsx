// /app/(auth)/login/page.tsx
'use client'

import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Paper,
  MenuItem,
  Link as MuiLink,
  CircularProgress,
} from '@mui/material'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { apiPost } from '../lib/api'
import { useAppContext } from '../lib/AppContext'
import { useLogin } from './hooks/useLogin'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [companies, setCompanies] = useState<{ companyId: number, companyName: string }[]>([])
  const [selectedCompany, setSelectedCompany] = useState<number | null>(null)
  const [password, setPassword] = useState('')
  const [step, setStep] = useState(1)
  const [error, setError] = useState('')
  const { refreshUser } = useAppContext()
  const { login, loginWithCompany } = useLogin();

  const handleLogin = async () => {
    setError('')
    login.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          if (data?.requiresCompanySelection) {
            setCompanies(data.companies)
            setStep(2)
          } else {
            router.push('/dashboard')
          }
        },
        onError: () => {
          setError('Feil e-post, passord eller firma')
        },
      }
    )
  }

  const handleCompanyLogin = () => {
    if (!selectedCompany) return

    setError('')
    loginWithCompany.mutate(
      { email, password, companyId: selectedCompany },
      {
        onSuccess: () => router.push('/dashboard'),
        onError: () => setError('Feil ved innlogging'),
      }
    )
  }

  const checkEmail = async () => {
    try {
      const res = await apiPost('/api/auth/email-check', { email })
      if (Array.isArray(res)) {
        setCompanies(res)
        setStep(2)
      } else {
        setSelectedCompany(res.companyId)
        setStep(3)
      }
    } catch (err) {
      setError('Fant ingen bruker med den e-posten')
    }
  }

  const handleLogin2 = async () => {
    if (!selectedCompany) return
    try {
      const res = await apiPost('/api/auth/login', {
        email,
        password,
        companyId: selectedCompany
      })
      localStorage.setItem('token', res.token)
      await refreshUser()

      router.push('/dashboard')
    } catch (err) {
      setError('Feil e-post, passord eller firma')
    }
  }
  const inputStyles = {
    InputLabelProps: { style: { background: '#fff' } },
    InputProps: { style: { background: '#fff' } },
  }

  return (
    <Box
      sx={{
        minHeight: '90dvh',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'column',
        px: 3,
      }}
    >
      <Stack spacing={2} alignItems="center" width="100%" >
        <Box textAlign="center" pb={6}>
          <Image src="/timla_logo_blue.svg" alt="Timla logo" width={50} height={50} />
          <Typography variant="h5" fontWeight={600} mt={1}>Velkommen</Typography>
          <Typography variant="body2">
            Logg inn for å fortsette
          </Typography>
        </Box>


        {step === 1 && (
          <>
            <TextField
              label="E-post"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              {...inputStyles}
            />
            <TextField
              label="Passord"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              {...inputStyles}

            />
            <MuiLink component={Link} href="/auth/register" sx={{ display: 'flex', alignSelf: 'end', fontSize: '12px' }} color={'primary'}>
              Glemt passord?
            </MuiLink>
            <Button
              variant="contained"
              fullWidth
              onClick={handleLogin}
              disabled={login.isPending}
            >
              {login.isPending ? <CircularProgress size={20} color="inherit" /> : 'Logg inn'}
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <TextField
              select
              label="Velg firma"
              fullWidth
              value={selectedCompany || ''}
              onChange={(e) => setSelectedCompany(Number(e.target.value))}
              {...inputStyles}

            >
              {companies.map((company) => (
                <MenuItem key={company.companyId} value={company.companyId}>
                  {company.companyName}
                </MenuItem>
              ))}
            </TextField>
            <Button
              variant="contained"
              fullWidth
              onClick={handleCompanyLogin}
              disabled={loginWithCompany.isPending || !selectedCompany}
            >
              {loginWithCompany.isPending ? <CircularProgress size={20} color="inherit" /> : 'Fortsett'}
            </Button>
          </>
        )}

        {step === 3 && (
          <>

            <Button
              variant="contained"
              fullWidth
              onClick={handleLogin}
              sx={{
                bgcolor: 'white',
                color: '#2C3E50',
                fontWeight: 600,
                borderRadius: 8,
                '&:hover': {
                  bgcolor: '#f0f0f0',
                }
              }}
            >
              Logg inn
            </Button>
          </>
        )}

        {error && <Typography color="error">{error}</Typography>}


      </Stack>
      <Typography textAlign="center" variant="body2">
        Ny hos Timla?{' '}
        <MuiLink component={Link} href="/auth/register" fontWeight={600}>
          Opprett konto
        </MuiLink>
      </Typography>
    </Box>
  )
}
