/**
 * Toast component for notifications with icons and auto-hide
 * Supports success, error, info, and warning variants
 */

import React from 'react'
import { Snackbar, SnackbarProps, Alert, AlertProps, Slide, SlideProps, alpha } from '@mui/material'
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
          borderRadius: 1, // 8px - same as soft buttons
          border: (theme) => {
            switch (severity) {
              case 'success':
                return `1px solid ${alpha(theme.palette.success.main, 0.2)}`
              case 'error':
                return `1px solid ${alpha(theme.palette.error.main, 0.2)}`
              case 'warning':
                return `1px solid ${alpha(theme.palette.warning.main, 0.2)}`
              case 'info':
              default:
                return `1px solid ${alpha(theme.palette.info.main, 0.2)}`
            }
          },
          boxShadow: 'none',
          // Soft button inspired background colors
          backgroundColor: (theme) => {
            switch (severity) {
              case 'success':
                return alpha(theme.palette.success.main, 0.08)
              case 'error':
                return alpha(theme.palette.error.main, 0.08)
              case 'warning':
                return alpha(theme.palette.warning.main, 0.08)
              case 'info':
              default:
                return alpha(theme.palette.info.main, 0.08)
            }
          },
          // Mørkere tekst farger for bedre lesbarhet
          color: (theme) => {
            switch (severity) {
              case 'success':
                return theme.palette.success.dark
              case 'error':
                return theme.palette.error.dark
              case 'warning':
                return theme.palette.warning.dark
              case 'info':
              default:
                return theme.palette.info.dark
            }
          },
          '& .MuiAlert-icon': {
            alignItems: 'center',
            color: (theme) => {
              switch (severity) {
                case 'success':
                  return theme.palette.success.dark
                case 'error':
                  return theme.palette.error.dark
                case 'warning':
                  return theme.palette.warning.dark
                case 'info':
                default:
                  return theme.palette.info.dark
              }
            },
          },
          '& .MuiAlert-message': {
            fontSize: '14px',
            fontWeight: 500,
          },
          '& .MuiAlert-action': {
            color: (theme) => {
              switch (severity) {
                case 'success':
                  return theme.palette.success.dark
                case 'error':
                  return theme.palette.error.dark
                case 'warning':
                  return theme.palette.warning.dark
                case 'info':
                default:
                  return theme.palette.info.dark
              }
            },
          },
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}
