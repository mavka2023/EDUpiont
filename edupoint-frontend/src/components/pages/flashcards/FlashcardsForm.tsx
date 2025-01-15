import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Card, CardContent, IconButton, CardHeader, Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import MainContent from '../../mainContent/MainContent';
import { spacing } from '../../../styles/constants';

interface Flashcard {
  id: number;
  question: string;
  answer: string;
}

interface FlashcardsFormProps {
  flashcardSet?: { id: number; name: string; flashcards: Flashcard[] };
  onSave?: (flashcardSet: { id?: number; name: string; flashcards: Flashcard[] }) => void;
}

const FlashcardsForm: React.FC<FlashcardsFormProps> = ({ flashcardSet, onSave }) => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>(flashcardSet?.flashcards || []);
  const [flashcardId, setFlashcardId] = useState<number>(flashcards.length + 1);
  const [setName, setSetName] = useState<string>(flashcardSet?.name || '');
  const [errors, setErrors] = useState<{ [key: number]: string }>({});
  const [toast, setToast] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState<boolean>(false);
  const [isNavigateDialogOpen, setIsNavigateDialogOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (flashcardSet) {
      setSetName(flashcardSet.name);
      setFlashcards(flashcardSet.flashcards);
    }
  }, [flashcardSet]);

  const addFlashcard = () => {
    setFlashcards((prev) => [
      ...prev,
      { id: flashcardId, question: '', answer: '' },
    ]);
    setFlashcardId((prev) => prev + 1);
  };

  const updateFlashcard = (id: number, field: keyof Flashcard, value: string) => {
    setFlashcards((prev) =>
      prev.map((flashcard) =>
        flashcard.id === id
          ? { ...flashcard, [field]: value }
          : flashcard
      )
    );
  };

  const deleteFlashcard = (id: number) => {
    setFlashcards((prev) => prev.filter((flashcard) => flashcard.id !== id));
  };

  const validateInputs = () => {
    const newErrors: { [key: number]: string } = {};
    flashcards.forEach((flashcard) => {
      if (flashcard.question.length < 10) {
        newErrors[flashcard.id] = 'Question must be at least 10 characters long';
      }
      if (flashcard.answer.length < 10) {
        newErrors[flashcard.id] = 'Answer must be at least 10 characters long';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateInputs()) {
      const newFlashcardSet = { id: flashcardSet?.id, name: setName, flashcards };
      if (onSave) onSave(newFlashcardSet);
      setToast({ open: true, message: 'Flashcard set saved successfully!', severity: 'success' });
      setTimeout(() => navigate('/flashcards'), 1500); 
    } else {
      setToast({ open: true, message: 'Please fix the errors before saving.', severity: 'error' });
    }
  };

  const handleCloseToast = () => {
    setToast({ ...toast, open: false });
  };

  const handleNavigate = () => {
    setIsNavigateDialogOpen(false);
    navigate('/flashcards');
  };

  const handleOpenNavigateDialog = () => {
    setIsNavigateDialogOpen(true);
  };

  const handleSaveBeforeNavigate = () => {
    setIsNavigateDialogOpen(false);
    handleSubmit();
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
    <MainContent title={flashcardSet ? 'Edit Flashcard Set' : 'Create Flashcard Set'} text="Create or edit your flashcard set by adding flashcards">
      <Box display="flex" flexDirection="column" gap={spacing.lg}>
        <Card>
          <CardContent>
            <Box display="flex" flexDirection="column" alignItems="flex-start" gap={spacing.md}>
              <TextField
                label="Flashcard Set Name"
                color="secondary"
                fullWidth
                value={setName}
                onChange={(e) => setSetName(e.target.value)}
              />
            </Box>
          </CardContent>
        </Card>

        {flashcards.map((flashcard) => (
          <Card key={flashcard.id}>
            <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" position="relative">
              <CardHeader title={`Flashcard ${flashcard.id}`} />
              <IconButton color="error" onClick={() => deleteFlashcard(flashcard.id)} style={{ position: 'absolute', right: spacing.sm }}>
                <DeleteIcon />
              </IconButton>
            </Box>
            <CardContent>
              <Box display="flex" flexDirection="column" alignItems="flex-start" gap={spacing.sm}>
                <TextField
                  label="Question"
                  color="secondary"
                  fullWidth
                  value={flashcard.question}
                  onChange={(e) => updateFlashcard(flashcard.id, 'question', e.target.value)}
                  error={!!errors[flashcard.id]}
                  helperText={errors[flashcard.id]}
                />
                <TextField
                  label="Answer"
                  color="secondary"
                  fullWidth
                  value={flashcard.answer}
                  onChange={(e) => updateFlashcard(flashcard.id, 'answer', e.target.value)}
                  error={!!errors[flashcard.id]}
                  helperText={errors[flashcard.id]}
                />
              </Box>
            </CardContent>
          </Card>
        ))}
        <Box display="flex" justifyContent="space-between" sx={{ '@media (max-width:768px)': { flexDirection: 'column', gap: spacing.md } }}>
<Button
            variant="contained"
            color="primary"
            onClick={addFlashcard}
            startIcon={<AddCircleIcon />}
          >
            Add Flashcard
          </Button>
          </Box>
        <Box display="flex" justifyContent="space-between" sx={{ '@media (max-width:768px)': { flexDirection: 'column', gap: spacing.md } }}>
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
            disabled={!setName || flashcards.length === 0}
          >
            {flashcardSet ? 'Save Changes' : 'Create Flashcard Set'}
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
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </MainContent>
  );
};

export default FlashcardsForm;
