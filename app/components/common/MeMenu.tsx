'use client'

//bruk denne under /me
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography, Divider, IconButton } from '@mui/material'
import { CreditCard, History, MapPin, Languages, Heart, MessageSquare, Info, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function ActionList() {
  const router = useRouter()

  const items = [
    { icon: <CreditCard />, label: 'Last ned som PDF' },
    { icon: <History />, label: 'Endre status' },
    { icon: <MapPin />, label: 'Slett tilbud' },
    { icon: <Languages />, label: 'Autocharge' }
  ]

  const extraItems = [
    { icon: <Heart />, label: 'Hjälp' },
    { icon: <MessageSquare />, label: 'Ge oss feedback' },
    { icon: <Info />, label: 'Om' },
    { icon: <LogOut />, label: 'Logga ut' }
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
