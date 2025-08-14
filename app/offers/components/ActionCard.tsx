import { Box, Typography, Paper, Button } from '@mui/material'

type ActionCardProps = {
  icon: React.ReactNode
  title: string
  description: string
  color: string
  onClick: () => void
}

export default function ActionCard({ icon, title, description, color, onClick }: ActionCardProps) {
  return (
    <Paper
      onClick={onClick}
      elevation={0}
      sx={{
        backgroundColor: 'background.paper',
        borderRadius: 2,
        p: 2,
        height: '100%',
        cursor: 'pointer',
        transition: '0.2s',
        '&:hover': {
          boxShadow: 1,
        },
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="center" mb={1}>
        <Box
          sx={{
            backgroundColor: color,
            color: 'white',
            borderRadius: '50%',
            p: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 36,
            height: 36,
          }}
        >
          {icon}
        </Box>
      </Box>
      <Typography variant="subtitle2" fontWeight={600} align="center">
        {title}
      </Typography>
    </Paper>
  )
}
