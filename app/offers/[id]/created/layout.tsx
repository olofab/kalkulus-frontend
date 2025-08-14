import { Box } from "@mui/material";

export default function CreatedLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{
      minHeight: '100vh',
      backgroundColor: '#D0D8C3',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {children}
    </Box>
  )
}
