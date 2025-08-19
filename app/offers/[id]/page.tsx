'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  Box,
  Typography,
  Chip,
  Button,
  Grid,
  useTheme,
  Paper
} from '@mui/material'
import { useOffer } from '../hooks/useOffer'
import { ClipboardList, FileText, Trash2, Info, Download, RefreshCw } from 'lucide-react'
import LoadingScreen from '../../components/LoadingScreen'
import ActionCard from '../components/ActionCard'
import HeaderCard from '../components/HeaderCard'
import DownloadPDFDrawer from './components/DownloadPDFDrawer'
import UpdateStatusDrawer from './components/UpdateStatusDrawer'
import DeleteOfferDrawer from './components/DeleteOfferDrawer'
import OfferDetailsDrawer from './components/OfferDetailsDrawer'

export default function OfferDetailsPage() {
  const { id } = useParams()
  const router = useRouter()
  const theme = useTheme()
  const { offer, loading, error, refetch } = useOffer(id as string)

  // Drawer states
  const [downloadDrawerOpen, setDownloadDrawerOpen] = useState(false)
  const [statusDrawerOpen, setStatusDrawerOpen] = useState(false)
  const [deleteDrawerOpen, setDeleteDrawerOpen] = useState(false)
  const [detailsDrawerOpen, setDetailsDrawerOpen] = useState(false)

  const handleStatusUpdate = (newStatus: string) => {
    // Update local offer data or refetch
    refetch()
  }

  const handleOfferDelete = () => {
    // Navigate back to dashboard after successful deletion
    router.push('/dashboard')
  }

  if (loading) return <LoadingScreen />

  if (error || !offer) {
    return (
      <Box p={3} textAlign="center">
        <Typography variant="h6" color="error">
          Tilbudet ble ikke funnet
        </Typography>
        <Button variant="contained" onClick={() => router.push('/dashboard')}>
          Gå til dashboard
        </Button>
      </Box>
    )
  }

  return (
    <Box>
      {/* Header section */}
      <HeaderCard />

      {/* CTA buttons */}
      <Box mt={3} mb={3} display="flex" flexDirection="column" gap={2}>
        <ActionCard
          icon={<ClipboardList size={24} />}
          title={offer.items.length > 0 ? 'Fortsett befaring' : 'Start befaring'}
          description=""
          color="#3498db"
          onClick={() => router.push(`/offers/${offer.id}/items`)}
        />
        <ActionCard
          icon={<FileText size={24} />}
          title="Vis estimert tilbud"
          description=""
          color="#2979ff"
          onClick={() => router.push(`/offers/${offer.id}/summary`)}
        />
      </Box>
      {/* Secondary task actions */}
      <Box pb={4}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              display="flex"
              alignItems="center"
              gap={2}
              sx={{
                cursor: 'pointer',
                px: 2,
                borderRadius: 2,
                '&:hover': { background: '#f5f7fa' },
              }}
              onClick={() => setDownloadDrawerOpen(true)}
            >
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: theme => theme.palette.primary.light, // bakgrunn på ikon-boksen
                }}
              >
                <Download size={20} color={theme.palette.primary.dark} /> {/* hvitt ikon */}
              </Box>
              <Typography fontWeight={500}>Last ned PDF</Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box
              display="flex"
              alignItems="center"
              gap={2}
              sx={{
                cursor: 'pointer',
                px: 2,
                borderRadius: 2,
                '&:hover': { background: '#f5f7fa' },
              }}
              onClick={() => setStatusDrawerOpen(true)}
            >
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: theme => theme.palette.primary.light,
                }}
              >
                <RefreshCw size={20} color={theme.palette.primary.dark} />
              </Box>
              <Typography fontWeight={500}>Oppdater tilbudets status</Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box
              display="flex"
              alignItems="center"
              gap={2}
              sx={{
                cursor: 'pointer',
                px: 2,
                borderRadius: 2,
                '&:hover': { background: '#f5f7fa' },
              }}
              onClick={() => setDeleteDrawerOpen(true)}
            >
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: theme => theme.palette.primary.light,
                }}
              >
                <Trash2 size={20} color={theme.palette.primary.dark} />
              </Box>
              <Typography fontWeight={500}>Slett tilbud</Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box
              display="flex"
              alignItems="center"
              gap={2}
              sx={{
                cursor: 'pointer',
                px: 2,
                borderRadius: 2,
                '&:hover': { background: '#f5f7fa' },
              }}
              onClick={() => setDetailsDrawerOpen(true)}
            >
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: theme => theme.palette.primary.light,
                }}
              >
                <Info size={20} color={theme.palette.primary.dark} />
              </Box>
              <Typography fontWeight={500}>Vis detaljer om tilbud</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Drawers */}
      <DownloadPDFDrawer
        open={downloadDrawerOpen}
        onClose={() => setDownloadDrawerOpen(false)}
        offer={offer}
      />

      <UpdateStatusDrawer
        open={statusDrawerOpen}
        onClose={() => setStatusDrawerOpen(false)}
        offer={offer}
        onStatusUpdate={handleStatusUpdate}
      />

      <DeleteOfferDrawer
        open={deleteDrawerOpen}
        onClose={() => setDeleteDrawerOpen(false)}
        offer={offer}
        onDelete={handleOfferDelete}
      />

      <OfferDetailsDrawer
        open={detailsDrawerOpen}
        onClose={() => setDetailsDrawerOpen(false)}
        offer={offer}
      />
    </Box>
  )
}

// 🧱 Reusable task button
function ActionIcon({ label, icon, onClick }: { label: string, icon: React.ReactNode, onClick: () => void }) {
  return (
    <Grid item xs={6}>
      <Paper
        onClick={onClick}
        elevation={1}
        sx={{
          borderRadius: 2,
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
          cursor: 'pointer',
        }}
      >
        {icon}
        <Typography variant="caption" align="center">
          {label}
        </Typography>
      </Paper>
    </Grid>
  )
}
