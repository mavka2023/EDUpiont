import React from 'react';
import { ListItem, ListItemText, ListItemButton, Box } from '@mui/material';

import { spacing } from '../../styles/constans';
import { StyledListItem, StyledListItemButton } from './styles';
import { Link } from 'react-router-dom';

export interface ListItemProps {
  title: string;
  text: string;
  link?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

interface ListProps {
  items: ListItemProps[];
}

const List: React.FC<ListProps> = ({ items }) => {

  const renderItem = (item: ListItemProps) => <Box width={"100%"} height={"100%"} display="flex" flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
      {item.icon ? item.icon : null}
      <Box justifySelf={"flex-end"} display={"flex"}>
        <ListItemText primary={item.title} secondary={item.text} />
      </Box>
  </Box>

  return (
    <Box component="ul" display="grid" gridTemplateColumns="1fr 1fr 1fr" gap={spacing.lg}>
      {items.map((item, index) => (
        <StyledListItem key={index} disablePadding>
          {item.link ? (
            <StyledListItemButton component={Link} to={item.link}>
              {renderItem(item)}
            </StyledListItemButton>
          ) : (
            <StyledListItemButton onClick={item.onClick}>
              {renderItem(item)}
            </StyledListItemButton>
          )}
        </StyledListItem>
      ))}
    </Box>
  );
};

export default List;
