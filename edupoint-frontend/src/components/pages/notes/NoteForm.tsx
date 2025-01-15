import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Card, CardContent, Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { spacing } from '../../../styles/constants';
import MainContent from '../../mainContent/MainContent';

interface Note {
  id?: number;
  title: string;
  content: string;
}

interface NoteFormProps {
  note?: Note;
  onSave?: (note: Note) => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ note, onSave }) => {
  const [noteTitle, setNoteTitle] = useState<string>(note?.title || '');
  const [noteContent, setNoteContent] = useState<string>(note?.content || '');
  const [errors, setErrors] = useState<{ title?: string; content?: string }>({});
  const [toast, setToast] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState<boolean>(false);
  const [isNavigateDialogOpen, setIsNavigateDialogOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const hasUnsavedChanges = noteTitle !== note?.title || noteContent !== note?.content;

  const validateInputs = () => {
    const newErrors: { title?: string; content?: string } = {};
    if (noteTitle.trim().length === 0) {
      newErrors.title = 'Title cannot be empty';
    }
    if (noteContent.trim().length === 0) {
      newErrors.content = 'Content cannot be empty';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateInputs()) {
      const newNote: Note = { id: note?.id, title: noteTitle, content: noteContent };
      if (onSave) onSave(newNote);
      setToast({ open: true, message: 'Note saved successfully!', severity: 'success' });
      setTimeout(() => navigate('/notes'), 1500);
    } else {
      setToast({ open: true, message: 'Please fix the errors before saving.', severity: 'error' });
    }
  };

  const handleCloseToast = () => {
    setToast({ ...toast, open: false });
  };

  const handleNavigate = () => {
    setIsNavigateDialogOpen(false);
    navigate('/notes');
  };

  const handleOpenNavigateDialog = () => {
    setIsNavigateDialogOpen(true);
  };

  const handleSaveBeforeNavigate = () => {
    setIsNavigateDialogOpen(false);
    handleSave();
  };

  const handleCancelNavigation = () => {
    setIsNavigateDialogOpen(false);
  };

  const handleOpenSaveDialog = () => {
    setIsSaveDialogOpen(true);
  };

  const handleCloseSaveDialog = () => {
    setIsSaveDialogOpen(false);
  };

  return (
    <MainContent title={note ? 'Edit Note' : 'Create Note'} text="Create or edit your note by adding a title and content">
      <Box display="flex" flexDirection="column" gap={spacing.lg}>
        <Card>
          <CardContent>
            <Box display="flex" flexDirection="column" gap={spacing.lg}>
              <TextField
                label="Note Title"
                color="secondary"
                fullWidth
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                error={!!errors.title}
                helperText={errors.title}
              />
              <TextField
                label="Note Content"
                color="secondary"
                multiline
                rows={16}
                fullWidth
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                error={!!errors.content}
                helperText={errors.content}
              />
            </Box>
          </CardContent>
        </Card>
        
        <Box display="flex" justifyContent="space-between">
          <Button
            variant="contained"
            color="secondary"
            onClick={handleOpenNavigateDialog}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenSaveDialog}
            disabled={!noteTitle || !noteContent}
          >
            {note ? 'Save Changes' : 'Create Note'}
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseToast} severity={toast.severity} sx={{ width: '100%' }}>
          {toast.message}
        </Alert>
      </Snackbar>

      <Dialog open={isNavigateDialogOpen} onClose={handleCancelNavigation}>
        <DialogTitle>Unsaved Changes</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You have unsaved changes. Are you sure you want to leave without saving?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelNavigation} color="secondary" variant='outlined'>
            Stay
          </Button>
          <Button onClick={handleSaveBeforeNavigate} color="primary">
            Save and Leave
          </Button>
          <Button onClick={handleNavigate} color="error">
            Leave Without Saving
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isSaveDialogOpen} onClose={handleCloseSaveDialog}>
        <DialogTitle>Confirm Save</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to save the changes?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSaveDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </MainContent>
  );
};

export default NoteForm;
