import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { RootState } from '../../redux/store';
import { Avatar, IconButton, List, Menu, MenuItem, Typography, Box, Drawer } from '@mui/material';
import { useLocation } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { LogoContainer, SidebarContainer, StyledLink, StyledListItem, StyledNavigationContainer, StyledUserContainer, MobileMenuContainer } from './styles';
import AnimatedLogo from './Logo';
import { colors, spacing } from '../../styles/constants';

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const renderNavigation = (toggleMobileMenu?: () => void) => (
    <List>
      <StyledListItem onClick={toggleMobileMenu ? toggleMobileMenu : undefined}>
        <StyledLink to="/tests" style={{ background: location.pathname === '/tests' ? colors.gray : 'none' }}>
          <span>📝</span>Tests
        </StyledLink>
      </StyledListItem>
      <StyledListItem onClick={toggleMobileMenu ? toggleMobileMenu : undefined}>
        <StyledLink to="/notes" style={{ background: location.pathname === '/notes' ? colors.gray : 'none' }}>
          <span>🗒️</span>Notes
        </StyledLink>
      </StyledListItem>
      <StyledListItem onClick={toggleMobileMenu ? toggleMobileMenu : undefined}>
        <StyledLink to="/flashcards" style={{ background: location.pathname === '/flashcards' ? colors.gray : 'none' }}>
          <span>📇</span>Flashcards
        </StyledLink>
      </StyledListItem>
    </List>
  );

  return (
    <>
      <SidebarContainer>
        <StyledNavigationContainer>
          <AnimatedLogo />
          {renderNavigation()}
        </StyledNavigationContainer>
        <StyledUserContainer>
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
        </StyledUserContainer>
      </SidebarContainer>

      <MobileMenuContainer>

        <IconButton onClick={toggleMobileMenu}>
          <MenuIcon />
        </IconButton>
        <Drawer anchor="left" open={mobileMenuOpen} onClose={toggleMobileMenu}>
          <Box style={{height: '100%'}} padding={`${spacing.md} ${spacing.sm}`} display="flex" flexDirection="column" justifyContent={"space-between"}>
            <Box width="100%">
              <Box display="flex" justifyContent="start" alignItems="start">
              <IconButton onClick={toggleMobileMenu}>
                <CloseIcon />
              </IconButton>
              <IconButton onClick={handleMenuOpen}>
                <SettingsIcon />
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
              </Box>
              {renderNavigation(toggleMobileMenu)}
            </Box>
            <Box display="flex" justifyContent="start" alignItems="start">
              <Box sx={{ marginTop: 4, display: 'flex', alignItems: 'center', justifySelf: "flex-end" }}>
                <Avatar alt={user?.name} src={user?.profilePicture} />
                <Typography variant="body1" sx={{ marginLeft: '10px' }}>
                  {user?.name} {user?.surname}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Drawer>
      </MobileMenuContainer>
    </>
  );
};

export default Sidebar;
