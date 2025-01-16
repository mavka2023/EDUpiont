import React from 'react';
import List, { ListItemProps } from '../../list/List';
import MainContent from '../../mainContent/MainContent';
import AddIcon from '@mui/icons-material/Add';

const Flashcards = () => {
  const storedFlashcards = localStorage.getItem('flashcards');
  const flashcardsFromStorage = storedFlashcards ? JSON.parse(storedFlashcards) : [];

  const flashcardSets: ListItemProps[] = flashcardsFromStorage.map(
    (set: { id: number; name: string }) => ({
      title: set.name,
      link: `/flashcards/${set.id}`,
      onDelete: () => handleDelete(set.id.toString()),
    })
  );

  flashcardSets.push({
    title: 'Add new Flashcard Set',
    icon: <AddIcon style={{ fontSize: 48 }} />,
    link: '/flashcards/create',
    hideMenu: true,
  });

  const handleDelete = (id: string) => {
    const storedFlashcards = localStorage.getItem('flashcards');
    const flashcards = storedFlashcards ? JSON.parse(storedFlashcards) : [];

    const updatedFlashcards = flashcards.filter((set: { id: string }) => set.id !== id);
    localStorage.setItem('flashcards', JSON.stringify(updatedFlashcards));
  };

  return (
    <MainContent title="Flashcards" text="Here you can see and add your flashcard sets">
      <List items={flashcardSets}></List>
    </MainContent>
  );
};

export default Flashcards;
