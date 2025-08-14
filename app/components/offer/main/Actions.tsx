'use client'

import { Box, Stack, Typography, IconButton } from '@mui/material'
import ChangeCircleRoundedIcon from '@mui/icons-material/ChangeCircleRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded'

export default function OfferActions({
  onChangeStatus,
  onDelete,
  onDownloadPDF
}: {
  onChangeStatus: () => void
  onDelete: () => void
  onDownloadPDF: () => void
}) {
  const buttons = [
    {
      label: 'Endre status',
      icon: <ChangeCircleRoundedIcon />,
      color: '#2196f3', // Blue
      onClick: onChangeStatus
    },
    {
      label: 'Slett',
      icon: <DeleteRoundedIcon />,
      color: '#f44336', // Red
      onClick: onDelete
    },
    {
      label: 'Last ned PDF',
      icon: <PictureAsPdfRoundedIcon />,
      color: '#673ab7', // Purple
      onClick: onDownloadPDF
    }
  ]

  return (
    <Stack direction="row" spacing={3} justifyContent="center" sx={{ my: 2 }}>
      {buttons.map((btn) => (
        <Box key={btn.label} textAlign="center">
          <IconButton
            onClick={btn.onClick}
            sx={{
              backgroundColor: btn.color,
              color: '#fff',
              width: 64,
              height: 64,
              '&:hover': {
                backgroundColor: btn.color
              }
            }}
          >
            {btn.icon}
          </IconButton>
          <Typography variant="body2" mt={1}>
            {btn.label}
          </Typography>
        </Box>
      ))}
    </Stack>
  )
}
