import { useEffect, useState } from 'react'
import { Box, CircularProgress, Stack, Typography } from '@mui/material'
import Image from 'next/image'



export default function LoadingScreen() {



  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="80dvh"
    >
      <Image
        src="/loading.gif"
        alt="Laster..."
        width={80}
        height={80}
        priority
      />
    </Box>
  )
}