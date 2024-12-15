import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Card, CardContent, IconButton, CardHeader } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
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
      alert('Flashcard set saved successfully!');
    }
  };

  return (
    <MainContent title={flashcardSet ? 'Edit Flashcard Set' : 'Create Flashcard Set'} text="Create or edit your flashcard set by adding flashcards">
      <Box display={"flex"} flexDirection={"column"} gap={spacing.lg}>
        <Card>
          <CardContent>
            <Box display="flex" flexDirection="column" alignItems="flex-start" gap={spacing.md}>
              <TextField
                label="Flashcard Set Name"
                variant="outlined"
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
              <CardHeader title={`Flashcard ${flashcard.id}`}/>   
              <IconButton color="error" onClick={() => deleteFlashcard(flashcard.id)} style={{position: 'absolute', right: spacing.sm}}>
                <DeleteIcon />
              </IconButton>
            </Box>
            <CardContent>
              <Box display="flex" flexDirection="column" alignItems="flex-start" gap={spacing.sm}>

                <TextField
                  label="Question"
                  variant="outlined"
                  fullWidth
                  value={flashcard.question}
                  onChange={(e) => updateFlashcard(flashcard.id, 'question', e.target.value)}
                  error={!!errors[flashcard.id]}
                  helperText={errors[flashcard.id]}
                />
                <TextField
                  label="Answer"
                  variant="outlined"
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
        <Box display="flex" justifyContent="space-between">
          <Button
            variant="contained"
            color="primary"
            onClick={addFlashcard}
            startIcon={<AddCircleIcon />}
          >
            Add Flashcard
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleSubmit}
            disabled={!setName || flashcards.length === 0}
          >
            {flashcardSet ? "Save Changes" : "Create Flashcard Set"}
          </Button>
        </Box>
      </Box>
    </MainContent>
  );
};

export default FlashcardsForm;
