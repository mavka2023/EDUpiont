import React from 'react';
import NoteForm from './NoteForm';
import { useNavigate } from 'react-router-dom';

const EditNote: React.FC = () => {
  const navigate = useNavigate();

  const handleSave = (updatedNote: { id?: number; title: string; content: string }) => {
    const storedNotes = localStorage.getItem('notes');
    const notes = storedNotes ? JSON.parse(storedNotes) : [];

    const noteIndex = notes.findIndex((note: { id: number, link: string}) => note.id.toString() === note.link.split('/').pop());

    if (noteIndex !== -1) {
      notes[noteIndex] = { ...updatedNote, link: notes[noteIndex].link};
      localStorage.setItem('notes', JSON.stringify(notes));
    }

    navigate('/notes');
  };

  const existingNote = (() => {
    const storedNotes = localStorage.getItem('notes');
    const notes = storedNotes ? JSON.parse(storedNotes) : [];
    return notes.find((note: { id: number, link: string }) => note.id.toString() === note.link.split('/').pop());
  })();

  return <NoteForm note={existingNote} onSave={handleSave} />;
};

export default EditNote;
