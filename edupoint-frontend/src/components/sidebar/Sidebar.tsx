import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { RootState } from '../../redux/store';
import { Avatar, Button, IconButton, List, ListItem, Menu, MenuItem, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { LinksContainer, LogoContainer, SidebarContainer, StyledLink, StyledListItem, UserContainer } from './styles';

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
        <div>
        <Avatar alt={user?.name} src={user?.profilePicture} />
        <Typography variant="body1" style={{ marginLeft: '10px' }}>
          {user?.name} {user?.surname}
        </Typography>
        </div>
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