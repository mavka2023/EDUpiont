import React, { useState } from 'react';
import { Box, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { colors, spacing } from '../../styles/constants';
import { StyledCard, StyledCardContent, StyledListContainer, StyledListItemContainer, StyledMenuIconButton } from './styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';

export interface ListItemProps {
  title: string;
  link: string;
  icon?: React.ReactNode;
  hideMenu?: boolean;
  showConfirmationModal?: boolean;
}

const List: React.FC<{ items: ListItemProps[] }> = ({ items }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedLink, setSelectedLink] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleModalOpen = (link: string) => {
    setSelectedLink(link);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setSelectedLink(null);
  };

  const handleConfirmClick = () => {
    if (selectedLink) {
      navigate(selectedLink);
    }
    handleModalClose();
  };

  const renderMenu = (link: string, index: number) => (
    <Menu
      id={`menu-${index}`}
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => { handleMenuClose(); navigator.clipboard.writeText(link); }}>Copy link</MenuItem>
      <MenuItem onClick={() => { handleMenuClose(); navigate(`edit/${index}`); }}>Edit</MenuItem>
    </Menu>
  );

  const renderItem = (item: ListItemProps, index: number) => (
    <>
      {item.icon && (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          {item.icon}
        </Box>
      )}
      <Box textAlign="center">
        <Typography variant="h4">
          {item.title}
        </Typography>
      </Box>
    </>
  );

  const handleBoxClick = (item: ListItemProps) => (e: React.MouseEvent<HTMLDivElement>) => {

    if (!item.showConfirmationModal) {
      navigate(item.link);
    }

    e.preventDefault();
    handleModalOpen(item.link);
  };


  return (
    <>
      <StyledListContainer>
        {items.map((item, index) => (
          <StyledCard key={index}>
            <StyledCardContent>
              <StyledListItemContainer>
                  <Box onClick={handleBoxClick(item)}>
                    {renderItem(item, index)}
                  </Box>
                 {!item.hideMenu ? <>
                    <StyledMenuIconButton
                    aria-controls={`menu-${index}`}
                    aria-haspopup="true"
                      onClick={handleMenuOpen}
                    >
                      <MoreVertIcon />
                    </StyledMenuIconButton>
                    {renderMenu(item.link, index)}
                  </> : null}
              </StyledListItemContainer>
            </StyledCardContent>
          </StyledCard>
        ))}
      </StyledListContainer>
      <Dialog
        open={openModal}
        onClose={handleModalClose}
      >
        <DialogTitle>Confirm Navigation</DialogTitle>
        <DialogActions>
          <Button onClick={handleModalClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmClick} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default List;