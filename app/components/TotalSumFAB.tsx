// components/OfferTotalFAB.tsx
'use client'

import { Fab, useTheme } from '@mui/material'
import { Box, Typography, IconButton, Paper } from '@mui/material'
import { StickyNote, ArrowLeft, ArrowRight, NotebookText, PackagePlus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useOffer } from '../offers/hooks/useOffer'
import { apiPost } from '../lib/api'

interface Props {
  onOpenItems: () => void
  onOpenNotes: () => void
  total?: number
}

export default function OfferFAB({ onOpenItems, onOpenNotes, total }: Props) {
  const theme = useTheme();

  return (
    <Fab
      variant="extended"
      sx={{
        position: 'fixed',
        bottom: { xs: 16, sm: 24 },
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        boxShadow: 0,
        backgroundColor: 'primary.main',
        color: 'primary.contrastText',
        fontWeight: 600,
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 4,
        width: '90%',
        borderRadius: 2
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Box display={'flex'} flexDirection={'column'}>
          <Typography fontWeight={400} fontSize={16}>
            {total && `${total} kr`}
          </Typography>

        </Box>
        {/* Left: Total */}


        <Box>
          <IconButton onClick={onOpenNotes}>
            <NotebookText size={24} color={theme.palette.primary.contrastText} strokeWidth={2} />
          </IconButton>
          <IconButton onClick={onOpenItems}>
            <PackagePlus size={24} color={theme.palette.primary.contrastText} strokeWidth={2} />
          </IconButton>
        </Box>

      </Box>
    </Fab>
  )
}


