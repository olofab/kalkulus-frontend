'use client'

import { Box, Typography, CircularProgress, useTheme, Avatar, Divider, Paper } from "@mui/material"
import { useOffer } from "../hooks/useOffer"
import { useParams } from "next/navigation"
import { getStatusStyle } from "../utils/StatusStyle"
import { CalendarDays, User } from "lucide-react"
import dayjs from "dayjs"

export default function HeaderCard() {
  const params = useParams()
  const theme = useTheme()
  const rawId = params?.id
  const parsedId = Array.isArray(rawId) ? rawId[0] : rawId

  const { offer, loading, error } = useOffer(parsedId)
  const statusStyle = getStatusStyle(offer?.status)

  if (loading) {
    return (
      <Box p={3}>
        <CircularProgress />
      </Box>
    )
  }

  if (error || !offer) {
    return (
      <Box p={3}>
        <Typography color="error">Kunne ikke finne tilbudet.</Typography>
      </Box>
    )
  }
  const percent = 65

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          borderRadius: 2,
          p: 2,
          mb: 3,
          maxWidth: 380,
          mx: "auto",
          textAlign: "center",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        }}
      >
        <Typography variant="subtitle2" fontWeight={400} color="text.secondary" mb={1}>
          Estimert
        </Typography>
        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
          <Typography variant="h4" fontWeight={700}>
            {offer?.totalSum ? `${offer.totalSum} kr` : '–'}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box display="flex" mb={2}>
          <Box flex={1} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <Box display="flex" alignItems="center" justifyContent="center" gap={0.5}>
              <CalendarDays size={16} style={{ opacity: 0.6 }} />
              <Typography variant="body2" fontWeight={600}>
                {offer?.validUntil ? dayjs(offer.validUntil).format('DD.MM.YYYY') : '–'}
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">
              Gyldig til
            </Typography>
          </Box>
          <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
          <Box flex={1} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <Box display="flex" alignItems="center" justifyContent="center" gap={0.5}>
              {statusStyle.icon}
              <Typography variant="body2" fontWeight={600}>
                {statusStyle.label}
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">
              Status
            </Typography>
          </Box>
        </Box>

        {/* Optional: User/company info row */}
        <Box
          display="flex"
          alignItems="center"
          sx={{
            backgroundColor: 'rgba(57, 41, 176, 0.08)', // alpha(primary[500], 0.08)
            color: '#2d2189', // primary[600] equivalent
          }}
          borderRadius={1}
          p={1.2}
          mt={2}
          gap={1.5}
          justifyContent="center"
        >
          <Avatar sx={{ width: 36, height: 36, bgcolor: "primary.main" }} >
            <User size={24} />
          </Avatar>
          <Box>
            <Typography fontWeight={600} fontSize={15} textAlign={"left"}>
              {offer?.customer}
            </Typography>
            <Typography variant="body2" color="text.secondary" fontSize={13} textAlign={"left"}>
              {offer?.email}
              {offer?.email && offer?.phone && <span style={{ margin: '0 6px' }}>•</span>}
              {offer?.phone}
            </Typography>
          </Box>
        </Box>
      </Paper>

    </>
  )
}
