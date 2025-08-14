'use client'

import { IconButton } from '@mui/material'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function BackButton() {
  const router = useRouter()

  return (
    <IconButton
      onClick={() => router.back()}
      sx={{
        position: 'absolute',
        top: 16,
        left: 16,
        zIndex: 10,
        '&:hover': {
          bgcolor: '#f0f0f0'
        }
      }}
    >
      <ArrowLeft />
    </IconButton>
  )
}
