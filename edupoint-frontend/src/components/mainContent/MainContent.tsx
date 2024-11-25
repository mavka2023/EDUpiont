import React from 'react';
import { Typography, Box } from '@mui/material';
import { StyledMainContent } from './styles';

interface MainContentProps {
  title: string;
  text?: string;
  children?: React.ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ title, text, children }) => {
  return (
    <StyledMainContent>
      <Typography variant="h4">
        {title}
      </Typography>
      <Typography variant="subtitle1">
        {text}
      </Typography>
        {children}
    </StyledMainContent>
  );
};

export default MainContent;