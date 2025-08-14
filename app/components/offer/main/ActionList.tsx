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
import { ActionButton, ActionButtonVertical, ActionButtonWithText } from '../../../offers/components/ActionButton'
import { FileText, RefreshCw, Trash2, Info, History } from 'lucide-react'
import { useState } from 'react'
import ChangeStatusDrawer from '../../drawers/ChangeStatusDrawer'
import { Offer } from '../../../types/offer'

export default function ActionList({ offer, onStatusChange }: { offer: Offer; onStatusChange: (status: string) => void }) {
  // Track which drawer is open
  const [activeDrawer, setActiveDrawer] = useState<null | 'pdf' | 'status' | 'delete' | 'info'>(null)

  const items = [
    { icon: <FileText size={24} />, label: 'Last ned PDF', drawer: 'pdf' },
    { icon: <RefreshCw size={24} />, label: 'Endre status', drawer: 'status' },
    { icon: <Trash2 size={24} />, label: 'Slett tilbud', drawer: 'delete' },
    { icon: <Info size={24} />, label: 'Informasjon', drawer: 'info' },
  ]

  const handleActionClick = (drawerType: typeof activeDrawer) => {
    setActiveDrawer(drawerType)
  }

  return (
    <Box p={0}>
      <List sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
        {items.map((item, index) => (
          <ActionButtonVertical
            key={index}
            text={item.label}
            icon={item.icon}
            tooltip={item.label}
            onClick={() => handleActionClick(item.drawer as typeof activeDrawer)}
          />
        ))}
      </List>

      {/* Example: Render drawers here */}

      <ChangeStatusDrawer
        open={activeDrawer === 'status'}
        onClose={() => setActiveDrawer(null)}
        currentStatus={offer.status} // Replace with actual current status
        onChangeStatus={(status) => {
          onStatusChange(status)
          setActiveDrawer(null)
        }}
      />
      {/* 
      <DeleteOfferDrawer
        open={activeDrawer === 'delete'}
        onClose={() => setActiveDrawer(null)}
        // ...other props
      />
      <InfoDrawer
        open={activeDrawer === 'info'}
        onClose={() => setActiveDrawer(null)}
        // ...other props
      />
      <PdfDrawer
        open={activeDrawer === 'pdf'}
        onClose={() => setActiveDrawer(null)}
        // ...other props
      />
      */}
    </Box>
  )
}
