import React from 'react';
import  NoteForm from './NoteForm';

const existingNote = {
  id: 1,
  title: 'Sample Note',
  content: 'This is a sample note content for demonstration.',
};

const EditNote: React.FC = () => {
  const handleSave = (note: { title: string; content: string }) => {
    console.log('Note saved:', note);
  };

  return <NoteForm note={existingNote} onSave={handleSave} />;
};

export default EditNote;
