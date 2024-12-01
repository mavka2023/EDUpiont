import React from 'react';
import List, { ListItemProps } from '../../list/List';
import MainContent from '../../mainContent/MainContent';
import AddIcon from '@mui/icons-material/Add';

const Flashcards = () => {
  const flashcardSets: ListItemProps[] = [
    {
      title: 'Math Flashcards',
      link: '/flashcards/1',
    },
    {
      title: 'History Flashcards',
      link: '/flashcards/2',
    },
    {
      title: 'Programming Flashcards',
      link: '/flashcards/3',
    },
    {
      title: 'Add new Flashcard Set',
      icon: <AddIcon style={{ fontSize: 48 }} />,
      link: '/flashcards/create',
      hideMenu: true,
    },
  ];

  return (
    <MainContent title="Flashcards" text="Here you can see and add your flashcard sets">
      <List items={flashcardSets}></List>
    </MainContent>
  );
};

export default Flashcards;
