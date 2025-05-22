// /app/theme.ts
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#115d5a',
      dark: '#0d4543',
      light: '#4a8e8b',
    },
    secondary: {
      main: '#f9a826',
      dark: '#c07e1a',
      light: '#ffd48a',
    },
    background: {
      default: '#f5f6f7',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#4f5b62',
      disabled: '#9e9e9e',
    },
    error: { main: '#e74c3c' },
    success: { main: '#27ae60' },
    warning: { main: '#f39c12' },
    info: { main: '#3498db' },
  },
  typography: {
    fontFamily: 'Funnel Display, sans-serif',
    fontSize: 14,
    h5: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: {
    borderRadius: 8
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },

    /*
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
        notchedOutline: {
          borderRadius: 0,
        },
      },
    },*/
  },
})

export default theme
