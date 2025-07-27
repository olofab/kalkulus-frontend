'use client';

import React from 'react';
import { Box, Typography, Button } from '@mui/material';

type EmptyStateProps = {
  title: string;
  description?: string;
  imageSrc?: string;
  actionLabel?: string;
  onActionClick?: () => void;
};

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  imageSrc,
  actionLabel,
  onActionClick,
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      textAlign="center"
      px={2}
      py={4}
    >
      {imageSrc && (
        <Box
          component="img"
          src={imageSrc}
          alt="Empty illustration"
          maxWidth="280px"
          width="100%"
          mb={3}
        />
      )}
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        {title}
      </Typography>
      {description && (
        <Typography variant="body2" color="text.secondary" mb={2}>
          {description}
        </Typography>
      )}
      {actionLabel && onActionClick && (
        <Button variant="contained" onClick={onActionClick}>
          {actionLabel}
        </Button>
      )}
    </Box>
  );
};

export default EmptyState;
