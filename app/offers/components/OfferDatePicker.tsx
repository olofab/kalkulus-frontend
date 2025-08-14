'use client'

import { useState } from 'react'
import { Chip, Popover } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { CalendarRange } from 'lucide-react'

type ValidUntilPickerProps = {
  value: string // format: 'YYYY-MM-DD'
  onChange: (date: string) => void
}

export default function ValidUntilPicker({ value, onChange }: ValidUntilPickerProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const date = dayjs(value)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Chip
        label={date.isSame(dayjs(), 'day') ? 'I dag' : date.format('D. MMMM YYYY')}
        icon={<CalendarRange size={18} />}
        onClick={handleClick}
        variant="filled"
        size='medium'
        sx={{ p: 1 }}
      />

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <DateCalendar
          value={date}
          onChange={(newDate: Dayjs | null) => {
            if (newDate) {
              onChange(newDate.format('YYYY-MM-DD'))
              handleClose()
            }
          }}
        />
      </Popover>
    </>
  )
}
