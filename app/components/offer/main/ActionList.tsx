'use client'

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
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
export default function ActionList() {
  const router = useRouter()

  const items = [
    { icon: <PictureAsPdfIcon />, label: 'Last ned som PDF' },
    { icon: <ChangeCircleIcon />, label: 'Endre status' },
    { icon: <DeleteOutlineIcon />, label: 'Slett tilbud' },
    { icon: <InfoOutlinedIcon />, label: 'Vis informasjon' },
    { icon: <InfoOutlinedIcon />, label: 'Historie' },

  ]



  return (
    <Box p={0}>
      <List>
        {items.map((item, index) => (
          <ListItem button key={index}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
