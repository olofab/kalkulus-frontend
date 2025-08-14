// /app/theme.ts
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2C3E50', // dyp stålblå
      contrastText: '#ffffff',
      light: '#E8ECF1'
    },
    secondary: {
      main: '#E67E22', // bygg-oransje
      contrastText: '#ffffff',
    },
    background: {
      default: '#F7F9F9', // lys bakgrunn
      paper: '#FFF',
    },
    info: {
      main: '#1E6A8E', // havblå
    },
    success: {
      main: '#4CAF50',
    },
    warning: {
      main: '#F39C12',
    },
    error: {
      main: '#C0392B',
    },
    text: {
      primary: '#1B2733', // mørk tekst
      secondary: '#2C3E50',
    },
    grey: {
      100: '#A3C6C4', // sjøgrønn støtte
      900: '#1B2733',
    },
  },
  typography: {
    fontFamily: 'Work Sans, sans-serif',
    h1: {
      fontFamily: 'Funnel Display, sans-serif',
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontFamily: 'Funnel Display, sans-serif',
      fontSize: '2rem',
      fontWeight: 700,
    },
    h3: {
      fontFamily: 'Funnel Display, sans-serif',
      fontSize: '1.75rem',
      fontWeight: 700,
    },
    h4: {
      fontFamily: 'Funnel Display, sans-serif',
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontFamily: 'Funnel Display, sans-serif',
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h6: {
      fontFamily: 'Funnel Display, sans-serif',
      fontSize: '1rem',
      fontWeight: 600,
    },
    subtitle1: {
      fontFamily: 'Work Sans, sans-serif',
      fontSize: '1rem',
      fontWeight: 400,
    },
    subtitle2: {
      fontFamily: 'Work Sans, sans-serif',
      fontSize: '0.875rem',
      fontWeight: 500,
    },
    body1: {
      fontFamily: 'Work Sans, sans-serif',
      fontSize: '1rem',
      fontWeight: 400,
    },
    body2: {
      fontFamily: 'Work Sans, sans-serif',
      fontSize: '0.875rem',
      fontWeight: 400,
    },
    button: {
      fontFamily: 'Work Sans, sans-serif',
      textTransform: 'none',
      fontWeight: 600,
    },
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
