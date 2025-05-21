// /app/theme.ts
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: { main: '#2C3E50' },
    secondary: { main: '#E67E22' },
    background: {
      default: '#f3f3f3',
      paper: '#FFFFFF'
    },
    text: {
      primary: '#2C3E50',
      secondary: '#6B7280'
    },
    success: {
      main: '#A3E4D7',
      light: '#D1F2EB',
      dark: '#1ABC9C',
      contrastText: '#2C3E50'
    },
    warning: {
      main: '#F9E79F',
      light: '#FEF9E7',
      dark: '#F4D03F',
      contrastText: '#2C3E50'
    },
    error: {
      main: '#F5B7B1',
      light: '#FDEDEC',
      dark: '#E74C3C',
      contrastText: '#2C3E50'
    },
    grey: {
      100: '#F7F9FA',
      200: '#E5E7EB',
      700: '#6B7280'
    }
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 14,
    h5: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: {
    borderRadius: 8
  }
})

export default theme
