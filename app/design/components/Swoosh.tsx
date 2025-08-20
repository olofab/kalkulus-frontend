'use client';
import * as React from 'react';
import { SvgIcon, SvgIconProps, useTheme } from '@mui/material';

export default function BrandSwoosh(props: SvgIconProps & { tone?: 'primary' | 'secondary' }) {
  const { palette } = useTheme();
  const fill = props.color ?? (props.tone === 'secondary' ? palette.secondary.main : palette.primary.main);
  return (
    <SvgIcon viewBox="0 0 84 96" {...props} sx={{ filter: 'drop-shadow(0 6px 18px rgba(16,24,40,.12))', ...props.sx }}>
      {/* three soft teardrops */}
      <path d="M30 90c-10 0-18-8-18-18 0-18 18-33 18-33s18 15 18 33c0 10-8 18-18 18z" fill={String(fill)} />
      <path d="M60 74c-9 0-16-7-16-16 0-15 16-27 16-27s16 12 16 27c0 9-7 16-16 16z" fill={String(fill)} opacity=".85" />
      <path d="M18 60c-7 0-12-5-12-12 0-11 12-20 12-20s12 9 12 20c0 7-5 12-12 12z" fill={String(fill)} opacity=".7" />
    </SvgIcon>
  );
}