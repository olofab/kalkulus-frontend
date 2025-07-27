'use client'

//bruk denne under /me
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography, Divider, IconButton } from '@mui/material'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import HistoryIcon from '@mui/icons-material/History'
import RoomIcon from '@mui/icons-material/Room'
import TranslateIcon from '@mui/icons-material/Translate'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import LogoutIcon from '@mui/icons-material/Logout'
import { useRouter } from 'next/navigation'

export default function ActionList() {
  const router = useRouter()

  const items = [
    { icon: <CreditCardIcon />, label: 'Last ned som PDF' },
    { icon: <HistoryIcon />, label: 'Endre status' },
    { icon: <RoomIcon />, label: 'Slett tilbud' },
    { icon: <TranslateIcon />, label: 'Autocharge' }
  ]

  const extraItems = [
    { icon: <FavoriteBorderIcon />, label: 'Hjälp' },
    { icon: <FeedbackOutlinedIcon />, label: 'Ge oss feedback' },
    { icon: <InfoOutlinedIcon />, label: 'Om' },
    { icon: <LogoutIcon />, label: 'Logga ut' }
  ]

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight={700} mb={2}>Andreas Bergman</Typography>

      <List>
        {items.map((item, index) => (
          <ListItem button key={index}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      <List>
        {extraItems.map((item, index) => (
          <ListItem button key={index}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
