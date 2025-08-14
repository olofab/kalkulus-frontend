'use client'

import {
  Avatar, Box, Typography, Tabs, Tab, Stack, Divider,
  useTheme,
  Button, TextField,
  ListItem,
  ListItemText,
  List,
  ButtonBase,
  Fade
} from '@mui/material'
import { useState } from 'react'
import { apiGet, apiPut } from '../lib/api'
import { useRouter } from 'next/navigation'
import { useAppContext } from '../lib/AppContext'
import { User, Mail, Shield } from 'lucide-react'
import BackButton from '../components/BackButton'
import AdminUsersPage from './users/page'

const tabs = ['Meg', 'Selskap', 'Brukere']


export default function ProfilePage() {
  const [tab, setTab] = useState('Meg')
  const router = useRouter()
  const theme = useTheme()
  const { user, company, setCompany } = useAppContext()
  const [editMode, setEditMode] = useState(false)
  const [companyForm, setCompanyForm] = useState({
    hourlyRate: company?.hourlyRate || 0,
    machineRate: company?.machineRate || 0,
    fuelRate: company?.fuelRate || 0
  })

  const userType = user?.isAdmin ? 'Admin' : 'Bruker'

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/login')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCompanyForm({ ...companyForm, [name]: parseFloat(value) })
  }

  const handleSave = async () => {
    try {
      await apiPut('/api/company/configure', companyForm)
      // Hent oppdatert data fra backend og oppdater context
      const updated = await apiGet('/api/company/me')
      setCompany(updated)
      setEditMode(false)
    } catch (e) {
      console.error(e)
    }
  }

  const visibleTabs = tabs.filter(tabName => tabName !== 'Brukere' || user?.isAdmin)


  return (
    <Box sx={{ position: 'relative', minHeight: '100vh' }} p={3} pt={1}>
      {/* Avatar and Name */}
      <Stack direction="row" alignItems="center" spacing={2}>
        <Avatar sx={{ width: 56, height: 56, bgcolor: theme.palette.primary.main }}>
          <Typography variant="h5" fontWeight={600}>
            {user?.name?.[0] || '?'}
          </Typography>
        </Avatar>
        <Typography variant="h6" fontWeight={600}>
          {user?.name}
        </Typography>
      </Stack>

      {/* Tabs */}
      <Stack
        direction="row"
        justifyContent="center"
        mt={3}
        p={1}
        mb={3}
        sx={{ overflowX: 'auto' }}
      >
        {visibleTabs.map(tabName => (
          <Fade in={true} key={tabName}>
            <ButtonBase
              onClick={() => setTab(tabName)}
              sx={{
                px: 3,
                py: 1.2,
                borderRadius: '999px',
                bgcolor: tab === tabName ? theme.palette.primary.light : 'transparent',
                color: tab === tabName ? theme.palette.primary.main : theme.palette.text.secondary,
                fontWeight: 600,
                fontSize: 14,
                transition: 'all 0.25s ease',
                transform: tab === tabName ? 'scale(1.05)' : 'scale(1)',
                '&:hover': {
                  bgcolor: tab === tabName ? theme.palette.primary.light : theme.palette.grey[100],
                }
              }}
            >
              {tabName}
            </ButtonBase>
          </Fade>
        ))}
      </Stack>

      {tab === 'Meg' && user && (
        <Stack spacing={2}>
          <InfoItem icon={<User />} label="Navn" value={user.name} />
          <InfoItem icon={<Mail />} label="E-post" value={user.email} />
          <InfoItem icon={<Shield />} label="Stilling" value={userType} />
        </Stack>
      )}

      {tab === 'Selskap' && company && (
        <Stack spacing={2}>
          <InfoItem label="Firmanavn" value={company.name} />
          <InfoItem label="Org.nr" value={company.organizationNumber} />
          <InfoItem label="Bransje" value={company.industry} />
          <InfoItemEdit
            label="Timepris"
            value={companyForm.hourlyRate}
            name="hourlyRate"
            onChange={handleChange}
            editMode={editMode}
          />
          <InfoItemEdit
            label="Maskinleie"
            value={companyForm.machineRate}
            name="machineRate"
            onChange={handleChange}
            editMode={editMode}
          />
          <InfoItemEdit
            label="Drivstoffsats"
            value={companyForm.fuelRate}
            name="fuelRate"
            onChange={handleChange}
            editMode={editMode}
          />
          {editMode ? (
            <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleSave}>
              Lagre endringer
            </Button>
          ) : (
            <Button variant="text" fullWidth sx={{ mt: 2 }} onClick={() => setEditMode(true)}>
              Endre satser
            </Button>
          )}
        </Stack>
      )}

      {tab == 'Brukere' && (
        <AdminUsersPage />
      )}

      <Button
        variant="outlined"
        color="warning"
        fullWidth
        onClick={handleLogout}
        sx={{ mt: 4 }}
      >
        Logg ut
      </Button>
    </Box >
  )
}

function InfoItem({ icon, label, value }: { icon?: React.ReactNode, label: string, value: string }) {
  return (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
        {icon && <Typography variant="caption" color="text.secondary">
          {icon}
        </Typography>}
        <Box>
          <Typography variant="caption">{label}</Typography>
          <Typography>{value}</Typography>
        </Box>
      </Box>
      <Divider sx={{ mt: 1 }} />
    </Box>
  )
}

function InfoItemEdit({ label, value, name, onChange, editMode }: {
  label: string,
  value: number,
  name: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  editMode: boolean
}) {
  return (
    <Box>
      <Typography variant="caption">{label}</Typography>
      {editMode ? (
        <TextField
          fullWidth
          type="number"
          name={name}
          value={value}
          onChange={onChange}
          size="small"
        />
      ) : (
        <Typography>{value} kr</Typography>
      )}
      <Divider sx={{ mt: 1 }} />
    </Box>
  )
}
