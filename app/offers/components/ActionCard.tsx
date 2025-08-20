import { Box, Typography, useTheme, Chip } from '@mui/material'
import Card from '../../design/components/Card'

type ActionCardProps = {
  icon: React.ReactNode
  title: string
  description: string
  color: string
  onClick: () => void
  itemCount?: number
  subtitle?: string
}

export default function ActionCard({
  icon,
  title,
  description,
  color,
  onClick,
  itemCount,
  subtitle
}: ActionCardProps) {
  const theme = useTheme();

  return (
    <Card
      onClick={onClick}
      padding="lg"
      sx={{
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-3px)',
        },
      }}
    >
      <Box display="flex" alignItems="center" gap={3}>
        {/* Icon */}
        <Box
          sx={{
            backgroundColor: color,
            color: 'white',
            borderRadius: 999,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          }}
        >
          {icon}
        </Box>

        {/* Content */}
        <Box flex={1}>
          <Typography variant="h6" fontWeight="bold" color="#131313" mb={0.5}>
            {title}
          </Typography>

          {subtitle && (
            <Typography variant="body2" color="text.secondary" mb={1}>
              {subtitle}
            </Typography>
          )}

          {itemCount !== undefined && (
            <Box display="flex" alignItems="center" gap={1}>
              <Chip
                label={itemCount === 0 ? 'Ingen varer lagt til' : `${itemCount} vare${itemCount !== 1 ? 'r' : ''} lagt til`}
                size="small"
                variant="outlined"
                sx={{
                  backgroundColor: itemCount > 0 ? theme.palette.primary.main : theme.palette.grey[100],
                  borderColor: itemCount > 0 ? theme.palette.primary.main : theme.palette.grey[300],
                  color: itemCount > 0 ? 'white' : theme.palette.text.secondary,
                  fontSize: '0.75rem',
                  fontWeight: 'medium',
                  px: 1.5,
                  py: 0.5,

                }}
              />
              {itemCount > 0 && (
                <Box
                  sx={{
                    backgroundColor: theme.palette.success.main,
                    color: 'white',
                    borderRadius: '12px',
                    px: 1.5,
                    py: 0.5,
                    fontSize: '0.75rem',
                    fontWeight: 'medium',
                  }}
                >
                  Aktiv
                </Box>
              )}
            </Box>
          )}
        </Box>

        {/* Arrow indicator */}
        <Box
          sx={{
            color: '#6c757d',
            fontSize: '1.2rem',
            fontWeight: 'bold',
          }}
        >
          →
        </Box>
      </Box>
    </Card>
  )
}
