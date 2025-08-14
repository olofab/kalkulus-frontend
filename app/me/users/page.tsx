'use client'

import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogContent,
  TextField,
  Select,
  MenuItem,
  Stack,
  Divider,
  useTheme
} from '@mui/material'
import { useState } from 'react'
import { useCreateUser, useUpdateUser, useUsers } from '../hooks/useUsers'
import { User, UserType, UserTypeEnum } from '../../types/user'
import CustomChip, { Severity } from '../../components/common/Chip'
import { Plus, Divide, UserRoundPen } from 'lucide-react'


export default function AdminUsersPage() {
  const { data: users, isLoading } = useUsers()
  const createUser = useCreateUser()
  const updateUser = useUpdateUser()
  const [userType, setUserType] = useState<UserType>(UserTypeEnum.INTERNAL)

  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<Partial<User>>({})

  const isEditing = !!form.id

  const theme = useTheme();

  const handleSave = () => {
    if (isEditing) {
      updateUser.mutate({
        id: form.id!,
        updates: {
          ...form,
          userType, // legg til valgt userType i payload
        }
      })
    } else {
      createUser.mutate({
        ...form,
        userType, // legg til valgt userType i payload
      })
    }
    setOpen(false)
    setForm({})
  }

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Brukere</Typography>
        <Button variant="text"
          startIcon={<Plus />} onClick={() => { setForm({}); setOpen(true) }}>
          Ny bruker
        </Button>
      </Stack>

      {isLoading ? (
        <Typography>Laster...</Typography>
      ) : (
        users?.map(user => (
          <Box key={user.id} py={1} borderBottom="1px solid #eee">
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography fontWeight={600}>{user.name}</Typography>
                <Typography variant="body2" color="text.secondary">{user.email}</Typography>
              </Box>
              <Stack direction="row" spacing={1} alignItems="center">
                <CustomChip
                  label={getUserTypeChipProps(user.userType).label}
                  severity={getUserTypeChipProps(user.userType).severity}
                />
                <UserRoundPen size={24} strokeWidth={2} onClick={() => { setForm(user); setOpen(true) }} color={theme.palette.grey[500]} />
              </Stack>
            </Stack>
          </Box>
        ))
      )}

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              label="Navn"
              value={form.name || ''}
              onChange={e => setForm({ ...form, name: e.target.value })}
              fullWidth
            />
            <TextField
              label="E-post"
              value={form.email || ''}
              onChange={e => setForm({ ...form, email: e.target.value })}
              fullWidth
            />
            {!isEditing && (
              <TextField
                label="Passord"
                type="password"
                value={(form as any).password || ''}
                onChange={e => setForm({ ...form, password: e.target.value })}
                fullWidth
              />
            )}
            <Select
              fullWidth
              value={userType}
              onChange={(e) => setUserType(e.target.value as UserType)}
            >
              <MenuItem value={UserTypeEnum.ADMIN}>Administrator</MenuItem>
              <MenuItem value={UserTypeEnum.INTERNAL}>Intern bruker</MenuItem>
              <MenuItem value={UserTypeEnum.SUBCONTRACTOR}>Underleverandør</MenuItem>
            </Select>
            <Button variant="contained" onClick={handleSave}>
              {isEditing ? 'Oppdater' : 'Opprett'}
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

function getUserTypeChipProps(userType: string | UserTypeEnum): { label: string; severity: Severity } {
  switch (userType) {
    case UserTypeEnum.INTERNAL:
      return {
        label: 'Intern bruker',
        severity: 'info',
      }
    case UserTypeEnum.SUBCONTRACTOR:
      return {
        label: 'Underleverandør',
        severity: 'warning',
      }
    case UserTypeEnum.ADMIN:
      return {
        label: 'Administrator',
        severity: 'success',
      }
    default:
      return {
        label: 'Ukjent',
        severity: 'default',
      }
  }
}