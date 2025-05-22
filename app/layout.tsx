
'use client'
import { CssBaseline, ThemeProvider } from '@mui/material'
import AppLayout from './AppLayout'
import theme from '../app/theme'
import './global.css'
import { Suspense } from 'react'
import LoadingScreen from './components/LoadingScreen'

export default function RootLayout({ children }) {
  return (
    <html lang="no">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Funnel+Display:wght@300..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider theme={theme}>

          <CssBaseline />
          <Suspense fallback={<LoadingScreen />}>

            <AppLayout>{children}</AppLayout>
          </Suspense>
        </ThemeProvider>

      </body>
    </html>
  )
}
