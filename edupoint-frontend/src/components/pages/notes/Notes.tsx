import React from 'react';
import List, { ListItemProps } from '../../list/List';
import MainContent from '../../mainContent/MainContent';
import AddIcon from '@mui/icons-material/Add';

const Notes = () => {
  const storedNotes = localStorage.getItem('notes');
  const notesFromStorage = storedNotes ? JSON.parse(storedNotes) : [];

  const notes: ListItemProps[] = notesFromStorage.map((note: { id: number; title: string }) => ({
    title: note.title,
    link: `/notes/${note.id}`,
    onDelete: () => handleDelete(note.id.toString()),
  }));

  notes.push({
    title: 'Add new note',
    icon: <AddIcon style={{ fontSize: 48 }} />,
    link: '/notes/create',
    hideMenu: true,
  });

  const handleDelete = (id: string) => {
    const storedNotes = localStorage.getItem('notes');
    const notes = storedNotes ? JSON.parse(storedNotes) : [];

    const updatedNotes = notes.filter((note: { id: string }) => note.id !== id);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  }

  return (
    <MainContent title="Notes" text="Here you can see and add your notes">
      <List items={notes}></List>
    </MainContent>
  );
};

export default Notes;
