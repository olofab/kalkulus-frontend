'use client'

import { Box, Typography, Divider, Stack, Button, Paper, Drawer, TextField, IconButton, Alert } from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { useOffer } from '../../hooks/useOffer'
import { useOfferItems } from '../../hooks/useOfferItems'
import { FileText, Send, X } from 'lucide-react'
import { useState } from 'react'
import { apiPut } from '../../../lib/api'
import Image from 'next/image'
import { OfferStatus } from '../../../types/offer' // Import the enum
import { useState, useEffect } from 'react'
import { apiPut } from '../../../lib/api'
import Image from 'next/image'

// Row skal være utenfor OfferSummaryPage
function Row({ label, value, bold = false }: { label: string; value: string | number; bold?: boolean }) {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Typography color="text.secondary">{label}</Typography>
      <Typography fontWeight={bold ? 700 : 400}>{value}</Typography>
    </Stack>
  )
}

export default function OfferSummaryPage() {
  const [sendDrawerOpen, setSendDrawerOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [confirmDrawerOpen, setConfirmDrawerOpen] = useState(false)
  const [sending, setSending] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const { id } = useParams()
  const offerId = Array.isArray(id) ? id[0] : id
  const { offer } = useOffer(offerId)
  const { data: items = [] } = useOfferItems(offerId)

  // Calculate VAT and total including VAT
  const vatAmount = offer ? Math.round(offer.totalSum * 0.25) : 0
  const totalInclVat = offer ? offer.totalSum + vatAmount : 0

  return (
    <>
      <Box
        minHeight="100vh"
        sx={{
          bgcolor: theme => theme.palette.background.default,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 2,
        }}
      >
        <Paper
          elevation={2}
          sx={{
            borderRadius: 2,
            maxWidth: 400,
            width: '100%',
            p: { xs: 2, sm: 4 },
            mb: 3,
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
            background: theme => theme.palette.background.paper,
          }}
        >
          {/* Icon and Title */}
          <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
            <Box>
              <Image src="/icons/receipt.png" alt="Kvittering" width={60} height={60} />
            </Box>
            <Typography variant="h5" fontWeight={700} mb={0.5}>
              Estimert Tilbud
            </Typography>
          </Box>
          {/* Customer Info */}
          <Box mb={2}>
            <Typography variant="subtitle2" fontWeight={600} color="text.secondary">
              Kunde
            </Typography>
            <Typography fontWeight={500}>{offer.customer}</Typography>
            <Typography variant="body2" color="text.secondary">{offer.email}</Typography>
          </Box>
          {/* Items Table */}
          <Typography fontWeight={600} mb={1}>
            Varer
          </Typography>
          <Box
            sx={{
              background: '#f7f7f7',
              borderRadius: 1,
              p: 2,
              mb: 2,
            }}
          >

            <Stack spacing={1}>
              {items.map((item) => (
                <Box key={item.id} display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography fontWeight={500}>{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.quantity} stk x {item.unitPrice.toLocaleString('no-NO')} kr
                    </Typography>
                  </Box>
                  <Typography fontWeight={500}>
                    {(item.quantity * item.unitPrice).toLocaleString('no-NO')} kr
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>
          {/* Totals */}
          <Box mb={2}>
            <Stack spacing={0.5}>
              <Row label="Antall varer" value={items.length} />
              <Row label="Total (eks. mva)" value={`${offer.totalSum.toLocaleString('no-NO')} kr`} />
              <Row label="MVA (25%)" value={`${vatAmount.toLocaleString('no-NO')} kr`} />
              <Divider sx={{ my: 1 }} />
              <Row
                label="Totalpris inkl. MVA"
                value={`${totalInclVat.toLocaleString('no-NO')} kr`}
                bold
              />
            </Stack>
          </Box>
          {/* Action buttons */}
          <Stack spacing={2} mt={3}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<FileText size={20} />}
              sx={{
                borderRadius: 1,
                textTransform: 'none',
                fontWeight: 600,
                fontSize: 16,
                py: 1.2,
                bgcolor: '#fff',
              }}
              onClick={() => console.log('Last ned PDF')}
            >
              Last ned estimat
            </Button>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              startIcon={<Send size={20} />}
              sx={{
                borderRadius: 1,
                textTransform: 'none',
                fontWeight: 600,
                fontSize: 16,
                py: 1.2,
              }}
              onClick={() => setSendDrawerOpen(true)}
            >
              Send på e-post
            </Button>
            {/* Drawer for sending offer as PDF via email */}
            <Drawer
              anchor="bottom"
              open={sendDrawerOpen}
              onClose={() => { setSendDrawerOpen(false); setErrorMsg(''); }}
              PaperProps={{ sx: { borderTopLeftRadius: 16, borderTopRightRadius: 16, p: 3, minHeight: 220 } }}
            >
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                <Typography variant="h6">Send tilbud på e-post</Typography>
                <IconButton onClick={() => setSendDrawerOpen(false)}><X /></IconButton>
              </Box>
              <Typography mb={2}>
                {offer.email
                  ? 'E-posten nedenfor vil motta tilbudet som PDF. Du kan endre e-postadressen om ønskelig.'
                  : 'Skriv inn e-postadressen til kunden for å sende tilbudet som PDF.'}
              </Typography>
              <TextField
                label="E-post"
                value={email}
                onChange={e => setEmail(e.target.value)}
                fullWidth
                type="email"
                sx={{ mb: 2 }}
              />
              {errorMsg && (
                <Alert
                  severity="error"
                  variant="filled"
                  sx={{
                    mb: 2,
                    border: 'none',
                    boxShadow: 'none',
                    bgcolor: theme => theme.palette.error.light,
                    color: theme => theme.palette.error.contrastText,
                    fontWeight: 500,
                    borderRadius: 2,
                    alignItems: 'center',
                    px: 2,
                    py: 1.2,
                  }}
                >
                  {errorMsg}
                </Alert>
              )}
              <Button
                variant="contained"
                color="info"
                fullWidth
                disabled={!email || sending}
                onClick={() => {
                  setSendDrawerOpen(false);
                  setConfirmDrawerOpen(true);
                }}
              >
                Neste
              </Button>
            </Drawer>
            {/* Confirmation drawer */}
            <Drawer
              anchor="bottom"
              open={confirmDrawerOpen}
              onClose={() => { setConfirmDrawerOpen(false); setErrorMsg(''); }}
              PaperProps={{ sx: { borderTopLeftRadius: 16, borderTopRightRadius: 16, p: 3, minHeight: 220 } }}
            >
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                <Typography variant="h6">Bekreft utsending</Typography>
                <IconButton onClick={() => setConfirmDrawerOpen(false)}><X /></IconButton>
              </Box>
              <Typography mb={2}>
                Er du sikker på at du vil sende tilbudet som PDF til denne e-posten?
              </Typography>
              <TextField
                label="E-post"
                value={email}
                onChange={e => setEmail(e.target.value)}
                fullWidth
                type="email"
                sx={{ mb: 2 }}
              />
              {errorMsg && (
                <Alert
                  severity="error"
                  variant="filled"
                  sx={{
                    mb: 2,
                    border: 'none',
                    boxShadow: 'none',
                    bgcolor: theme => theme.palette.error.light,
                    color: theme => theme.palette.error.contrastText,
                    fontWeight: 500,
                    borderRadius: 2,
                    alignItems: 'center',
                    px: 2,
                    py: 1.2,
                  }}
                >
                  {errorMsg}
                </Alert>
              )}
              <Button
                variant="contained"
                color="info"
                fullWidth
                disabled={!email || sending}
                onClick={async () => {
                  setSending(true);
                  setErrorMsg('');
                  try {
                    // TODO: Sett inn riktig domene/endpoint for e-postutsending
                    await apiPut(`/api/offers/${id}/send-pdf`, { email });
                    await apiPut(`/api/offers/${id}/status`, { status: 'PENDING' }); // Use valid enum value
                    setSuccess(true);
                    setConfirmDrawerOpen(false);
                  } catch (err: any) {
                    setErrorMsg('Kunne ikke sende e-post. Prøv igjen.');
                  } finally {
                    setSending(false);
                  }
                }}
              >
                Send tilbud
              </Button>
            </Drawer>
          </Stack>
        </Paper>
        <Button
          variant="text"
          fullWidth
          sx={{
            maxWidth: 400,
            mt: 1,
            color: 'text.primary',
            fontWeight: 600,
            fontSize: 16,
            borderRadius: 2,
            bgcolor: '#fff',
            py: 1.2,
          }}
          onClick={() => router.back()}
        >
          Tilbake til oversikt
        </Button>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ maxWidth: 400, mt: 2 }}
        >
          Dette er et estimat og endringer kan forekomme. Dette er ikke en bindende sum fra selger.
        </Typography>
      </Box>
      {/* Success drawer (bare én gang, her) */}
      <Drawer
        anchor="bottom"
        open={success}
        onClose={() => setSuccess(false)}
        PaperProps={{ sx: { borderTopLeftRadius: 16, borderTopRightRadius: 16, p: 3, minHeight: 260, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' } }}
      >
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width="100%">
          <Image src="/success.gif" alt="Suksess" width={120} height={120} style={{ marginBottom: 16 }} />
          <Typography variant="h6" fontWeight={700} mb={1} align="center">
            Tilbud sendt!
          </Typography>
          <Typography color="text.secondary" align="center" mb={2}>
            Tilbudet ble sendt til {email}.
          </Typography>
          <Button
            variant="contained"
            color="info"
            fullWidth
            sx={{ borderRadius: 2, fontWeight: 600, fontSize: 16, py: 1.2, mt: 1 }}
            onClick={() => setSuccess(false)}
          >
            Lukk
          </Button>
        </Box>
      </Drawer>
    </>
  )
}
