import {ListItem } from "@mui/material";
import styled from "styled-components";
import { colors, spacing, fontSize } from "../../styles/constans";
import { Link } from "react-router-dom";

export const SidebarContainer = styled.div`
  width: 250px;
  background: ${colors.white}; 
  padding: ${spacing.lg};     
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  border-right: 1px solid ${colors.gray};
`;

export const StyledListItem = styled(ListItem)`
  width: 100%;
  padding: 0!important;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  border-radius: ${spacing.sm}; 
  margin: ${spacing.sm} 0;    

  &:hover {
    background-color: ${colors.gray}; 
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

export const StyledLink = styled(Link)`
  width: 100%;
  display: block;
  font-size: ${fontSize.md};
  padding: ${spacing.sm} ${spacing.md};
`;

export const LogoContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;

  img {
    width: ${spacing.xl};  
    height: ${spacing.xl};
    margin-right: ${spacing.md};
  }
`;
