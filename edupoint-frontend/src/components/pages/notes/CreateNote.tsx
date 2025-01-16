import React from 'react';
import NoteForm from './NoteForm';

const CreateNote: React.FC = () => {

  const handleSave = (note: { title: string; content: string }) => {
    const storedNotes = localStorage.getItem('notes');
    const notes = storedNotes ? JSON.parse(storedNotes) : [];

    const newNoteId = Math.random().toString(36).substr(2, 9);
    const newNote = { ...note, link: `/notes/${newNoteId}`, id: newNoteId };
    const updatedNotes = [...notes, newNote];

    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  return <NoteForm onSave={handleSave} />;
};

export default CreateNote;
