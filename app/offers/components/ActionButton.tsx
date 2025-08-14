import { IconButton, Button, Tooltip, Typography, Box } from '@mui/material'
import React from 'react'

type ActionButtonProps = {
  icon: React.ReactNode
  tooltip?: string
  onClick?: () => void
  text?: string
  width?: number
  height?: number
  color?: string
  hoverColor?: string
}

export function ActionButton({
  icon,
  tooltip,
  onClick,
  width = 72,
  height = 72,
  color = '#F1F1F1',
  hoverColor = '#E0E0E0',
}: ActionButtonProps) {
  const btn = (
    <IconButton
      onClick={onClick}
      sx={{
        bgcolor: color,
        '&:hover': { bgcolor: hoverColor },
        width,
        height,
        borderRadius: 2,
      }}
    >
      {icon}
    </IconButton>
  )
  return tooltip ? <Tooltip title={tooltip}>{btn}</Tooltip> : btn
}

export function ActionButtonWithText({
  icon,
  text,
  onClick,
  width = 72,
  height = 72,
  color = '#F1F1F1',
  hoverColor = '#E0E0E0',
}: ActionButtonProps) {
  return (
    <Button
      onClick={onClick}
      startIcon={icon}
      sx={{
        bgcolor: color,
        '&:hover': { bgcolor: hoverColor },
        width: 'auto',
        minWidth: width,
        height,
        borderRadius: 2,
        fontWeight: 600,
        color: 'text.primary',
        textTransform: 'none',
        px: 2,
      }}
    >
      <Typography variant="body2">{text}</Typography>
    </Button>
  )
}

export function ActionButtonVertical({
  icon,
  text,
  onClick,
  color = '#F1F1F1',
  hoverColor = '#E0E0E0',
  tooltip,
}: {
  icon: React.ReactNode
  text: string
  onClick?: () => void
  color?: string
  hoverColor?: string
  tooltip?: string
}) {
  return (
    <Button
      onClick={onClick}
      sx={{
        bgcolor: color,
        '&:hover': { bgcolor: hoverColor },
        width: 72,
        minWidth: 72,
        height: 72,
        minHeight: 72,
        borderRadius: 2,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 1,
        gap: 0.5,
        boxSizing: 'border-box',
        textTransform: 'none',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 0.5 }}>
        {icon}
      </Box>
      <Typography
        variant="caption"
        sx={{
          textAlign: 'center',
          fontSize: 10,
          lineHeight: 1.2,
          maxWidth: 64,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'normal',
        }}
      >
        {text}
      </Typography>
    </Button>
  )
}