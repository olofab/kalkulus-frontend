import { Box, Typography, Chip, CircularProgress, useTheme } from "@mui/material";
import { useOffer } from "../hooks/useOffer";
import { useParams } from "next/navigation";
import { getStatusColor, getStatusTitle } from "../../components/OfferHeaderCard";
import { getStatusStyle } from "../utils/StatusStyle";


export default function Header() {
  const params = useParams();
  const theme = useTheme();
  const rawId = params?.id;

  // Ensure we extract the correct number ID (only if it's a string, not an array)
  const parsedId = Array.isArray(rawId) ? rawId[0] : rawId;

  const { offer, loading, error } = useOffer(parsedId);
  const statusStyle = getStatusStyle(offer?.status)


  if (loading) {
    return (
      <Box p={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !offer) {
    return (
      <Box p={3}>
        <Typography color="error">Kunne ikke finne tilbudet.</Typography>
      </Box>
    );
  }
  return (
    <Box position="relative">
      {/* Top Box (e.g. white background) */}
      <Box
        sx={{
          background: theme.palette.background.default,
          p: 1,
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
        <Chip
          size="medium"
          variant="filled"
          label={
            <Box display="flex" alignItems="center" gap={1}>
              {statusStyle.icon}
              <span>{statusStyle.label}</span>
            </Box>
          }
          sx={{
            backgroundColor: statusStyle.color,
            color: '#1B2733', // mørk tekst
            px: 1,
            py: 0.5,
            borderRadius: 2,
            fontWeight: 500,
          }}
        />
      </Box>
    </Box>
  )
}
