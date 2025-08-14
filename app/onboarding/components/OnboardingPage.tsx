'use client'

import React from 'react';
import { Box, Button, Card, CardContent, Container, MobileStepper, Typography, useTheme } from '@mui/material';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type OnboardingPage = {
  title: string;
  description: string;
  imageSrc: string;
  gradient: string;
};

type Props = {
  pages: OnboardingPage[];
  currentIndex: number;
  onNext: () => void;
  onBack: () => void;
};

const OnboardingScreen: React.FC<Props> = ({ pages, currentIndex, onNext, onBack }) => {
  const page = pages[currentIndex];

  return (
    <Box
      sx={{
        height: '100vh',
        background: page.gradient,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 3,
        textAlign: 'center',
        color: '#000',
      }}
    >
      <Box sx={{ mt: 8 }}>
        <Typography variant="h5" fontWeight="bold">
          {page.title}
        </Typography>
        <Typography variant="body1" mt={2}>
          {page.description}
        </Typography>
      </Box>

      <Box component="img" src={page.imageSrc} alt="illustration" sx={{ width: '100%', maxWidth: 300 }} />

      <MobileStepper
        variant="dots"
        steps={pages.length}
        position="static"
        activeStep={currentIndex}
        nextButton={
          <ChevronRight onClick={onNext} style={{ cursor: 'pointer' }} />
        }
        backButton={
          <ChevronLeft onClick={onBack} style={{ cursor: 'pointer' }} />
        }
      />
    </Box>
  );
};

export default OnboardingScreen;
