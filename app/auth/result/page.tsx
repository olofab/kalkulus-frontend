// /app/(auth)/register/result/page.tsx
'use client'

import {
  Box,
  Button,
  Container,
  Stack,
  Typography
} from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { CheckCircle, AlertCircle } from 'lucide-react'
import { useAppContext } from '../../lib/AppContext'

export default function RegisterResultPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const status = searchParams.get('status')
  const errorMessage = searchParams.get('error')
  const { refreshUser } = useAppContext()

  const isSuccess = status === 'success'


  const handleLogin = async () => {
    await refreshUser()
    router.push('/dashboard')
  }

  return (
    <Box
      height="80dvh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      px={2}
    >

      <Container maxWidth="xs" sx={{ py: 3, pl: 4, pr: 4 }}>
        <Stack spacing={3} alignItems="center">
          {isSuccess ? (
            <>
              <Image src="/icons/rocket.png" alt="Timla logo" width={90} height={90} />
              <Typography variant="h5" fontWeight={600}>Profilen er opprettet</Typography>
              <Typography variant="body2" textAlign={'center'} color="text.secondary">
                Din bedriftsprofil er opprettet. Du kan nå begynne å bruke Timla!
              </Typography>
              <Button variant="contained" onClick={handleLogin} fullWidth>
                Gå til dashboard
              </Button>
            </>
          ) : (
            <>
              <Image src="/icons/robot.png" alt="Timla logo" width={80} height={80} />
              <Typography variant="h5" fontWeight={600}>Noe gikk galt</Typography>
              <Typography variant="body2" color="text.secondary">
                Kunne ikke opprette profil. {errorMessage && <><br /><strong>Feilmelding:</strong> {errorMessage}</>}
              </Typography>
              <Button variant="outlined" onClick={() => router.push('/auth/register')} fullWidth>
                Gå tilbake til registrering
              </Button>
            </>
          )}
        </Stack>
      </Container>
    </Box>

  )
}
