'use client'

import { 
  Box, 
  Typography, 
  Drawer, 
  TextField, 
  IconButton, 
  Alert,
  Stack,
  Button as MuiButton,
  CircularProgress,
  alpha
} from '@mui/material'
import { X } from 'lucide-react'
import { useState, useEffect } from 'react'
import Button from '../../design/components/Button'
import { useSendOfferEmail } from '../hooks/useSendOfferEmail'
import { isValidEmail } from '../../lib/validation'

interface SendOfferEmailDrawerProps {
  open: boolean
  onClose: () => void
  offerId: string
  defaultEmail?: string
  onSuccess: (message: string, emailSentTo: string) => void
}

export default function SendOfferEmailDrawer({
  open,
  onClose,
  offerId,
  defaultEmail = '',
  onSuccess
}: SendOfferEmailDrawerProps) {
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [showAdvanced, setShowAdvanced] = useState(false)

  // Initialize email with default value when drawer opens
  useEffect(() => {
    if (open) {
      setEmail(defaultEmail)
      setSubject('') // Reset other fields
      setMessage('')
      setShowAdvanced(false)
    }
  }, [open, defaultEmail])

  const { sendEmail, isLoading, error, clearError } = useSendOfferEmail(offerId, {
    onSuccess: (response) => {
      onSuccess(response.message, response.emailSentTo || email)
      onClose()
    }
  })

  const handleSend = async () => {
    try {
      await sendEmail({
        email,
        subject: subject || undefined,
        message: message || undefined
      })
    } catch (err) {
      // Error is already handled by the hook
    }
  }

  const handleClose = () => {
    clearError()
    onClose()
  }

  const isEmailValid = isValidEmail(email)
  const canSend = isEmailValid && !isLoading

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={handleClose}
      PaperProps={{ 
        sx: { 
          borderTopLeftRadius: 16, 
          borderTopRightRadius: 16, 
          p: 3, 
          minHeight: 280,
          maxHeight: '90vh'
        } 
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h6">Send tilbud på e-post</Typography>
        <IconButton onClick={handleClose}>
          <X />
        </IconButton>
      </Box>

      <Typography mb={2} color="text.secondary">
        {defaultEmail
          ? 'E-posten nedenfor vil motta tilbudet som PDF. Du kan endre e-postadressen om ønskelig.'
          : 'Skriv inn e-postadressen til kunden for å sende tilbudet som PDF.'}
      </Typography>

      <Stack spacing={2}>
        <TextField
          label="E-postadresse *"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          type="email"
          error={email.length > 0 && !isEmailValid}
          helperText={email.length > 0 && !isEmailValid ? 'Ugyldig e-postadresse' : ''}
          disabled={isLoading}
        />

        {!showAdvanced && (
          <Button 
            variant="secondary" 
            onClick={() => setShowAdvanced(true)}
            disabled={isLoading}
          >
            Legg til emne og melding (valgfritt)
          </Button>
        )}

        {showAdvanced && (
          <>
            <TextField
              label="Emne (valgfritt)"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              fullWidth
              disabled={isLoading}
              placeholder="Tilbud fra Timla"
            />

            <TextField
              label="Melding (valgfritt)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              fullWidth
              multiline
              rows={3}
              disabled={isLoading}
              placeholder="Hei! Her er tilbudet som forespurt..."
            />

            <Button 
              variant="secondary" 
              onClick={() => setShowAdvanced(false)}
              disabled={isLoading}
            >
              Skjul tillegsalternativer
            </Button>
          </>
        )}

        {error && (
          <Alert
            severity="error"
            variant="filled"
            sx={{
              backgroundColor: theme => alpha(theme.palette.error.main, 0.08),
              color: theme => theme.palette.error.dark, // Mørkere tekst
              border: theme => `1px solid ${alpha(theme.palette.error.main, 0.2)}`, // Subtil border
              boxShadow: 'none',
              fontWeight: 500,
              borderRadius: 1, // 8px - matches design system
              alignItems: 'center',
              px: 2,
              py: 1.2,
              '& .MuiAlert-icon': {
                color: theme => theme.palette.error.dark, // Mørkere ikon
              },
            }}
          >
            {error}
          </Alert>
        )}

        <Button
          variant="primary"
          fullWidth
          disabled={!canSend}
          onClick={handleSend}
          startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : undefined}
        >
          {isLoading ? 'Sender...' : 'Send tilbud'}
        </Button>
      </Stack>
    </Drawer>
  )
}
