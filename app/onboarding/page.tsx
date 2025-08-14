'use client'

import React, { useState } from 'react';
import OnboardingScreen from './components/OnboardingPage';
const onboardingPages = [
  {
    title: 'Welcome to App 6.0',
    description: 'Enjoy a smart life at your fingertips.',
    imageSrc: '/icons/offer.png',
    gradient: 'linear-gradient(to bottom, #d3e6fb, #f5f8fd)',
  },
  {
    title: 'Brand-new Experience of Smart Control',
    description:
      'Thanks to the new interaction design, each home member can personalize an exclusive home to suit habits. You are in control of your home.',
    imageSrc: '/illustration2.jpeg',
    gradient: 'linear-gradient(to bottom, #e8d5fa, #f8f2ff)',
  },
];

export default function OnboardingPage() {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    if (index < onboardingPages.length - 1) {
      setIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (index > 0) {
      setIndex((prev) => prev - 1);
    }
  };

  return (
    <OnboardingScreen
      pages={onboardingPages}
      currentIndex={index}
      onNext={handleNext}
      onBack={handleBack}
    />
  );
}
