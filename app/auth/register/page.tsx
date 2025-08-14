// /app/(auth)/register/page.tsx
'use client'

import { Container, Stack } from '@mui/material'
import Image from 'next/image'
import ProfileChat from './components/Chat'

export default function RegisterPage() {
  return (
    <Container maxWidth="xs" sx={{ py: 3, pl: 4, pr: 4 }}>
      <ProfileChat />
    </Container>
  )
}
