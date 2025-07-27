'use client'

import { Box, Typography, Divider, Stack, Button } from '@mui/material'
import { useParams } from 'next/navigation'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import SendIcon from '@mui/icons-material/Send'
import { useOffer } from '../../hooks/useOffer'
import { useOfferItems } from '../../hooks/useOfferItems'

export default function OfferSummaryPage() {
  const { id } = useParams()
  const { offer, loading: offerLoading } = useOffer(id as string)
  const { data: items, isLoading: itemsLoading } = useOfferItems(id as string)

  if (offerLoading || itemsLoading || !offer || !items) {
    return <Typography>Laster...</Typography>
  }

  const vatAmount = offer.totalSum * 0.25
  const totalInclVat = offer.totalSum + vatAmount

  return (
    <Box px={2} py={4} maxWidth={420} mx="auto" borderRadius={4} boxShadow={3} bgcolor="#FAFBFC">
      <Stack spacing={1} alignItems="center" mb={3}>
        <Typography fontWeight={600} variant="h6">
          {offer.customer}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Tilbud #{offer.id}
        </Typography>
      </Stack>

      <Box mb={3}>
        <Typography variant="subtitle1" fontWeight={600} mb={1}>
          Varer
        </Typography>
        <Stack spacing={1}>
          {items.map((item) => (
            <Stack
              key={item.id}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography fontWeight={500}>{item.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.quantity} stk x {item.unitPrice} kr
                </Typography>
              </Box>
              <Typography>{item.quantity * item.unitPrice} kr</Typography>
            </Stack>
          ))}
        </Stack>
      </Box>

      <Stack spacing={1} mb={2}>
        <Row label="Antall varer" value={items.length} />
        <Row label="Total (eks. mva)" value={`${offer.totalSum.toFixed(2)} kr`} />
        <Row label="MVA (25%)" value={`${vatAmount.toFixed(2)} kr`} />
        <Divider sx={{ my: 1 }} />
        <Row
          label="Totalpris inkl. MVA"
          value={`${totalInclVat.toFixed(2)} kr`}
          bold
        />
      </Stack>

      <Divider sx={{ my: 3 }} />

      <Stack direction="row" spacing={2} justifyContent="center">
        <Button variant="outlined" startIcon={<PictureAsPdfIcon />}>
          Last ned PDF
        </Button>
        <Button variant="contained" startIcon={<SendIcon />}>
          Send e-post
        </Button>
      </Stack>
    </Box>
  )
}

function Row({ label, value, bold = false }: { label: string; value: string | number; bold?: boolean }) {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Typography color="text.secondary">{label}</Typography>
      <Typography fontWeight={bold ? 600 : 400}>{value}</Typography>
    </Stack>
  )
}
