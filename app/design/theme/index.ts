/**
 * Extended MUI theme with design system tokens
 * Modern, minimalistic aesthetic inspired by the reference design
 */

import { createTheme } from '@mui/material/styles'
import { tokens } from './tokens'

// Extend MUI theme interface to include our tokens
declare module '@mui/material/styles' {
  interface Theme {
    tokens: typeof tokens
  }
  interface ThemeOptions {
    tokens?: typeof tokens
  }
}

export const theme = createTheme({
  tokens,
  palette: {
    mode: 'light',
    primary: {
      main: tokens.colors.primary[500], // #3929b0
      light: tokens.colors.primary[300],
      dark: tokens.colors.primary[700],
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: tokens.colors.secondary[500], // #ff4f62
      light: tokens.colors.secondary[300],
      dark: tokens.colors.secondary[700],
      contrastText: '#FFFFFF',
    },
    success: {
      main: tokens.colors.success[500],
      light: tokens.colors.success[300],
      dark: tokens.colors.success[700],
    },
    warning: {
      main: tokens.colors.warning[500],
      light: tokens.colors.warning[300],
      dark: tokens.colors.warning[700],
    },
    error: {
      main: tokens.colors.error[500],
      light: tokens.colors.error[300],
      dark: tokens.colors.error[700],
    },
    background: {
      default: tokens.surface.secondary,
      paper: tokens.surface.primary,
    },
    text: {
      primary: tokens.colors.active, // #131313
      secondary: tokens.colors.neutral[600],
    },
    divider: tokens.surface.border,
  },
  typography: {
    fontFamily: tokens.typography.fontFamily.primary,
    h1: {
      fontFamily: tokens.typography.fontFamily.heading,
      fontSize: tokens.typography.fontSize['4xl'],
      fontWeight: tokens.typography.fontWeight.bold,
      lineHeight: tokens.typography.lineHeight.tight,
    },
    h2: {
      fontFamily: tokens.typography.fontFamily.heading,
      fontSize: tokens.typography.fontSize['3xl'],
      fontWeight: tokens.typography.fontWeight.bold,
      lineHeight: tokens.typography.lineHeight.tight,
    },
    h3: {
      fontFamily: tokens.typography.fontFamily.heading,
      fontSize: tokens.typography.fontSize['2xl'],
      fontWeight: tokens.typography.fontWeight.semibold,
      lineHeight: tokens.typography.lineHeight.tight,
    },
    h4: {
      fontFamily: tokens.typography.fontFamily.heading,
      fontSize: tokens.typography.fontSize.xl,
      fontWeight: tokens.typography.fontWeight.semibold,
      lineHeight: tokens.typography.lineHeight.normal,
    },
    h5: {
      fontFamily: tokens.typography.fontFamily.heading,
      fontSize: tokens.typography.fontSize.lg,
      fontWeight: tokens.typography.fontWeight.semibold,
      lineHeight: tokens.typography.lineHeight.normal,
    },
    h6: {
      fontFamily: tokens.typography.fontFamily.heading,
      fontSize: tokens.typography.fontSize.base,
      fontWeight: tokens.typography.fontWeight.semibold,
      lineHeight: tokens.typography.lineHeight.normal,
    },
    body1: {
      fontSize: tokens.typography.fontSize.base,
      fontWeight: tokens.typography.fontWeight.normal,
      lineHeight: tokens.typography.lineHeight.normal,
    },
    body2: {
      fontSize: tokens.typography.fontSize.sm,
      fontWeight: tokens.typography.fontWeight.normal,
      lineHeight: tokens.typography.lineHeight.normal,
    },
    button: {
      fontSize: tokens.typography.fontSize.sm,
      fontWeight: tokens.typography.fontWeight.medium,
      textTransform: 'none',
    },
    caption: {
      fontSize: tokens.typography.fontSize.xs,
      fontWeight: tokens.typography.fontWeight.normal,
      lineHeight: tokens.typography.lineHeight.normal,
    },
  },
  shape: {
    borderRadius: tokens.radius.md,
  },
  components: {
    // Button component overrides
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: tokens.radius.md,
          textTransform: 'none',
          fontWeight: tokens.typography.fontWeight.medium,
          boxShadow: 'none',
          transition: tokens.transitions.normal,
          '&:hover': {
            boxShadow: 'none',
          },
        },
        sizeMedium: {
          height: tokens.components.button.height.md,
          padding: tokens.components.button.padding.md,
        },
        sizeSmall: {
          height: tokens.components.button.height.sm,
          padding: tokens.components.button.padding.sm,
        },
        sizeLarge: {
          height: tokens.components.button.height.lg,
          padding: tokens.components.button.padding.lg,
        },
      },
    },

    // Paper component overrides
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: tokens.radius.lg,
          boxShadow: tokens.elevation[1],
        },
        elevation1: {
          boxShadow: tokens.elevation[1],
        },
        elevation2: {
          boxShadow: tokens.elevation[2],
        },
        elevation3: {
          boxShadow: tokens.elevation[3],
        },
      },
    },

    // TextField component overrides
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: tokens.radius.md,
            backgroundColor: tokens.surface.primary,
            transition: tokens.transitions.normal,
            '& fieldset': {
              borderColor: tokens.surface.border,
            },
            '&:hover fieldset': {
              borderColor: tokens.colors.neutral[400],
            },
            '&.Mui-focused fieldset': {
              borderColor: tokens.colors.primary[500],
              borderWidth: 2,
            },
          },
          '& .MuiInputLabel-root': {
            color: tokens.colors.neutral[600],
            '&.Mui-focused': {
              color: tokens.colors.primary[500],
            },
          },
          '& .MuiInputBase-input': {
            '&::placeholder': {
              color: tokens.colors.neutral[400],
              opacity: 1,
            },
          },
        },
      },
    },

    // Chip component overrides
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: tokens.radius.lg,
          fontWeight: tokens.typography.fontWeight.medium,
          fontSize: tokens.typography.fontSize.sm,
        },
      },
    },

    // Tab component overrides
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: tokens.typography.fontWeight.medium,
          fontSize: tokens.typography.fontSize.sm,
          minHeight: 44,
        },
      },
    },

    // AppBar component overrides
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: tokens.surface.primary,
          color: tokens.colors.secondary[800],
          boxShadow: tokens.elevation[1],
        },
      },
    },

    // Card component overrides
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: tokens.radius.lg,
          border: `1px solid ${tokens.surface.border}`,
          boxShadow: tokens.elevation[1],
        },
      },
    },

    // Drawer component overrides
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderBottomLeftRadius: '0 !important',
          borderBottomRightRadius: '0 !important',
        },
        paperAnchorBottom: {
          borderTopLeftRadius: tokens.radius.xl,
          borderTopRightRadius: tokens.radius.xl,
          borderBottomLeftRadius: '0 !important',
          borderBottomRightRadius: '0 !important',
        },
        paperAnchorLeft: {
          borderRadius: '0 !important',
        },
        paperAnchorRight: {
          borderRadius: '0 !important',
        },
      },
    },
  },
})

export default theme
