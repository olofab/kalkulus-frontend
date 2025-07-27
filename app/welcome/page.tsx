// /app/(auth)/welcome/page.tsx
'use client'

import { Box, Button, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function WelcomePage() {
  const router = useRouter()

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100dvh" px={2}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>

        <Stack spacing={4} alignItems="center" maxWidth={300}>
          <Image src="/timla_logo_blue.svg" width={60} height={60} alt="Timla logo" />
          <Typography variant="h4" fontWeight={600}>Velkommen til Timla</Typography>
          <Typography textAlign="center">
            Timla hjelper deg med å lage profesjonelle tilbud raskt og enkelt.
          </Typography>
          <Box display={'flex'} flexDirection={'column'} width={'100%'}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
              <Box display={'flex'} flexDirection={'column'} width={'100%'}>

                <Button variant="contained" onClick={() => router.push('/auth/register')}>Kom i gang</Button>
                <Button variant="text" onClick={() => router.push('/login')}>Allerede bruker? Logg inn her</Button>
              </Box >

            </motion.div>

          </Box>


        </Stack>
      </motion.div>

    </Box>
  )
}
