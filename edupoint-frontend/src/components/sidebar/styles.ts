import { ListItem } from "@mui/material";
import styled from "styled-components";
import { colors, spacing, fontSize, borderRadius } from "../../styles/constants";
import { Link } from "react-router-dom";

export const SidebarContainer = styled.div`
  width: 350px;
  background: ${colors.white};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  border-right: 2px solid ${colors['gray-dk']};
  
  @media (max-width: 768px) {
    display: none;
  }
`;

export const MobileMenuContainer = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: flex-start;
    padding: ${spacing.sm};
    background: ${colors.white};
    border-bottom: 2px solid ${colors['gray-dk']};
  }
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
  border-radius: ${borderRadius.sm};
  transition: background 0.3s ease;

  span {
    display: inline-block;
    font-size: ${fontSize.lg};
    width: 2rem;
  }

  &:hover {
    background: ${colors["gray-lt"]};
  }
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

export const StyledUserContainer = styled.div`
  background: linear-gradient(70deg, ${colors["primary-lt"]} 0%, ${colors["primary-dk"]} 90%);
  padding: ${spacing.md} ${spacing.md};
  display: flex;
  align-items: center;
  justify-content: space-between;
  justify-self: flex-start;

  img {
    width: ${spacing.xxl};
    height: ${spacing.xxl};
    border: 2px solid ${colors.white};
    padding: 2px;
    border-radius: ${borderRadius.round};
  }

  button, p {
    color: ${colors.white};
    font-weight: 600;
  }
`;

export const StyledNavigationContainer = styled.div`
  padding: ${spacing.lg};
  display: flex;
  flex-direction: column;
  
  @media (max-width: 768px) {
    display: none;
  }
`;
