'use client';
import * as React from 'react';
import { Box, Tab, Tabs } from '@mui/material';

export default function PillTabs({
  tabs, value, onChange,
}: { tabs: string[]; value: number; onChange: (i: number) => void }) {
  return (
    <Box sx={{ bgcolor: 'background.paper', p: 0.5, borderRadius: 999, display: 'inline-flex' }}>
      <Tabs
        value={value}
        onChange={(_, i) => onChange(i)}
        sx={{
          minHeight: 40,
          '& .MuiTab-root': {
            minHeight: 40, px: 2.5, borderRadius: 999, textTransform: 'none', fontWeight: 600,
            color: 'text.secondary',
          },
          '& .Mui-selected': { bgcolor: 'primary.main', color: 'primary.contrastText' },
        }}
        TabIndicatorProps={{ style: { display: 'none' } }}
      >
        {tabs.map((t) => <Tab key={t} label={t} />)}
      </Tabs>
    </Box>
  );
}
