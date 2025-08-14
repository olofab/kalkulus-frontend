import { Box, Chip, Typography } from '@mui/material'
import OfferHero from './Hero'
import { useOffer } from '../../../offers/hooks/useOffer'

export default function SplitChipLayout() {
  const { offer } = useOffer(7);
  return (
    <Box position="relative">
      {/* Top Box (e.g. white background) */}
      <Box
        sx={{
          backgroundColor: '#ffffff',
          p: 2,
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
        }}
      >
        <Box textAlign="start" mt={2} p={2}>
          <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
            <Typography variant="h4" fontWeight={700}>
              {offer?.title}
            </Typography>
          </Box>

          <Typography variant="body2">{offer?.customer}</Typography>
          <Typography variant="body2">{offer?.phone}</Typography>
        </Box>
      </Box>

      {/* Chip positioned between the two boxes */}
      <Box
        sx={{
          position: 'absolute',
          top: '100%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 99,
        }}
      >
        <Chip label={offer?.status} variant="filled" />
      </Box>
    </Box>
  )
}
