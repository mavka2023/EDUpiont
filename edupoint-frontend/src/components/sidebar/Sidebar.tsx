import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { RootState } from '../../redux/store';
import { Avatar, IconButton, List, Menu, MenuItem, Typography, Box } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { LogoContainer, SidebarContainer, StyledLink, StyledListItem } from './styles';
import AnimatedLogo from './Logo';

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
      <Box display="flex" flexDirection="column" alignItems="flex-start">
          <AnimatedLogo />
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
      </Box>
      <Box display="flex" justifyContent={"space-between"} alignItems="center">
        <Box display="flex" alignItems="center">
          <Avatar alt={user?.name} src={user?.profilePicture} />
          <Typography variant="body1" sx={{ marginLeft: '10px' }}>
            {user?.name} {user?.surname}
          </Typography>
        </Box>
        <IconButton onClick={handleMenuOpen}>
          <SettingsIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Box>
    </SidebarContainer>
  );
};

export default Sidebar;