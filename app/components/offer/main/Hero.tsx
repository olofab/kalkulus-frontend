'use client'

import {
  Box,
  Typography,
  Paper,
  Chip
} from '@mui/material'
import TopHeader from '../../common/TopHeader'
import { Offer } from '../../../types/offer'
import { useEffect, useState } from 'react'
import { fetchOffer } from '../../../lib/api'
import { getStatusTitle, getStatusColor } from '../../OfferHeaderCard'

type HeroProps = {
  offerId: Offer['id'] | string | undefined
}

export default function OfferHero({ offerId }: HeroProps) {
  const [offer, setOffer] = useState<Offer | null>(null)

  useEffect(() => {
    if (!offerId) return

    const loadOffer = async () => {
      try {
        const res = await fetchOffer(Number(offerId))
        setOffer(res)
      } catch (err) {
        console.error('Failed to fetch offer:', err)
        setOffer(null)
      }
    }

    loadOffer()
  }, [offerId])

  // Render nothing if offer is not yet loaded or if offerId is missing
  if (!offerId || !offer) {
    return (
      <Paper
        sx={{
          background: 'background.default',
          px: 2,
          pb: 4,
          pt: 2,
          borderRadius: 0,
          color: '#014421',
        }}
        elevation={0}
      >
        <TopHeader />
        <Box textAlign="start" mt={2} p={2}>
          <Typography variant="h6" fontWeight={600}>
            Laster tilbud...
          </Typography>
        </Box>
      </Paper>
    )
  }

  return (
    <Paper
      sx={{
        //background: 'linear-gradient(to top, #ffffff, #D0D8C3 60%)',
        background: 'inherit',
        p: 1,
        borderRadius: 0,
        color: '#014421'
      }}
      elevation={0}
    >
      <TopHeader />

    </Paper>
  )
}
