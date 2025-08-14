'use client'

import { useState } from 'react'
import {
  Drawer,
  Box,
  Typography,
  Button,
  Divider,
  Chip,
  Grid
} from '@mui/material'
import { Info, Calendar, User, CreditCard, Package, MapPin } from 'lucide-react'
import { Offer } from '../../../types/offer'

interface OfferDetailsDrawerProps {
  open: boolean
  onClose: () => void
  offer: Offer
}

export default function OfferDetailsDrawer({ open, onClose, offer }: OfferDetailsDrawerProps) {
  const totalValue = offer.items?.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0) || 0
  const totalItems = offer.items?.reduce((sum, item) => sum + item.quantity, 0) || 0

  const getStatusColor = (status: string) => {
    switch (status?.toUpperCase()) {
      case 'DRAFT': return 'default'
      case 'PENDING': return 'warning'
      case 'ACCEPTED': return 'success'
      case 'REJECTED': return 'error'
      case 'EXPIRED': return 'secondary'
      case 'COMPLETED': return 'primary'
      default: return 'default'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status?.toUpperCase()) {
      case 'DRAFT': return 'Utkast'
      case 'PENDING': return 'Venter på svar'
      case 'ACCEPTED': return 'Akseptert'
      case 'REJECTED': return 'Avvist'
      case 'EXPIRED': return 'Utløpt'
      case 'COMPLETED': return 'Fullført'
      default: return 'Ukjent'
    }
  }

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          p: 3,
          maxHeight: '90vh',
          overflowY: 'auto'
        }
      }}
    >
      <Box display="flex" flexDirection="column" gap={3}>
        {/* Header */}
        <Box display="flex" alignItems="center" gap={2}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              bgcolor: 'primary.light',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Info size={24} color="primary.main" />
          </Box>
          <Box flex={1}>
            <Typography variant="h6">Tilbudsdetaljer</Typography>
            <Typography variant="body2" color="text.secondary">
              Tilbud #{offer.id}
            </Typography>
          </Box>
          <Chip
            label={getStatusLabel(offer.status || 'DRAFT')}
            color={getStatusColor(offer.status || 'DRAFT') as any}
            size="small"
          />
        </Box>

        <Divider />

        {/* Basic Information */}
        <Box>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <User size={20} />
            Kundeinformasjon
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Kunde:
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {offer.customer || 'Ikke spesifisert'}
                </Typography>
              </Box>
            </Grid>

            {offer.email && (
              <Grid item xs={12}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    E-post:
                  </Typography>
                  <Typography variant="body1">
                    {offer.email}
                  </Typography>
                </Box>
              </Grid>
            )}

            {offer.phone && (
              <Grid item xs={12}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Telefon:
                  </Typography>
                  <Typography variant="body1">
                    {offer.phone}
                  </Typography>
                </Box>
              </Grid>
            )}

            {offer.address && (
              <Grid item xs={12}>
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <MapPin size={16} />
                    Adresse:
                  </Typography>
                  <Typography variant="body1">
                    {offer.address}
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>

        <Divider />

        {/* Offer Details */}
        <Box>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Calendar size={20} />
            Tilbudsdetaljer
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Opprettet:
                </Typography>
                <Typography variant="body1">
                  {new Date(offer.createdAt).toLocaleDateString('no-NO', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Sist oppdatert:
                </Typography>
                <Typography variant="body1">
                  {new Date(offer.updatedAt).toLocaleDateString('no-NO', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </Typography>
              </Box>
            </Grid>

            {offer.validUntil && (
              <Grid item xs={12}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Gyldig til:
                  </Typography>
                  <Typography variant="body1">
                    {new Date(offer.validUntil).toLocaleDateString('no-NO', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>

        <Divider />

        {/* Items Summary */}
        <Box>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Package size={20} />
            Varesammendrag
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Antall varelinjer:
                </Typography>
                <Typography variant="h6" color="primary">
                  {offer.items?.length || 0}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Totalt antall:
                </Typography>
                <Typography variant="h6" color="primary">
                  {totalItems} stk
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* Items List */}
          {offer.items && offer.items.length > 0 && (
            <Box mt={2}>
              <Typography variant="body2" color="text.secondary" mb={1}>
                Varer:
              </Typography>
              <Box display="flex" flexDirection="column" gap={1}>
                {offer.items.slice(0, 5).map((item, index) => (
                  <Box
                    key={index}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                      bgcolor: 'grey.50',
                      borderRadius: 1,
                      p: 1.5
                    }}
                  >
                    <Box>
                      <Typography variant="body2" fontWeight={500}>
                        {item.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {item.quantity} stk × {item.unitPrice.toLocaleString('no-NO')} kr
                      </Typography>
                    </Box>
                    <Typography variant="body2" fontWeight={600}>
                      {(item.quantity * item.unitPrice).toLocaleString('no-NO')} kr
                    </Typography>
                  </Box>
                ))}
                {offer.items.length > 5 && (
                  <Typography variant="caption" color="text.secondary" textAlign="center">
                    ... og {offer.items.length - 5} flere varer
                  </Typography>
                )}
              </Box>
            </Box>
          )}
        </Box>

        <Divider />

        {/* Financial Summary */}
        <Box>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CreditCard size={20} />
            Økonomisk sammendrag
          </Typography>

          <Box
            sx={{
              bgcolor: 'primary.light',
              borderRadius: 2,
              p: 2
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="body1" color="primary.dark">
                Totalt ekskl. mva:
              </Typography>
              <Typography variant="h6" color="primary.dark" fontWeight={600}>
                {totalValue.toLocaleString('no-NO')} kr
              </Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
              <Typography variant="body2" color="primary.dark">
                Mva (25%):
              </Typography>
              <Typography variant="body2" color="primary.dark">
                {(totalValue * 0.25).toLocaleString('no-NO')} kr
              </Typography>
            </Box>

            <Divider sx={{ my: 1, borderColor: 'primary.dark' }} />

            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" color="primary.dark">
                Totalt inkl. mva:
              </Typography>
              <Typography variant="h5" color="primary.dark" fontWeight={700}>
                {(totalValue * 1.25).toLocaleString('no-NO')} kr
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Action */}
        <Box mt={2}>
          <Button
            variant="contained"
            fullWidth
            onClick={onClose}
            size="large"
          >
            Lukk detaljer
          </Button>
        </Box>
      </Box>
    </Drawer>
  )
}
