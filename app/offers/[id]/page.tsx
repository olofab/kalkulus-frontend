// app/offers/[id]/page.tsx
'use client'

import { useParams, useRouter } from 'next/navigation'
import { Box, Button, Divider, Typography } from '@mui/material'
import { ClipboardList, FileText } from 'lucide-react'
import ActionList from '../../components/offer/main/ActionList'
import LoadingScreen from '../../components/LoadingScreen'
import FeatureCardButton from '../../components/offer/main/FeatureCardButton'
import Header from '../components/Header'
import { useOffer } from '../hooks/useOffer'


export default function OfferDetailsPage() {
  const { id } = useParams()
  const router = useRouter()

  const { offer, loading, error, refetch } = useOffer(id as string)

  if (loading) return <LoadingScreen />

  if (error || !offer) {
    return (
      <>
        <Header />
        <Box p={3} textAlign="center">
          <Typography variant="h6" color="error" gutterBottom>
            Tilbudet ble ikke funnet
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Enten finnes det ikke, eller du har ikke tilgang til dette tilbudet.
          </Typography>
          <Button variant="contained" onClick={() => router.push('/dashboard')}>
            Gå til dashboard
          </Button>
        </Box>
      </>
    )
  }

  return (
    <>
      <Header />
      <Box sx={{
        position: 'relative',
        m: 0.5,
        p: 2,
        background: '#fff',
        borderRadius: 1,
      }}>
        <Box sx={{ gap: 2, display: 'flex', flexDirection: 'column', pt: 2 }}>
          <FeatureCardButton
            icon={<ClipboardList size={24} color="#2C3E50" />}
            iconBg="#E6F2E6"
            title={offer.items.length > 0 ? 'Fortsett befaring' : 'Start befaring'}
            onClick={() => router.push(`/offers/${offer.id}/items`)}
          />
          <FeatureCardButton
            icon={<FileText size={24} color="#E67E22" />}
            iconBg="#FDEBDD"
            title="Vis estimert tilbud"
            onClick={() => router.push(`/offers/${offer.id}/items`)}
          />
          <Divider />
          <ActionList />
        </Box>
      </Box>
    </>
  )
}
