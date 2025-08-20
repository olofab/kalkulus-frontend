/**
 * Design tokens for Timla design system
 * iOS-like aesthetic with soft, modern styling
 */

export const radius = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  round: 999,
} as const

/**
 * Design tokens inspired by modern minimalistic design
 * Mobile-first approach with refined aesthetics
 */

export const tokens = {
  // Border radius - more subtle, mobile-friendly
  radius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    round: 999,
  },

  // Elevation - softer, more subtle shadows
  elevation: {
    1: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03)',
    2: '0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.03)',
    3: '0 8px 24px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.04)',
  },

  // Surface colors - cleaner, more minimal
  surface: {
    primary: '#FFFFFF',
    secondary: '#F8FAFC',
    tertiary: '#F1F5F9',
    overlay: 'rgba(0, 0, 0, 0.4)',
    border: '#E2E8F0',
    divider: '#F1F5F9',
  },

  // Color palette - updated with user's specified colors
  colors: {
    primary: {
      100: '#e6f3ff',
      200: '#cce7ff',
      300: '#99d1ff',
      400: '#66baff',
      500: '#3929b0', // Main primary color
      600: '#2d2189',
      700: '#211962',
      800: '#15103b',
      900: '#090814',
    },
    secondary: {
      100: '#ffeaec',
      200: '#ffd5d9',
      300: '#ffabb3',
      400: '#ff818d',
      500: '#ff4f62', // Main secondary color
      600: '#cc3f4e',
      700: '#992f3b',
      800: '#661f27',
      900: '#330f14',
    },
    // Active/text color
    active: '#131313', // Main active/text color

    // Neutral grays
    neutral: {
      100: '#f8f9fa',
      200: '#e9ecef',
      300: '#dee2e6',
      400: '#ced4da',
      500: '#adb5bd',
      600: '#6c757d',
      700: '#495057',
      800: '#343a40',
      900: '#212529',
    },

    success: {
      50: '#ECFDF5',
      100: '#D1FAE5',
      200: '#A7F3D0',
      300: '#6EE7B7',
      400: '#34D399',
      500: '#10B981', // Main success
      600: '#059669',
      700: '#047857',
      800: '#065F46',
      900: '#064E3B',
    },

    warning: {
      50: '#FFFBEB',
      100: '#FEF3C7',
      200: '#FDE68A',
      300: '#FCD34D',
      400: '#FBBF24',
      500: '#F59E0B', // Main warning
      600: '#D97706',
      700: '#B45309',
      800: '#92400E',
      900: '#78350F',
    },

    error: {
      50: '#FEF2F2',
      100: '#FEE2E2',
      200: '#FECACA',
      300: '#FCA5A5',
      400: '#F87171',
      500: '#EF4444', // Main error
      600: '#DC2626',
      700: '#B91C1C',
      800: '#991B1B',
      900: '#7F1D1D',
    },

    accent: {
      purple: '#8B5CF6',
      pink: '#EC4899',
      indigo: '#6366F1',
      teal: '#14B8A6',
      orange: '#F97316',
    }
  },

  // Typography scale - more refined
  typography: {
    fontFamily: {
      primary: 'Work Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      heading: 'Funnel Display, sans-serif',
      mono: 'SF Mono, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
    },
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },

  // Spacing scale - more consistent, mobile-optimized
  spacing: {
    xs: 4,   // 4px
    sm: 8,   // 8px
    md: 12,  // 12px
    lg: 16,  // 16px
    xl: 20,  // 20px
    '2xl': 24, // 24px
    '3xl': 32, // 32px
    '4xl': 48, // 48px
    '5xl': 64, // 64px
  },

  // Animation and transitions
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Component specific tokens
  components: {
    button: {
      height: {
        sm: 32,
        md: 40,
        lg: 48,
      },
      padding: {
        sm: '6px 12px',
        md: '8px 16px',
        lg: '12px 20px',
      },
    },
    input: {
      height: 44,
      borderRadius: 12,
    },
    card: {
      borderRadius: 16,
      padding: {
        sm: 12,
        md: 16,
        lg: 20,
      },
    },
  },
} as const

export type Tokens = typeof tokens

export const surface = {
  // Will be resolved at runtime using theme.palette
  base: 'rgba(255, 255, 255, 0.9)',
  border: 'rgba(158, 158, 158, 0.6)', // approximate grey[300] with alpha
} as const

export const typography = {
  titleLg: {
    fontWeight: 700,
    fontSize: 20,
    lineHeight: '24px',
  },
  title: {
    fontWeight: 600,
    fontSize: 18,
    lineHeight: '22px',
  },
  body: {
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '20px',
  },
  caption: {
    fontWeight: 400,
    fontSize: 12,
    lineHeight: '16px',
  },
} as const

export const transitions = {
  fast: 'all 0.15s ease',
  medium: 'all 0.25s ease',
} as const

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
} as const

export const sizes = {
  iconButton: {
    sm: 40,
    md: 48,
  },
  toolbar: 56,
  grabber: {
    width: 36,
    height: 4,
  },
} as const

export type RadiusToken = keyof typeof tokens.radius
export type ElevationToken = keyof typeof tokens.elevation
export type SpacingToken = keyof typeof tokens.spacing
export type TypographyToken = keyof typeof tokens.typography
