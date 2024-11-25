import React from 'react';
import List, { ListItemProps } from '../../list/List';
import MainContent from '../../mainContent/MainContent';

const Flashcards = () => {
  return (
    <MainContent title="Flashcards" text="Here you can see and add your flashcards">
      <List items={[]}></List>
    </MainContent>
  );
};

export default Flashcards;
