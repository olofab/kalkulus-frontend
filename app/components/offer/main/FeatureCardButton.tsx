'use client'

import { Box, Typography, IconButton, Paper } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

type Props = {
  icon: React.ReactNode
  title: string
  description?: string
  onClick: () => void
  iconBg?: string
}

export default function FeatureCardButton({ icon, title, description, onClick, iconBg = '#FEE2E2' }: Props) {
  return (
    <Paper
      onClick={onClick}
      elevation={0}
      sx={{
        borderRadius: 2,
        px: 2,
        py: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        backgroundColor: '#fff',
        border: '1px solid #ddd'
      }}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <Box
          sx={{
            backgroundColor: iconBg,
            width: 40,
            height: 40,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </Box>
        <Box>
          <Typography fontWeight={600}>{title}</Typography>
          {description && (
            <Typography fontSize={13} color="text.secondary">
              {description}
            </Typography>
          )}
        </Box>
      </Box>

      <IconButton size="small" disableRipple>
        <ChevronRightIcon />
      </IconButton>
    </Paper>
  )
}
