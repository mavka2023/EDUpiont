import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { spacing } from '../../styles/constans';
import { StyledCard, StyledCardContent, StyledListContainer, StyledListItemContainer } from './styles';

export interface ListItemProps {
  title: string;
  text: string;
  link?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

const List: React.FC<{ items: ListItemProps[] }> = ({ items }) => {
  
  const renderItem = (item: ListItemProps) => (
    <StyledListItemContainer>
      {item.icon && (
        <Box mb={spacing.sm}>
          {item.icon}
        </Box>
      )}
      <Box textAlign="center">
        <Typography variant="h6">
          {item.title}
        </Typography>
        <Typography variant="body2">
          {item.text}
        </Typography>
      </Box>
    </StyledListItemContainer>
  );

  return (
    <StyledListContainer>
      {items.map((item, index) => (
        <StyledCard key={index}>
          <StyledCardContent>
            {item.link ? (
              <Link to={item.link}>
                {renderItem(item)}
              </Link>
            ) : item.onClick ? (
              <Box onClick={item.onClick}>
                {renderItem(item)}
              </Box>
            ) : (
              renderItem(item)
            )}
          </StyledCardContent>
        </StyledCard>
      ))}
    </StyledListContainer>
  );
};

export default List;
