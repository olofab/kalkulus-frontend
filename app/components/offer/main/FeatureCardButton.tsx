import { Box, Button, Typography } from '@mui/material'
import { ReactNode } from 'react'

interface FeatureCardButtonProps {
  icon: ReactNode
  iconBg: string
  title: string
  onClick: () => void
}

export default function FeatureCardButton({
  icon,
  iconBg,
  title,
  onClick
}: FeatureCardButtonProps) {
  return (
    <Button
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 2,
        p: 2,
        textAlign: 'left',
        textTransform: 'none',
        backgroundColor: 'background.paper',
        color: 'text.primary',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        '&:hover': {
          backgroundColor: 'action.hover',
          borderColor: 'primary.main',
        }
      }}
    >
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: 1.5,
          backgroundColor: iconBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}
      >
        {icon}
      </Box>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        {title}
      </Typography>
    </Button>
  )
}
