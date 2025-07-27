
'use client'
import { CssBaseline, ThemeProvider } from '@mui/material'
import AppLayout from './AppLayout'
import theme from '../app/theme'
import './global.css'
import { Suspense, useEffect, useState } from 'react'
import LoadingScreen from './components/LoadingScreen'
import { AppProvider, useAppContext } from './lib/AppContext'
import { usePathname, useRouter } from 'next/navigation'
import AuthGate from './components/AuthGate'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function AuthGate1({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAppContext()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!loading) {
      if (!user && pathname !== '/login' && pathname !== '/welcome') {
        router.replace('/welcome')
      }
      if (user && pathname === '/') {
        router.replace('/dashboard')
      }
    }
  }, [loading, user, pathname])

  if (loading) {
    return <LoadingScreen />
  }

  return <>{children}</>
}

export default function RootLayout({ children }) {
  const [queryClient] = useState(() => new QueryClient())

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
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppProvider>
              <Suspense fallback={<LoadingScreen />}>
                <AppLayout>
                  <AuthGate>{children}</AuthGate>
                </AppLayout>
              </Suspense>
            </AppProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
