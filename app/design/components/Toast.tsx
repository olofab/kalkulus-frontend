/**
 * Toast component for notifications with icons and auto-hide
 * Supports success, error, info, and warning variants
 */

import React from 'react'
import { Snackbar, SnackbarProps, Alert, AlertProps, Slide, SlideProps } from '@mui/material'
import { CheckCircle, XCircle, AlertTriangle, Info } from '../icons'

export interface ToastProps extends Omit<SnackbarProps, 'children'> {
  /** Toast severity */
  severity?: 'success' | 'error' | 'warning' | 'info'
  /** Toast message */
  message: string
  /** Show close button */
  showCloseButton?: boolean
  /** Auto hide duration in milliseconds */
  autoHideDuration?: number
}

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />
}

const severityIcons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
}

/**
 * Toast component for user notifications with icons and smooth animations
 */
export default function Toast({
  severity = 'info',
  message,
  showCloseButton = true,
  autoHideDuration = 3000,
  ...props
}: ToastProps) {
  const IconComponent = severityIcons[severity]

  return (
    <Snackbar
      autoHideDuration={autoHideDuration}
      TransitionComponent={SlideTransition}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      {...props}
    >
      <Alert
        severity={severity}
        icon={<IconComponent size={20} />}
        onClose={showCloseButton ? (event) => props.onClose?.(event, 'clickaway') : undefined}
        variant="filled"
        sx={{
          borderRadius: (theme) => theme.tokens.radius.lg,
          boxShadow: (theme) => theme.tokens.elevation[2],
          '& .MuiAlert-icon': {
            alignItems: 'center',
          },
          '& .MuiAlert-message': {
            fontSize: '14px',
            fontWeight: 500,
          },
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}
