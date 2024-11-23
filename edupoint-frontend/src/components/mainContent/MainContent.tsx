import React from 'react';
import { Typography, Box } from '@mui/material';

interface MainContentProps {
  title: string;
  text: string;
  children?: React.ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ title, text, children }) => {
  return (
    <Box p={3} width="100%">
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {text}
      </Typography>
      <Box mt={2}>
        {children}
      </Box>
    </Box>
  );
};

export default MainContent;