import React from 'react';
import List, { ListItemProps } from '../../list/List';
import MainContent from '../../mainContent/MainContent';

const Notes = () => {
  return (
    <MainContent title="Notes" text="Here you can see and add your notes">
      <List items={[]}></List>
    </MainContent>
  );
};

export default Notes;
