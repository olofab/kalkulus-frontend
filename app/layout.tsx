
'use client'
import { CssBaseline, ThemeProvider } from '@mui/material'
import AppLayout from './AppLayout'
import theme from '../app/theme'

export default function RootLayout({ children }) {
  return (
    <html lang="no">
      <body>
        <ThemeProvider theme={theme}>

          <CssBaseline />
          <AppLayout>{children}</AppLayout>
        </ThemeProvider>

      </body>
    </html>
  )
}
