'use client'

import { Box, CircularProgress, Stack, Typography } from '@mui/material'
import Image from 'next/image'

export default function LoadingScreen() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100dvh"
      bgcolor="#f5f5f5"
    >
      <Stack spacing={3} alignItems="center">
        <Image
          src="/logo_green.svg"
          alt="Timla Logo"
          width={60}
          height={60}
          priority
        />
        <Typography variant="h6" fontWeight={500} color="text.secondary">
          Laster inn...
        </Typography>
        <CircularProgress color="primary" />
      </Stack>
    </Box>
  )
}
