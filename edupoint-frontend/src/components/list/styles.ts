import { Box, Card, CardContent, IconButton, ListItem, ListItemButton } from "@mui/material";
import styled from "styled-components";
import { spacing } from "../../styles/constants";


export const StyledListContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  gap: ${spacing.lg};
`;

export const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
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
  height: 100%!important;
  padding: ${spacing.sm}!important;
`;

export const StyledListItemContainer = styled(Box)`
  height: 100%;
  cursor: pointer;
  position: relative;

  > a, > div {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    padding: ${spacing.md};
  }
`;

export const StyledMenuIconButton = styled(IconButton)`
  position: absolute  !important;
  top: 0;
  right: 0;
`;