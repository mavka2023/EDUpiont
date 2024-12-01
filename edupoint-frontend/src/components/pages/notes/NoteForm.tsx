import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Card, CardContent, Typography } from '@mui/material';
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

  useEffect(() => {
    if (note) {
      setNoteTitle(note.title);
      setNoteContent(note.content);
    }
  }, [note]);

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

  const handleSubmit = () => {
    if (validateInputs()) {
      const newNote: Note = { id: note?.id, title: noteTitle, content: noteContent };
      if (onSave) onSave(newNote);
      alert('Note saved successfully!');
    }
  };

  return (
    <MainContent title={note ? "Edit Note" : "Create Note"} text="Create or edit your note by adding a title and content">
      <Box display="flex" flexDirection="column" gap={spacing.lg}>
        <Card>
          <CardContent>
            <Box display="flex" flexDirection="column" gap={spacing.lg}>
              <TextField
                label="Note Title"
                variant="outlined"
                fullWidth
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                error={!!errors.title}
                helperText={errors.title}
              />
              <TextField
                label="Note Content"
                variant="outlined"
                multiline
                rows={6}
                fullWidth
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                error={!!errors.content}
                helperText={errors.content}
              />
            </Box>
          </CardContent>
        </Card>
        
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!noteTitle || !noteContent}
          >
            {note ? 'Save Changes' : 'Create Note'}
          </Button>
        </Box>
      </Box>
    </MainContent>
  );
};

export default NoteForm;
