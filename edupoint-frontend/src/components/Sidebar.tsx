import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';
import { RootState } from '../redux/store';
import { Avatar, Button, IconButton, List, ListItem, Menu, MenuItem, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 250px;
  background: #f0f0f0;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
`;

const LinksContainer = styled.div`
  flex: 1;
`;

const StyledListItem = styled(ListItem)`
  width: 100%;
  padding: 0;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  border-radius: 10px;
  margin: 10px 0;

  &:hover {
    background-color: #e0e0e0;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  }
`;


const StyledLink = styled(Link)`
  width: 100%;
  text-decoration: none;
  color: inherit;
  display: block;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;

  img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
`;


const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  return (
    <SidebarContainer>
      <div>
        <LogoContainer>
          <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541" alt="EduPoint logo" />
          <Typography variant="h4">EduPoint</Typography>
        </LogoContainer>
        <LinksContainer>
          <List>
            <StyledListItem>
              <StyledLink to="/tests">📝 Tests</StyledLink>
            </StyledListItem>
            <StyledListItem>
              <StyledLink to="/notes">🗒️ Notes</StyledLink>
            </StyledListItem>
            <StyledListItem>
              <StyledLink to="/flashcards">📇 Flashcards</StyledLink>
            </StyledListItem>
          </List>
        </LinksContainer>
      </div>
      <UserContainer>
      <Avatar alt={user?.name} src={user?.profilePicture} />
      <Typography variant="body1" style={{ marginLeft: '10px' }}>
        {user?.name}
      </Typography>
      <IconButton onClick={handleMenuOpen}>
        <SettingsIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </UserContainer>
    </SidebarContainer>
  );
};

export default Sidebar;