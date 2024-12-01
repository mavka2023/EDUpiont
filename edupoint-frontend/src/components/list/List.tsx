import React, { useState } from 'react';
import { Box, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { spacing } from '../../styles/constants';
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
    <div>
      {item.icon && (
        <Box mb={spacing.sm} display="flex" justifyContent="center">
          {item.icon}
        </Box>
      )}
      <Box textAlign="center">
        <Typography variant="h4">
          {item.title}
        </Typography>
      </Box>
    </div>
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
        <DialogContent>
          <DialogContentText>
            Are you sure you want to start the test?
          </DialogContentText>
        </DialogContent>
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