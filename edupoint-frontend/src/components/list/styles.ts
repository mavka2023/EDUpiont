import { Box, Card, CardContent, ListItem, ListItemButton } from "@mui/material";
import styled from "styled-components";
import { spacing } from "../../styles/constans";


export const StyledListContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  gap: ${spacing.lg};
`;

export const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  border-radius: 2px;
  box-shadow: 3;
  transition: 0.15s!important;
  height: 180px;
  width: 180px;

  &:hover {
    transform: scale(1.05);
  }

`;

export const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%!important;
  padding: 0!important;

  > a, > div {
    height: 100%;
  }
`;

export const StyledListItemContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;